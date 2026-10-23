# Site optimisation & Lighthouse fixes — 23 Oct 2026

Two passes: **Part 1** fixes the issues in the Lighthouse report; **Part 2** optimises the whole site (all pages, images, alt text and SEO).

# Part 1 — Lighthouse report fixes

Source: `Deckster Lighthouse eval.pdf` (deckster.live, Lighthouse 13.4.1, desktop).
Starting scores: Performance 96 · Accessibility 85 · Best Practices 100 · SEO 91 · Agentic Browsing 1/2.

## Performance

| Issue in report | Fix |
|---|---|
| Improve image delivery (~736 KiB savings): brand logos were PNGs up to 800–1200 px wide shown at ~48 px tall | All 19 PNG brand logos converted to WebP and resized to fit 480×160 (enough for the largest tile at 2× DPR). 751 KB → ~110 KB. Old PNGs removed, references updated in `brands.ts` and `case-studies.ts`. |
| `/logos/deckster.png` oversized | Converted to `deckster.webp` (14.6 KB → 5.2 KB); Navbar, UseCaseNetwork, CreatorNetwork updated. |
| Case-study reels 720×1280 shown at ~191×339 | All 35 reel covers resized to 480×853 WebP (roughly half the bytes each). |
| `avatar2.webp` 52 KB for a 28 px avatar | `avatar`, `avatar1`, `avatar2` resized to 256×256 (116 KB → 24 KB total). |
| LCP element render delay 590 ms (hero `h1` faded in from `opacity: 0`) | New `animate-rise-lcp` keyframe (starts at opacity 0.25) used on the hero `h1` in `Hero1.tsx` / `Hero.tsx`, so the headline paints on the first frame. Same slide-up motion. |

## Accessibility

| Issue in report | Fix |
|---|---|
| Buttons have no accessible name (case-study tabs, which show only a logo) | Added `aria-label="Show the <brand> case study"` and `aria-pressed` to each tab (`CaseStudies.tsx`). |
| Image has no `alt` (`img.h-8` navbar logo) | Added `alt="Deckster"` plus `width`/`height` (`Navbar.tsx`). Also fixes the SEO audit. |
| No `<main>` landmark | `{children}` wrapped in `<main className="flex flex-1 flex-col">` in `layout.tsx`. |
| Identical link names for different reels | Homepage reels: "Watch <brand> reel 1/2". Case-study page reels, which had no name, now get "Watch reel N" (`CaseStudyReels.tsx`). |
| Contrast: Metrics eyebrow (`text-signal` on white, 2.65:1) | → `text-green-dark` (6.2:1). |
| Contrast: `text-slate/60` captions in UseCaseNetwork (3.3:1) | → `text-slate/80` (5.5:1). |
| Contrast: Why-Us stat labels `opacity-60` and descriptions `opacity-80` (down to 3.2:1 on green cards) | → `opacity-90` (≥5.1:1 on every card colour). |
| Contrast: Why-Us badge pill (4.27:1 on green-dark card) | Pill tint lowered 16% → 8% (≥5:1). |
| Contrast: BudgetAllocation `text-paper/45` on ink (4.4:1) | → `text-paper/60` (6.8:1). |
| Contrast: NicheCoverage header `tint(fg, 60)` (3.1:1) | → `tint(fg, 92)` (4.8:1). |
| Contrast: TrackRecord pill text on `bg-white/45` (4.0:1) | Pill → `bg-white/60`; "And they came back" `text-green-dark` → `text-green-darkest` (≥5.3:1). |

I calculated every ratio from the theme's OKLCH tokens against WCAG AA (4.5:1).

## Best practices (security headers, `netlify.toml`)

Added for all paths: `X-Frame-Options: DENY`, `Content-Security-Policy: frame-ancestors 'none'; base-uri 'self'; object-src 'none'`, `Cross-Origin-Opener-Policy: same-origin`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.
These fix the "No COOP header" and "No frame control policy" findings.

## Not changed (needs a decision or can't be fixed in this codebase)

- **HSTS `includeSubDomains` / `preload`**: these apply to every subdomain of deckster.live and can't easily be undone once the domain is on the preload list. Add them only if every subdomain serves HTTPS.
- **Full CSP with `script-src` / Trusted Types**: the static export relies on inline Next.js bootstrap scripts, so a strict script CSP would need per-build hashes and could break the site. The CSP added above covers clickjacking only.
- **Legacy JavaScript (13 KiB)**: `Array.prototype.at`, `Object.hasOwn` etc. come from Next.js's built-in polyfill module, which can't be configured.
- **Unused JavaScript (45 KiB)**: comes from the framework/framer-motion chunks. This is minor and has no easy fix.
- Off-homepage images (`about.png`, `team1.webp`) are handled in Part 2 below.

---

# Part 2 — Whole-site optimisation

Result: `public/` went from **7.9 MB to 1.6 MB**. Every page has been checked for broken images, missing `alt`, a single `<h1>` and named buttons/links: home, about, careers, openings, a role page, an apply page, 3 case studies, privacy, terms and 404.

