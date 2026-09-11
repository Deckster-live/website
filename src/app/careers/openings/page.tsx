import type { Metadata } from "next";
import { OpenRoles } from "@/components/careers/OpenRoles";

export const metadata: Metadata = {
  title: "All Openings",
  description: "Every open role at Deckster, in one place.",
};

export default function AllOpeningsPage() {
  return (
    <div className="pt-12 md:pt-16">
      <OpenRoles
        title="All open roles"
        copy="The full list — no limit, nothing held back for a second page."
      />
    </div>
  );
}
