import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { Section } from "@/components/ui/primitives";
import { postCategories, posts } from "@/data/blog";
import { jsonLd, pageMetadata, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Influencer Marketing Blog",
    description:
      "Guides and campaign data on influencer and creator marketing in India, from the team that plans, runs and reports Deckster's campaigns.",
    path: "/blog",
  }),
  // Lets feed readers find the RSS feed from this page.
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

/** Every post, newest first, with category filter chips. */
export default function BlogPage() {
  // Hidden until the first post is published: the page is then a plain "not found".
  if (posts.length === 0) notFound();

  const url = `${SITE_URL}/blog`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Deckster Blog",
      url,
      publisher: { "@id": `${SITE_URL}/#organization` },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: `${SITE_URL}/blog/${post.slug}`,
        datePublished: post.published,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />

      <section className="px-5 pt-32 md:px-8 md:pt-42">
        <div className="animate-rise mx-auto max-w-3xl text-center">
          <p className="eyebrow">Blog</p>
          <h1 className="font-display mt-5 text-[clamp(2.1rem,6vw,3.6rem)] leading-[1.06] font-semibold">
            Notes on creator marketing
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-ink/75 md:text-lg">
            What we learn running influencer campaigns for brands: the playbooks, the numbers, and what
            we&rsquo;d do differently.
          </p>
        </div>
      </section>

      <Section className="pt-12 md:pt-16 lg:pt-16">
        <BlogGrid posts={posts} categories={postCategories} />
      </Section>
    </>
  );
}
