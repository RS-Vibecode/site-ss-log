"use client"

import { useEffect } from "react"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

/**
 * WhatsAppHandler — handler global (portado do protótipo).
 * Intercepta cliques em qualquer `[data-wa]` (server-rendered), reescreve o href
 * para wa.me com a mensagem contextual + passthrough de UTM e dispara os eventos
 * de tracking (GA4 whatsapp_click + Meta Lead). Renderiza null.
 */
export function WhatsAppHandler() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const el = target?.closest<HTMLAnchorElement>("a[data-wa]")
      if (!el) return

      const loc = el.getAttribute("data-cta-location") || "hero"
      // enriquece o destino antes de navegar
      el.href = buildWhatsAppUrl(loc, window.location.search)

      window.gtag?.("event", "whatsapp_click", { cta_location: loc })
      window.fbq?.("track", "Lead", {
        content_name: loc,
        content_category: "whatsapp",
      })
    }

    // capture phase: reescreve o href antes da navegação default do <a>
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  return null
}
