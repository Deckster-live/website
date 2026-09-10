import type { CaseStudyBlock } from "@/data/mockdata/case-studies";

/** Renders the admin-composed, per-case-study block list. Adding a new
 * block type only means adding a case here — the data shape and page
 * layout don't need to change. */
export function CaseStudyBlocks({ blocks }: { blocks: CaseStudyBlock[] }) {
  return (
    <div className="space-y-12 md:space-y-16">
      {blocks.map((block, i) => (
        <CaseStudyBlockView key={i} block={block} />
      ))}
    </div>
  );
}

function CaseStudyBlockView({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "richtext":
      return (
        <section>
          {block.heading && (
            <h2 className="font-display text-xl font-semibold md:text-2xl">
              {block.heading}
            </h2>
          )}
          <div
            className="legal-copy mt-4 text-[14.5px] leading-relaxed text-slate md:text-[15px]"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        </section>
      );

    case "stats":
      return (
        <section>
          {block.heading && (
            <h2 className="font-display text-xl font-semibold md:text-2xl">
              {block.heading}
            </h2>
          )}
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {block.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-semibold md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[0.6875rem] tracking-[0.18em] text-slate uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      );

    case "quote":
      return (
        <section className="border-l-2 border-signal pl-5 md:pl-6">
          <p className="font-display text-lg leading-snug font-medium md:text-xl">
            &ldquo;{block.quote}&rdquo;
          </p>
          {block.attribution && (
            <p className="mt-3 text-[13px] text-slate">{block.attribution}</p>
          )}
        </section>
      );

    case "gallery":
      return (
        <section>
          {block.heading && (
            <h2 className="font-display text-xl font-semibold md:text-2xl">
              {block.heading}
            </h2>
          )}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            {block.images.map((image, i) => (
              <figure
                key={image.src + i}
                className="overflow-hidden rounded-xl bg-mist ring-1 ring-black/5 md:rounded-2xl"
              >
                <img
                  src={image.src}
                  alt={image.caption ?? ""}
                  className="aspect-square w-full object-cover"
                />
                {image.caption && (
                  <figcaption className="p-2.5 text-[12px] text-slate">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      );

    case "reels":
      return (
        <section>
          {block.heading && (
            <h2 className="font-display text-xl font-semibold md:text-2xl">
              {block.heading}
            </h2>
          )}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
            {block.reels.map((reel, i) => (
              <a
                key={reel.cover + i}
                href={reel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/reel relative aspect-9/16 overflow-hidden rounded-xl bg-mist ring-1 ring-black/5 md:rounded-2xl"
              >
                <img
                  src={reel.cover}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover/reel:bg-black/15">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 opacity-0 shadow-sm transition-opacity duration-200 group-hover/reel:opacity-100">
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-0.5 h-4 w-4 fill-ink"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </section>
      );

    default:
      return null;
  }
}
