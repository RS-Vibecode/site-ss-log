/**
 * site.ts — configuração canônica do site S&S Log (cliente externo).
 * Fonte da verdade para SEO, JSON-LD, navegação e dados de contato reais.
 */
export const siteConfig = {
  name: "S&S Log",
  brandName: "S&S Log — Salles & Santos Logística",
  legalName: "SALLES & SANTOS LOG LTDA",
  cnpj: "44.573.981/0001-31",
  url: "https://seslog.com.br",
  title: "S&S Log | Armazenagem de Químicos e Cosméticos em MG",
  description:
    "Operador logístico B2B em Uberaba/MG. Licenças ANVISA, IBAMA e IMA para armazenar químicos, agroquímicos, defensivos e cosméticos. Solicite proposta.",
  ogTitle: "S&S Log — Logística regulada em Uberaba/MG",
  ogDescription:
    "17.000 m² com licenças ANVISA, IBAMA e IMA para armazenar químicos, agroquímicos, defensivos e cosméticos. Operação desenhada para a sua demanda.",
  twitterDescription:
    "17.000 m² com licenças ANVISA, IBAMA e IMA. Armazenagem de químicos, agroquímicos, defensivos e cosméticos.",
  contact: {
    /** Número no formato E.164 (sem símbolos) usado nos links wa.me. */
    whatsappNumber: "5534999044040",
    whatsappDisplay: "(34) 99904-4040",
    whatsappUrl: "https://wa.me/5534999044040",
    telephone: "+55-34-99904-4040",
    email: "andre.carvalho@seslog.com.br",
  },
  address: {
    street: "Distrito Industrial IV",
    city: "Uberaba",
    region: "MG",
    country: "BR",
    display: "Distrito Industrial IV · Uberaba/MG",
  },
  /** Navegação principal (âncoras da single-page). */
  nav: [
    { title: "Início", href: "#top" },
    { title: "Quem Somos", href: "#quem-somos" },
    { title: "Estrutura", href: "#estrutura" },
    { title: "Segmentos", href: "#segmentos" },
    { title: "Serviços", href: "#servicos" },
    { title: "Contato", href: "#contato" },
  ],
} as const

export type SiteConfig = typeof siteConfig
