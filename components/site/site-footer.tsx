import Link from "next/link"
import { DevelopedByRS } from "@/components/site/developed-by-rs"
import { siteConfig } from "@/lib/site"

/**
 * SiteFooter — rodapé da home (Server Component). 4 colunas + barra com CNPJ e
 * links legais + selo RS (cliente externo). Portado verbatim do protótipo.
 */
export function SiteFooter() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ss-log-horizontal.png"
              alt="S&S Log"
              width={212}
              height={36}
            />
            <p>Operador logístico B2B para cargas reguladas. Uberaba/MG.</p>
          </div>

          <div>
            <h4>Navegação</h4>
            <ul>
              <li>
                <a href="#top">Início</a>
              </li>
              <li>
                <a href="#estrutura">Estrutura &amp; Segurança</a>
              </li>
              <li>
                <a href="#segmentos">Segmentos</a>
              </li>
              <li>
                <a href="#servicos">Serviços</a>
              </li>
              <li>
                <a href="#contato">Contato</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Serviços</h4>
            <ul>
              <li>
                <a href="#servicos">Armazenagem de químicos</a>
              </li>
              <li>
                <a href="#servicos">Fertilizantes e domissanitários</a>
              </li>
              <li>
                <a href="#servicos">Distribuição lotação</a>
              </li>
              <li>
                <a href="#servicos">Distribuição fracionada</a>
              </li>
              <li>
                <a href="#servicos">Transferências entre CDs</a>
              </li>
              <li>
                <a href="#servicos">Armazenamento geral</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Contato</h4>
            <ul>
              <li>
                <a
                  href={siteConfig.contact.whatsappUrl}
                  data-wa
                  data-cta-location="footer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: {siteConfig.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>Distrito Industrial IV — Uberaba/MG</li>
            </ul>
          </div>
        </div>

        <div className="footer-bar">
          <p>
            © {new Date().getFullYear()} S&S Log · Brasil ·
            CNPJ {siteConfig.cnpj}
          </p>
          <div className="footer-legal">
            <Link href="/politica-privacidade">Política de Privacidade</Link>
            <a href="#" data-cookie-prefs>
              Preferências de cookies
            </a>
          </div>
        </div>

        {/* Branding RS (cliente externo — regra §7 do squad) */}
        <div className="footer-rs">
          <DevelopedByRS />
        </div>
      </div>
    </footer>
  )
}
