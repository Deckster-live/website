import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="glow-field flex min-h-[85vh] flex-col items-center justify-center px-5 pt-32 pb-20 text-center md:px-8 md:pt-40">
      <p className="font-display text-[clamp(6rem,22vw,13rem)] leading-none font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-green-dark/70 via-slate/40 to-transparent">
        404
      </p>

      <h1 className="font-display -mt-4 text-[clamp(1.6rem,4.2vw,2.6rem)] leading-tight font-semibold md:-mt-8">
        Sorry, that page could not be found
      </h1>

      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-slate">
        The page you&rsquo;re looking for doesn&rsquo;t exist, or it&rsquo;s
        been moved.
      </p>

      <Link
        href="/"
        className="group mt-9 inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-medium whitespace-nowrap text-paper transition-colors hover:bg-green-dark"
      >
        Go back home
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      </Link>
    </section>
  );
}
