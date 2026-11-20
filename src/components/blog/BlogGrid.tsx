"use client";

import { useState } from "react";
import { PostCard } from "@/components/blog/PostCard";
import type { Post, PostCategory } from "@/data/blog";

/** The /blog grid with category chips. Every card is in the page's HTML; the chips only hide the others. */
export function BlogGrid({ posts, categories }: { posts: Post[]; categories: PostCategory[] }) {
  const [active, setActive] = useState<string | null>(null); // a category slug, or null for "All"
  const shown = active ? posts.filter((p) => p.category?.slug === active) : posts;

  const chip = (slug: string | null, label: string) => (
    <button
      key={slug ?? "all"}
      type="button"
      aria-pressed={active === slug}
      onClick={() => setActive(slug)}
      className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors ${
        active === slug
          ? "border-ink bg-ink text-paper"
          : "border-line-strong text-ink/75 hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      {/* Chips only when there's something to filter by. */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2.5">
          {chip(null, "All")}
          {categories.map((c) => chip(c.slug, c.title))}
        </div>
      )}
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </>
  );
}
