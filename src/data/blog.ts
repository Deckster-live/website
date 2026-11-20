import content from "@/data/generated/content.json";

/**
 * Blog posts, written and approved in the CMS (admin.deckster.live).
 * scripts/fetch-content.mjs writes them, newest first, into the generated
 * content file before every build and dev run.
 *
 * While there are none, everything blog-related (nav link, homepage section,
 * sitemap, RSS, llms.txt) stays hidden: check `posts.length`.
 */

export interface PostCategory {
  title: string;
  slug: string;
}

export interface Post {
  slug: string;
  title: string;
  subtitle?: string;
  /** Optional in the CMS: a post without one has no eyebrow and shows only under "All". */
  category: PostCategory | null;
  author: {
    name: string;
    role?: string;
    bio?: string;
    linkedin?: string;
    avatar?: string;
  };
  /** One cover in three sizes: the post's hero (1600x700), cards (800x600) and link previews (1200x630). */
  cover: { alt: string; hero: string; card: string; og: string };
  /** The body as HTML, styled by the `prose-deckster` utility. */
  html: string;
  /** The body's H2s, for the table of contents. */
  toc: { id: string; text: string }[];
  reading_minutes: number;
  faq: { question: string; answer: string }[];
  /** ISO dates. */
  published: string;
  modified: string;
  meta_title?: string;
  meta_description: string;
  show_on_homepage: boolean;
}

export const posts = (content.posts ?? []) as Post[];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Categories that have at least one post, in first-use order: the filter chips on /blog. */
export const postCategories: PostCategory[] = [
  ...new Map(
    posts.flatMap((p) => (p.category ? [[p.category.slug, p.category]] : [])) as [string, PostCategory][],
  ).values(),
];

/** Up to three other posts, same category first, then the newest. */
export function relatedPosts(post: Post): Post[] {
  const others = posts.filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => post.category && p.category?.slug === post.category.slug);
  return [...same, ...others.filter((p) => !same.includes(p))].slice(0, 3);
}

/** The homepage blog section: posts ticked "Show on homepage", or the newest when none are. */
export const homepagePosts = (
  posts.some((p) => p.show_on_homepage) ? posts.filter((p) => p.show_on_homepage) : posts
).slice(0, 3);

/** "20 Nov 2026", the same on the server and in the browser. */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}
