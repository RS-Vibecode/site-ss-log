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
  alternates: { canonical: "/lp-03" },
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


export default function Lp03() {
  return (
    <div className="l3">
      {/* ============== HEADER (claro, com CTA para o formulário) ============== */}
      <header className="l3-header">
        <div className="l3-wrap l3-header-inner">
          <Image
            src="/ss-log-horizontal.png"
            alt="S&S Log"
            width={236}
            height={40}
            priority
            className="l3-logo"
          />
          <div className="l3-header-actions">
            <a
              href={WA}
              className="l3-header-tel"
              data-wa
              data-cta-location="lp_header"
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.contact.whatsappDisplay}
            </a>
            <a href="#proposta" className="btn btn-primary l3-header-btn">
              Solicitar uma proposta
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ================= HERO ================= */}
        <section className="l3-hero" aria-labelledby="l3-hero-title">
          <div className="l3-wrap l3-hero-inner">
            <div className="l3-hero-copy">
              <span className="l3-eyebrow">
                Operador logístico multicliente · Uberaba/MG
              </span>
              <h1 className="l3-hero-title" id="l3-hero-title">
                Armazenagem e Operação Logística para Empresas em Uberaba
              </h1>
              <p className="l3-hero-deck">
                Terceirize sua armazenagem, transporte e distribuição com uma
                operação logística voltada às necessidades da sua empresa.
              </p>

              <ul className="l3-list">
                <li>Armazenagem terceirizada para empresas, com gestão por WMS</li>
                <li>Operação para cosméticos, higiene e beleza</li>
                <li>Transporte e distribuição de mercadorias</li>
              </ul>

              <div className="l3-hero-cta">
                <a href="#proposta" className="btn btn-primary btn-lg">
                  Solicitar uma proposta
                </a>
                <a
                  href={WA}
                  className="l3-link"
                  data-wa
                  data-cta-location="lp_hero"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar com o comercial →
                </a>
              </div>
            </div>

            <div className="l3-hero-media">
              <Image
                src="/media/estrutura-armazem.webp"
                alt="Interior do armazém da S&S Log com porta-paletes"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 46vw"
              />
            </div>
          </div>
        </section>

        {/* ================= NÚMEROS ================= */}
        <section className="l3-numeros" aria-label="A estrutura em números">
          <div className="l3-wrap">
            <dl className="l3-numeros-grid">
              {PROVAS.map((p) => (
                <div className="l3-numero" key={p.unidade}>
                  <dd>{p.valor}</dd>
                  <dt>{p.unidade}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ================= DEMANDAS (lista numerada) ================= */}
        <section className="l3-section" aria-labelledby="l3-demandas-title">
          <div className="l3-wrap">
            <header className="l3-head">
              <span className="l3-eyebrow">
                Uma operação logística para diferentes demandas
              </span>
              <h2 className="l3-title" id="l3-demandas-title">
                Qual é a necessidade da sua empresa?
              </h2>
            </header>

            <ol className="l3-demandas">
              {dores.map((d, i) => (
                <li className="l3-demanda l3-in" key={d.dor}>
                  <span className="l3-demanda-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="l3-demanda-fala">{d.dor}</p>
                  <p className="l3-demanda-resposta">{d.resposta}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= ESTRUTURA (blocos alternados foto + texto) ================= */}
        <section
          className="l3-section l3-soft"
          aria-labelledby="l3-estrutura-title"
        >
          <div className="l3-wrap">
            <header className="l3-head">
              <span className="l3-eyebrow">A estrutura</span>
              <h2 className="l3-title" id="l3-estrutura-title">
                Estrutura para a operação da sua empresa
              </h2>
              <p className="l3-deck">
                Imagens reais do armazém em Uberaba. O que você vê aqui é o que
                você vai ver na visita.
              </p>
            </header>

            <div className="l3-blocos">
              <article className="l3-bloco l3-in">
                <div className="l3-bloco-media">
                  <Image
                    src="/media/estrutura-armazem.webp"
                    alt="Interior do armazém da S&S Log com porta-paletes"
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                  />
                </div>
                <div className="l3-bloco-texto">
                  <span className="l3-bloco-n">01</span>
                  <h3>Armazenagem para empresas</h3>
                  <p>
                    Para empresas que precisam terceirizar estoques ou ampliar
                    sua capacidade de armazenagem.
                  </p>
                </div>
              </article>

              <article className="l3-bloco l3-in">
                <div className="l3-bloco-media">
                  <Image
                    src="/media/estrutura-eclusas.webp"
                    alt="Eclusas de entrada e saída do armazém"
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                  />
                </div>
                <div className="l3-bloco-texto">
                  <span className="l3-bloco-n">02</span>
                  <h3>Transporte e distribuição</h3>
                  <p>
                    Carga fracionada, lotação e transferências entre centros de
                    distribuição, conforme a rota.
                  </p>
                </div>
              </article>

              <article className="l3-bloco l3-in">
                <div className="l3-bloco-media">
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
                <div className="l3-bloco-texto">
                  <span className="l3-bloco-n">03</span>
                  <h3>Controle de acesso</h3>
                  <p>
                    Reconhecimento facial, tourniquete e guarita blindada na
                    entrada da operação.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ================= LICENÇAS (título à esquerda, lista à direita) ================= */}
        <section className="l3-section" aria-labelledby="l3-licencas-title">
          <div className="l3-wrap l3-licencas">
            <header className="l3-licencas-head">
              <span className="l3-eyebrow">Licenças e certificações</span>
              <h2 className="l3-title" id="l3-licencas-title">
                Licença não se promete. Se mostra o número.
              </h2>
              <p className="l3-deck">
                Cinco registros vigentes, com órgão, número e escopo.
                Comprovantes disponíveis sob solicitação — e conferíveis na
                visita técnica, antes de qualquer contrato.
              </p>
              <a
                href={WA}
                className="l3-link"
                data-wa
                data-cta-location="lp_prova"
                target="_blank"
                rel="noopener noreferrer"
              >
                Minha carga exige outra licença — quero conferir →
              </a>
            </header>

            <ul className="l3-licencas-lista">
              {LICENCAS.map((l) => (
                <li className="l3-licenca l3-in" key={l.numero}>
                  <span className="l3-licenca-orgao">{l.orgao}</span>
                  <span className="l3-licenca-numero">{l.numero}</span>
                  <span className="l3-licenca-escopo">{l.escopo}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= VÍDEO (centralizado) ================= */}
        <section
          className="l3-section l3-soft l3-video-sec"
          aria-labelledby="l3-video-title"
        >
          <div className="l3-wrap l3-video">
            <header className="l3-head l3-head-center">
              <span className="l3-eyebrow">Por dentro da operação</span>
              <h2 className="l3-title" id="l3-video-title">
                Conheça a S&S Log por dentro
              </h2>
              <p className="l3-deck">
                Conheça nossa estrutura em Uberaba e entenda como podemos avaliar
                a operação logística da sua empresa.
              </p>
            </header>
            <div className="l3-video-media l3-in">
              <LpVideo />
            </div>
          </div>
        </section>

        {/* ================= COMO FUNCIONA ================= */}
        <section className="l3-section" aria-labelledby="l3-passos-title">
          <div className="l3-wrap">
            <header className="l3-head">
              <span className="l3-eyebrow">Como funciona</span>
              <h2 className="l3-title" id="l3-passos-title">
                Da sua mensagem à proposta comercial.
              </h2>
            </header>

            <ol className="l3-passos">
              {passos.map((p) => (
                <li className="l3-passo l3-in" key={p.n}>
                  <span className="l3-passo-n">{p.n}</span>
                  <h3>{p.titulo}</h3>
                  <p>{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= LOCALIZAÇÃO (faixa azul) ================= */}
        <section className="l3-local" aria-labelledby="l3-local-title">
          <div className="l3-local-media">
            <Image
              src="/media/showcase-predio.webp"
              alt="Vista aérea do armazém da S&S Log no Distrito Industrial IV, em Uberaba/MG"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className="l3-local-copy">
            <div className="l3-local-copy-inner">
              <span className="l3-eyebrow">Localização</span>
              <h2 className="l3-title" id="l3-local-title">
                Operação logística em Uberaba
              </h2>
              <p className="l3-deck">
                Uma estrutura para empresas que buscam armazenagem e operação
                logística em Uberaba e no Triângulo Mineiro.
              </p>
              <dl className="l3-fatos">
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

        {/* ================= FAQ (título fixo à esquerda, accordion à direita) ================= */}
        <section className="l3-section" aria-labelledby="l3-faq-title">
          <div className="l3-wrap l3-faq">
            <header className="l3-faq-head">
              <span className="l3-eyebrow">Dúvidas frequentes</span>
              <h2 className="l3-title" id="l3-faq-title">
                O que perguntam antes de agendar.
              </h2>
            </header>

            <div className="l3-faq-list">
              {faqs.map((f) => (
                <details className="l3-faq-item" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PROPOSTA (CTA + formulário) ================= */}
        <section
          className="l3-section l3-soft l3-proposta"
          id="proposta"
          aria-labelledby="l3-cta-title"
        >
          <div className="l3-wrap l3-proposta-inner">
            <div className="l3-proposta-copy">
              <span className="l3-eyebrow">Solicite uma proposta</span>
              <h2 className="l3-title" id="l3-cta-title">
                Conte sua necessidade. Nossa equipe avalia a operação.
              </h2>
              <p className="l3-deck">
                Informe o tipo de produto, volume e serviço que sua empresa
                procura. A equipe da S&S Log entra em contato para entender sua
                demanda.
              </p>
              <ul className="l3-list">
                <li>Sem custo</li>
                <li>Sem compromisso</li>
                <li>Avaliação da sua operação</li>
              </ul>
              <a
                href={WA}
                className="l3-link"
                data-wa
                data-cta-location="lp_cta_final"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ou fale agora no WhatsApp: {siteConfig.contact.whatsappDisplay} →
              </a>
            </div>

            <div className="l3-proposta-form">
              <LpLeadForm
                id="form-final"
                copy={{ ...FORM_COPY, botao: "Solicitar minha proposta" }}
              />
            </div>
          </div>
        </section>
      </main>

      {/* ================= RODAPÉ ================= */}
      <footer className="l3-footer">
        <div className="l3-wrap l3-footer-inner">
          <div className="l3-footer-brand">
            <Image
              src="/ss-log-horizontal.png"
              alt="S&S Log"
              width={212}
              height={36}
              className="l3-footer-logo"
            />
            <p>
              <strong>{siteConfig.legalName}</strong> · CNPJ {siteConfig.cnpj}
              <br />
              {siteConfig.address.display} · {siteConfig.contact.email}
            </p>
          </div>

          <div className="l3-footer-legal">
            <a
              className="l3-footer-link"
              href="/politica-privacidade"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidade
            </a>
            <a className="l3-footer-link" href="#" data-cookie-prefs>
              Preferências de cookies
            </a>
            {/* Branding RS (cliente externo — regra §7 do squad) */}
            <DevelopedByRS />
          </div>
        </div>
      </footer>
    </div>
  )
}
