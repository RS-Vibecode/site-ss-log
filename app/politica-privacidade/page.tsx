import type { Metadata } from "next"
import Link from "next/link"
import { CookieResetButton } from "@/components/site/cookie-reset-button"
import { DevelopedByRS } from "@/components/site/developed-by-rs"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Política de Privacidade | S&S Log",
  description:
    "Política de Privacidade da S&S Log. Como tratamos dados de navegação e contato, base legal, cookies e seus direitos sob a LGPD.",
  alternates: { canonical: "/politica-privacidade" },
  robots: { index: false, follow: true },
}

const EMAIL = siteConfig.contact.email
const WA = siteConfig.contact.whatsappUrl

export default function PoliticaPrivacidade() {
  return (
    <>
      <header className="pp-top">
        <div className="wrap">
          <Link href="/" className="pp-logo" aria-label="S&S Log — voltar ao site">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ss-log-horizontal.png"
              alt="S&S Log"
              width={200}
              height={34}
            />
          </Link>
          <Link href="/" className="pp-back">
            ← Voltar ao site
          </Link>
        </div>
      </header>

      <main className="pp-main">
        <span className="pp-eyebrow">Privacidade &amp; Proteção de Dados</span>
        <h1>Política de Privacidade</h1>
        <p className="pp-updated">Atualizada em 2 de junho de 2026.</p>

        <p>
          Esta política explica como a S&amp;S Log trata os dados pessoais de quem
          navega neste site e de quem entra em contato conosco. Levamos a sério a
          confiança de quem trabalha com cargas reguladas, e isso vale também para
          os seus dados. O tratamento segue a{" "}
          <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong>.
        </p>

        <h2>1. Quem é o responsável pelos seus dados</h2>
        <div className="pp-card">
          <p>
            <strong>SALLES &amp; SANTOS LOG LTDA</strong> (S&amp;S Log)
          </p>
          <p>CNPJ {siteConfig.cnpj}</p>
          <p>Distrito Industrial IV, Uberaba/MG</p>
          <p>
            Canal de privacidade: <a href={`mailto:${EMAIL}`}>{EMAIL}</a> ·
            WhatsApp{" "}
            <a href={WA}>{siteConfig.contact.whatsappDisplay}</a>
          </p>
        </div>

        <h2>2. Quais dados coletamos</h2>
        <h3>Dados de navegação</h3>
        <p>
          Quando você acessa o site, ferramentas de medição podem registrar dados
          como páginas visitadas, tempo de visita, tipo de dispositivo, navegador,
          origem do acesso e identificadores de cookies. Esses dados nos ajudam a
          entender como o site é usado e a melhorá-lo. Eles só são coletados{" "}
          <strong>depois que você aceita os cookies</strong> no aviso exibido na
          primeira visita.
        </p>
        <h3>Dados que você nos envia</h3>
        <p>
          Quando você fala conosco pelo WhatsApp ou por e-mail, recebemos as
          informações que você decide compartilhar, como nome, telefone, empresa e
          a descrição da sua demanda de armazenagem. Usamos esses dados apenas para
          responder e dar andamento ao seu atendimento.
        </p>

        <h2>3. Para que usamos os seus dados</h2>
        <ul>
          <li>Responder aos seus contatos e elaborar propostas de armazenagem.</li>
          <li>Medir a audiência do site e melhorar a experiência de navegação.</li>
          <li>
            Entender quais canais trazem mais visitantes, para investir melhor em
            comunicação.
          </li>
          <li>Cumprir obrigações legais e regulatórias, quando aplicável.</li>
        </ul>

        <h2>4. Base legal do tratamento</h2>
        <p>Cada uso de dados se apoia em uma base legal prevista na LGPD:</p>
        <ul>
          <li>
            <strong>Consentimento</strong> (art. 7, I) para os cookies de medição e
            marketing.
          </li>
          <li>
            <strong>Procedimentos preliminares de contrato</strong> (art. 7, V)
            quando você nos procura para contratar a operação.
          </li>
          <li>
            <strong>Legítimo interesse</strong> (art. 7, IX) para entender e
            aprimorar o site, sempre respeitando os seus direitos.
          </li>
        </ul>

        <h2>5. Cookies e tecnologias de medição</h2>
        <p>Com o seu consentimento, usamos cookies e tecnologias de terceiros:</p>
        <table className="pp-table">
          <thead>
            <tr>
              <th>Tecnologia</th>
              <th>Quem fornece</th>
              <th>Para quê</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Google Analytics 4</td>
              <td>Google</td>
              <td>
                Medir audiência e comportamento de navegação de forma agregada.
              </td>
            </tr>
            <tr>
              <td>Meta Pixel</td>
              <td>Meta (Facebook/Instagram)</td>
              <td>
                Medir resultados de campanhas e apoiar a comunicação digital.
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          Cookies estritamente necessários ao funcionamento e à segurança do site
          são sempre ativos e não dependem de consentimento. Você pode recusar os
          demais a qualquer momento, sem prejuízo de navegação.
        </p>

        <h3>Como gerenciar a sua escolha</h3>
        <p>
          No aviso de cookies você escolhe entre aceitar ou recusar. Também é
          possível ajustar ou bloquear cookies nas configurações do seu navegador.
          Para rever a sua escolha neste site, use o botão abaixo:
        </p>
        <CookieResetButton />

        <h2>6. Com quem compartilhamos</h2>
        <p>
          Não vendemos os seus dados. Compartilhamos informações apenas com os
          fornecedores de tecnologia citados acima (Google e Meta), que atuam como
          operadores para as finalidades descritas. Quando você nos chama pelo
          WhatsApp, a conversa ocorre na plataforma da Meta, sujeita aos termos
          dela. Esses serviços podem tratar dados fora do Brasil. Nesses casos, a
          transferência internacional segue as garantias previstas no art. 33 da
          LGPD.
        </p>

        <h2>7. Por quanto tempo guardamos</h2>
        <p>
          Mantemos os dados pelo tempo necessário para as finalidades desta política
          ou para cumprir obrigações legais. Dados de contato comercial são mantidos
          enquanto durar o relacionamento e por prazo razoável depois disso. Dados
          de navegação seguem os prazos de retenção das ferramentas de medição.
          Encerrada a finalidade, os dados são eliminados ou anonimizados.
        </p>

        <h2>8. Os seus direitos</h2>
        <p>A LGPD garante a você, como titular dos dados, o direito de:</p>
        <ul>
          <li>Confirmar se tratamos os seus dados e acessá-los.</li>
          <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
          <li>
            Solicitar anonimização, bloqueio ou eliminação de dados desnecessários.
          </li>
          <li>Pedir a portabilidade dos dados a outro fornecedor.</li>
          <li>Revogar o consentimento e ser informado sobre as consequências.</li>
          <li>
            Opor-se a tratamentos feitos sem o seu consentimento, quando cabível.
          </li>
        </ul>

        <h2>9. Como exercer os seus direitos</h2>
        <p>
          Para exercer qualquer um desses direitos, fale com a gente pelo e-mail{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> ou pelo WhatsApp{" "}
          <a href={WA}>{siteConfig.contact.whatsappDisplay}</a>. Respondemos dentro
          dos prazos da LGPD.
        </p>

        <h2>10. Alterações desta política</h2>
        <p>
          Podemos atualizar esta política para refletir mudanças na operação ou na
          legislação. A versão vigente é sempre a publicada nesta página, com a data
          de atualização no topo.
        </p>
      </main>

      <footer className="pp-footer">
        <div className="wrap">
          <p>
            © {new Date().getFullYear()} S&S Log · CNPJ{" "}
            {siteConfig.cnpj} · Uberaba/MG
          </p>
          <div className="pp-footer-rs">
            <DevelopedByRS />
          </div>
        </div>
      </footer>
    </>
  )
}
