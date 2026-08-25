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
    "Operador logístico multicliente em Uberaba/MG, certificado ABNT NBR ISO 9001:2015. 17.000 m² para diferentes segmentos — de têxtil e autopeças a cargas reguladas, com licenças ANVISA, IBAMA e IMA. Solicite proposta.",
  ogTitle: "S&S Log — Operador logístico certificado ISO 9001 em Uberaba/MG",
  ogDescription:
    "Sistema de gestão certificado ABNT NBR ISO 9001:2015. 17.000 m² preparados para diferentes segmentos e tipos de operação, com estrutura, segurança e controle. Licenças ANVISA, IBAMA e IMA como diferencial.",
  twitterDescription:
    "Operador logístico multicliente certificado ISO 9001:2015 — 17.000 m² para diferentes segmentos e tipos de operação, com segurança e controle.",
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
  /**
   * Certificação do sistema de gestão da qualidade. Dados conferidos no
   * Certificado de Conformidade emitido pela Provence (PDF do cliente em
   * temp/licenças/ISO, fora do git). Fonte única para o hero, a faixa de
   * destaque, a FAQ e o JSON-LD — não repetir número solto no JSX.
   */
  certification: {
    norm: "ABNT NBR ISO 9001:2015",
    shortName: "ISO 9001:2015",
    number: "SGQ 977/31",
    issuer: "Provence Certificações",
    scope:
      "prestação de serviços de transporte rodoviário de cargas fracionadas e dedicadas, bem como armazenagem, incluindo atividades de coleta, recebimento, armazenamento, programação logística e entrega",
    issuedOn: "2026-08-20",
    issuedOnDisplay: "20/08/2026",
    validUntil: "2029-08-20",
    validUntilDisplay: "20/08/2029",
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
