import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    // No `host`: Google and Bing ignore the non-standard Host directive.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
