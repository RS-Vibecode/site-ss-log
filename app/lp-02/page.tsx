import type { Metadata } from "next"
import Image from "next/image"
import "./lp.css"
import { LpLeadForm, type LpLeadFormCopy } from "@/components/site/lp-lead-form"
import { LpVideo } from "@/components/site/lp-video"
import { DevelopedByRS } from "@/components/site/developed-by-rs"
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
  title: "S&S Log | Armazenagem e operação logística para empresas em Uberaba/MG",
  description:
    "Armazenagem terceirizada, transporte e distribuição para empresas em Uberaba e no Triângulo Mineiro. Informe sua demanda e solicite uma proposta.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: "/lp-02" },
}

/** Textos do formulário desta LP (a estrutura dos campos é a mesma da /lp-01). */
const FORM_COPY: Partial<LpLeadFormCopy> = {
  titulo: "Solicite uma proposta",
  subtitulo: "Informe sua demanda. A equipe comercial retorna o contato.",
  labelSegmento: "Tipo de produto ou carga",
  labelVolume: "Volume aproximado",
  erroSegmento: "Selecione o tipo de produto ou carga.",
  erroVolume: "Selecione o volume aproximado.",
  botao: "Solicitar uma proposta",
  nota: "Sem compromisso. A equipe comercial entra em contato.",
  okTexto:
    "Abrimos o WhatsApp com suas informações para você enviar. Se a janela não abriu, a equipe comercial retorna pelo telefone ou e-mail informado.",
}

/** Situação de busca → resposta comercial. */
const dores: { dor: string; resposta: string }[] = [
  {
    dor: "“Meu estoque cresceu e preciso de mais espaço.”",
    resposta: "Avalie a terceirização da armazenagem da sua empresa.",
  },
  {
    dor: "“Quero terceirizar minha operação logística.”",
    resposta:
      "Conte com uma operação voltada às necessidades de armazenagem e movimentação da sua empresa.",
  },
  {
    dor: "“Preciso armazenar uma carga específica.”",
    resposta:
      "Consulte a possibilidade de operação para cosméticos, químicos e agroquímicos.",
  },
  {
    dor: "“Preciso transportar ou distribuir meus produtos.”",
    resposta: "Consulte transporte, distribuição, carga fracionada e lotação.",
  },
]

const passos: { n: string; titulo: string; texto: string }[] = [
  {
    n: "01",
    titulo: "Conte sua necessidade",
    texto: "Informe o tipo de produto, volume e necessidade da sua operação.",
  },
  {
    n: "02",
    titulo: "Avaliamos sua demanda",
    texto:
      "Nossa equipe analisa as características da armazenagem, transporte ou distribuição.",
  },
  {
    n: "03",
    titulo: "Planejamos a operação",
    texto:
      "Alinhamos os requisitos necessários para atender à demanda da sua empresa.",
  },
  {
    n: "04",
    titulo: "Receba sua proposta",
    texto:
      "Após a avaliação, nossa equipe comercial apresenta a proposta para sua operação.",
  },
]

const faqs: { q: string; a: string }[] = [
  {
    q: "A S&S Log realiza armazenagem terceirizada?",
    a: "Sim. A S&S Log é um operador logístico multicliente em Uberaba/MG, com gestão por WMS e controle por posição e lote. Informe a demanda da sua empresa e a equipe avalia a operação.",
  },
  {
    q: "Que tipos de produtos podem ser armazenados?",
    a: "A operação atende segmentos como cosméticos, higiene e beleza, defensivos agrícolas, agroquímicos, fertilizantes, produtos de limpeza, têxtil e vestuário, autopeças, produtos pet e produtos industriais. Cargas com requisitos específicos são avaliadas caso a caso.",
  },
  {
    q: "A S&S Log trabalha com armazenagem de cosméticos?",
    a: "Sim. Há operação para cosméticos e produtos de higiene e beleza, e a S&S Log conta com ANVISA (AFE nº 2.11874-1) para cosméticos e produtos de higiene. Informe o volume e o tipo de produto para avaliarmos sua demanda.",
  },
  {
    q: "É possível avaliar a armazenagem de químicos e agroquímicos?",
    a: "Sim, a operação é avaliada conforme o produto e os requisitos da carga. A S&S Log conta com IBAMA (CTF nº 8777018) para produtos químicos e perigosos e IMA/MG (Reg. nº 11435473) para estabelecimento de agrotóxicos. Informe o produto na solicitação para a equipe analisar.",
  },
  {
    q: "A S&S Log realiza transporte de cargas?",
    a: "Sim. A S&S Log atua com transporte e distribuição de mercadorias, conforme o atendimento da rota, e conta com SEMAD/MG (certificado nº 737) para transporte de produtos perigosos. Informe origem, destino e tipo de carga para consulta.",
  },
  {
    q: "Vocês trabalham com carga fracionada e carga lotação?",
    a: "Consulte a disponibilidade para carga fracionada, carga lotação e transferências entre centros de distribuição, conforme o atendimento da rota. Informe origem, destino e volume para a equipe avaliar.",
  },
  {
    q: "É possível agendar uma visita ao armazém?",
    a: `Sim. A visita técnica é gratuita e sem compromisso: ${OFERTA.duracaoVisita} no armazém, em Uberaba, com ${OFERTA.responsavel}. Você conhece a estrutura e entende como a operação da sua empresa pode ser avaliada.`,
  },
  {
    q: "Como solicitar uma proposta?",
    a: "Preencha o formulário ou chame no WhatsApp informando o tipo de produto, o volume e o serviço que sua empresa procura. A equipe avalia a demanda e a equipe comercial apresenta a proposta.",
  },
]

