export interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  /** Raw HTML (h2/h3/p/ul/a) — the same shape the CRM's rich-text editor
   * will hand over, so this shell never needs to change when that lands. */
  html: string;
}

/** Shared shell for the Privacy Policy and Terms pages — a centered hero
 * plus a single-column article body, styled with the site's existing
 * tokens since there's no typography plugin in this project. */
export function LegalPage({
  eyebrow,
  title,
  intro,
  lastUpdated,
  html,
}: LegalPageProps) {
  return (
    <>
      <section className="px-5 pt-32 pb-10 md:px-8 md:pt-42 md:pb-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="font-display mt-5 text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.08] font-semibold">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-slate md:text-base">
            {intro}
          </p>
          <p className="mt-6 text-[13px] text-slate/80">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <div className="px-5 pb-24 md:px-8 md:pb-28">
        <div
          className="legal-copy mx-auto max-w-3xl text-[14.5px] leading-relaxed text-slate md:text-[15px]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </>
  );
}
