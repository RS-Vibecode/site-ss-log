import { siteConfig } from "@/lib/site"

/**
 * WhatsAppFloat — botão lateral flutuante de acesso DIRETO ao WhatsApp
 * (sem passar pelo formulário de captura). O href é reescrito pelo
 * WhatsAppHandler global via [data-wa] com a mensagem contextual + UTM.
 * Fundo verde WhatsApp + ícone branco: alto contraste em qualquer seção.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={siteConfig.contact.whatsappUrl}
      className="wa-float"
      data-wa
      data-cta-location="float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar agora no WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        width="30"
        height="30"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M16.004 5.333c-5.887 0-10.667 4.78-10.667 10.667 0 1.88.492 3.72 1.427 5.345L5.333 26.667l5.472-1.43a10.62 10.62 0 0 0 5.199 1.36h.004c5.884 0 10.665-4.78 10.665-10.667 0-2.85-1.11-5.53-3.127-7.547a10.6 10.6 0 0 0-7.542-3.05Zm0 19.52h-.003a8.85 8.85 0 0 1-4.51-1.236l-.324-.192-3.247.851.867-3.166-.211-.325a8.84 8.84 0 0 1-1.355-4.719c0-4.89 3.98-8.869 8.872-8.869a8.81 8.81 0 0 1 6.27 2.6 8.81 8.81 0 0 1 2.598 6.276c0 4.891-3.98 8.869-8.87 8.869Zm4.862-6.64c-.267-.134-1.577-.778-1.822-.867-.244-.089-.422-.133-.6.134-.178.266-.688.867-.844 1.044-.155.178-.311.2-.578.067-.267-.134-1.125-.415-2.143-1.323-.792-.706-1.327-1.578-1.483-1.845-.155-.266-.016-.41.117-.543.12-.12.267-.311.4-.467.134-.155.178-.266.267-.444.089-.178.045-.334-.022-.467-.067-.134-.6-1.445-.822-1.978-.216-.52-.436-.45-.6-.458l-.511-.009c-.178 0-.467.067-.711.334-.244.266-.933.911-.933 2.222s.955 2.578 1.088 2.756c.133.178 1.878 2.867 4.55 4.02.636.275 1.133.439 1.52.562.639.203 1.22.174 1.68.106.512-.077 1.577-.645 1.8-1.267.222-.623.222-1.156.155-1.267-.066-.111-.244-.178-.511-.311Z"
        />
      </svg>
    </a>
  )
}
