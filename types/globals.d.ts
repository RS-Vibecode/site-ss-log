/**
 * Tipagens globais para as tags de tracking (GA4 / Meta Pixel), definidas em
 * runtime pelo script de Consent Mode (inline no layout) e pelo componente
 * Tracking. Mantém os client components tipados sem `any`.
 */
type GtagArgs =
  | [command: "js", date: Date]
  | [command: "config", targetId: string, config?: Record<string, unknown>]
  | [command: "event", eventName: string, params?: Record<string, unknown>]
  | [
      command: "consent",
      action: "default" | "update",
      params: Record<string, string | number>,
    ]

interface FbqFn {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue?: unknown[]
  loaded?: boolean
  version?: string
  push?: unknown
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: GtagArgs) => void
    fbq?: FbqFn
    _fbq?: FbqFn
  }
}

export {}
