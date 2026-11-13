import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/mockdata/case-studies";
import { getOpenRoles } from "@/data/mockdata/careers";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly",
  ) => ({ url: `${SITE_URL}${path}`, priority, changeFrequency });

  return [
    page("", 1, "weekly"),
    page("/about", 0.7, "monthly"),
    page("/contact", 0.7, "monthly"),
    page("/case-studies", 0.8, "weekly"),
    ...caseStudies.map((study) =>
      page(`/case-studies/${study.slug}`, 0.8, "monthly"),
    ),
    page("/careers", 0.6, "weekly"),
    // Apply pages are noindex, so only the JD pages are listed.
    ...getOpenRoles().map((role) => ({
      ...page(`/careers/${role.slug}`, 0.5, "monthly"),
      lastModified: role.postedOn,
    })),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
