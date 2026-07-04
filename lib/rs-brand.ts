/**
 * rs-brand.ts — identidade institucional da RS Soluções Digitais.
 * Vendorizado em cada projeto como `lib/rs-brand.ts` (auto-contido).
 * Fonte: brand/rs/footer.json no repositório-fábrica `sites-rs`.
 *
 * Use para o rodapé com marca RS (sites próprios) e para o selo "Desenvolvido
 * por RS" em sites de cliente. NÃO confunda com a marca do cliente (siteConfig).
 */
export const rsBrand = {
  legalName: "RS Soluções Digitais",
  slogan: "Estruture. Venda. Cresça.",
  tagline: "+15 anos estruturando e-commerces com método.",
  cnpj: "07.344.521/0001-05",
  address: {
    full: "R. Onofre da Cunha Resende, 505 - Vila Maria Helena, Uberaba - MG, 38020-130",
  },
  contact: {
    email: "contato@rssolucoesdigitais.com.br",
    whatsapp: "+55 34 3333-2525",
    whatsappUrl: "https://wa.me/553433332525",
    site: "https://rssolucoesdigitais.com.br",
  },
  social: {
    instagram: "https://instagram.com/rs.solucoesdigitais",
    linkedin: "", // TODO: confirmar URL da página
  },
  /** Logos vendorizados em /public/brand/rs/ (ver scripts/new-project.mjs). */
  logo: {
    completa: "/brand/rs/logo-completa.png", // lockup full color — fundos claros
    branca: "/brand/rs/logo-branca.png",     // símbolo branco — fundos escuros
    rs: "/brand/rs/logo-rs.png",             // símbolo bicolor — fundos coloridos/escuros
    icone: "/brand/rs/logo-icone.png",       // badge navy — favicon/app icon/avatar
  },
  developedBy: {
    label: "Desenvolvido por RS Soluções Digitais",
    url: "https://rssolucoesdigitais.com.br",
  },
} as const

export type RsBrand = typeof rsBrand
