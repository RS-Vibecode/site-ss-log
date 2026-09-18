"use client"

import { useId, useState } from "react"
import { buildLeadWhatsAppUrl, type LeadData } from "@/lib/whatsapp"
import { SEGMENTOS, VOLUMES } from "@/lib/lp"

/**
 * LpLeadForm — formulário de captação da LP (/lp-01).
 *
 * Entrega o lead em dois destinos, como combinado: planilha (via POST /api/lead)
 * E WhatsApp (abre com os dados já na mensagem).
 *
 * Ordem das operações no submit é deliberada: o `window.open` precisa acontecer
 * de forma SÍNCRONA dentro do handler do clique, senão o browser trata como
 * popup e bloqueia. Por isso o POST é disparado sem await (com `keepalive`, que
 * mantém a requisição viva mesmo se a aba perder o foco) e o WhatsApp abre logo
 * em seguida. A planilha nunca segura o usuário.
 */

type FormState = LeadData & {
  empresa: string
  segmento: string
  volume: string
}

const VAZIO: FormState = {
  nome: "",
  telefone: "",
  email: "",
  empresa: "",
  segmento: "",
  volume: "",
}

/** Máscara BR progressiva: (34) 99904-4040 — melhora a qualidade do dado. */
function mascaraTelefone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
]

function lerUtm(): Record<string, string> {
  if (typeof window === "undefined") return {}
  const p = new URLSearchParams(window.location.search)
  const out: Record<string, string> = {}
  for (const k of UTM_KEYS) {
    const v = p.get(k)
    if (v) out[k] = v
  }
  return out
}

/** Textos do formulário. Cada LP pode sobrescrever; o padrão é o da /lp-01. */
export type LpLeadFormCopy = {
  titulo: string
  subtitulo: string
  labelSegmento: string
  labelVolume: string
  erroSegmento: string
  erroVolume: string
  botao: string
  nota: string
  okTexto: string
}

const COPY_PADRAO: LpLeadFormCopy = {
  titulo: "Agende sua visita técnica",
  subtitulo: "1 hora no armazém com o André. Proposta em até 24h.",
  labelSegmento: "Segmento",
  labelVolume: "Volume de carga",
  erroSegmento: "Selecione o segmento.",
  erroVolume: "Selecione o volume de carga.",
  botao: "Quero agendar a visita",
  nota: "Sem compromisso. Retorno em até 30 minutos no horário comercial.",
  okTexto:
    "Abrimos o WhatsApp com suas informações para você enviar. Se a janela não abriu, o André retorna pelo telefone ou e-mail informado — a proposta sai em até 24 horas.",
}