## Images: size and format

| File | Before | After | What changed |
|---|---|---|---|
| `images/team1.webp` (About, Careers) | 841 KB, 1788 px | 52 KB, 1400 px | Resized and re-encoded |
| `images/careers/working.png` | 1.09 MB PNG | 46 KB `working.webp` | WebP, 1100 px wide, transparency kept |
| `images/careers/grow.png` | 656 KB PNG | 41 KB `grow.webp` | WebP, 560 px (shown at 256 px) |
| `images/bg3.jpg` (Careers hero) | 48 KB JPG | 15 KB `bg3.webp` | WebP |
| `images/wave-bg.webp` (case-study hero) | 122 KB | 88 KB | Re-encoded |
| `images/green-bg.webp` (About hero) | 37 KB | 31 KB | Re-encoded |
| `images/about.webp` | 140 KB | 131 KB | Re-encoded (it's a diagram, so there's little to gain) |
| 14 SVG brand logos | 166 KB | 134 KB | Path coordinates rounded to 2 decimals and whitespace stripped; no visible change |

**Unused images removed** (no reference anywhere in `src/`; they can be restored from git): `about.png` (1.8 MB), `team.webp`, `wave.webp`, `bg1.webp`, `bg.jpg`, `careers/img.png` (226 KB).
The untracked `images/M0AyKOBK….jpeg` (97 KB) is also unused. I left it because it isn't in git yet and may be something you're about to use.

## Images: loading and markup

- `alt` added to the creator avatars in the hero tables (`Hero.tsx`, `Hero1.tsx`). They're decorative because the name sits next to them, so `alt=""`. Also added fixed `width`/`height`.
- Case-study page brand logo: `alt` is now "<brand> logo".
- Case-study gallery: `alt` no longer repeats the visible caption, which screen readers would read twice. There's a new optional `alt` field on gallery images in `case-studies.ts`.
- `loading="lazy"` and `decoding="async"` added to every below-the-fold `<img>`: case-study logos and reels, gallery images, why-us avatars. Reels also got `width`/`height` so they hold their space while loading.
- Next 16 deprecated `priority`, so it's now `preload` on the About and case-study hero backgrounds. The Careers hero background also gets `preload`, because it's above the fold.
- `sizes` added to the careers `<Image>`s that were missing it.
- All other decorative images (hero backgrounds, illustrations behind text) keep `alt=""` on purpose. Meaningful images already had descriptive `alt`.

## SEO

- **`src/lib/site.ts` (new):** one place for the site URL, name and description, plus a `pageMetadata()` helper. Every page uses the helper, so each one gets a unique title and description, a **canonical URL**, **Open Graph** tags (title, description, URL, site name, `en_IN` locale, share image) and **Twitter `summary_large_image`** tags.
- **Root layout:** `metadataBase` (https://deckster.live), `applicationName`, default robots `index, follow`, `themeColor`, and `formatDetection` so iOS doesn't auto-link numbers.
- **Share image:** new `app/opengraph-image.png` (1200×630, Deckster wordmark and headline), with alt text. It's used on every page.
- **Icons:** new `app/icon.png` (192 px) and `app/apple-icon.png` (180 px), generated from the existing favicon mark.
- **`/sitemap.xml` (new):** home, about, the 5 case studies, careers, openings, every open role (with posted date), privacy and terms. Apply pages are left out on purpose.
- **`/robots.txt` (new):** allows everything and points to the sitemap.
- **Structured data (JSON-LD):**
  - `Organization` + `WebSite` on every page: name, logo, email, phone, Instagram and LinkedIn profiles.
  - `FAQPage` on the homepage. The FAQ copy moved to `src/data/faqs.ts` so the section and the structured data share one source.
  - `JobPosting` on each open role page, for Google for Jobs: title, full JD, date posted, employment type, remote within India, apply directly.
- **Indexing rules:** apply-form pages are `noindex, follow` so the job description page is the one that ranks. The 404 page is `noindex`.
- **Headings:** `/careers/openings` had no `<h1>`; it now has one. `SectionHead` gained an `as="h1"` option for this. Every page now has exactly one `<h1>`.
- **Better descriptions:** the openings page and apply pages had thin or missing meta descriptions.
- **`/llms.txt` (new):** a plain summary of the site and its key pages for AI crawlers and assistants. Lighthouse's "Agentic Browsing" category looks for it.

## Caching (`netlify.toml`)

- `/_next/static/*` → `Cache-Control: public, max-age=31536000, immutable`. These files are content-hashed, so repeat visits never re-download them.

## Things to check

- The `JobPosting` data says the roles are **remote within India**. Correct it in `src/app/careers/[slug]/page.tsx` if candidates elsewhere are welcome.
- After deploy: submit `https://deckster.live/sitemap.xml` in Google Search Console, and test a role page and the homepage in Google's Rich Results Test.
