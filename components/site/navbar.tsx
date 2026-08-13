"use client"

import { useEffect, useState } from "react"
import { siteConfig } from "@/lib/site"

/** Cadeado — sinaliza que a Área do Cliente é acesso restrito, não uma seção do site. */
function LockIcon() {
  return (
    <svg
      className="nav-client-icon"
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

/**
 * Navbar fixa — transparente sobre o hero, vira branca com blur ao rolar > 80px.
 * Menu mobile full-screen com toggle. Client component (scroll + estado do menu).
 * O CTA "Solicitar Proposta" é um <a data-wa> tratado pelo WhatsAppHandler global.
 * "Área do Cliente" aponta para o sistema externo (VsOmni) e tem evento próprio —
 * é acesso de cliente atual, não geração de lead.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`} id="nav" role="banner">
      <div className="container">
        <a href="#top" className="nav-logo" aria-label="S&S Log — ir para o topo" onClick={closeMenu}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ss-log-horizontal.png"
            alt="S&S Log"
            width={236}
            height={40}
          />
        </a>

        <nav
          className={`nav-menu${open ? " is-open" : ""}`}
          id="navMenu"
          role="navigation"
          aria-label="Navegação principal"
        >
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.title}
            </a>
          ))}
          <a
            href={siteConfig.clientArea.url}
            className="nav-client"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              closeMenu()
              // Evento próprio: é cliente atual acessando o sistema, NÃO um lead.
              // Não dispara fbq/Lead nem entra nas conversões do Ads.
              window.dataLayer?.push({ event: "client_area_click" })
            }}
          >
            <LockIcon />
            {siteConfig.clientArea.label}
          </a>
          <a
            href={siteConfig.contact.whatsappUrl}
            className="nav-cta"
            data-wa
            data-cta-location="nav"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Solicitar Proposta
          </a>
        </nav>

        <button
          className={`nav-toggle${open ? " is-open" : ""}`}
          id="navToggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="navMenu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
