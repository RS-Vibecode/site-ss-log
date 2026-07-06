/**
 * whatsapp.ts — mensagens contextuais por CTA + montagem do link wa.me com
 * passthrough de UTM. Portado verbatim do protótipo v1 (objeto MESSAGES + utmSuffix).
 * Funções puras — usadas pelo handler global de WhatsApp (client component).
 */
import { siteConfig } from "@/lib/site"

export type CtaLocation =
  | "nav"
  | "hero"
  | "solucao"
  | "estrutura"
  | "segmentos"
  | "servicos"
  | "cta_final"
  | "cta_final_contato"
  | "footer"

/** Mensagem inicial do WhatsApp por posição do CTA. */
export const MESSAGES: Record<CtaLocation, string> = {
  nav: "Olá! Vim pelo site da S&S Log e quero solicitar uma proposta de armazenagem.",
  hero: "Olá! Vim pelo site da S&S Log e quero solicitar uma proposta de armazenagem.",
  solucao:
    "Olá! Vim pelo site da S&S Log e quero entender a operação para a minha carga.",
  estrutura:
    "Olá! Vim pelo site da S&S Log e quero agendar uma visita técnica ao armazém.",
  segmentos:
    "Olá! Vim pelo site da S&S Log e quero uma proposta para o meu segmento.",
  servicos:
    "Olá! Vim pelo site da S&S Log e quero conversar sobre o meu escopo de logística.",
  cta_final:
    "Olá! Vim pelo site da S&S Log e quero solicitar uma proposta de armazenagem.",
  cta_final_contato:
    "Olá! Vim pelo site da S&S Log e quero falar com a equipe.",
  footer: "Olá! Vim pelo site da S&S Log e quero falar com a equipe.",
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
