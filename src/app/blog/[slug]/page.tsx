import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AuthorAvatar, PostCard } from "@/components/blog/PostCard";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { formatDate, getPostBySlug, posts, relatedPosts } from "@/data/blog";
import { jsonLd, pageMetadata, SITE_URL } from "@/lib/site";

// Only the posts known at build time exist (a static export has no server to render others).
export const dynamicParams = false;

export function generateStaticParams() {
  // A static export refuses a dynamic page with no paths at all, so before the first post there is one
  // placeholder that renders "not found". Nothing links to it and it isn't in the sitemap.
  return posts.length ? posts.map((post) => ({ slug: post.slug })) : [{ slug: "coming-soon" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.meta_title ?? post.title,
    description: post.meta_description,
    path: `/blog/${post.slug}`,
    type: "article",
    image: { url: post.cover.og, width: 1200, height: 630, alt: post.cover.alt },
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  // The FAQ sits at the end of the body, so it gets an entry in the table of contents too.
  const toc = post.faq.length ? [...post.toc, { id: "faq", text: "Frequently asked questions" }] : post.toc;
  const related = relatedPosts(post);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.meta_description,
      url,
      mainEntityOfPage: url,
      image: [`${SITE_URL}${post.cover.og}`, `${SITE_URL}${post.cover.hero}`],
      datePublished: post.published,
      dateModified: post.modified,
      ...(post.category && { articleSection: post.category.title }),
      author: {
        "@type": "Person",
        name: post.author.name,
        ...(post.author.role && { jobTitle: post.author.role }),
        ...(post.author.linkedin && { sameAs: [post.author.linkedin] }),
        worksFor: { "@id": `${SITE_URL}/#organization` },
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
    ...(post.faq.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faq.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />

      <article className="px-5 pt-30 pb-20 md:px-8 md:pt-38 md:pb-28">
        <div className="mx-auto max-w-310">
          {/* --- Header: back link, category, title, subtitle, byline --- */}
          <header className="mx-auto max-w-4xl text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-slate transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              All Blog Posts
            </Link>
            {post.category && <p className="eyebrow mt-8 text-green-dark!">{post.category.title}</p>}
            <h1 className="font-display mt-4 text-[clamp(2rem,5.2vw,3.4rem)] leading-[1.08] font-semibold text-ink">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-slate md:text-lg">
                {post.subtitle}
              </p>
            )}
          </header>

          <div className="mx-auto mt-10 flex max-w-310 flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <div className="flex items-center gap-3">
              <AuthorAvatar author={post.author} size={44} />
              <div className="text-left">
                <p className="text-[15px] font-medium text-ink">{post.author.name}</p>
                {post.author.role && <p className="text-[13.5px] text-slate">{post.author.role}</p>}
              </div>
            </div>
            <p className="text-[14px] text-slate">
              <time dateTime={post.published}>{formatDate(post.published)}</time>
              <span aria-hidden className="mx-2 text-line-strong">|</span>
              {post.reading_minutes} min read
            </p>
          </div>

          {/* --- Cover: the CMS's 1600x700 hero size, the page's main image --- */}
          {/* eslint-disable-next-line @next/next/no-img-element -- static export: already sized by the CMS */}
          <img
            src={post.cover.hero}
            alt={post.cover.alt}
            width={1600}
            height={700}
            fetchPriority="high"
            className="mt-6 aspect-16/7 w-full rounded-[1.75rem] object-cover"
          />

          {/* --- Body (8 columns) and the corner that stays in view (4 columns) --- */}
          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-8">
              <div className="prose-deckster" dangerouslySetInnerHTML={{ __html: post.html }} />

              {post.faq.length > 0 && (
                <section id="faq" className="mt-14 scroll-mt-28 border-t border-line pt-10">
                  <h2 className="font-display text-[1.6rem] leading-tight font-semibold text-ink">
                    Frequently asked questions
                  </h2>
                  <dl className="mt-6 space-y-6">
                    {post.faq.map((f) => (
                      <div key={f.question}>
                        <dt className="font-display text-[1.1rem] font-semibold text-ink">{f.question}</dt>
                        <dd className="mt-2 text-[16px] leading-relaxed text-ink/80">{f.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
            </div>

            {/* On phones this sits under the body. */}
            <aside className="lg:col-span-4">
              <div className="space-y-8 lg:sticky lg:top-28">
                {toc.length > 0 && <TableOfContents items={toc} />}
                <ShareButtons url={url} title={post.title} />

                {/* Fixed promo, the same on every post. */}
                <div className="glow-field rounded-[1.75rem] bg-mist p-6">
                  <p className="font-display text-[1.35rem] leading-tight font-semibold text-ink">
                    Running a creator campaign?
                  </p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-slate">
                    We pick the creators, run the campaign and report every number from live data. Tell us
                    your goal and we&rsquo;ll send a plan.
                  </p>
                  <Link
                    href="/#cta"
                    className="mt-5 inline-flex items-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-85"
                  >
                    Discover More
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-310">
            <h2 className="font-display text-[clamp(1.6rem,3.6vw,2.3rem)] leading-tight font-semibold text-ink">
              Related Blogs
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
