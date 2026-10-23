import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsOfService } from "@/data/mockdata/legal";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern your use of deckster.live and any brief or enquiry you submit through it.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage {...termsOfService} />;
}
