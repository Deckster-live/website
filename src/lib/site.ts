import type { Metadata } from "next";
import { EMAIL_HREF, PHONE_HREF } from "@/lib/contact";

/** Canonical origin — every canonical URL, OG URL and sitemap entry hangs off this. */
export const SITE_URL = "https://deckster.live";
export const SITE_NAME = "Deckster";
export const SITE_TAGLINE = "Influencer & Creator Marketing Agency in India";
export const SITE_DESCRIPTION =
  "Data-led influencer and creator marketing agency in India. We match brands with the right creators, then run, track and report every campaign.";

/** Profiles listed as `sameAs` in the Organization structured data. */
export const SOCIAL_PROFILES = [
  "https://www.instagram.com/decksterlive/",
  "https://in.linkedin.com/company/deckster-live",
  "https://yourstory.com/companies/deckster",
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

// "Deckster Live" as the primary name separates us from other Decksters
// (e.g. deckster.pro) in Google's entity matching and site-name display.
const ENTITY_NAME = "Deckster Live";
const ENTITY_ALT_NAMES = ["Deckster", "deckster.live"];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: ENTITY_NAME,
  alternateName: ENTITY_ALT_NAMES,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/icon.png`,
    width: 192,
    height: 192,
  },
  description: SITE_DESCRIPTION,
  email: EMAIL_HREF.replace("mailto:", ""),
  telephone: PHONE_HREF.replace("tel:", ""),
  // Registered office, as published in the privacy policy and terms.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rudrapur",
    addressRegion: "Uttarakhand",
    postalCode: "263153",
    addressCountry: "IN",
  },
  areaServed: "IN",
  parentOrganization: {
    "@type": "Organization",
    name: "Talk Native Marketing Private Limited",
  },
  sameAs: SOCIAL_PROFILES,
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: ENTITY_NAME,
  alternateName: ENTITY_ALT_NAMES,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-IN",
};

/** JSON.stringify with `<` escaped so a stray "</script>" in data can't break out. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
