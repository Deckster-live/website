import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  caseStudies,
  getCaseStudyBySlug,
  THEMES,
} from "@/data/mockdata/case-studies";
import { CaseStudyBlocks } from "@/components/case-study/CaseStudyBlocks";
import {
  CaseStudyApproach,
  CaseStudyChallenge,
  CaseStudyLearning,
  CaseStudyOverview,
  CaseStudyPlatforms,
  CaseStudyReels,
  CaseStudyResults,
} from "@/components/case-study/CaseStudySections";

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

  return (
    <>
      <section className="relative isolate overflow-hidden px-5 pt-32 pb-14 md:px-8 md:pt-42 md:pb-16">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src="/images/wave-bg.webp"
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
            <span className="text-green-dark">{study.usp_metric}</span>{" "}
            {study.usp}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-slate">
            {study.description}
          </p>

          {study.platforms && study.platforms.length > 0 && (
            <div className="mt-6">
              <CaseStudyPlatforms platforms={study.platforms} />
            </div>
          )}
        </div>
      </section>

      <div className="px-5 pt-12 pb-24 md:px-8 md:pt-16 md:pb-28">
        <div className="mx-auto max-w-3xl space-y-12 md:space-y-16">
          <CaseStudyOverview overview={study.overview} />
          <CaseStudyChallenge points={study.challenge} />
          <CaseStudyApproach steps={study.approach} />
          <CaseStudyBlocks blocks={study.content} />
          <CaseStudyReels reels={study.reels} />
          <CaseStudyResults
            points={study.results}
            metrics={study.metrics}
            reportUrl={study.report_url}
          />
          {study.learning && <CaseStudyLearning learning={study.learning} />}
        </div>
      </div>
    </>
  );
}
