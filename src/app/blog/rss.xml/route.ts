import { posts } from "@/data/blog";
import { SITE_URL } from "@/lib/site";

// RSS feed of the blog, written to out/blog/rss.xml at build time (a static export has no server).
export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = posts
    .map(
      (post) => `    <item>
      <title>${escape(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid>${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.published).toUTCString()}</pubDate>
      <description>${escape(post.meta_description)}</description>${post.category ? `\n      <category>${escape(post.category.title)}</category>` : ""}
    </item>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Deckster Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Influencer and creator marketing guides and campaign data from Deckster.</description>
    <language>en-IN</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
