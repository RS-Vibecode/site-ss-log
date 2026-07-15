/**
 * whatsapp.ts — mensagens contextuais por CTA + montagem do link wa.me com
 * passthrough de UTM. Portado verbatim do protótipo v1 (objeto MESSAGES + utmSuffix).
 * Funções puras — usadas pelo handler global de WhatsApp (client component).
 */
import { siteConfig } from "@/lib/site"

export type CtaLocation =
  | "nav"
  | "hero"
  | "quem_somos"
  | "solucao"
  | "estrutura"
  | "controle_acesso"
  | "segmentos"
  | "servicos"
  | "cta_final"
  | "cta_final_contato"
  | "form"
  | "float"
  | "footer"
  // --- LP de Ads (/lp-01): prefixo lp_ para separar LP × site no GA4 ---
  | "lp_header"
  | "lp_hero"
  | "lp_form"
  | "lp_prova"
  | "lp_cta_final"

/** Mensagem inicial do WhatsApp por posição do CTA. */
export const MESSAGES: Record<CtaLocation, string> = {
  nav: "Olá! Vim pelo site da S&S Log e quero solicitar uma proposta de armazenagem.",
  hero: "Olá! Vim pelo site da S&S Log e quero solicitar uma proposta de armazenagem.",
  quem_somos:
    "Olá! Vim pelo site da S&S Log e quero conhecer melhor a operação de vocês.",
  solucao:
    "Olá! Vim pelo site da S&S Log e quero entender a operação para a minha carga.",
  estrutura:
    "Olá! Vim pelo site da S&S Log e quero agendar uma visita técnica ao armazém.",
  controle_acesso:
    "Olá! Vim pelo site da S&S Log e quero saber mais sobre a segurança e o controle de acesso do armazém.",
  segmentos:
    "Olá! Vim pelo site da S&S Log e quero uma proposta para o meu segmento.",
  servicos:
    "Olá! Vim pelo site da S&S Log e quero conversar sobre o meu escopo de logística.",
  cta_final:
    "Olá! Vim pelo site da S&S Log e quero solicitar uma proposta de armazenagem.",
  cta_final_contato:
    "Olá! Vim pelo site da S&S Log e quero falar com a equipe.",
  form: "Olá! Vim pelo site da S&S Log e quero falar com a equipe comercial.",
  float: "Olá! Vim pelo site da S&S Log e quero falar com a equipe.",
  footer: "Olá! Vim pelo site da S&S Log e quero falar com a equipe.",
  lp_header: "Olá! Vim pela página da S&S Log e quero falar com a equipe.",
  lp_hero:
    "Olá! Vim pela página da S&S Log e quero agendar a visita técnica ao armazém.",
  lp_form: "Olá! Vim pela página da S&S Log e quero falar com a equipe comercial.",
  lp_prova:
    "Olá! Vim pela página da S&S Log e quero conhecer a estrutura e as licenças de vocês.",
  lp_cta_final:
    "Olá! Vim pela página da S&S Log e quero agendar a visita técnica e receber uma proposta.",
}

/** Lê os utm_* da query e monta o sufixo "(via origem X · mídia Y · ...)". */
export function utmSuffix(search: string): string {
  const p = new URLSearchParams(search)
  const labels: Record<string, string> = {
    utm_source: "origem",
    utm_medium: "mídia",
    utm_campaign: "campanha",
    utm_term: "termo",
    utm_content: "anúncio",
  }
  const out: string[] = []
  for (const key of Object.keys(labels)) {
    const v = p.get(key)
    if (v) out.push(`${labels[key]} ${v}`)
  }
  return out.length ? `\n\n(via ${out.join(" · ")})` : ""
}

/** Monta o destino wa.me enriquecido com mensagem contextual + UTM. */
export function buildWhatsAppUrl(loc: string, search = ""): string {
  const key = (loc in MESSAGES ? loc : "hero") as CtaLocation
  const msg = MESSAGES[key] + utmSuffix(search)
  return `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(msg)}`
}

/**
 * Dados capturados pelo formulário antes do direcionamento ao WhatsApp.
 * Os campos opcionais só existem no formulário da LP (/lp-01); o formulário da
 * home segue com os três primeiros.
 */
export type LeadData = {
  nome: string
  telefone: string
  email: string
  empresa?: string
  segmento?: string
  volume?: string
}

/**
 * Monta o destino wa.me a partir do formulário de captura — injeta os dados do
 * lead na mensagem para a equipe comercial receber tudo já no primeiro contato.
 * A persistência (planilha + alerta) é feita em paralelo via POST /api/lead —
 * ver `components/site/lp-lead-form.tsx`.
 */
export function buildLeadWhatsAppUrl(lead: LeadData, search = ""): string {
  const linhas = [
    "Olá! Vim pelo site da S&S Log e quero falar com a equipe comercial.",
    "",
    `Nome: ${lead.nome}`,
    `Telefone: ${lead.telefone}`,
    `E-mail: ${lead.email}`,
  ]
  if (lead.empresa) linhas.push(`Empresa: ${lead.empresa}`)
  if (lead.segmento) linhas.push(`Segmento: ${lead.segmento}`)
  if (lead.volume) linhas.push(`Volume: ${lead.volume}`)

  const msg = linhas.join("\n") + utmSuffix(search)
  return `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(msg)}`
}
