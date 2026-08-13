/**
 * site.ts — configuração canônica do site S&S Log (cliente externo).
 * Fonte da verdade para SEO, JSON-LD, navegação e dados de contato reais.
 */
export const siteConfig = {
  name: "S&S Log",
  brandName: "S&S Log",
  legalName: "SALLES & SANTOS LOG LTDA",
  cnpj: "44.573.981/0001-31",
  url: "https://seslog.com.br",
  title: "S&S Log | Operador Logístico Multicliente em Uberaba/MG",
  description:
    "Operador logístico multicliente em Uberaba/MG. 17.000 m² para diferentes segmentos — de têxtil, autopeças e produtos pet a cargas reguladas, com licenças ANVISA, IBAMA e IMA. Solicite proposta.",
  ogTitle: "S&S Log — Operador logístico multicliente em Uberaba/MG",
  ogDescription:
    "17.000 m² preparados para diferentes segmentos e tipos de operação. Operação desenhada sob medida, com estrutura, segurança e controle. Licenças ANVISA, IBAMA e IMA como diferencial.",
  twitterDescription:
    "Operador logístico multicliente — 17.000 m² para diferentes segmentos e tipos de operação. Operação desenhada sob medida, com segurança e controle.",
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
  /**
   * Área do Cliente — sistema externo (VsOmni), fora deste site.
   * A raiz redireciona para /VsOmni/; linkar sempre a raiz.
   */
  clientArea: {
    label: "Área do Cliente",
    url: "https://clientes.seslog.com.br/",
  },
  /** Navegação principal (âncoras da single-page). */
  nav: [
    { title: "Quem Somos", href: "#quem-somos" },
    { title: "Estrutura", href: "#estrutura" },
    { title: "Segmentos", href: "#segmentos" },
    { title: "Serviços", href: "#servicos" },
    // "Controle de Acesso" saiu do topo para abrir espaço à Área do Cliente (era a
    // âncora mais longa) e para não confundir com ela. Continua no rodapé e a
    // seção #controle-acesso segue na página.
    { title: "Contato", href: "#contato" },
  ],
} as const

export type SiteConfig = typeof siteConfig
