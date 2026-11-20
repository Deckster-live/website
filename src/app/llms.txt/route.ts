import { posts } from "@/data/blog";
import { caseStudies } from "@/data/mockdata/case-studies";
import { SITE_URL } from "@/lib/site";

// Written to out/llms.txt at build time (a static export has no server), so the
// case-study list follows the CMS like the sitemap does.
export const dynamic = "force-static";

export function GET() {
  const studies = caseStudies
    .map((study) => `- [${study.brand}](${SITE_URL}/case-studies/${study.slug})`)
    .join("\n");
  // Listed once the blog has a post.
  const blog = posts.length
    ? `\n## Blog\n\n- [All posts](${SITE_URL}/blog)\n${posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug})`).join("\n")}\n`
    : "";

  const body = `# Deckster

> Deckster runs creator (influencer) marketing campaigns for brands end to end. We match brands with creators using data, then handle planning, negotiation, content approvals, paid amplification, live tracking and final reporting under one roof.

## Pages

- [Home](${SITE_URL}/): what Deckster does, use cases, results, how we work, FAQ and a brief form
- [About](${SITE_URL}/about): our story, founder Shivam Agarwal and how we work
- [Contact](${SITE_URL}/contact): send a brief, email or call
- [Careers](${SITE_URL}/careers): life at Deckster and every open role

## Case studies

- [All case studies](${SITE_URL}/case-studies)
${studies}
${blog}
## Contact

- Email: hello@deckster.live
- WhatsApp: https://wa.me/919650361888
- Office: Talk Native Marketing Private Limited, P3C121, Princeton Estate, DLF City Phase V, Gurugram, Haryana 122002

## Legal

- [Privacy Policy](${SITE_URL}/privacy)
- [Terms of Service](${SITE_URL}/terms)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
