# Deckster — Design & UI/UX Direction

This document translates the copy deck into layout, motion and visual direction, built entirely on the existing design system (Ink / Paper / Mist / Signal / Green Dark / Slate). No new colors, fonts or effects — every idea below maps to a utility, variable, or keyframe already defined in the theme.

---

## 0. Reading the Design System (what the palette is telling us)

| Token | Feel | Where it should lead |
|---|---|---|
| `--ink` (near-black, warm, low chroma) | Editorial, confident, quiet authority | Headlines, primary buttons, primary text |
| `--paper` (warm off-white) | Calm, airy, premium — not clinical white | Default background |
| `--mist` | A half-step warmer than paper | Alternate section background — creates rhythm without hard dividers |
| `--signal` (vivid teal-green) | The one loud color in the system | Reserve it — CTAs, active states, key numbers, tab indicators. If everything is green, nothing is |
| `--green-dark` | Muted, grounded | Secondary accents, hover states, icon fills |
| `--slate` | Quiet gray | Eyebrows, captions, muted labels — never headlines |
| `--line` / `--line-strong` | Hairline, not heavy | Borders and dividers stay thin — the system has no thick rules or boxes anywhere |

**Typography pairing:**
`--font-display` (Libre Baskerville, serif) on headings + `--font-sans` (Space Grotesk) on body is an intentional tension — editorial/trust-building serif headlines against a technical, modern sans body. This is the visual argument for "we're a serious, credible place that also runs on real technology." Keep this contrast consistent site-wide: **never** set body copy in the display font, and never set a big number/stat in the serif — stats should feel technical (sans), stories should feel editorial (serif).

