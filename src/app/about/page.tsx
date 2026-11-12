import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
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

export default function AboutPage() {
  return (
    <>
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
