import type { Metadata } from "next";
import { jsonLd, pageMetadata, SITE_URL } from "@/lib/site";
import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutCta } from "@/components/about/AboutCta";
import { AboutFounder } from "@/components/about/AboutFounder";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutImpact } from "@/components/about/AboutImpact";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutVisionMission } from "@/components/about/AboutVisionMission";

export const metadata: Metadata = pageMetadata({
  title: "About Us: Creator Marketing Agency & Founder",
  description:
    "Deckster is an influencer and creator marketing agency for Indian brands, founded in 2020 by Shivam Agarwal. How we pick creators, run campaigns and report live.",
  path: "/about",
});

// The page is about the organisation; its founder is linked by @id from the Organization schema.
const aboutJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about#webpage`,
    url: `${SITE_URL}/about`,
    name: "About Deckster",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    mainEntity: { "@id": `${SITE_URL}/#organization` },
    mentions: { "@id": `${SITE_URL}/about#shivam-agarwal` },
    inLanguage: "en-IN",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(aboutJsonLd)}
      />
      <AboutHero />
      {/* One padding for every section so the gap between any two is the same
          (and matches the space inside the tinted Values band). */}
      <div className="[&>section]:py-16 md:[&>section]:py-20 lg:[&>section]:py-24">
        <AboutStory />
        <AboutFounder />
        <AboutVisionMission />
        <AboutValues />
        <AboutApproach />
        <AboutImpact />
        <AboutCta />
      </div>
    </>
  );
}