**Motion already built into the system** (use these, don't invent new ones):
- `marquee` / `marquee-reverse` + `marquee-mask` → built for scrolling logo/content strips
- `rise` → scroll-reveal for cards, headlines, stat blocks (staggered by child)
- `float-slow` → gentle looping drift for decorative/illustrative elements only, never for text or CTAs
- `glow-field` (radial `--signal` glow) → atmosphere behind hero and key CTAs
- `surface` / `surface-float` → two elevation levels: flat card vs. floating/hero card
- Global `prefers-reduced-motion` override already exists — every animated idea below must degrade gracefully to a static state, which the CSS already guarantees at the keyframe level

---

## Governing UI/UX Principles

1. **Visual hierarchy over decoration.** Serif for meaning, sans for data, signal-green for the one thing per screen that should get clicked.
2. **Progressive trust-building order.** Each section should ask for slightly more attention/belief than the last (see Section Order below) — never front-load the hardest sell.
3. **Restraint with the accent color.** `--signal` is used maybe 3–5 times per viewport, max. It should always mean "look here" or "click here" — if it's decorative, use `--green-dark` or `--ink` instead.
4. **Rhythm through background, not borders.** Alternate `--paper` → `--mist` → `--paper` between major sections instead of drawing lines between them. Hairlines (`--line`) are for internal card structure only.
5. **Hick's Law — limit choices.** Tab count (case studies), use-case grid, and nav items should stay in the 5–7 range max, never more, so no section feels like a menu.
8. **Fitts's Law — CTA sizing.** Primary buttons (ink bg / paper text) need generous tap targets (min ~44px height) and should not shrink on hover — only the underline/icon should animate.
6. **Motion needs an escape hatch.** Anything that auto-plays (marquee, tab auto-rotate) pauses on hover/focus and stops entirely under `prefers-reduced-motion`. Never trap the user in an animation they can't interrupt.
7. **8px baseline grid.** Section vertical padding: 128px desktop / 64px mobile. Component spacing in multiples of 8. Max content width ~1280px, with consistent side gutters (24px mobile, 64–96px desktop).
9. **Accessible contrast.** `--ink` on `--paper`/`--mist` easily passes AA. `--signal` text-on-paper should be reserved for large/bold text or icons only — for small text-on-signal, use white (`--accent-foreground`) as already defined.

---

## Section Order — Why This Sequence

The order mirrors a trust funnel, not just a content list — each section is designed to answer the objection the previous one raised:

**Hero (hook)** → **Brand Marquee (you're not the first to trust us)** → **Metrics (here's the scale, quantified)** → **Case Studies (here's the scale, proven with a story)** → **Use Cases (here's where you'd plug in)** → **Why Us (here's why us over anyone else)** → **Solutions + How We Do This (here's exactly what happens if you say yes)** → **Contact (say yes)**.

Belief escalates from a claim → a logo → a number → a story → a use-case → a differentiator → a process → an action. This also means: **only Hero and Contact carry a hard CTA button.** Every section between them should feel like evidence, not a pitch — a lighter "Read more" / "See story" link is enough.

---

## 1. Hero

**Layout:** Full-viewport (or ~90vh), centered or left-aligned content column, max-width ~760px for the headline so it doesn't stretch thin on wide screens.

- Wrap the section in `glow-field` with the default `--glow-signal` — a soft radial green glow sitting behind/above the headline, off-center slightly upper-right, low opacity. This is the *only* place the signal color appears as a large background wash — it announces "this is the top of the page" purely through light.
- Eyebrow line above the headline in `eyebrow` utility style (`slate`, uppercase, tracked): e.g. `INFLUENCER MARKETING, HANDLED END TO END`.
- Headline in `--font-display`, `--ink`, large scale (clamp ~40px–64px).
- Supporting line in `--font-sans`, `--slate` or `--ink` at reduced opacity — one paragraph, no more.
- Primary CTA: `--ink` background / `--paper` text, solid, with a small arrow icon that shifts right on hover (icon-only motion, button itself stays fixed size — Fitts's Law).
- Secondary CTA (optional, ghost/text-only): "See how it works" — no border, `--slate` text, `--signal` underline on hover.
- On load: headline, subhead, and CTA row each fade/rise in with `rise`, staggered ~80–120ms apart — this is the one place a slightly more noticeable entrance animation is earned.
- **Optional depth idea (uses existing tokens only):** a thin secondary strip beneath the CTA row — small circular creator-avatar thumbnails — animated with `marquee-reverse` at a slow duration and low opacity, running behind/beneath the main content, `marquee-mask` applied so it fades at both edges. This visually foreshadows the brand marquee below without repeating it exactly (logos scroll one way in Section 2, faces drift the other way in Section 1).

---

## 2. Brand Marquee

**Layout:** Short section, tight vertical padding (48–64px, not a full 128px block — this is a breather, not a destination).

- Background: `--mist` (first rhythm break from the hero's `--paper`/glow).
- Eyebrow-style headline, centered, `slate`, small: `TRUSTED BY BRANDS LIKE`.
- Logo row: exactly the `marquee` keyframe + `marquee-mask` utility already defined — logos in grayscale/`--slate`-tinted by default, full color only if a logo is hovered (desktop) — reinforces that `--signal`/color is earned attention, not default.
- Duplicate the logo set once in the DOM (standard marquee technique) so the loop is seamless at `-50%` translate, matching the existing `46s` duration — slow enough to read, never feels like a ticker.
- Pause the marquee on hover/focus; freeze entirely under reduced motion (static wrapped row instead).

---

## 3. Metrics

**Layout:** Background back to `--paper`. A 3–4 column grid (stacks to 2 col tablet, 1 col mobile), generous gutters, no card borders — numbers should feel like they're floating in space, not boxed.

- Optional: apply `hairline-grid` very faintly as the section background texture — the technical dot/line grid reinforces "these numbers come from real tracked data," and it's subtle enough not to compete with the numbers themselves.
- Each stat: big number in `--font-sans` (numbers should read as data, not editorial), `--ink`, extra-bold weight; label beneath in `eyebrow` style, `--slate`.
- Exactly **one** of the stats (the ROI multiple is the natural choice) gets its number rendered in `--signal` instead of `--ink` — this is the "if you only remember one number" callout, using restraint principle #3.
- Reveal each stat with `rise`, staggered left-to-right as the section scrolls into view. Consider counting up the numbers (0 → final value) on first reveal only — a common, expected pattern for stat sections, respecting reduced motion by just showing the final number instantly.
- Thin `--line` vertical dividers between columns on desktop only (removed on mobile stack) — the one place hairlines are appropriate here, since it's a data table in spirit.

---

## 4. Case Studies

This is the most visually load-bearing section — treat it as the site's centerpiece.

**Top: Tabs**
- 5 tabs (Customer Acquisition / Brand Building / Product Launch / Paid Ads / Store Launch) — matches Hick's Law ceiling.
- Active tab: `--ink` text, with a thin `--signal` underline that **slides** between tabs (a small animated bar, translateX transition ~300ms ease) rather than popping — this is the "not a sudden break" requirement made literal.
- Under each tab (or as one shared bar beneath the whole tab row), a slim progress indicator fills over 5s in `--signal` at low width (2px) — this gives the user feedback that a timer is running and *when* it'll switch, satisfying principle #6 (no silent auto-advance).
- Auto-rotate pauses immediately on hover/focus anywhere in the tab row or card below, and resumes after the user stops interacting. A manual click on any tab overrides and resets the timer. Under reduced motion, auto-rotate is disabled entirely — tabs become click-only.

**Below: Card (primary layout)**
- Full content-width, sitting on `surface-float` (the elevated shadow token — this card should look like it's lifted slightly off the page, unlike any other card on the site).
- Rounded corners at the larger radius scale (`--radius-2xl`/`3xl`) to feel soft against the mostly-square logo/photo content inside.
- Internal split, roughly 45/55 left/right on desktop, stacked top/bottom on mobile:
  - **Left:**
    1. Brand logo (small, top-left)
    2. USP/improvement line as a small pill — `--green-dark` background, white text, e.g. "3.2x more store visits" — this is a secondary accent use, keeping `--signal` free for the tab indicator above
    3. Metrics row: 3 small stat blocks side by side, `--line` hairline separators, numbers in `--ink` sans, labels in `eyebrow`/`--slate`
    4. Two-line description, `--slate` or `--ink` at 80% opacity, only shown if the card has vertical room (per your note — treat as a "nice to have" that's the first thing dropped on shorter viewports)
    5. "Read the full story" — text link with a `--signal` underline that draws in on hover (not a boxed button — this card already has one strong CTA-equivalent at the top of the page, no need to compete visually)
  - **Right:** grid or slight overlap-stack of reel screenshots / creator profile thumbnails, rounded corners matching the card, subtle `shadow-soft` on each thumbnail so they read as separate photos, not one flat image.
- Transition between tabs: crossfade + slight rise (8–12px) on the card content, ~350–400ms — the card container itself doesn't resize or jump; only its contents transition.

**Alternate layout (horizontal stacked, hover-expand)**
- Cards sit in a single row, collapsed width (~15–20% each), showing just logo + one headline stat, `--mist` background, muted.
- On hover: the target card expands (flex-grow transition, ~400–500ms ease) to reveal the full left/right layout above; siblings shrink and apply `grayscale(1)` + reduced opacity — a CSS filter transition, not a color swap, so it feels like a camera racking focus.
- Because grayscale + width animation is a heavier motion pattern, gate it specifically: under reduced motion, skip straight to a simple click-to-expand accordion with no filter/width transition, just an instant state change.
- This layout is the better fit if the case studies deserve more "browse and compare" behavior; the tab+card layout above is the better fit if each tab tells a distinct, single story worth dwelling on. Recommend picking **one**, not both, per the final build — they serve slightly different attention patterns and mixing them will feel inconsistent.

---

## 5. Use Cases

**Layout:** Background `--mist` (another rhythm break). Simple grid, 4 columns desktop / 2 tablet / 1–2 mobile, 7 items (Customer Acquisition, Product Launch, Brand Building, Paid Ads, Whitelisting, Store Launch, Seeding Campaigns).

- Each item: a simple `surface` card (flat elevation, not floating — this section is a menu, not a showcase), icon + label only, no descriptions — keep this scannable in under 3 seconds.
- Icon in `--green-dark` by default; on hover, icon and card border shift to `--signal`/`--ink` respectively — a light, quick hover state (150–200ms) since these are meant to feel clickable/explorable, possibly linking deeper into the case studies filtered by that use case.
- No auto-motion here at all — this section's job is fast orientation, not storytelling.

---

## 6. Why Us

**Layout:** Background back to `--paper`. Not a grid of 8 equal boxes — with 8 points, an even grid will feel like a spec sheet. Instead:

- 2-column list layout on desktop (4+4), single column mobile, each row a simple horizontal pairing: small `--green-dark` icon/number badge on the left, headline (bold, `--ink`, sans — this is a proof point, not an editorial moment, so sans not serif) + one-line body (`--slate`) on the right.
- Thin `--line` divider between rows only (no boxes/cards) — this section should feel like a confident, calm list, not a set of competing tiles.
- One point — **Live Tracking** — is the natural candidate for a small supporting visual (a tiny inline sparkline or live-dot indicator in `--signal`) since it's the one claim that's inherently visual/real-time; keep the other seven text-only so that one visual moment stands out rather than getting lost among illustrations for every point.
- Reveal rows with `rise`, staggered as the section scrolls in, but subtly (short stagger, ~60ms) — this is a reading section, not a reveal showcase.

---

## 7. Solutions + How We Do This

**Solutions (top half):**
- Background `--mist`. Six items (UGC, IGC, Paid Ads, Whitelisting, Campaigns, Podcast Amplification) as a simple horizontal pill/tag row or compact icon grid — same treatment family as Use Cases but visually distinguished by using `--ink` outline pills instead of `surface` cards, so the two "list" sections (Use Cases vs. Solutions) don't look identical despite similar content shape.

**How We Do This (bottom half, the process stepper):**
- Background `--paper`, with `hairline-grid` again as a faint texture — deliberately echoing the Metrics section's grid, visually tying "the data" and "the process" together as the site's two "trust us, it's technical" moments.
- 7 steps as a horizontal stepper on desktop (numbered `01`–`07` in `--font-display` for a bit of editorial weight on otherwise very technical content, `--slate`/`--ink`), connected by a thin `--line` running through all steps; vertical stacked list on mobile/tablet where a 7-wide horizontal stepper won't fit legibly.
- Active/in-view step (as user scrolls, or on hover on desktop) gets its number and connecting line segment colored in `--signal`, one step "lighting up" at a time — a small, purposeful use of the accent to make a linear process feel alive without needing heavy illustration per step.
- Step order note: keep the numbering as **Platform Selection → Category Filtering → Audience Data & Quality Profiling → Content Quality & Filtering → Logistics Filtering → Past Campaign Success Analysis → Budget & Goal Optimisation** (renumbered sequentially — the original brief listed Logistics as step 5 and Content Quality as step 4 out of order; recommend keeping Content Quality directly after Audience Data since both are "who/what" filters, before Logistics which is more operational).

---

## 8. Contact

**Layout:** Final section, can carry a slightly heavier `glow-field` treatment again (bookending the hero's glow — first and last section share this signature) to signal "this is the other bookend of the page."

- `--ink` background with `--paper` text is worth considering here specifically (inverse of the rest of the site) — a contact section is the one place a full color-inversion earns its keep, marking a clear "you've reached the end, here's the ask" moment. If a full inversion feels too heavy, fall back to standard `--paper` background with the glow treatment carrying the emphasis instead.
- Form fields: minimal, underline-style inputs (`--line-strong` default, `--signal` on focus) rather than boxed inputs — matches the hairline-first, low-chrome aesthetic used everywhere else.
- Submit CTA: same solid `--ink`/`--paper` button style as the hero (or, if the section background is inverted to `--ink`, flip to a `--signal` solid button here — the one place in the whole site `--signal` is allowed as a large solid fill, because it's the single most important click on the page).

---

## Footer (not in your section list, but defined in the theme)

The CSS already defines `--footer-mint` / `--footer-mint-line` tokens, so the system expects a distinct minty-green footer band rather than a plain `--ink` or `--paper` footer. Recommend: footer background `--footer-mint`, dividers in `--footer-mint-line`, standard `--ink` text — a soft, light-green close to the page that echoes `--signal` at very low saturation without repeating the hero's glow effect.

---

## Summary Table — Background Rhythm & Accent Usage

| # | Section | Background | Accent moment |
|---|---|---|---|
| 1 | Hero | Paper + signal glow | Glow wash + CTA |
| 2 | Brand Marquee | Mist | Full-color logo on hover only |
| 3 | Metrics | Paper (+ faint grid) | One stat in signal |
| 4 | Case Studies | Paper (elevated card) | Tab underline + progress bar |
| 5 | Use Cases | Mist | Icon hover state |
| 6 | Why Us | Paper | Live Tracking sparkline |
| 7 | Solutions / Process | Mist → Paper (+ grid) | Active step number |
| 8 | Contact | Ink (inverted) or Paper + glow | Signal CTA button |
| — | Footer | Footer-mint | — |

This keeps `--signal` meaningful in exactly one place per section — never ambient, always a pointer.
