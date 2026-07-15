/**
 * POST /api/lead — recebe o lead da LP (/lp-01) e encaminha para a planilha.
 *
 * Por que um proxy no servidor em vez de o browser postar direto no Apps Script:
 *  1. a URL /exec e o segredo ficam fora do bundle (env sem NEXT_PUBLIC);
 *  2. evita o CORS do Apps Script, que não responde preflight de forma confiável;
 *  3. permite validar e barrar bot (honeypot) antes de sujar a planilha.
 *
 * Contrato: SEMPRE responde 200 com { ok }. A LP não bloqueia o lead se a
 * planilha falhar — o WhatsApp abre de qualquer jeito e o comercial recebe.
 */
import { SEGMENTOS, VOLUMES } from "@/lib/lp"

/** Campos aceitos. Qualquer coisa fora disso é descartada antes do encaminhamento. */
type LeadPayload = {
  nome?: unknown
  telefone?: unknown
  email?: unknown
  empresa?: unknown
  segmento?: unknown
  volume?: unknown
  consent?: unknown
  page?: unknown
  /** honeypot — precisa chegar vazio; preenchido = bot */
  website?: unknown
  utm?: Record<string, unknown>
}

const str = (v: unknown, max = 200): string =>
  typeof v === "string" ? v.trim().slice(0, max) : ""

/** Sanitiza para evitar que a planilha interprete a célula como fórmula. */
const safeCell = (v: string): string => (/^[=+\-@]/.test(v) ? `'${v}` : v)

const isEmail = (v: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
/** Telefone BR: aceita máscara; exige 10 (fixo) ou 11 (celular) dígitos. */
const isPhone = (v: string): boolean => {
  const d = v.replace(/\D/g, "")
  return d.length >= 10 && d.length <= 13
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const

export async function POST(request: Request) {
  let body: LeadPayload
  try {
    body = (await request.json()) as LeadPayload
  } catch {
    return Response.json({ ok: false, error: "invalid_json" })
  }

  // Bot: honeypot preenchido. Responde ok para não ensinar o bot a contornar.
  if (str(body.website)) return Response.json({ ok: true })

  const nome = str(body.nome, 120)
  const telefone = str(body.telefone, 40)
  const email = str(body.email, 160)
  const empresa = str(body.empresa, 160)
  const segmento = str(body.segmento, 80)
  const volume = str(body.volume, 80)

  if (!nome || !isPhone(telefone) || !isEmail(email) || !empresa) {
    return Response.json({ ok: false, error: "invalid_fields" })
  }
  // Selects só aceitam valores do nosso próprio catálogo.
  if (!(SEGMENTOS as readonly string[]).includes(segmento)) {
    return Response.json({ ok: false, error: "invalid_segmento" })
  }
  if (!(VOLUMES as readonly string[]).includes(volume)) {
    return Response.json({ ok: false, error: "invalid_volume" })
  }
  // LGPD: sem aceite explícito, o lead não é gravado.
  if (body.consent !== true) {
    return Response.json({ ok: false, error: "consent_required" })
  }

  const webhook = process.env.LEADS_WEBHOOK_URL
  if (!webhook) {
    // Ainda não configurado: não é erro do usuário — o WhatsApp segue funcionando.
    console.warn("[lead] LEADS_WEBHOOK_URL ausente — lead não persistido")
    return Response.json({ ok: false, error: "not_configured" })
  }

  const utm: Record<string, string> = {}
  for (const k of UTM_KEYS) {
    const v = str(body.utm?.[k], 200)
    if (v) utm[k] = v
  }

  const payload = {
    secret: process.env.LEADS_WEBHOOK_SECRET ?? "",
    nome: safeCell(nome),
    telefone: safeCell(telefone),
    email: safeCell(email),
    empresa: safeCell(empresa),
    segmento,
    volume,
    page: str(body.page, 300) || "/lp-01",
    consent: "sim",
    ...utm,
  }

  try {
    // Timeout curto: a planilha não pode segurar a resposta ao usuário.
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
      // Apps Script responde 302 para script.googleusercontent.com
      redirect: "follow",
    })
    if (!res.ok) {
      console.error("[lead] webhook respondeu", res.status)
      return Response.json({ ok: false, error: "webhook_error" })
    }
    return Response.json({ ok: true })
  } catch (err) {
    console.error("[lead] falha ao encaminhar", err)
    return Response.json({ ok: false, error: "webhook_unreachable" })
  }
}
