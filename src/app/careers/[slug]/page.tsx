import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { careerRoles, getRoleBySlug } from "@/data/mockdata/careers";

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

  return {
    title: role.name,
    description: role.summary,
  };
}

export default async function RolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  const meta = [role.experience, role.location, role.type];

  return (
    <>
      <section className="px-5 pt-32 pb-10 md:px-8 md:pt-42 md:pb-14">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/careers/openings"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            All openings
          </Link>

          <p className="eyebrow mt-8">{role.department}</p>
          <h1 className="font-display mt-4 text-[clamp(1.9rem,5vw,2.85rem)] leading-[1.1] font-semibold">
            {role.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[14.5px] text-slate">
            {meta.map((item, i) => (
              <span key={item} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>·</span>}
                {item}
              </span>
            ))}
          </div>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate">
            {role.summary}
          </p>

          <div className="mt-8">
            {role.open ? (
              <Link
                href={`/careers/${role.slug}/apply`}
                className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-medium whitespace-nowrap text-paper transition-colors hover:bg-green-dark"
              >
                Apply for this role
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-slate">
                No longer accepting applications
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="px-5 pb-24 md:px-8 md:pb-28">
        <div
          className="legal-copy mx-auto max-w-3xl text-[14.5px] leading-relaxed text-slate md:text-[15px]"
          dangerouslySetInnerHTML={{ __html: role.jd }}
        />
      </div>
    </>
  );
}
