import Image from "next/image";

export function AboutHero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/images/green-bg.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-paper/45" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-b from-transparent to-paper" />
      </div>

      <div className="relative px-5 pt-32 pb-14 md:px-8 md:pt-42 md:pb-20">
        <div className="animate-rise mx-auto max-w-4xl text-center">
          <p className="eyebrow">About Deckster</p>

          <h1 className="font-display mt-5 text-[clamp(2.1rem,6vw,3.85rem)] leading-[1.06] font-semibold">
            We put brands in front of the creators their customers already
            trust
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-slate md:text-lg">
            Deckster is an influencer and creator marketing agency for Indian
            brands. We pick creators with data, run every campaign end to end,
            and report the results live, so you can see what&rsquo;s working
            while it&rsquo;s still running.
          </p>
        </div>
      </div>
    </section>
  );
}
