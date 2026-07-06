"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  denyConsent,
  grantConsent,
  readConsent,
  saveConsent,
} from "@/lib/consent"

/**
 * CookieBanner — banner LGPD (Aceitar/Recusar), portado do protótipo.
 * Mostra na primeira visita (sem escolha salva). Persiste em localStorage
 * (sslog_consent_v1) e, no aceite, libera GA4/Pixel via Consent Mode.
 * Reabrível por qualquer `[data-cookie-prefs]` (rodapé + política).
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Mostra só se ainda não houver escolha registrada.
    if (!readConsent()) setVisible(true)

    // Link "Preferências de cookies" (rodapé/política) reabre o banner.
    const onPrefsClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest("[data-cookie-prefs]")) {
        e.preventDefault()
        setVisible(true)
      }
    }
    document.addEventListener("click", onPrefsClick)
    return () => document.removeEventListener("click", onPrefsClick)
  }, [])

  const accept = () => {
    grantConsent()
    saveConsent("granted")
    setVisible(false)
  }
  const reject = () => {
    denyConsent()
    saveConsent("denied")
    setVisible(false)
  }

  return (
    <div
      className="lgpd"
      id="lgpd"
      role="region"
      aria-label="Aviso de privacidade e cookies"
      hidden={!visible}
    >
      <div className="lgpd-inner">
        <p className="lgpd-text">
          Usamos cookies para medir o desempenho do site e entender como ele é
          usado. Você decide: pode aceitar ou recusar. Detalhes na nossa{" "}
          <Link href="/politica-privacidade">Política de Privacidade</Link>.
        </p>
        <div className="lgpd-actions">
          <button
            type="button"
            className="btn-lgpd btn-lgpd-reject"
            onClick={reject}
          >
            Recusar
          </button>
          <button
            type="button"
            className="btn-lgpd btn-lgpd-accept"
            onClick={accept}
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
