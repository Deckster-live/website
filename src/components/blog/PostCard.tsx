import Link from "next/link";
import { formatDate, type Post } from "@/data/blog";

/** Round author photo, or their initials when the CMS has no photo. */
export function AuthorAvatar({ author, size = 28 }: { author: Post["author"]; size?: number }) {
  if (!author.avatar) {
    return (
      <span
        aria-hidden
        style={{ width: size, height: size }}
        className="grid shrink-0 place-items-center rounded-full bg-green-dark text-[11px] font-semibold text-white"
      >
        {author.name
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("")}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export: images are already sized by the CMS
    <img
      src={author.avatar}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}

/** A post on /blog, under a post ("Related Blogs") and on the homepage: cover, category, title, subtitle, byline. */
export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-[1.75rem] bg-mist p-2.5 transition duration-300 hover:-translate-y-1 hover:shadow-(--shadow-soft)"
    >
      <div className="aspect-4/3 overflow-hidden rounded-[1.35rem]">
        {/* eslint-disable-next-line @next/next/no-img-element -- the CMS's 800x600 card size */}
        <img
          src={post.cover.card}
          alt={post.cover.alt}
          width={800}
          height={600}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col px-3.5 pt-5 pb-4">
        {post.category && <p className="eyebrow text-green-dark!">{post.category.title}</p>}
        <h3 className="font-display mt-2.5 text-[1.3rem] leading-snug font-semibold text-ink">
          {post.title}
        </h3>
        {post.subtitle && (
          <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-slate">{post.subtitle}</p>
        )}
        <div className="mt-auto flex items-center gap-2.5 pt-5 text-[13px] text-slate">
          <AuthorAvatar author={post.author} />
          <span className="font-medium text-ink">{post.author.name}</span>
          <span aria-hidden className="text-line-strong">|</span>
          <time dateTime={post.published}>{formatDate(post.published)}</time>
        </div>
      </div>
    </Link>
  );
}
