import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

/**
 * robots.txt — libera o crawl da home e aponta o sitemap. A política de
 * privacidade é marcada noindex na própria página (metadata robots).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
