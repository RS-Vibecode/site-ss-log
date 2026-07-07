import type { Metadata, Viewport } from "next"
import { Barlow, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { siteConfig } from "@/lib/site"
import { WhatsAppHandler } from "@/components/site/whatsapp-handler"
import { CookieBanner } from "@/components/site/cookie-banner"
import { ScrollEffects } from "@/components/site/scroll-effects"
import { Tracking } from "@/components/site/tracking"

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.brandName,
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
    locale: "pt_BR",
    images: [{ url: "/media/og-ss-log.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.ogTitle,
    description: siteConfig.twitterDescription,
    images: ["/media/og-ss-log.jpg"],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#081740",
}

/**
 * Consent Mode v2 — default TUDO negado (opt-in LGPD), functionality/security
 * concedidos, wait_for_update 500ms. Reaplica consentimento salvo cedo, ANTES
 * de qualquer tag de tracking. Inline no topo do <body> para executar na análise
 * do HTML, muito antes de GA4/Pixel (carregados afterInteractive pelo Tracking).
 */
const consentInit = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});(function(){try{var c=JSON.parse(localStorage.getItem('sslog_consent_v1')||'null');if(c&&c.status==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${barlow.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* Consent Mode v2 — deve rodar antes de qualquer tag de tracking */}
        <script dangerouslySetInnerHTML={{ __html: consentInit }} />
        {/* Sem JS, revela o conteúdo animado (evita seções invisíveis) */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>

        {children}

        <WhatsAppHandler />
        <CookieBanner />
        <ScrollEffects />
        <Tracking />
      </body>
    </html>
  )
}
