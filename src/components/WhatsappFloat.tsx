"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";
import { WHATSAPP_HREF } from "@/lib/contact";

export function WhatsappFloat() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Deckster on WhatsApp"
      className="group fixed right-5 bottom-5 z-50 grid h-13 w-13 place-items-center rounded-full bg-[#25D366] text-white shadow-(--shadow-float) transition-transform duration-300 ease-out hover:scale-108 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] md:right-8 md:bottom-8 md:h-14 md:w-14"
    >
      <IconBrandWhatsapp className="h-7 w-7 shrink-0 md:h-8 md:w-8" />

      <span className="pointer-events-none absolute right-[calc(100%+10px)] hidden rounded-full bg-ink px-3 py-1.5 text-[12.5px] font-medium whitespace-nowrap text-paper opacity-0 shadow-(--shadow-soft) transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Chat with us
      </span>
    </a>
  );
}
