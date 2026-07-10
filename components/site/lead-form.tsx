"use client"

import { useState } from "react"
import { buildLeadWhatsAppUrl, type LeadData } from "@/lib/whatsapp"

/**
 * LeadForm — captura Nome/Telefone/E-mail ANTES de direcionar ao WhatsApp.
 * Ao enviar: dispara os eventos de tracking (GA4 generate_lead + Meta Lead) e
 * abre o WhatsApp com os dados do lead já na mensagem para a equipe comercial.
 * O botão lateral (WhatsAppFloat) segue como acesso direto, sem formulário.
 */
export function LeadForm() {
  const [lead, setLead] = useState<LeadData>({
    nome: "",
    telefone: "",
    email: "",
  })

  const update =
    (field: keyof LeadData) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setLead((prev) => ({ ...prev, [field]: e.target.value }))

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // dataLayer → GTM dispara a conversão GA4 (generate_lead)
    window.dataLayer?.push({ event: "generate_lead", cta_location: "form" })
    window.fbq?.("track", "Lead", {
      content_name: "form",
      content_category: "formulario",
    })

    const url = buildLeadWhatsAppUrl(
      lead,
      typeof window !== "undefined" ? window.location.search : "",
    )
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <p className="lead-form-intro">
        Preencha seus dados para ser direcionado ao nosso WhatsApp e falar com a
        equipe comercial.
      </p>

      <div className="lead-field">
        <label htmlFor="lead-nome">Nome</label>
        <input
          id="lead-nome"
          name="nome"
          type="text"
          autoComplete="name"
          required
          placeholder="Seu nome"
          value={lead.nome}
          onChange={update("nome")}
        />
      </div>

      <div className="lead-field">
        <label htmlFor="lead-telefone">Telefone</label>
        <input
          id="lead-telefone"
          name="telefone"
          type="tel"
          autoComplete="tel"
          required
          placeholder="(00) 00000-0000"
          value={lead.telefone}
          onChange={update("telefone")}
        />
      </div>

      <div className="lead-field">
        <label htmlFor="lead-email">E-mail</label>
        <input
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="voce@empresa.com.br"
          value={lead.email}
          onChange={update("email")}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-lg btn-arrow lead-submit">
        Falar com a equipe comercial
      </button>
    </form>
  )
}
