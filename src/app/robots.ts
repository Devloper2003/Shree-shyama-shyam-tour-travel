import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Dynamic robots.txt
 * Route: /robots.txt
 *
 * - Allows all crawlers to index all pages
 * - Points to sitemap.xml for discovery
 * - Disables /admin and /api routes from indexing
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.seo.siteUrl;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
