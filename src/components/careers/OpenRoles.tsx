import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/primitives";
import { getOpenRoles, type CareerRole } from "@/data/mockdata/careers";

interface OpenRolesProps {
  /** Cap the list and show a "See all openings" link once open roles exceed it. Omit to show every open role. */
  limit?: number;
  eyebrow?: string;
  title?: string;
  copy?: string;
}

function RoleCard({ role }: { role: CareerRole }) {
  return (
    <Link
      href={`/careers/${role.slug}`}
      className="group block rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-line-strong hover:bg-mist/40 md:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow">{role.department}</p>
          <p className="font-display mt-2 text-lg font-semibold md:text-xl">
            {role.name}
          </p>
          <p className="mt-2 text-[13.5px] text-slate">
            {role.experience} · {role.location} · {role.type}
          </p>
        </div>

        <span className="mt-1 hidden sm:inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:bg-ink group-hover:text-paper">
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>

      <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-slate">
        {role.summary}
      </p>
    </Link>
  );
}

export function OpenRoles({
  limit,
  eyebrow = "Careers",
  title = "Open positions",
  copy = "Every role that's open right now — apply directly, no recruiter middleman.",
}: OpenRolesProps) {
  const roles = getOpenRoles();
  const shown = limit ? roles.slice(0, limit) : roles;
  const hasMore = limit !== undefined && roles.length > limit;

  return (
    <Section id="openings">
      <SectionHead eyebrow={eyebrow} title={title} copy={copy} />

      <div className="mt-12 space-y-4 md:mt-16">
        {shown.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line-strong p-8 text-center">
            <p className="text-[15px] text-slate">
              Nothing open right now — but if you think you&rsquo;d be a fit,
              we&rsquo;d still like to hear from you.
            </p>
            <a
              href="mailto:hello@deckster.live"
              className="mt-3 inline-block text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-signal"
            >
              hello@deckster.live
            </a>
          </div>
        ) : (
          shown.map((role) => <RoleCard key={role.slug} role={role} />)
        )}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <Link
            href="/careers/openings"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink"
          >
            <span className="relative">
              See all {roles.length} openings
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-signal opacity-0 transition-all duration-300 ease-out group-hover:w-full group-hover:opacity-100" />
            </span>
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      )}
    </Section>
  );
}