export function LpLeadForm({
  id = "form",
  copy: copyProp,
}: {
  id?: string
  copy?: Partial<LpLeadFormCopy>
}) {
  const copy = { ...COPY_PADRAO, ...copyProp }
  /**
   * A LP renderiza este formulário duas vezes (hero e CTA final). Sem um prefixo
   * único, os dois teriam os mesmos ids de campo e o <label> do segundo passaria
   * a focar o input do primeiro. useId() dá um prefixo estável entre SSR e
   * hidratação — é o motivo de os ids serem montados e não escritos à mão.
   */
  const uid = useId()
  const campo = (nome: string) => `${uid}-${nome}`

  const [form, setForm] = useState<FormState>(VAZIO)
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [erro, setErro] = useState<string | null>(null)
  const [enviado, setEnviado] = useState(false)

  const update =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const valor =
        field === "telefone" ? mascaraTelefone(e.target.value) : e.target.value
      setForm((prev) => ({ ...prev, [field]: valor }))
    }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErro(null)

    const telDigitos = form.telefone.replace(/\D/g, "")
    if (!form.nome.trim()) return setErro("Informe seu nome.")
    if (telDigitos.length < 10) return setErro("Informe um telefone válido com DDD.")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      return setErro("Informe um e-mail válido.")
    if (!form.empresa.trim()) return setErro("Informe o nome da empresa.")
    if (!form.segmento) return setErro(copy.erroSegmento)
    if (!form.volume) return setErro(copy.erroVolume)
    if (!consent) return setErro("É preciso aceitar o uso dos dados para continuar.")

    // 1. Conversão — o GTM escuta e dispara GA4 + Google Ads + Meta.
    //    Sem PII no dataLayer: só o que qualifica a campanha.
    window.dataLayer?.push({
      event: "generate_lead",
      cta_location: "lp_form",
      lead_segmento: form.segmento,
      lead_volume: form.volume,
    })

    // 2. Planilha — dispara e segue; `keepalive` sobrevive à troca de aba.
    void fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        ...form,
        consent: true,
        website: honeypot,
        page: window.location.pathname,
        utm: lerUtm(),
      }),
    }).catch(() => {
      // Silencioso de propósito: o lead já está indo pro WhatsApp.
    })

    // 3. WhatsApp — síncrono, ainda dentro do gesto do usuário.
    window.open(
      buildLeadWhatsAppUrl(form, window.location.search),
      "_blank",
      "noopener,noreferrer",
    )

    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="lp-form lp-form-ok" role="status" aria-live="polite">
        <div className="lp-form-ok-icon" aria-hidden="true">
          ✓
        </div>
        <h3>Recebemos seus dados.</h3>
        <p>{copy.okTexto}</p>
        <button
          type="button"
          className="lp-form-reset"
          onClick={() => {
            setForm(VAZIO)
            setConsent(false)
            setEnviado(false)
          }}
        >
          Enviar outro contato
        </button>
      </div>
    )
  }

  return (
    <form className="lp-form" id={id} onSubmit={onSubmit} noValidate>
      <div className="lp-form-head">
        <h3>{copy.titulo}</h3>
        <p>{copy.subtitulo}</p>
      </div>

      <div className="lp-field">
        <label htmlFor={campo("nome")}>Nome</label>
        <input
          id={campo("nome")}
          type="text"
          autoComplete="name"
          placeholder="Seu nome"
          value={form.nome}
          onChange={update("nome")}
        />
      </div>

      <div className="lp-field-row">
        <div className="lp-field">
          <label htmlFor={campo("telefone")}>Telefone</label>
          <input
            id={campo("telefone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(00) 00000-0000"
            value={form.telefone}
            onChange={update("telefone")}
          />
        </div>
        <div className="lp-field">
          <label htmlFor={campo("email")}>E-mail</label>
          <input
            id={campo("email")}
            type="email"
            autoComplete="email"
            placeholder="voce@empresa.com.br"
            value={form.email}
            onChange={update("email")}
          />
        </div>
      </div>

      <div className="lp-field">
        <label htmlFor={campo("empresa")}>Empresa</label>
        <input
          id={campo("empresa")}
          type="text"
          autoComplete="organization"
          placeholder="Razão social ou nome fantasia"
          value={form.empresa}
          onChange={update("empresa")}
        />
      </div>

      <div className="lp-field-row">
        <div className="lp-field">
          <label htmlFor={campo("segmento")}>{copy.labelSegmento}</label>
          <select
            id={campo("segmento")}
            value={form.segmento}
            onChange={update("segmento")}
          >
            <option value="">Selecione…</option>
            {SEGMENTOS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="lp-field">
          <label htmlFor={campo("volume")}>{copy.labelVolume}</label>
          <select id={campo("volume")} value={form.volume} onChange={update("volume")}>
            <option value="">Selecione…</option>
            {VOLUMES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Honeypot — invisível para humanos, irresistível para bot. */}
      <div className="lp-hp" aria-hidden="true">
        <label htmlFor={campo("website")}>Não preencha este campo</label>
        <input
          id={campo("website")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <label className="lp-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          Autorizo a S&amp;S Log a usar meus dados para retornar este contato,
          conforme a{" "}
          <a href="/politica-privacidade" target="_blank" rel="noopener noreferrer">
            Política de Privacidade
          </a>
          .
        </span>
      </label>

      {erro ? (
        <p className="lp-form-erro" role="alert">
          {erro}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary btn-lg lp-form-submit">
        {copy.botao}
      </button>

      <p className="lp-form-nota">
        {copy.nota}
      </p>
    </form>
  )
}
