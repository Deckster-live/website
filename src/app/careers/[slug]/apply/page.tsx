import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { careerRoles, getRoleBySlug } from "@/data/mockdata/careers";
import { ApplyPageBody } from "@/components/careers/ApplyPageBody";

export function generateStaticParams() {
  return careerRoles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) return {};

  return { title: `Apply — ${role.name}` };
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  return (
    <section className="px-5 pt-32 pb-24 md:px-8 md:pt-42 md:pb-28">
      <div className="mx-auto max-w-2xl">
        <Link
          href={`/careers/${role.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          {role.name}
        </Link>

        {role.open ? (
          <ApplyPageBody role={role} />
        ) : (
          <>
            <div className="mt-8 text-center">
              <p className="eyebrow">{role.department}</p>
              <h1 className="font-display mt-4 text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.1] font-semibold">
                Apply for {role.name}
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate">
                Tell us a bit about you — we read every application and get
                back to shortlisted candidates within a week.
              </p>
            </div>

            <div className="mt-14 rounded-2xl border border-dashed border-line-strong p-8 text-center">
              <p className="text-[15px] text-slate">
                This role isn&rsquo;t currently accepting applications. Have a
                look at what else is open, or reach out directly — we keep
                good applications on file.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <Link
                  href="/careers/openings"
                  className="text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-signal"
                >
                  See all openings
                </Link>
                <a
                  href="mailto:hello@deckster.live"
                  className="text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-signal"
                >
                  hello@deckster.live
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
