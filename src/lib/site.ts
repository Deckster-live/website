import type { Metadata } from "next";
import { ADDRESS, EMAIL_HREF, LEGAL_NAME, PHONE_HREF } from "@/lib/contact";

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

/**
 * Founder, shown on /about and linked from the Organization schema. Every
 * press item is a page that quotes him by name.
 */
export const FOUNDER = {
  name: "Shivam Agarwal",
  role: "Founder, Deckster",
  linkedin: "https://www.linkedin.com/in/shivam1504/",
  photo: "/images/founder-shivam-cutout.webp" as string | undefined,
  press: [
    {
      outlet: "Storyboard18",
      date: "29 Oct 2026",
      title:
        "From Madan Gowri to Varun Mayya, how creators from the South are rewriting the talent management playbook",
      url: "https://www.storyboard18.com/influencer-marketing/from-madan-gowri-to-varun-mayya-why-creators-from-the-south-are-rewriting-the-talent-management-playbook-113419.htm",
    },
    {
      outlet: "Storyboard18",
      date: "28 Oct 2026",
      title:
        "Regional creators earn up to 60% less than Hindi influencers despite comparable engagement",
      url: "https://www.storyboard18.com/influencer-marketing/regional-creators-earn-up-to-60-less-than-hindi-influencers-despite-comparable-engagement-113494.htm",
    },
    {
      outlet: "Storyboard18",
      date: "26 Oct 2026",
      title:
        "India's influencer economy splits: small creators juggle rival brands, celebrities lock in exclusive deals",
      url: "https://www.storyboard18.com/influencer-marketing/indias-influencer-economy-splits-small-creators-juggle-rival-brands-celebrities-lock-in-exclusive-deals-113365.htm",
    },
    {
      outlet: "NDTV Profit · The Big Question",
      date: "Panel",
      title: "Can legacy brands truly crack the Gen Z code in 2026?",
      url: "https://www.youtube.com/watch?v=XPcLUWpa3DE&t=665s",
    },
    {
      outlet: "Moneycontrol",
      date: "30 Sep 2022",
      title:
        "YouTube Shorts is sharing ad revenue. Will that mean more money for creators?",
      url: "https://www.moneycontrol.com/news/trends/youtube-shorts-is-sharing-ad-revenue-will-that-mean-more-money-for-creators-9256061.html",
    },
    {
      outlet: "Moneycontrol",
      date: "22 Jun 2022",
      title: "Here's what the new TDS rule means for social media influencers",
      url: "https://www.moneycontrol.com/news/business/heres-what-the-new-tds-rule-means-for-social-media-influencers-8724431.html",
    },
  ],
};

const founderJsonLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/about#shivam-agarwal`,
  name: FOUNDER.name,
  jobTitle: "Founder",
  url: `${SITE_URL}/about`,
  ...(FOUNDER.photo && { image: `${SITE_URL}${FOUNDER.photo}` }),
  sameAs: [FOUNDER.linkedin],
  worksFor: { "@id": `${SITE_URL}/#organization` },
};

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
  // Registered office, as published in the footer, privacy policy and terms.
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.locality,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.country,
  },
  areaServed: "IN",
  foundingDate: "2020",
  founder: founderJsonLd,
  parentOrganization: {
    "@type": "Organization",
    name: LEGAL_NAME,
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
