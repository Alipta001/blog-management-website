import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/blogs", "/blogs/*"],
      disallow: ["/dashboard/", "/admin/", "/author/", "/api/", "/login", "/register"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}