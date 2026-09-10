import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  caseStudies,
  getCaseStudyBySlug,
  THEMES,
} from "@/data/mockdata/case-studies";
import { CaseStudyBlocks } from "@/components/case-study/CaseStudyBlocks";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};

  return {
    title: `${study.brand} Case Study`,
    description: study.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const theme = THEMES[study.theme];

  const fixedSections = [
    { heading: "Overview", html: study.overview },
    { heading: "The Challenge", html: study.challenge },
    { heading: "Our Approach", html: study.approach },
    { heading: "The Results", html: study.results },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden px-5 pt-32 pb-16 md:px-8 md:pt-42 md:pb-20">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src="/images/wave.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-paper/65" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-b from-transparent to-paper" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="eyebrow flex items-center justify-center gap-2">
            <span
              aria-hidden
              className={`inline-block h-1.5 w-1.5 rounded-full ${theme.dot}`}
            />
            Case Study — {study.brand}
          </p>

          <img
            src={study.brand_logo}
            alt={study.brand}
            className="mx-auto mt-6 h-12 w-auto object-contain"
            style={
              study.logo_scale
                ? { transform: `scale(${study.logo_scale})` }
                : undefined
            }
          />

          <h1 className="font-display mt-6 text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.1] font-semibold">
            {study.usp_metric} {study.usp}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-slate">
            {study.description}
          </p>

          <div className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-3">
            {study.metrics.map((m, i) => (
              <div
                key={m.label}
                className={`min-w-0 ${i > 0 ? "border-l border-line-strong pl-3" : ""}`}
              >
                <p className="font-display text-xl leading-none font-semibold md:text-2xl">
                  {m.value}
                </p>
                <p className="mt-1.5 text-[0.6875rem] tracking-[0.18em] text-slate uppercase">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="px-5 pt-16 pb-8 md:px-8 md:pt-20">
        <div className="mx-auto max-w-3xl space-y-12 md:space-y-16">
          {fixedSections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl font-semibold md:text-2xl">
                {section.heading}
              </h2>
              <div
                className="legal-copy mt-4 text-[14.5px] leading-relaxed text-slate md:text-[15px]"
                dangerouslySetInnerHTML={{ __html: section.html }}
              />
            </section>
          ))}
        </div>
      </div>

      <div className="px-5 pt-8 pb-24 md:px-8 md:pt-10 md:pb-28">
        <div className="mx-auto max-w-3xl">
          <CaseStudyBlocks blocks={study.content} />
        </div>
      </div>
    </>
  );
}
