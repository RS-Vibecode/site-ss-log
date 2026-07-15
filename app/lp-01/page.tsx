import type { Metadata } from "next"
import Image from "next/image"
import "./lp.css"
import { LpLeadForm } from "@/components/site/lp-lead-form"
import { siteConfig } from "@/lib/site"
import { LICENCAS, OFERTA, PROVAS } from "@/lib/lp"

const WA = siteConfig.contact.whatsappUrl

/**
 * Página de Ads: NÃO é indexada e não aparece no sitemap nem em nenhum link do
 * site. O robots.txt segue liberando o crawl de propósito — se o Google não
 * puder ler a página, ele nunca lê o `noindex` e pode indexá-la assim mesmo.
 * Medir (GA4/Ads) e indexar são coisas diferentes: o tracking segue ativo.
 */
export const metadata: Metadata = {
  title: "S&S Log | Armazenagem licenciada para o agro em Uberaba/MG",
  description:
    "17.000 m² e 11.000 posições-palete no Triângulo Mineiro. Licenças IMA, IBAMA e ANVISA com número. Visita técnica de 1 hora e proposta em até 24 horas.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: "/lp-01" },
}

/** Dor → resposta. O lado esquerdo é a fala do prospect; o direito, a prova. */
const dores: { dor: string; resposta: string }[] = [
  {
    dor: "“O operador diz que atende minha carga, mas não tem a licença.”",
    resposta:
      "Licenças ANVISA, IBAMA, IMA e SEMAD vigentes — com número, disponíveis para conferência antes de você fechar.",
  },
  {
    dor: "“Ninguém sabe dizer onde meu palete está.”",
    resposta:
      "Gestão por WMS: controle por posição, lote e movimentação registrados. Relatório de estoque conforme o SLA combinado.",
  },
  {
    dor: "“O armazém é longe e o frete come a margem.”",
    resposta:
      "Uberaba, no coração do Triângulo Mineiro: MG, SP e GO dentro de um raio de 300 km a partir da doca.",
  },
  {
    dor: "“Não tenho indicador nenhum — só desculpa.”",
    resposta:
      "Operação gerida por KPI e SLA acordados em contrato, com auditoria do cliente permitida no armazém.",
  },
]

const passos: { n: string; titulo: string; texto: string }[] = [
  {
    n: "01",
    titulo: "Você agenda",
    texto:
      "Preencha o formulário ou chame no WhatsApp. Retorno em até 30 minutos no horário comercial.",
  },
  {
    n: "02",
    titulo: `Visita técnica de ${OFERTA.duracaoVisita}`,
    texto: `Com ${OFERTA.responsavel}, no armazém. Você vê as eclusas, o controle de acesso e o WMS rodando — não um PDF.`,
  },
  {
    n: "03",
    titulo: "Diagnóstico logístico",
    texto:
      "Mapeamos volume, fluxo, sazonalidade e exigências regulatórias da sua carga. Sem pacote fechado.",
  },
  {
    n: "04",
    titulo: `Proposta em ${OFERTA.slaProposta}`,
    texto:
      "Dimensionada para a sua operação, com escopo, indicadores e SLA definidos.",
  },
]

const faqs: { q: string; a: string }[] = [
  {
    q: "A visita técnica tem algum custo?",
    a: `Não. A visita é gratuita e sem compromisso: ${OFERTA.duracaoVisita} no armazém, em Uberaba, com ${OFERTA.responsavel}. Você conhece a estrutura e sai com o diagnóstico da sua operação.`,
  },
  {
    q: "Vocês têm licença para a minha carga?",
    a: "A S&S Log opera com ANVISA (AFE nº 2.11874-1) para cosméticos e higiene, IBAMA (CTF nº 8777018) para químicos e perigosos, IMA/MG (Reg. nº 11435473) para estabelecimento de agrotóxicos, SEMAD/MG (certificado nº 737) para transporte de perigosos e Alvará Sanitário nº 0017/2026 para armazéns gerais. Se a sua carga exige uma licença específica, traga a exigência na visita — a resposta é dada na hora, com o documento na mão.",
  },
  {
    q: "Em quanto tempo recebo a proposta?",
    a: `Em até ${OFERTA.slaProposta} depois da visita técnica. A proposta é dimensionada para o seu volume e fluxo — a S&S Log não trabalha com pacotes fechados.`,
  },
  {
    q: "Quais regiões vocês atendem?",
    a: "Sudeste, Centro-Oeste e Sul. Uberaba está no Triângulo Mineiro, o que coloca MG, SP e GO dentro de um raio de aproximadamente 300 km — com acesso direto aos demais estados das três regiões.",
  },
  {
    q: "Como acompanho meu estoque no dia a dia?",
    a: "Por WMS, com controle por posição e lote e todas as movimentações registradas. Os relatórios e a periodicidade são definidos no SLA de cada cliente.",
  },
  {
    q: "Posso auditar o armazém antes de fechar?",
    a: "Sim — e recebemos auditoria de cliente como parte do processo de homologação. Transparência aqui é diferencial, não incômodo.",
  },
]

