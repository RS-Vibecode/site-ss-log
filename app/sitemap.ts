import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

/**
 * Sitemap — apenas a home. A /politica-privacidade é noindex e fica de fora.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
