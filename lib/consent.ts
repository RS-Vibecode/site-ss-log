/**
 * consent.ts — chave de persistência + helpers de Consent Mode v2 (LGPD).
 * Opt-in: tudo negado por padrão (definido no script inline do layout).
 * O aceite empurra `gtag('consent','update', ...granted)` + `fbq('consent','grant')`.
 */
export const CONSENT_KEY = "sslog_consent_v1"

export type ConsentStatus = "granted" | "denied"

export interface StoredConsent {
  status: ConsentStatus
  ts: number
}

export function readConsent(): StoredConsent | null {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY) || "null")
  } catch {
    return null
  }
}

export function saveConsent(status: ConsentStatus): void {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ status, ts: Date.now() }))
  } catch {
    /* localStorage indisponível — segue sem persistir */
  }
}

export function clearConsent(): void {
  try {
    localStorage.removeItem(CONSENT_KEY)
  } catch {
    /* no-op */
  }
}

/** Concede: analytics + ads storage/dados/personalização. */
export function grantConsent(): void {
  window.gtag?.("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  })
  window.fbq?.("consent", "grant")
}

/** Nega/revoga tudo que não seja funcional/segurança. */
export function denyConsent(): void {
  window.gtag?.("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  })
  window.fbq?.("consent", "revoke")
}
