import Image from "next/image"
import { rsBrand } from "@/lib/rs-brand"

/**
 * developed-by-rs.tsx — selo discreto "Desenvolvido por RS" para rodapés de CLIENTE.
 * Server Component. Usa o símbolo bicolor (logo-rs.png), vendorizado em /public/brand/rs/.
 * Coloque no rodapé do cliente (não misture os dados institucionais da RS no rodapé dele).
 */
export function DevelopedByRS() {
  return (
    <a
      href={rsBrand.developedBy.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={rsBrand.developedBy.label}
      className="inline-flex items-center gap-2 rounded text-xs text-muted-foreground transition hover:-translate-y-0.5 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span>Desenvolvido por</span>
      {/* alt="" — decorativo: o <a> já tem aria-label e há texto visível (evita leitura tripla) */}
      <Image src={rsBrand.logo.rs} alt="" width={20} height={20} className="h-4 w-auto" />
      <span className="font-medium">RS Soluções Digitais</span>
    </a>
  )
}
