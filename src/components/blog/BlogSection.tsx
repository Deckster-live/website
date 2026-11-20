import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";
import { HEAD_GAP, Section, SectionHead } from "@/components/ui/primitives";
import { homepagePosts } from "@/data/blog";

/** Homepage blog section: posts ticked "Show on homepage" in the CMS (or the newest). Hidden with no posts. */
export function BlogSection() {
  if (homepagePosts.length === 0) return null;

  return (
    <Section id="blog">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          eyebrow="Blog"
          title="Notes on creator marketing"
          copy="Playbooks and campaign numbers from the team running the campaigns."
        />
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          All blog posts
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </div>
      <ul className={`${HEAD_GAP} grid gap-5 sm:grid-cols-2 lg:grid-cols-3`}>
        {homepagePosts.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
