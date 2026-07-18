/**
 * lp.ts — configuração da LP de captação (/lp-01).
 * Página de Ads: noindex, sem link no site, sem saídas além do CTA.
 * Os segmentos espelham os 12 já publicados na home, reordenados agro-first
 * para acompanhar o foco de mídia (agro + indústria).
 */

/**
 * Opções do select "Segmento" — os 12 da home + Sementes e Biológicos + "Outro".
 * Sementes e biológicos entraram porque são foco da mídia paga: sem eles na lista,
 * esse público cairia em "Outro" e a qualificação do lead se perderia.
 */
export const SEGMENTOS = [
  "Sementes",
  "Biológicos (bioinsumos)",
  "Defensivos agrícolas",
  "Agroquímicos",
  "Fertilizantes",
  "Domissanitários",
  "Cosméticos",
  "Higiene e beleza",
  "Produtos de limpeza",
  "Têxtil e vestuário",
  "Autopeças",
  "Produtos pet",
  "Ferramentas manuais e elétricas",
  "Produtos industriais",
  "Outro",
] as const

/**
 * Opções do select "Tipo/volume de carga". A última opção é proposital:
 * quem não sabe dimensionar não abandona o formulário — vira lead de diagnóstico.
 */
export const VOLUMES = [
  "Até 100 posições-palete",
  "100 a 500 posições-palete",
  "500 a 2.000 posições-palete",
  "Mais de 2.000 posições-palete",
  "Ainda não sei — preciso dimensionar",
] as const

export type Segmento = (typeof SEGMENTOS)[number]
export type Volume = (typeof VOLUMES)[number]

/** Números da oferta — centralizados para copy e schema não divergirem. */
export const OFERTA = {
  duracaoVisita: "1 hora",
  responsavel: "André Carvalho",
  slaProposta: "24 horas",
  slaPropostaCurto: "24h",
  /** Onboarding: da assinatura ao início da operação (confirmado pelo cliente). */
  onboarding: "72 horas úteis",
} as const

/** Provas estruturais usadas no lugar de cases (operação recém-inaugurada). */
export const PROVAS = [
  { valor: "17.000", unidade: "m² de área total", nota: "Distrito Industrial IV, Uberaba/MG" },
  { valor: "11.000", unidade: "posições-palete", nota: "Gestão por WMS, controle por posição e lote" },
  { valor: "2", unidade: "eclusas independentes", nota: "Fluxos de entrada e saída separados" },
  { valor: "III-A", unidade: "blindagem na guarita", nota: "Reconhecimento facial e tourniquete" },
] as const

/**
 * Licenças com número — o ativo de prova mais forte da S&S Log hoje e o que
 * responde à dor "não acho operador confiável e estruturado".
 */
export const LICENCAS = [
  {
    orgao: "ANVISA",
    numero: "AFE nº 2.11874-1",
    escopo: "Cosméticos e produtos de higiene",
  },
  {
    orgao: "IBAMA",
    numero: "CTF nº 8777018",
    escopo: "Produtos químicos e perigosos",
  },
  {
    orgao: "IMA/MG",
    numero: "Reg. nº 11435473",
    escopo: "Estabelecimento de agrotóxicos",
  },
  {
    orgao: "SEMAD/MG",
    numero: "Certificado nº 737",
    escopo: "Transporte de produtos perigosos",
  },
  {
    orgao: "Prefeitura de Uberaba",
    numero: "Alvará Sanitário nº 0017/2026",
    escopo: "Armazéns gerais",
  },
] as const
