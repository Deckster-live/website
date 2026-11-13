import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { ContactSectionForm } from "@/components/ContactSectionForm";
import {
  ADDRESS,
  ADDRESS_LINE,
  EMAIL_ADDRESS,
  EMAIL_HREF,
  LEGAL_NAME,
  PHONE_HREF,
  PHONE_NUMBER,
} from "@/lib/contact";
import { jsonLd, pageMetadata, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Deckster: Start an Influencer Campaign",
  description:
    "Tell us your goal and budget and we'll come back with a creator shortlist and a plan. Email, call or send a brief to Deckster's team.",
  path: "/contact",
});

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${LEGAL_NAME}, ${ADDRESS_LINE}`)}`;

interface ContactCardProps {
  icon: ReactNode;
  title: string;
  copy: ReactNode;
  href: string;
  action: string;
  /** The middle card is light and raised; the outer two are dark green. */
  featured?: boolean;
  external?: boolean;
}

function ContactCard({
  icon,
  title,
  copy,
  href,
  action,
  featured,
  external,
}: ContactCardProps) {
  return (
    <div
      className={
        featured
          ? "relative z-10 flex flex-col items-center justify-center rounded-3xl bg-mist px-7 py-12 text-center text-ink shadow-(--shadow-float) md:-my-5 md:py-16"
          : "relative isolate overflow-hidden flex flex-col items-center justify-center rounded-3xl bg-green-dark px-7 py-11 text-center text-paper"
      }
    >
      {!featured && (
        // Faint wave texture, like the photo overlay on the outer cards.
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[url(/images/waves-bg.webp)] bg-cover bg-center opacity-[0.07] mix-blend-luminosity"
        />
      )}
      <span
        className={`mx-auto grid h-11 w-11 place-items-center rounded-xl ${
          featured
            ? "bg-ink text-paper"
            : "bg-paper/12 text-signal ring-1 ring-paper/15"
        }`}
      >
        {icon}
      </span>
      <p className="font-display mt-5 text-[1.3rem] leading-snug font-semibold">
        {title}
      </p>
      <p
        className={`mx-auto mt-3 max-w-xs text-[14px] leading-relaxed ${
          featured ? "text-slate" : "text-paper/85"
        }`}
      >
        {copy}
      </p>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className={`mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium transition-colors ${
          featured
            ? "text-ink hover:text-green-dark"
            : "text-paper hover:text-signal"
        }`}
      >
        {action}
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </a>
    </div>
  );
}

/** Standalone contact page. Its form posts to the same sheet as the homepage brief. */
export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contact`,
    name: "Contact Deckster",
    about: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(structuredData)}
      />

      {/* Dark green banner with a slanted bottom edge */}
      <section className="relative isolate overflow-hidden bg-green-darkest [clip-path:polygon(0_0,100%_0,100%_78%,0_100%)]">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[url(/images/waves-bg.webp)] bg-cover bg-center opacity-20 mix-blend-luminosity"
        />
        <div className="px-5 pt-36 pb-32 text-center md:px-8 md:pt-44 md:pb-44">
          <p className="eyebrow text-paper/60">Contact</p>
          <h1 className="font-display mx-auto mt-4 max-w-3xl text-[clamp(2.1rem,6vw,3.85rem)] leading-[1.06] font-semibold text-paper">
            Let&rsquo;s talk about your next campaign
          </h1>
        </div>
      </section>

      <div className="px-5 pt-12 md:px-8 md:pt-16">
        <div className="mx-auto grid max-w-310 gap-5 md:grid-cols-3 md:gap-0">
          <ContactCard
            icon={<Phone className="h-5 w-5" strokeWidth={1.75} />}
            title={PHONE_NUMBER}
            copy="Talk to the team about a brief, a budget or a campaign that's already live."
            href={PHONE_HREF}
            action="Call us"
          />
          <ContactCard
            featured
            icon={<Mail className="h-5 w-5" strokeWidth={1.75} />}
            title={EMAIL_ADDRESS}
            copy="Send a brief, a question or a partnership idea, and we'll come back with next steps."
            href={EMAIL_HREF}
            action="Write to us"
          />
          <ContactCard
            icon={<MapPin className="h-5 w-5" strokeWidth={1.75} />}
            title={`${ADDRESS.locality}, ${ADDRESS.region}`}
            copy={
              <>
                {ADDRESS.street}, {ADDRESS.postalCode}
              </>
            }
            href={MAPS_URL}
            action="Get directions"
            external
          />
        </div>
      </div>

      <ContactSectionForm />
    </>
  );
}
