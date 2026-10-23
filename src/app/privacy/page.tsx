import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/data/mockdata/legal";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Deckster collects, uses and protects information from visitors and brands who submit a brief through deckster.live.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage {...privacyPolicy} />;
}
