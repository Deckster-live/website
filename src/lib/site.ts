import type { Metadata } from "next";
import { EMAIL_HREF, PHONE_HREF } from "@/lib/contact";

/** Canonical origin — every canonical URL, OG URL and sitemap entry hangs off this. */
export const SITE_URL = "https://deckster.live";
export const SITE_NAME = "Deckster";
export const SITE_TAGLINE = "Creator marketing, end to end";
export const SITE_DESCRIPTION =
  "Deckster matches brands with the right creators — by data, not guesswork — then plans, runs, tracks and reports the whole campaign under one roof.";

/** Profiles listed as `sameAs` in the Organization structured data. */
export const SOCIAL_PROFILES = [
  "https://www.instagram.com/decksterlive/",
  "https://in.linkedin.com/company/deckster-live",
];

const SHARE_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Deckster — reach your customers through creators they already trust.",
};

interface PageMetaInput {
  title: string;
  description: string;
  /** Path from the site root, e.g. "/about". */
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
}

/**
 * Per-page metadata with a canonical URL and matching Open Graph / Twitter
 * tags. Next replaces (not merges) a parent's `openGraph` object — including
 * the image from `app/opengraph-image.png` — so every page goes through here
 * to keep the share image, siteName and locale on each one.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  noindex,
}: PageMetaInput): Metadata {
  const fullTitle = `${title} · ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: "en_IN",
      url: path,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description: SITE_DESCRIPTION,
  email: EMAIL_HREF.replace("mailto:", ""),
  telephone: PHONE_HREF.replace("tel:", ""),
  sameAs: SOCIAL_PROFILES,
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

/** JSON.stringify with `<` escaped so a stray "</script>" in data can't break out. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
