export const siteConfig = {
  name: "S&S Log",
  description: "S&S Log - armazenagem e logistica licenciada (ANVISA, IBAMA, IMA) no Triangulo Mineiro.",
  url: "https://example.com", // TODO: domínio real
  ogImage: "https://example.com/og.jpg",
  nav: [
    { title: "Início", href: "/" },
    { title: "Serviços", href: "/servicos" },
    { title: "Sobre", href: "/sobre" },
    { title: "Contato", href: "/contato" },
  ],
  social: {},
} as const

export type SiteConfig = typeof siteConfig
