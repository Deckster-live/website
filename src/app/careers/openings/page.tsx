import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { OpenRoles } from "@/components/careers/OpenRoles";

export const metadata: Metadata = pageMetadata({
  title: "All Openings",
  description:
    "Every open role at Deckster in one place — influencer marketing, business development and more. Apply directly, no recruiter in between.",
  path: "/careers/openings",
});

export default function AllOpeningsPage() {
  return (
    <div className="pt-12 md:pt-16">
      <OpenRoles
        title="All open roles"
        headingAs="h1"
        copy="The full list — no limit, nothing held back for a second page."
      />
    </div>
  );
}
