import { ArrowUpRight } from "lucide-react";
import { IconBrandLinkedin } from "@tabler/icons-react";
import { HashLink } from "@/components/ui/HashLink";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getOpenRoles } from "@/data/mockdata/careers";
import Image from "next/image";

export function CareerHero() {
  const openCount = getOpenRoles().length;

  return (
    <section id="top" className="px-5 pt-32 pb-16 md:px-8 md:pt-42 md:pb-20">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/images/bg3.jpg"
          alt=""
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-linear-to-b from-paper/45 via-paper/55 to-paper" />
      </div>
      <div className="animate-rise mx-auto max-w-4xl text-center">
        <h1 className="font-display mt-6 text-[clamp(2.1rem,6vw,3.85rem)] leading-[1.06] font-semibold">
          Help brands grow, on a team that&rsquo;s growing too
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-slate md:text-lg">
          We&rsquo;re a small, fast-moving team building the way brands run
          creator marketing. Come own real problems, work directly with brands,
          and grow as fast as the company does.
        </p>

        <div className="mt-9 flex flex-row items-center justify-center gap-2.5 sm:gap-3">
          <HashLink
            href="/careers#openings"
            className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-medium whitespace-nowrap text-paper transition-colors hover:bg-green-dark"
          >
            View open roles
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </HashLink>

          {/* <a
            href="https://in.linkedin.com/company/deckster-live"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors hover:bg-mist"
          >
            <IconBrandLinkedin className="h-4 w-4" strokeWidth={1.75} />
            Our social media
          </a> */}
        </div>
      </div>
      <div className="mt-25 md:w-[60%] border-4 border-solid border-white mx-auto surface overflow-hidden rounded-2xl md:rounded-4xl bg-ink">
        <div className="relative flex items-center px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>

          <p className="absolute left-1/2 -translate-x-1/2 text-[11px] font-medium text-paper">
            Remote, yet Rooted
          </p>
        </div>

        <div className="relative aspect-1400/729 w-full">
          <Image
            src="/images/team1.webp"
            alt="The Deckster team, dialled in from a video call"
            fill
            sizes="(min-width: 1024px) 44vw, (min-width: 640px) 32rem, 92vw"
            className="object-cover object-center"
          />
        </div>
      </div>
      {/* <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 md:mt-18 md:gap-4">
        {COLLAGE_LABELS.map((label, i) => (
          <ImagePlaceholder
            key={label}
            label={label}
            className={`aspect-square ${i % 4 === 1 || i % 4 === 2 ? "sm:-translate-y-4" : ""}`}
          />
        ))}
      </div> */}
    </section>
  );
}