export default function Lp02() {
  return (
    <>
      {/* ============== HEADER MÍNIMO (sem nav: LP não tem porta de saída) ============== */}
      <header className="lp-header">
        <div className="container lp-header-inner">
          {/* Mesmo ativo de marca do site. Não é link: a LP não tem saída. */}
          <Image
            src="/ss-log-horizontal.png"
            alt="S&S Log"
            width={236}
            height={40}
            priority
            className="lp-logo"
          />
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
                Armazenagem e Operação Logística para Empresas em Uberaba
              </h1>
              <p className="lp-hero-deck">
                Terceirize sua armazenagem, transporte e distribuição com uma
                operação logística voltada às necessidades da sua empresa.
              </p>

              <ul className="lp-checks">
                <li>Armazenagem terceirizada para empresas, com gestão por WMS</li>
                <li>Operação para cosméticos, higiene e beleza</li>
                <li>Transporte e distribuição de mercadorias</li>
              </ul>

              <a
                href={WA}
                className="lp-hero-wa"
                data-wa
                data-cta-location="lp_hero"
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com o comercial →
              </a>
            </div>

            <div className="lp-hero-form">
              <LpLeadForm id="form" copy={FORM_COPY} />
            </div>
          </div>
        </section>

        {/* ================= FAIXA DE NÚMEROS ================= */}
        <section className="lp-provas" aria-label="A estrutura em números">
          <div className="container">
            <dl className="lp-provas-grid">
              {PROVAS.map((p) => (
                <div className="lp-prova" key={p.unidade}>
                  <dd className="lp-prova-valor">{p.valor}</dd>
                  <dt className="lp-prova-unidade">{p.unidade}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ================= DOR → RESPOSTA (cards 2x2) ================= */}
        <section className="section lp-dores" aria-labelledby="lp-dores-title">
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">Uma operação logística para diferentes demandas</span>
              <h2 className="section-title" id="lp-dores-title">
                Qual é a necessidade da sua empresa?
              </h2>
            </header>

            <div className="lp-dores-grid">
              {dores.map((d) => (
                <article className="lp-dor reveal" key={d.dor}>
                  <p className="lp-dor-fala">{d.dor}</p>
                  <p className="lp-dor-resposta">{d.resposta}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ESTRUTURA (galeria editorial) ================= */}
        <section
          className="section section-soft lp-estrutura"
          aria-labelledby="lp-estrutura-title"
        >
          <div className="container">
            <header className="section-head lp-split-head reveal">
              <div>
                <span className="eyebrow">A estrutura</span>
                <h2 className="section-title" id="lp-estrutura-title">
                  Estrutura para a operação da sua empresa
                </h2>
              </div>
              <p className="section-deck">
                Imagens reais do armazém em Uberaba. O que você vê aqui é o que
                você vai ver na visita.
              </p>
            </header>

            <div className="lp-galeria">
              <figure className="lp-foto lp-foto-grande reveal">
                <Image
                  src="/media/estrutura-armazem.webp"
                  alt="Interior do armazém da S&S Log com porta-paletes"
                  fill
                  sizes="(max-width: 900px) 100vw, 60vw"
                />
                <figcaption>
                  <strong>Armazenagem para empresas</strong>
                  <span>Para empresas que precisam terceirizar estoques ou ampliar sua capacidade de armazenagem.</span>
                </figcaption>
              </figure>

              <figure className="lp-foto reveal">
                <Image
                  src="/media/estrutura-eclusas.webp"
                  alt="Eclusas de entrada e saída do armazém"
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
                <figcaption>
                  <strong>Transporte e distribuição</strong>
                  <span>Carga fracionada, lotação e transferências entre centros de distribuição, conforme a rota.</span>
                </figcaption>
              </figure>

              <figure className="lp-foto reveal">
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
                <figcaption>
                  <strong>Controle de acesso</strong>
                  <span>Reconhecimento facial, tourniquete e guarita blindada na entrada da operação.</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ================= LICENÇAS ================= */}
        <section
          className="section section-dark lp-licencas"
          aria-labelledby="lp-licencas-title"
        >
          <div className="container">
            <header className="section-head lp-split-head reveal">
              <div>
                <span className="eyebrow">Licenças e certificações</span>
                <h2 className="section-title" id="lp-licencas-title">
                  Licença não se promete. Se mostra o número.
                </h2>
              </div>
              <p className="section-deck">
                Cinco registros vigentes, com órgão, número e escopo. Comprovantes
                disponíveis sob solicitação — e conferíveis na visita técnica,
                antes de qualquer contrato.
              </p>
            </header>

            <ul className="lp-licencas-grid">
              {LICENCAS.map((l) => (
                <li className="lp-licenca reveal" key={l.numero}>
                  <span className="lp-licenca-orgao">{l.orgao}</span>
                  <strong className="lp-licenca-numero">{l.numero}</strong>
                  <span className="lp-licenca-escopo">{l.escopo}</span>
                </li>
              ))}
            </ul>

            <div className="lp-licencas-cta">
              <a
                href={WA}
                className="btn btn-primary btn-arrow"
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

        {/* ================= VÍDEO (60% vídeo / 40% texto) ================= */}
        <section className="section lp-video-sec" aria-labelledby="lp-video-title">
          <div className="container lp-video-inner">
            <div className="lp-video-copy reveal">
              <span className="eyebrow">Por dentro da operação</span>
              <h2 className="section-title" id="lp-video-title">
                Conheça a S&S Log por dentro
              </h2>
              <p className="section-deck">
                Conheça nossa estrutura em Uberaba e entenda como podemos avaliar
                a operação logística da sua empresa.
              </p>
            </div>
            <div className="lp-video-media reveal">
              <span className="lp-video-tag">Visita à operação</span>
              <LpVideo />
            </div>
          </div>
        </section>

        {/* ================= COMO FUNCIONA (linha do tempo) ================= */}
        <section
          className="section section-soft lp-passos"
          aria-labelledby="lp-passos-title"
        >
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">Como funciona</span>
              <h2 className="section-title" id="lp-passos-title">
                Da sua mensagem à proposta comercial.
              </h2>
            </header>

            <ol className="lp-timeline">
              {passos.map((p) => (
                <li className="lp-passo reveal" key={p.n}>
                  <span className="lp-passo-n" aria-hidden="true">
                    {p.n}
                  </span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= LOCALIZAÇÃO (editorial) ================= */}
        <section className="section lp-local" aria-labelledby="lp-local-title">
          <div className="container lp-local-inner">
            <div className="lp-local-media reveal">
              <Image
                src="/media/showcase-predio.webp"
                alt="Vista aérea do armazém da S&S Log no Distrito Industrial IV, em Uberaba/MG"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
            <div className="lp-local-copy reveal">
              <span className="eyebrow">Localização</span>
              <h2 className="section-title" id="lp-local-title">
                Operação logística em Uberaba
              </h2>
              <p className="section-deck">
                Uma estrutura para empresas que buscam armazenagem e operação
                logística em Uberaba e no Triângulo Mineiro.
              </p>

              <dl className="lp-local-fatos">
                <div>
                  <dt>Uberaba — MG</dt>
                  <dd>Distrito Industrial IV</dd>
                </div>
                <div>
                  <dt>Triângulo Mineiro</dt>
                  <dd>Armazenagem e operação logística</dd>
                </div>
                <div>
                  <dt>Localização estratégica</dt>
                  <dd>Transporte e distribuição, conforme a rota</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* ================= FAQ (accordion) ================= */}
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
          className="section lp-cta"
          id="agendar"
          aria-labelledby="lp-cta-title"
        >
          <div className="lp-cta-bg" aria-hidden="true">
            <Image
              src="/media/showcase-fachada.webp"
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="container lp-cta-inner">
            <div className="lp-cta-copy reveal">
              <span className="eyebrow">Solicite uma proposta</span>
              <h2 className="section-title" id="lp-cta-title">
                Conte sua necessidade. Nossa equipe avalia a operação.
              </h2>
              <p className="section-deck">
                Informe o tipo de produto, volume e serviço que sua empresa
                procura. A equipe da S&S Log entra em contato para entender sua
                demanda.
              </p>
              <ul className="lp-checks">
                <li>Sem custo</li>
                <li>Sem compromisso</li>
                <li>Avaliação da sua operação</li>
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
              <LpLeadForm
                id="form-final"
                copy={{ ...FORM_COPY, botao: "Solicitar minha proposta" }}
              />
            </div>
          </div>
        </section>
      </main>

      {/* ================= RODAPÉ MÍNIMO ================= */}
      <footer className="lp-footer">
        <div className="container lp-footer-inner">
          <div className="lp-footer-brand">
            <Image
              src="/ss-log-horizontal.png"
              alt="S&S Log"
              width={212}
              height={36}
              className="lp-footer-logo"
            />
            <p>
              <strong>{siteConfig.legalName}</strong> · CNPJ {siteConfig.cnpj}
              <br />
              {siteConfig.address.display} · {siteConfig.contact.email}
            </p>
          </div>

          <div className="lp-footer-legal">
            <a
              className="lp-footer-link"
              href="/politica-privacidade"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidade
            </a>
            <a className="lp-footer-link" href="#" data-cookie-prefs>
              Preferências de cookies
            </a>
            {/* Branding RS (cliente externo — regra §7 do squad) */}
            <DevelopedByRS />
          </div>
        </div>
      </footer>
    </>
  )
}
