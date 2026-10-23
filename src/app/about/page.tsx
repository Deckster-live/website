import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutCta } from "@/components/about/AboutCta";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutImpact } from "@/components/about/AboutImpact";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutVisionMission } from "@/components/about/AboutVisionMission";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Deckster is a technology-driven place for brands to plan, launch and scale influencer-led campaigns — matched by data, not guesswork.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutVisionMission />
      <AboutValues />
      <AboutApproach />
      <AboutImpact />
      <AboutCta />
    </>
  );
}
