"use client"

import { useState } from "react"
import { clearConsent, denyConsent } from "@/lib/consent"

/**
 * CookieResetButton — botão "Limpar minhas preferências de cookies" da política.
 * Remove a escolha salva (revoga o consentimento ativo). Como carrega o atributo
 * `data-cookie-prefs`, o próprio clique também reabre o banner (o CookieBanner
 * escuta cliques nesse seletor), permitindo ao usuário reescolher na hora.
 */
export function CookieResetButton() {
  const [done, setDone] = useState(false)

  const reset = () => {
    clearConsent()
    denyConsent()
    setDone(true)
  }

  return (
    <>
      <button type="button" className="pp-btn" data-cookie-prefs onClick={reset}>
        Limpar minhas preferências de cookies
      </button>
      <p className="pp-note" hidden={!done}>
        Pronto. O aviso de cookies vai aparecer de novo para você reescolher.
      </p>
    </>
  )
}