export default function Lp01() {
  return (
    <>
      {/* ============== HEADER MÍNIMO (sem nav: LP não tem porta de saída) ============== */}
      <header className="lp-header">
        <div className="container lp-header-inner">
          <span className="lp-logo">
            S&amp;S<span>Log</span>
          </span>
          <a
            href={WA}
            className="lp-header-cta"
            data-wa
            data-cta-location="lp_header"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="lp-header-cta-label">Falar agora</span>
            <strong>{siteConfig.contact.whatsappDisplay}</strong>
          </a>
        </div>
      </header>

      <main className="lp">
        {/* ================= HERO ================= */}
        <section className="lp-hero" aria-labelledby="lp-hero-title">
          <div className="lp-hero-bg" aria-hidden="true">
            <Image
              src="/media/cta-aerea.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="container lp-hero-inner">
            <div className="lp-hero-copy">
              <span className="eyebrow">
                Operador logístico multicliente · Uberaba/MG
              </span>
              <h1 className="lp-hero-title" id="lp-hero-title">
                O operador logístico que o agro procura: licenciado, rastreável e
                a 300 km do seu cliente.
              </h1>
              <p className="lp-hero-deck">
                17.000 m² e 11.000 posições-palete no coração do Triângulo
                Mineiro. Licenças IMA, IBAMA e ANVISA{" "}
                <strong>com número — não com promessa</strong>. Visita técnica de{" "}
                {OFERTA.duracaoVisita} com {OFERTA.responsavel} e proposta em até{" "}
                {OFERTA.slaProposta}.
              </p>

              <ul className="lp-hero-bullets">
                <li>Defensivos, agroquímicos e fertilizantes em área segregada</li>
                <li>Controle de acesso com facial, tourniquete e guarita III-A</li>
                <li>Estrutura nova, sem passivo de operação antiga</li>
              </ul>

              <a
                href={WA}
                className="lp-hero-wa"
                data-wa
                data-cta-location="lp_hero"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prefere WhatsApp? Fale direto com a equipe →
              </a>
            </div>

            <div className="lp-hero-form">
              <LpLeadForm id="form" />
            </div>
          </div>
        </section>

        {/* ================= BARRA DE PROVAS ================= */}
        <section className="lp-provas" aria-label="A estrutura em números">
          <div className="container lp-provas-grid">
            {PROVAS.map((p) => (
              <div className="lp-prova" key={p.unidade}>
                <span className="lp-prova-valor">{p.valor}</span>
                <span className="lp-prova-unidade">{p.unidade}</span>
                <span className="lp-prova-nota">{p.nota}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= DOR → RESPOSTA ================= */}
        <section className="section lp-dores" aria-labelledby="lp-dores-title">
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">Por que trocar de operador</span>
              <h2 className="section-title" id="lp-dores-title">
                Você já ouviu essas quatro frases. Aqui elas não existem.
              </h2>
            </header>

            <div className="lp-dores-grid">
              {dores.map((d) => (
                <article className="lp-dor-card reveal" key={d.dor}>
                  <p className="lp-dor-fala">{d.dor}</p>
                  <p className="lp-dor-resposta">{d.resposta}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= LICENÇAS (prova no lugar de cases) ================= */}
        <section
          className="section section-dark lp-licencas"
          aria-labelledby="lp-licencas-title"
        >
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">Conformidade</span>
              <h2 className="section-title" id="lp-licencas-title">
                Licença não se promete. Se mostra o número.
              </h2>
              <p className="section-deck">
                Cinco registros vigentes, com órgão, número e escopo. Comprovantes
                disponíveis sob solicitação — e conferíveis na visita técnica,
                antes de qualquer contrato.
              </p>
            </header>

            <div className="lp-licencas-grid">
              {LICENCAS.map((l) => (
                <article className="lp-licenca-card reveal" key={l.numero}>
                  <span className="lp-licenca-orgao">{l.orgao}</span>
                  <strong className="lp-licenca-numero">{l.numero}</strong>
                  <span className="lp-licenca-escopo">{l.escopo}</span>
                </article>
              ))}
            </div>

            <div className="lp-licencas-cta">
              <a
                href={WA}
                className="btn btn-ghost btn-arrow"
                data-wa
                data-cta-location="lp_prova"
                target="_blank"
                rel="noopener noreferrer"
              >
                Minha carga exige outra licença — quero conferir
              </a>
            </div>
          </div>
        </section>

        {/* ================= ESTRUTURA ================= */}
        <section className="section lp-estrutura" aria-labelledby="lp-estrutura-title">
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">A estrutura</span>
              <h2 className="section-title" id="lp-estrutura-title">
                Sem truques. Sem montagem. Só operação.
              </h2>
              <p className="section-deck">
                Imagens reais do armazém em Uberaba. O que você vê aqui é o que
                você vai ver na visita.
              </p>
            </header>

            <div className="lp-estrutura-grid">
              <figure className="lp-estrutura-card reveal">
                <div className="lp-estrutura-media">
                  <video
                    className="card-loop"
                    data-loop-video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/media/cut-armazem-poster.jpg"
                    aria-label="Vista aérea do armazém da S&S Log"
                  >
                    <source src="/media/cut-armazem.mp4" type="video/mp4" />
                  </video>
                </div>
                <figcaption>
                  <strong>17.000 m² de área total</strong>
                  <span>11.000 posições-palete geridas por WMS</span>
                </figcaption>
              </figure>

              <figure className="lp-estrutura-card reveal">
                <div className="lp-estrutura-media">
                  <video
                    className="card-loop"
                    data-loop-video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/media/estrutura-eclusas.webp"
                    aria-label="Eclusas de entrada e saída do armazém"
                  >
                    <source src="/media/cut-eclusas.mp4" type="video/mp4" />
                  </video>
                </div>
                <figcaption>
                  <strong>2 eclusas independentes</strong>
                  <span>Entrada e saída sem cruzamento de fluxo</span>
                </figcaption>
              </figure>

              <figure className="lp-estrutura-card reveal">
                <div className="lp-estrutura-media">
                  <video
                    className="card-loop"
                    data-loop-video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/media/estrutura-portaria.webp"
                    aria-label="Controle de acesso com tourniquete e reconhecimento facial"
                  >
                    <source src="/media/cut-controle.mp4" type="video/mp4" />
                  </video>
                </div>
                <figcaption>
                  <strong>Controle de acesso III-A</strong>
                  <span>Reconhecimento facial, tourniquete e guarita blindada</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ================= COMO FUNCIONA ================= */}
        <section
          className="section section-soft lp-passos"
          aria-labelledby="lp-passos-title"
        >
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">Como funciona</span>
              <h2 className="section-title" id="lp-passos-title">
                Da sua mensagem à proposta: {OFERTA.slaPropostaCurto} depois da
                visita.
              </h2>
            </header>

            <ol className="lp-passos-grid">
              {passos.map((p) => (
                <li className="lp-passo reveal" key={p.n}>
                  <span className="lp-passo-n">{p.n}</span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= LOCALIZAÇÃO ================= */}
        <section className="section lp-local" aria-labelledby="lp-local-title">
          <div className="container lp-local-inner">
            <div className="lp-local-copy reveal">
              <span className="eyebrow">Localização</span>
              <h2 className="section-title" id="lp-local-title">
                Uberaba não é o meio do caminho. É o meio do mercado.
              </h2>
              <p className="section-deck">
                Do Distrito Industrial IV, um raio de aproximadamente 300 km
                alcança boa parte de <strong>Minas Gerais, São Paulo e Goiás</strong>
                . Menos quilômetro rodado por entrega significa frete menor e
                janela de reposição mais curta para o seu cliente.
              </p>
              <p className="lp-local-nota">
                Atendimento nas regiões Sudeste, Centro-Oeste e Sul.
              </p>
            </div>
            <div className="lp-local-media reveal">
              <Image
                src="/media/showcase-fachada.webp"
                alt="Fachada do armazém da S&S Log no Distrito Industrial IV, em Uberaba/MG"
                width={720}
                height={480}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="section section-soft lp-faq" aria-labelledby="lp-faq-title">
          <div className="container lp-faq-inner">
            <header className="section-head reveal">
              <span className="eyebrow">Dúvidas frequentes</span>
              <h2 className="section-title" id="lp-faq-title">
                O que perguntam antes de agendar.
              </h2>
            </header>

            <div className="lp-faq-list">
              {faqs.map((f) => (
                <details className="lp-faq-item reveal" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA FINAL ================= */}
        <section
          className="section section-dark lp-cta"
          id="agendar"
          aria-labelledby="lp-cta-title"
        >
          <div className="container lp-cta-inner">
            <div className="lp-cta-copy reveal">
              <span className="eyebrow">Visita técnica</span>
              <h2 className="section-title" id="lp-cta-title">
                {OFERTA.duracaoVisita} no armazém decide o que meses de proposta
                por e-mail não decidem.
              </h2>
              <p className="section-deck">
                Traga a exigência da sua carga. Saia com o diagnóstico da sua
                operação e a proposta em até {OFERTA.slaProposta}. Sem custo e sem
                compromisso.
              </p>
              <ul className="lp-cta-list">
                <li>Conferência das licenças com o documento na mão</li>
                <li>WMS rodando, não slide de apresentação</li>
                <li>Dimensionamento do seu volume e fluxo reais</li>
              </ul>
              <a
                href={WA}
                className="lp-cta-wa"
                data-wa
                data-cta-location="lp_cta_final"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ou fale agora no WhatsApp: {siteConfig.contact.whatsappDisplay} →
              </a>
            </div>

            <div className="lp-cta-form">
              <LpLeadForm id="form-final" />
            </div>
          </div>
        </section>
      </main>

      {/* ================= RODAPÉ MÍNIMO ================= */}
      <footer className="lp-footer">
        <div className="container lp-footer-inner">
          <p>
            <strong>{siteConfig.legalName}</strong> · CNPJ {siteConfig.cnpj}
            <br />
            {siteConfig.address.display} · {siteConfig.contact.email}
          </p>
          <p className="lp-footer-links">
            <a href="/politica-privacidade" target="_blank" rel="noopener noreferrer">
              Política de Privacidade
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}
