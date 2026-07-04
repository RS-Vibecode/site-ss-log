import Link from "next/link"
// lucide-react removeu brand icons; copie social-icons.tsx para components/site/
import { InstagramIcon, LinkedinIcon } from "@/components/site/social-icons"
import { siteConfig } from "@/lib/site"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <p className="font-semibold text-lg">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 sm:flex sm:gap-8">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            {siteConfig.social?.instagram && (
              <Link href={siteConfig.social.instagram} aria-label="Instagram" target="_blank">
                <InstagramIcon className="size-5 text-muted-foreground hover:text-foreground" />
              </Link>
            )}
            {siteConfig.social?.linkedin && (
              <Link href={siteConfig.social.linkedin} aria-label="LinkedIn" target="_blank">
                <LinkedinIcon className="size-5 text-muted-foreground hover:text-foreground" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
