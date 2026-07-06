import Image from "next/image"
import { Navbar } from "@/components/site/navbar"
import { SiteFooter } from "@/components/site/site-footer"
import { siteConfig } from "@/lib/site"

const WA = siteConfig.contact.whatsappUrl

/** FAQ — copy verbatim do protótipo v1 (aHtml = versão visível; aSchema = JSON-LD). */
const faqs: { q: string; aHtml: string; aSchema: string }[] = [
  {
    q: "A S&S Log tem licença ANVISA para armazenar cosméticos?",
    aHtml:
      "Sim. Licença ANVISA vigente para cosméticos. <em>[PENDENTE — número do registro]</em> disponível sob solicitação.",
    aSchema:
      "Sim. A S&S Log tem licença ANVISA vigente para cosméticos, com número de registro disponível sob solicitação.",
  },
  {
    q: "A S&S Log oferece armazenagem refrigerada?",
    aHtml:
      "A S&S Log tem 1.000 m² prontos para projeto de armazenagem refrigerada, dimensionados conforme a necessidade do cliente. Fale com a equipe para detalhar o seu escopo.",
    aSchema:
      "A S&S Log tem 1.000 m² prontos para projeto de armazenagem refrigerada, dimensionados conforme a necessidade do cliente. Fale com a equipe para detalhar o seu escopo.",
  },
  {
    q: "Como é feita a rastreabilidade da carga?",
    aHtml:
      "Controle por WMS com posição, lote e movimentação registrados. Relatórios disponíveis ao cliente conforme SLA combinado.",
    aSchema:
      "Controle por WMS com posição, lote e movimentação registrados. Relatórios disponíveis ao cliente conforme SLA combinado.",
  },
  {
    q: "Vocês atendem carga fracionada ou só lotação?",
    aHtml:
      "Os dois modelos. Distribuição lotação para cargas completas e distribuição fracionada para consolidação de volumes menores com múltiplos destinos.",
    aSchema:
      "Os dois modelos. Distribuição lotação para cargas completas e distribuição fracionada para consolidação de volumes menores com múltiplos destinos.",
  },
  {
    q: "Qual o raio de distribuição a partir de Uberaba?",
    aHtml:
      "Atendemos as regiões <strong>Sudeste, Centro-Oeste e Sul</strong>. Uberaba fica no Triângulo Mineiro, com acesso direto a SP, MG, GO, MT, RS, SC, PR e demais estados das três regiões.",
    aSchema:
      "Atendemos as regiões Sudeste, Centro-Oeste e Sul. Uberaba fica no Triângulo Mineiro, com acesso direto a SP, MG, GO, MT, RS, SC, PR e demais estados das três regiões.",
  },
  {
    q: "A S&S Log aceita auditoria do cliente no armazém?",
    aHtml:
      "Sim. Visita técnica e auditoria do cliente são parte do processo de homologação. Agende pelo WhatsApp ou e-mail.",
    aSchema:
      "Sim. Visita técnica e auditoria do cliente são parte do processo de homologação. Agende pelo WhatsApp ou e-mail.",
  },
  {
    q: "Como é a segurança física do armazém?",
    aHtml:
      "Portaria com reconhecimento facial, 2 eclusas independentes para entrada e saída, guarita blindada nível III e bunker dedicado para cargas de maior risco.",
    aSchema:
      "Portaria com reconhecimento facial, 2 eclusas independentes para entrada e saída, guarita blindada nível III e bunker dedicado para cargas de maior risco.",
  },
  {
    q: "A operação é desenhada sob medida?",
    aHtml:
      "Sim. A S&S Log monta a estrutura conforme o tipo de carga, volume, fluxo e exigências regulatórias do cliente — não trabalha com pacotes prontos genéricos.",
    aSchema:
      "Sim. A S&S Log monta a estrutura conforme o tipo de carga, volume, fluxo e exigências regulatórias do cliente, sem pacotes prontos genéricos.",
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
    "Operador logístico B2B especializado em armazenagem de produtos regulados — químicos, agroquímicos, defensivos, fertilizantes, domissanitários e cosméticos. Licenças ANVISA, IBAMA e IMA vigentes.",
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
            <Image
              src="/media/hero-drone.webp"
              alt="Vista aérea do armazém da S&S Log em Uberaba-MG"
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="hero-grad" />

          <div className="container hero-content">
            <span className="hero-eyebrow">
              Uberaba · MG · Distrito Industrial IV
            </span>
            <h1 id="hero-title">Logística regulada com licença em dia.</h1>
            <p className="sub">
              Operador logístico em Uberaba/MG, apto a armazenar agroquímicos,
              defensivos, cosméticos e demais cargas reguladas. Licenças ANVISA,
              IBAMA e IMA vigentes.
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
                Ver licenças e estrutura
              </a>
            </div>

            <div className="hero-badges" aria-label="Provas sociais">
              <div className="hero-badge">
                <span className="num">17.000 m²</span>
                <span className="label">Armazém</span>
              </div>
              <div className="hero-badge">
                <span className="num">13.000</span>
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

        {/* ================= SEÇÃO 1 · PROBLEMA ================= */}
        <section className="section" id="quem-somos" aria-labelledby="problem-title">
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">O Desafio</span>
              <h2 className="section-title" id="problem-title">
                Nem todo armazém está preparado para o que você precisa guardar.
              </h2>
              <p className="section-deck">
                Cargas reguladas exigem mais do que espaço. Exigem licença
                vigente, rastreabilidade e processo auditável.
              </p>
            </header>
            <ul className="problem-list reveal">
              <li>
                Operadores sem licença ANVISA vigente travam o seu lançamento de
                cosmético regulado.
              </li>
              <li>
                Operador padronizado não atende a especificidade que cada carga
                regulada exige.
              </li>
              <li>
                Auditoria do cliente final ou do órgão regulador expõe
                fragilidades de quem armazenou errado.
              </li>
              <li>
                Armazém sem eclusa e sem controle de acesso é risco de inventário
                e de contaminação cruzada.
              </li>
              <li>
                Operador generalista não entende que cada segmento regulado tem a
                sua regra.
              </li>
            </ul>
            <p className="problem-fecho reveal">
              Para quem trabalha com produto regulado, escolher o operador
              logístico é uma decisão de <strong>compliance</strong>, não só de
              custo.
            </p>
          </div>
        </section>

        {/* ================= SEÇÃO 2 · SOLUÇÃO ================= */}
        <section className="section section-dark" aria-labelledby="solution-title">
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">A Operação</span>
              <h2 className="section-title" id="solution-title">
                Uma operação desenhada para a sua demanda.
              </h2>
              <p className="section-deck">
                A S&S Log não adaptou um galpão velho para atender a sua operação.
                A nossa estrutura é nova, moldada para a sua necessidade.
              </p>
            </header>

            <div className="solution-grid">
              <article className="solution-block reveal">
                <div className="solution-num">01 / ESTRUTURA</div>
                <h3>Estrutura física separada por tipo de carga.</h3>
                <p>
                  Porta-paletes dedicados, área segregada para fertilizantes e
                  domissanitários, e bunker para cargas de maior risco. Mais 1.000
                  m² prontos para expansão.
                </p>
              </article>

              <article className="solution-block reveal">
                <div className="solution-num">02 / LICENÇAS</div>
                <h3>Licenças ativas antes de você precisar delas.</h3>
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
                  Portaria com reconhecimento facial, 2 eclusas independentes
                  (entrada e saída separadas), guarita blindada nível III. Acesso
                  controlado, rastreável e auditável.
                </p>
              </article>
            </div>

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

        {/* ================= SEÇÃO 3 · ESTRUTURA & SEGURANÇA (PILAR) ================= */}
        <section
          className="section section-soft"
          id="estrutura"
          aria-labelledby="structure-title"
        >
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">Estrutura &amp; Segurança · Pilar</span>
              <h2 className="section-title" id="structure-title">
                A estrutura que você vai auditar antes de fechar.
              </h2>
              <p className="section-deck">
                Convide a sua equipe de compliance para conhecer pessoalmente. A
                prova está dentro do armazém — e nas câmeras.
              </p>
            </header>

            <div className="structure-grid">
              {/* Card 1 · Armazém */}
              <article className="structure-card reveal">
                <div className="structure-media">
                  <span className="ph-label">
                    Vídeo · Porta-paletes
                    <br />
                    1920 × 1080
                  </span>
                </div>
                <div className="structure-body">
                  <div className="structure-title">Armazém principal</div>
                  <div className="structure-kpi">
                    17.000 m²
                    <br />
                    <small style={{ fontSize: ".7em", opacity: 0.65 }}>
                      13.000 posições de pallets
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
                <div className="structure-media is-image">
                  <span className="ph-label">
                    Foto · Área disponível
                    <br />
                    1.000 m² para projeto
                  </span>
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

              {/* Card 3 · Bunker */}
              <article className="structure-card reveal">
                <div className="structure-media is-image">
                  <span className="ph-label">
                    Foto / Vídeo · Bunker
                    <br />
                    Área segregada
                  </span>
                </div>
                <div className="structure-body">
                  <div className="structure-title">Bunker</div>
                  <div className="structure-kpi">Segregado</div>
                  <p className="structure-desc">
                    Armazenagem segregada para cargas de maior risco. Área
                    específica para produtos que pedem isolamento físico do
                    restante da operação.
                  </p>
                </div>
              </article>

              {/* Card 4 · Eclusas */}
              <article className="structure-card reveal">
                <div className="structure-media">
                  <span className="ph-label">
                    Vídeo · Eclusas
                    <br />
                    Entrada + Saída separadas
                  </span>
                </div>
                <div className="structure-body">
                  <div className="structure-title">Eclusas</div>
                  <div className="structure-kpi">2 independentes</div>
                  <p className="structure-desc">
                    Entrada e saída em fluxos separados. Evita cruzamento de
                    cargas, reduz risco de contaminação e dá controle real sobre o
                    que entra e o que sai.
                  </p>
                </div>
              </article>

              {/* Card 5 · Reconhecimento Facial */}
              <article className="structure-card reveal">
                <div className="structure-media">
                  <span className="ph-label">
                    Vídeo · Portaria com reconhecimento facial
                    <br />
                    Guarita nível III
                  </span>
                </div>
                <div className="structure-body">
                  <div className="structure-title">Controle Biométrico</div>
                  <div className="structure-kpi">Nível III</div>
                  <p className="structure-desc">
                    Portaria com identificação facial e guarita blindada nível
                    III. Ninguém entra sem registro.
                  </p>
                </div>
              </article>

              {/* Card 6 · Licenças */}
              <article className="structure-card is-licenses reveal">
                <div className="structure-media">
                  {/* PLACEHOLDER — trocar cada slot por print do certificado + nº quando chegar */}
                  <div className="license-slot">
                    <span className="lic-name">ANVISA</span>
                    <span className="lic-hint">aguardando print + nº</span>
                  </div>
                  <div className="license-slot">
                    <span className="lic-name">IBAMA</span>
                    <span className="lic-hint">aguardando print + nº</span>
                  </div>
                  <div className="license-slot">
                    <span className="lic-name">IMA</span>
                    <span className="lic-hint">aguardando print + nº</span>
                  </div>
                </div>
                <div className="structure-body">
                  <div className="structure-title">Licenças Ativas</div>
                  <div className="structure-kpi" style={{ fontSize: "1.25rem" }}>
                    ANVISA · IBAMA · IMA
                  </div>
                  <p className="structure-desc">
                    ANVISA para cosméticos. IBAMA para conformidade ambiental. IMA
                    para defensivos agrícolas.{" "}
                    <em>[PENDENTE — números de registro das licenças.]</em>
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
          data-video-band
          aria-label="Movimentação real do armazém"
        >
          {/* PLACEHOLDER — trocar por <video> de movimentação geral quando o cliente entregar */}
          <div className="media-ph" aria-hidden="true" />
          <div className="video-band-content">
            <span className="label">Movimentação real</span>
            <h2>Sem truques. Sem render. Só operação.</h2>
          </div>
        </section>

        {/* ================= SEÇÃO 4 · SEGMENTOS ================= */}
        <section className="section" id="segmentos" aria-labelledby="segments-title">
          <div className="container">
            <header className="section-head reveal">
              <span className="eyebrow">Segmentos atendidos</span>
              <h2 className="section-title" id="segments-title">
                Cargas reguladas que já têm casa aqui.
              </h2>
              <p className="section-deck">
                Cada segmento tem a sua estrutura dedicada, o seu processo e o seu
                órgão regulador. A S&S Log está apta para operar com todos os
                abaixo.
              </p>
            </header>

            <div className="segments-grid">
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">
                  🌾
                </div>
                <h3>Defensivos agrícolas</h3>
                <p>
                  Licença IMA ativa. Área segregada com controle de acesso e
                  rastreabilidade por lote.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">
                  ⚗️
                </div>
                <h3>Agroquímicos</h3>
                <p>
                  Armazenagem em estrutura dedicada para produtos químicos, com
                  ventilação e contenção adequadas.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">
                  🧴
                </div>
                <h3>Cosméticos</h3>
                <p>
                  Licença ANVISA vigente. Operação apta para cosméticos em
                  temperatura ambiente.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">
                  🌱
                </div>
                <h3>Fertilizantes</h3>
                <p>
                  Área dedicada para fertilizantes, separada das demais cargas
                  para evitar cruzamento.
                </p>
              </article>
              <article className="segment-card reveal">
                <div className="segment-icon" aria-hidden="true">
                  🧼
                </div>
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

        {/* ================= SEÇÃO 5 · SERVIÇOS ================= */}
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
                  Movimentação de cargas entre os seus CDs ou entre fornecedor e
                  CD com controle de inventário em trânsito.
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
                  Porta-paletes com WMS, controle por posição e relatórios de
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
                <h3>Fertilizantes e Domissanitários</h3>
                <p>
                  Espaço segregado, com controle de acesso próprio e processo
                  auditável.
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

        {/* ================= SEÇÃO 6 · COMO FUNCIONA ================= */}
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
                  Entendemos o tipo de produto, volume, movimentação esperada e
                  requisitos regulatórios.
                </p>
              </div>
              <div className="step reveal">
                <div className="step-num">2</div>
                <h3>Validação regulatória</h3>
                <p>
                  Conferimos que as licenças da S&S Log cobrem o seu produto. Se
                  houver algum ajuste documental, resolvemos antes do onboarding.
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
                  Carga armazenada, movimentada e distribuída com rastreabilidade
                  e auditoria disponíveis do primeiro dia.
                </p>
              </div>
            </div>

            <div className="steps-note reveal">
              O tempo real do onboarding depende de volume, tipo de carga e
              exigências regulatórias do cliente.{" "}
              <em>
                [A INCLUIR — tempo médio em dias úteis, a confirmar com o cliente]
              </em>
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO 7 · FAQ ================= */}
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

        {/* ================= SEÇÃO 8 · CTA FINAL ================= */}
        <section className="cta-final" id="contato" aria-labelledby="cta-title">
          <div className="cta-final-bg" aria-hidden="true">
            {/* PLACEHOLDER — vídeo drone em loop, opacidade 40%, sem áudio */}
          </div>
          <div className="container">
            <span
              className="eyebrow"
              style={{ color: "var(--c-yellow)", justifyContent: "center" }}
            >
              Próximo passo
            </span>
            <h2 id="cta-title">Pronto para armazenar com quem tem a licença?</h2>
            <p className="sub">
              Fale com a nossa equipe. <strong>Primeira resposta em até 60
              minutos</strong> com proposta inicial ou agenda de visita técnica ao
              armazém em Uberaba.
            </p>
            <a
              href={WA}
              className="btn btn-primary btn-lg btn-arrow"
              data-wa
              data-cta-location="cta_final"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar Proposta de Armazenagem
            </a>

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
                <span className="label">Endereço</span>&nbsp;Distrito Industrial
                IV · Uberaba/MG
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
