import Image from "next/image"
import { Navbar } from "@/components/site/navbar"
import { SiteFooter } from "@/components/site/site-footer"
import { LeadForm } from "@/components/site/lead-form"
import { siteConfig } from "@/lib/site"

const WA = siteConfig.contact.whatsappUrl

/** FAQ — contempla operações reguladas E não reguladas. aHtml = visível; aSchema = JSON-LD. */
const faqs: { q: string; aHtml: string; aSchema: string }[] = [
  {
    q: "A S&S Log só atende cargas reguladas?",
    aHtml:
      "Não. A S&S Log é um <strong>operador multicliente</strong>: atende têxtil e vestuário, autopeças, produtos pet, produtos industriais, ferramentas, produtos de limpeza, higiene e beleza — e também cargas reguladas, com as licenças necessárias. A estrutura é definida conforme a particularidade de cada operação.",
    aSchema:
      "Não. A S&S Log é um operador multicliente: atende têxtil e vestuário, autopeças, produtos pet, produtos industriais, ferramentas, produtos de limpeza, higiene e beleza e também cargas reguladas, com as licenças necessárias.",
  },
  {
    q: "A S&S Log tem licença ANVISA para armazenar cosméticos?",
    aHtml:
      "Sim. Licença ANVISA vigente para cosméticos e produtos de higiene — <strong>AFE nº 2.11874-1</strong>. Comprovante disponível sob solicitação.",
    aSchema:
      "Sim. A S&S Log tem licença ANVISA vigente para cosméticos e produtos de higiene (AFE nº 2.11874-1), com comprovante disponível sob solicitação.",
  },
  {
    q: "Como é feita a rastreabilidade da carga?",
    aHtml:
      "Gestão por WMS, com controle por posição, lote e movimentação registrados. Relatórios de estoque disponíveis ao cliente conforme SLA combinado.",
    aSchema:
      "Gestão por WMS, com controle por posição, lote e movimentação registrados. Relatórios de estoque disponíveis ao cliente conforme SLA combinado.",
  },
  {
    q: "Vocês atendem carga fracionada ou só lotação?",
    aHtml:
      "Os dois modelos. Distribuição lotação para cargas completas e distribuição fracionada para consolidação de volumes menores com múltiplos destinos.",
    aSchema:
      "Os dois modelos. Distribuição lotação para cargas completas e distribuição fracionada para consolidação de volumes menores com múltiplos destinos.",
  },
  {
    q: "Quais regiões a S&S Log atende?",
    aHtml:
      "Atendemos as regiões <strong>Sudeste, Centro-Oeste e Sul</strong>. Uberaba fica no Triângulo Mineiro, com acesso direto a SP, MG, GO, MT, RS, SC, PR e demais estados das três regiões.",
    aSchema:
      "Atendemos as regiões Sudeste, Centro-Oeste e Sul. Uberaba fica no Triângulo Mineiro, com acesso direto a SP, MG, GO, MT, RS, SC, PR e demais estados das três regiões.",
  },
  {
    q: "A S&S Log aceita auditoria do cliente no armazém?",
    aHtml:
      "Sim. A S&S Log permite e recebe auditorias dos clientes no armazém — parte do processo de homologação e um diferencial de transparência, segurança e conformidade. Agende pelo WhatsApp ou e-mail.",
    aSchema:
      "Sim. A S&S Log permite e recebe auditorias dos clientes no armazém, como parte do processo de homologação e diferencial de transparência, segurança e conformidade.",
  },
  {
    q: "Como é a segurança física do armazém?",
    aHtml:
      "Controle de acesso com reconhecimento facial e tourniquete, 2 eclusas independentes para entrada e saída, guarita com blindagem nível III-A e registro de entrada e saída. Ninguém entra sem registro.",
    aSchema:
      "Controle de acesso com reconhecimento facial e tourniquete, 2 eclusas independentes para entrada e saída, guarita com blindagem nível III-A e registro de entrada e saída.",
  },
  {
    q: "A operação é desenhada sob medida?",
    aHtml:
      "Sim. A S&S Log monta a estrutura conforme o tipo de carga, volume, fluxo e exigências operacionais e regulatórias do cliente. <strong>Não trabalhamos com pacotes fechados</strong> — cada operação é estruturada de acordo com a necessidade.",
    aSchema:
      "Sim. A S&S Log monta a estrutura conforme o tipo de carga, volume, fluxo e exigências operacionais e regulatórias do cliente. Não trabalha com pacotes fechados; cada operação é estruturada de acordo com a necessidade.",
  },
]

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.brandName,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  telephone: siteConfig.contact.telephone,
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Distrito Industrial IV",
    addressLocality: "Uberaba",
    addressRegion: "MG",
    addressCountry: "BR",
  },
  taxID: siteConfig.cnpj,
  priceRange: "$$",
  areaServed: ["Sudeste", "Centro-Oeste", "Sul"],
  description:
    "Operador logístico multicliente B2B em Uberaba/MG, com 17.000 m² preparados para diferentes segmentos e tipos de operação — têxtil, autopeças, produtos pet, industriais, ferramentas, limpeza, higiene e beleza, além de cargas reguladas com licenças ANVISA, IBAMA e IMA.",
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.aSchema },
  })),
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="top">
        {/* ================= HERO ================= */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-media">
            <video
              className="hero-video"
              data-hero-video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/media/hero-poster.webp"
              aria-label="Vídeo aéreo do armazém da S&S Log em Uberaba-MG"
            >
              <source src="/media/hero-video.webm" type="video/webm" />
              <source src="/media/hero-video.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hero-grad" />

          <div className="container hero-content">
            <span className="hero-eyebrow">
              Uberaba · MG · Distrito Industrial IV
            </span>
            <h1 id="hero-title">Operação logística desenhada para a sua demanda.</h1>
            <p className="sub">
              Operador logístico multicliente em Uberaba/MG. 17.000 m² preparados
              para diferentes segmentos — de têxtil, autopeças e produtos pet a
              cargas reguladas, com licenças ANVISA, IBAMA e IMA como diferencial.
            </p>
            <div className="hero-ctas">
              <a
                href={WA}
                className="btn btn-primary btn-lg btn-arrow"
                data-wa
                data-cta-location="hero"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar Proposta de Armazenagem
              </a>
              <a href="#estrutura" className="btn btn-ghost btn-lg">
                Ver estrutura e licenças
              </a>
            </div>

            <div className="hero-badges" aria-label="Provas sociais">
              <div className="hero-badge">
                <span className="num">17.000 m²</span>
                <span className="label">Armazém</span>
              </div>
              <div className="hero-badge">
                <span className="num">11.000</span>
                <span className="label">Posições de pallets</span>
              </div>
              <div className="hero-badge">
                <span className="num">ANVISA · IBAMA · IMA</span>
                <span className="label">Licenças vigentes</span>
              </div>
              <div className="hero-badge">
                <span className="num">1.000 m²</span>
                <span className="label">Prontos p/ expansão</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO INSTITUCIONAL · QUEM SOMOS + VÍDEO ================= */}
        <section className="inst" id="quem-somos" aria-labelledby="inst-title">
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">Quem Somos</span>
              <h2 className="section-title" id="inst-title">
                Um operador logístico preparado para a sua operação.
              </h2>
              <p className="section-deck">
                São 17.000 m² de estrutura preparados para atender às mais diversas
                demandas logísticas — com segurança, controle e processos
                padronizados.
              </p>
            </header>

            <div className="inst-grid">
              <div className="inst-copy reveal">
                <p className="lead">
                  A S&S Log (Salles &amp; Santos Logística) é um operador logístico
                  multicliente em Uberaba/MG, com estrutura, capacidade operacional
                  e processos para diferentes tipos de operação.
                </p>
                <p>
                  Operação desenhada sob medida para as necessidades da sua empresa.
                  Trabalhamos com processos padronizados e as licenças necessárias
                  para operar — a sua operação não fica travada por falta de
                  documentação ou licenciamento.
                </p>

                <ul className="inst-points">
                  <li>
                    Possui as licenças necessárias para operar (ANVISA, IBAMA e IMA).
                  </li>
                  <li>Processos operacionais padronizados e auditáveis.</li>
                  <li>O cliente pode realizar auditorias no armazém.</li>
                  <li>
                    Estrutura e processos preparados para diferentes tipos de
                    operação.
                  </li>
                </ul>

                <p className="inst-multicliente">
                  Operador multicliente, preparado para atender diferentes segmentos
                  de acordo com as particularidades de cada operação.
                </p>
              </div>

              <div className="inst-media reveal">
                <video
                  controls
                  preload="none"
                  playsInline
                  poster="/media/institucional-poster.jpg"
                  aria-label="Vídeo institucional da S&S Log"
                >
                  <source src="/media/institucional.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO · A OPERAÇÃO ================= */}
        <section className="section section-dark" aria-labelledby="solution-title">
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">A Operação</span>
              <h2 className="section-title" id="solution-title">
                Uma operação desenhada sob medida para a sua demanda.
              </h2>
              <p className="section-deck">
                A S&S Log não adaptou um galpão velho para atender a sua operação. A
                nossa estrutura é nova, moldada para a sua necessidade — do produto
                mais comum à carga que exige regulamentação específica.
              </p>
            </header>

            <div className="solution-grid">
              <article className="solution-block reveal">
                <div className="solution-num">01 / ESTRUTURA</div>
                <h3>Estrutura definida conforme o tipo de carga.</h3>
                <p>
                  Porta-paletes dedicados e áreas organizadas por tipo de produto,
                  com mais 1.000 m² prontos para expansão sob medida. Estrutura
                  preparada para diferentes segmentos e tipos de operação.
                </p>
              </article>

              <article className="solution-block reveal">
                <div className="solution-num">02 / LICENÇAS</div>
                <h3>Licenças ativas como diferencial da operação.</h3>
                <p>
                  ANVISA para cosméticos. IBAMA para conformidade ambiental. IMA
                  para defensivos agrícolas. Você não espera habilitação. Entra
                  operando.
                </p>
              </article>

              <article className="solution-block reveal">
                <div className="solution-num">03 / SEGURANÇA</div>
                <h3>Segurança tecnológica em camadas.</h3>
                <p>
                  Controle de acesso com reconhecimento facial e tourniquete, 2
                  eclusas independentes (entrada e saída separadas) e guarita
                  blindada nível III-A. Acesso controlado, rastreável e auditável.
                </p>
              </article>
            </div>

            <p className="section-deck reveal" style={{ marginTop: "3rem", maxWidth: "60ch" }}>
              <strong style={{ color: "var(--c-white)" }}>
                Não trabalhamos com pacotes fechados.
              </strong>{" "}
              Cada operação é estruturada de acordo com a demanda, o volume, o fluxo
              e as necessidades do cliente.
            </p>

            <div className="solution-cta">
              <a
                href={WA}
                className="btn btn-outline btn-arrow"
                data-wa
                data-cta-location="solucao"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar Proposta de Armazenagem
              </a>
            </div>
          </div>
        </section>

        {/* ================= SHOWCASE · O ARMAZÉM (aéreas do prédio) ================= */}
        <section
          className="section building-showcase"
          id="o-armazem"
          aria-labelledby="building-title"
        >
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">O armazém</span>
              <h2 className="section-title" id="building-title">
                17.000 m² preparados para as mais diversas demandas.
              </h2>
              <p className="section-deck">
                Estrutura nova no Distrito Industrial IV de Uberaba/MG, com pátio
                para manobra, docas e acesso controlado. Veja de onde a sua operação
                vai rodar.
              </p>
            </header>

            <div className="showcase-grid reveal">
              <figure className="showcase-lead">
                <Image
                  src="/media/showcase-predio.webp"
                  alt="Vista aérea do armazém da S&S Log em Uberaba/MG"
                  fill
                  sizes="(max-width: 900px) 100vw, 66vw"
                />
              </figure>
              <figure className="showcase-item">
                <Image
                  src="/media/showcase-transporte.webp"
                  alt="Carretas na doca de expedição da S&S Log"
                  fill
                  sizes="(max-width: 900px) 100vw, 34vw"
                />
                <figcaption>Docas para lotação e fracionada</figcaption>
              </figure>
              <figure className="showcase-item">
                <Image
                  src="/media/showcase-fachada.webp"
                  alt="Fachada do armazém com a marca S&S Log"
                  fill
                  sizes="(max-width: 900px) 100vw, 34vw"
                />
                <figcaption>Distrito Industrial IV · Uberaba/MG</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO · ESTRUTURA & SEGURANÇA (PILAR) ================= */}
        <section
          className="section section-soft"
          id="estrutura"
          aria-labelledby="structure-title"
        >
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">Estrutura &amp; Segurança · Pilar</span>
              <h2 className="section-title" id="structure-title">
                A estrutura que você pode auditar antes de fechar.
              </h2>
              <p className="section-deck">
                A S&S Log permite e recebe auditorias dos clientes no armazém.
                Convide a sua equipe para conhecer pessoalmente — a prova está dentro
                da operação.
              </p>
            </header>

            <div className="structure-grid">
              {/* Card 1 · Armazém */}
              <article className="structure-card reveal">
                <div className="structure-media has-photo">
                  <video
                    className="card-loop"
                    data-loop-video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/media/cut-armazem-poster.jpg"
                    aria-label="Vídeo aéreo do armazém principal da S&S Log"
                  >
                    <source src="/media/cut-armazem.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="structure-body">
                  <div className="structure-title">Armazém principal</div>
                  <div className="structure-kpi">
                    17.000 m²
                    <br />
                    <small style={{ fontSize: ".7em", opacity: 0.65 }}>
                      11.000 posições de pallets
                    </small>
                  </div>
                  <p className="structure-desc">
                    Porta-paletes certificados, piso nivelado para movimentação de
                    empilhadeira e WMS para controle posição a posição.
                  </p>
                </div>
              </article>

              {/* Card 2 · Expansão */}
              <article className="structure-card reveal">
                <div className="structure-media has-photo">
                  <video
                    className="card-loop"
                    data-loop-video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/media/estrutura-expansao.webp"
                    aria-label="Vídeo aéreo da área de expansão da S&S Log"
                  >
                    <source src="/media/cut-expansao.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="structure-body">
                  <div className="structure-title">Pronto para expansão</div>
                  <div className="structure-kpi">
                    1.000 m²
                    <br />
                    <small style={{ fontSize: ".7em", opacity: 0.65 }}>
                      Projeto sob medida
                    </small>
                  </div>
                  <p className="structure-desc">
                    Área pronta para projeto de armazenagem dedicada, dimensionada
                    conforme a demanda do cliente.
                  </p>
                </div>
              </article>

              {/* Card 3 · Eclusas */}
              <article className="structure-card reveal">
                <div className="structure-media has-photo">
                  <video
                    className="card-loop"
                    data-loop-video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/media/estrutura-eclusas.webp"
                    aria-label="Vídeo das duas eclusas independentes da S&S Log"
                  >
                    <source src="/media/cut-eclusas.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="structure-body">
                  <div className="structure-title">Eclusas</div>
                  <div className="structure-kpi">2 independentes</div>
                  <p className="structure-desc">
                    Duas eclusas independentes: entrada e saída em fluxos separados.
                    Evita cruzamento de cargas, reduz risco de contaminação e dá
                    controle real sobre o que entra e o que sai.
                  </p>
                </div>
              </article>

              {/* Card 4 · Controle de Acesso */}
              <article
                className="structure-card reveal"
                id="controle-acesso"
              >
                <div className="structure-media has-photo">
                  <video
                    className="card-loop"
                    data-loop-video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/media/estrutura-portaria.webp"
                    aria-label="Vídeo do controle de acesso e portaria da S&S Log"
                  >
                    <source src="/media/cut-controle.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="structure-body">
                  <div className="structure-title">Controle de Acesso</div>
                  <div className="structure-kpi">Nível III-A</div>
                  <p className="structure-desc">
                    Controle de acesso com reconhecimento facial, tourniquete e
                    controle de entrada e saída. Portaria/guarita com blindagem nível
                    III-A. Ninguém entra sem registro.
                  </p>
                </div>
              </article>

              {/* Card 5 · Licenças */}
              <article className="structure-card is-licenses reveal">
                <div className="structure-media">
                  <div className="license-slot">
                    <span className="lic-name">ANVISA</span>
                    <span className="lic-hint">AFE 2.11874-1</span>
                  </div>
                  <div className="license-slot">
                    <span className="lic-name">IBAMA</span>
                    <span className="lic-hint">CTF 8777018</span>
                  </div>
                  <div className="license-slot">
                    <span className="lic-name">IMA</span>
                    <span className="lic-hint">defensivos agrícolas</span>
                  </div>
                </div>
                <div className="structure-body">
                  <div className="structure-title">Licenças Ativas</div>
                  <div className="structure-kpi" style={{ fontSize: "1.25rem" }}>
                    ANVISA · IBAMA · IMA
                  </div>
                  <p className="structure-desc">
                    Um diferencial da operação: licenças em dia para o cliente entrar
                    operando, sem esperar habilitação. ANVISA (AFE 2.11874-1) para
                    cosméticos e produtos de higiene; IBAMA (CTF 8777018) para
                    produtos químicos e perigosos; licenciamento ambiental estadual
                    (SEMAD-MG · cert. 737) e municipal (Uberaba · decl. 3207/2024)
                    vigentes.
                  </p>
                </div>
              </article>
            </div>

            <div className="structure-cta">
              <a
                href={WA}
                className="btn btn-dark btn-arrow"
                data-wa
                data-cta-location="estrutura"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar visita técnica ao armazém
              </a>
            </div>
          </div>
        </section>

        {/* ================= VÍDEO INTERMEDIÁRIO (placeholder) ================= */}
        <section
          className="video-band"
          aria-label="Movimentação real do armazém"
        >
          <div className="band-media">
            <Image
              src="/media/movimentacao.webp"
              alt="Movimentação real de cargas dentro do armazém da S&S Log"
              fill
              sizes="100vw"
            />
          </div>
          <div className="video-band-content">
            <span className="label">Movimentação real</span>
            <h2>Sem truques. Sem render. Só operação.</h2>
          </div>
        </section>

        {/* ================= SEÇÃO · SEGMENTOS ================= */}
        {/* NOTA (mídia 12): imagem ilustrativa da diversidade de segmentos a definir
            com o cliente — hoje a seção é composta por cards com ícones. */}
        <section className="section" id="segmentos" aria-labelledby="segments-title">
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">Segmentos atendidos</span>
              <h2 className="section-title" id="segments-title">
                Estrutura preparada para diferentes segmentos e tipos de operação.
              </h2>
              <p className="section-deck">
                Atendemos operações de diferentes setores, desde produtos regulados
                até têxteis, autopeças, produtos pet, ferramentas, itens
                industriais, produtos de limpeza, higiene e beleza.
              </p>
            </header>

            <div className="segments-grid">
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">🧵</div>
                <h3>Têxtil e vestuário</h3>
                <p>
                  Armazenagem de peças e insumos têxteis com controle por posição e
                  rastreabilidade.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">⚙️</div>
                <h3>Autopeças</h3>
                <p>
                  Estrutura para peças automotivas, com organização por SKU e
                  controle de inventário.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">🐾</div>
                <h3>Produtos pet</h3>
                <p>
                  Armazenagem de itens do segmento pet, com processo auditável e
                  distribuição fracionada ou lotação.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">🏭</div>
                <h3>Produtos industriais</h3>
                <p>
                  Espaço para cargas industriais diversas, dimensionado conforme o
                  volume e o fluxo da operação.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">🛠️</div>
                <h3>Ferramentas manuais e elétricas</h3>
                <p>
                  Armazenagem de ferramentas com controle de acesso e segurança
                  física do armazém.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">🧽</div>
                <h3>Produtos de limpeza</h3>
                <p>
                  Estrutura para produtos de limpeza, com segregação adequada e
                  processo controlado.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">💄</div>
                <h3>Higiene e beleza</h3>
                <p>
                  Armazenagem de itens de higiene e beleza em temperatura ambiente,
                  com rastreabilidade por lote.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">🧴</div>
                <h3>Cosméticos</h3>
                <p>
                  Licença ANVISA vigente. Operação apta para cosméticos em
                  temperatura ambiente.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">🌾</div>
                <h3>Defensivos agrícolas</h3>
                <p>
                  Licença IMA ativa. Área segregada com controle de acesso e
                  rastreabilidade por lote.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">⚗️</div>
                <h3>Agroquímicos</h3>
                <p>
                  Armazenagem em estrutura dedicada para produtos químicos, com
                  ventilação e contenção adequadas.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">🌱</div>
                <h3>Fertilizantes</h3>
                <p>
                  Área dedicada para fertilizantes, separada das demais cargas para
                  evitar cruzamento.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">🧼</div>
                <h3>Domissanitários</h3>
                <p>
                  Espaço específico com o mesmo padrão de segurança dos demais
                  produtos químicos.
                </p>
              </article>
            </div>

            <div className="segments-cta">
              <a
                href={WA}
                className="btn btn-primary btn-arrow"
                data-wa
                data-cta-location="segmentos"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar Proposta para o meu segmento
              </a>
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO · SERVIÇOS ================= */}
        <section
          className="section section-dark"
          id="servicos"
          aria-labelledby="services-title"
        >
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">Portfólio de Serviços</span>
              <h2 className="section-title" id="services-title">
                Do armazém à entrega final.
              </h2>
              <p className="section-deck">
                Sete serviços integrados para cobrir toda a cadeia de movimentação
                da sua carga.
              </p>
            </header>

            <div className="services-grid">
              <article className="service-card reveal">
                <div className="service-num">01</div>
                <h3>Logística · gestão de cadeia</h3>
                <p>
                  Gerenciamento da cadeia logística ponta a ponta, com
                  rastreabilidade e reporte periódico para o seu time.
                </p>
              </article>
              <article className="service-card reveal">
                <div className="service-num">02</div>
                <h3>Transferências entre CDs</h3>
                <p>
                  Movimentação de cargas entre os seus CDs ou entre fornecedor e CD
                  com controle de inventário em trânsito.
                </p>
              </article>
              <article className="service-card reveal">
                <div className="service-num">03</div>
                <h3>Distribuição Lotação</h3>
                <p>
                  Cargas completas direto da origem ao destino. Menos manuseio,
                  menos risco, entrega mais rápida.
                </p>
              </article>
              <article className="service-card reveal">
                <div className="service-num">04</div>
                <h3>Distribuição Fracionada</h3>
                <p>
                  Consolidação de volumes menores para múltiplos destinos, com
                  otimização de custo sem comprometer prazo.
                </p>
              </article>
              <article className="service-card reveal">
                <div className="service-num">05</div>
                <h3>Armazenamento Geral</h3>
                <p>
                  WMS com controle por posição, rastreabilidade e relatórios de
                  estoque disponíveis ao cliente.
                </p>
              </article>
              <article className="service-card reveal">
                <div className="service-num">06</div>
                <h3>Químicos e Agroquímicos</h3>
                <p>
                  Estrutura dedicada, com segregação por tipo de produto e
                  conformidade regulatória (IBAMA · IMA).
                </p>
              </article>
              <article className="service-card reveal">
                <div className="service-num">07</div>
                <h3>Operação multissegmento</h3>
                <p>
                  Estrutura preparada para diferentes setores — têxtil e vestuário,
                  autopeças, produtos pet, produtos industriais, ferramentas manuais
                  e elétricas, produtos de limpeza, higiene e beleza — além dos
                  produtos regulados já atendidos.
                </p>
              </article>
            </div>

            <div className="services-cta">
              <a
                href={WA}
                className="btn btn-outline btn-arrow"
                data-wa
                data-cta-location="servicos"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conversar sobre o meu escopo
              </a>
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO · COMO FUNCIONA ================= */}
        <section className="section" aria-labelledby="steps-title">
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">Processo de onboarding</span>
              <h2 className="section-title" id="steps-title">
                Quatro passos entre o primeiro contato e a sua carga armazenada.
              </h2>
              <p className="section-deck">
                Processo objetivo, pensado para quem não pode esperar meses.
              </p>
            </header>

            <div className="steps-wrap">
              <div className="step reveal">
                <div className="step-num">1</div>
                <h3>Diagnóstico da carga</h3>
                <p>
                  Entendemos o tipo de produto, volume, movimentação esperada e as
                  necessidades da sua operação.
                </p>
              </div>
              <div className="step reveal">
                <div className="step-num">2</div>
                <h3>Validação da operação</h3>
                <p>
                  Analisamos tipo de produto, volume, características da carga e
                  necessidades da operação — incluindo requisitos regulatórios,
                  quando aplicáveis.
                </p>
              </div>
              <div className="step reveal">
                <div className="step-num">3</div>
                <h3>Integração operacional</h3>
                <p>
                  Alinhamento de WMS, SLA, rotinas de recebimento, expedição e
                  reporte. O seu time entra no processo.
                </p>
              </div>
              <div className="step reveal">
                <div className="step-num">4</div>
                <h3>Operação ativa</h3>
                <p>
                  Carga armazenada, movimentada e distribuída com rastreabilidade e
                  auditoria disponíveis do primeiro dia.
                </p>
              </div>
            </div>

            <div className="steps-note reveal">
              O tempo real do onboarding depende de volume, tipo de carga e
              necessidades da operação do cliente.
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO · FAQ ================= */}
        <section className="section section-soft" aria-labelledby="faq-title">
          <div className="container">
            <header className="section-head reveal" style={{ textAlign: "center" }}>
              <span className="eyebrow" style={{ justifyContent: "center" }}>
                Dúvidas técnicas
              </span>
              <h2
                className="section-title"
                id="faq-title"
                style={{ maxWidth: "none", marginInline: "auto" }}
              >
                Perguntas que a sua equipe de compliance faz.
              </h2>
            </header>

            <div className="faq-wrap">
              {faqs.map((f) => (
                <details className="faq-item reveal" key={f.q}>
                  <summary>{f.q}</summary>
                  <div
                    className="faq-body"
                    dangerouslySetInnerHTML={{ __html: f.aHtml }}
                  />
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO · CTA FINAL (formulário + WhatsApp) ================= */}
        <section className="cta-final" id="contato" aria-labelledby="cta-title">
          <div className="cta-final-bg" aria-hidden="true">
            <Image src="/media/cta-aerea.webp" alt="" fill sizes="100vw" />
          </div>
          <div className="container">
            <span
              className="eyebrow"
              style={{ color: "var(--c-yellow)", justifyContent: "center" }}
            >
              Próximo passo
            </span>
            <h2 id="cta-title">
              Sua operação pronta para armazenar com estrutura, segurança e controle.
            </h2>
            <p className="sub">
              Fale com a nossa equipe. <strong>Tempo médio de resposta: até 30
              minutos</strong>, com proposta inicial ou agenda de visita técnica ao
              armazém em Uberaba.
            </p>

            {/* Formulário de captura — direciona ao WhatsApp com os dados do lead */}
            <LeadForm />

            <p className="cta-or">ou fale direto pelos nossos canais</p>

            <div className="cta-contacts">
              <a
                href={WA}
                data-wa
                data-cta-location="cta_final_contato"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="label">WhatsApp</span>&nbsp;
                {siteConfig.contact.whatsappDisplay}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`}>
                <span className="label">E-mail</span>&nbsp;
                {siteConfig.contact.email}
              </a>
              <span>
                <span className="label">Endereço</span>&nbsp;Distrito Industrial IV ·
                Uberaba/MG
              </span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* JSON-LD: LocalBusiness + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  )
}
