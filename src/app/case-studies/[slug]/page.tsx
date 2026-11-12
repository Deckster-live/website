import type { Metadata } from "next";
import { jsonLd, pageMetadata, SITE_URL } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
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

  return pageMetadata({
    title: `${study.brand} Influencer Marketing Case Study`,
    // Lead with the headline number so the snippet shows the result.
    description: `${study.usp_metric} ${study.usp}. ${study.description}`,
    path: `/case-studies/${study.slug}`,
    type: "article",
  });
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
  const url = `${SITE_URL}/case-studies/${study.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${study.brand}: ${study.usp_metric} ${study.usp}`,
      description: study.description,
      url,
      image: `${SITE_URL}${study.brand_logo}`,
      mainEntityOfPage: url,
      // The client brand the campaign was for.
      about: { "@type": "Brand", name: study.brand },
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: `${study.brand} Case Study`, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(structuredData)}
      />
      <section className="relative isolate overflow-hidden px-5 pt-32 pb-14 md:px-8 md:pt-42 md:pb-16">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src="/images/wave-bg.webp"
            alt=""
            fill
            preload
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
            alt={`${study.brand} logo`}
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

          {/* Links every study to the others, so none depends on the homepage carousel to be found. */}
          <nav aria-labelledby="more-case-studies">
            <h2
              id="more-case-studies"
              className="font-display text-2xl font-semibold"
            >
              More case studies
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {caseStudies
                .filter((c) => c.slug !== study.slug)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/case-studies/${c.slug}`}
                      className="block rounded-2xl border border-line p-4 transition-colors hover:bg-mist"
                    >
                      <span className="block font-medium">{c.brand}</span>
                      <span className="mt-1 block text-sm text-slate">
                        {c.usp_metric} {c.usp}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
