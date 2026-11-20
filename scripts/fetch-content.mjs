#!/usr/bin/env node
// Pulls the published content out of the CMS before every build (npm "prebuild") and dev run ("predev"),
// so the site stays a plain static export that never calls the CMS while people browse it.
//
// It writes:
//   src/data/generated/content.json   the case studies, in the shape the pages already use
//   public/media/                     their images (logos, reel covers), downloaded once and reused
// Both are gitignored: the CMS is the source, and every build fetches a fresh copy.
//
//   CMS_URL   the CMS to read from (default https://admin.deckster.live). No key is needed: only
//             published content is public.
//   --dev     if the CMS can't be reached, keep the last copy instead of failing (used by `npm run dev`).
//             A real build always fails instead, so it never ships stale or missing content; Cloudflare
//             then keeps the previous deploy live.
import { mkdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const CMS = (process.env.CMS_URL ?? 'https://admin.deckster.live').replace(/\/$/, '')
const ROOT = path.resolve(import.meta.dirname, '..')
const OUT_FILE = path.join(ROOT, 'src/data/generated/content.json')
const MEDIA_DIR = path.join(ROOT, 'public/media')

async function get(url) {
  const res = await fetch(`${CMS}/api${url}`)
  if (!res.ok) throw new Error(`GET ${url} answered ${res.status}`)
  return res.json()
}

// Downloads an upload (Media or Reel cover) into public/media/<folder>/ and returns its path on the site.
// A file already there with the same size is kept, so repeat builds only fetch what changed.
async function image(upload, folder) {
  const file = path.join(MEDIA_DIR, folder, upload.filename)
  const sitePath = `/media/${folder}/${upload.filename}`
  const existing = await stat(file).catch(() => null)
  if (existing?.size === upload.filesize) return sitePath

  const res = await fetch(`${CMS}${upload.url}`)
  if (!res.ok) throw new Error(`Downloading ${upload.url} answered ${res.status}`)
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, Buffer.from(await res.arrayBuffer()))
  return sitePath
}

// --- Rich text (Lexical JSON) to HTML --------------------------------------------------------------------
// Case-study fields use the CMS's inline editor: paragraphs of text with bold/italic/underline/strike and
// links. The pages place this HTML inside a <p> or <li>, so paragraphs are joined with line breaks rather
// than wrapped in <p> tags.

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Lexical stores formatting as bit flags on each run of text.
const FORMATS = [
  [1, 'strong'],
  [2, 'em'],
  [8, 'u'],
  [4, 's'],
]

function inline(nodes = []) {
  return nodes
    .map((node) => {
      if (node.type === 'text') {
        return FORMATS.reduce((html, [bit, tag]) => (node.format & bit ? `<${tag}>${html}</${tag}>` : html), escape(node.text))
      }
      if (node.type === 'linebreak') return '<br />'
      if (node.type === 'link' || node.type === 'autolink') {
        const { url = '', newTab } = node.fields ?? {}
        const target = newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
        return `<a href="${escape(url)}"${target}>${inline(node.children)}</a>`
      }
      // Never drop content silently: a node type the inline editor can't make means the CMS changed.
      throw new Error(`Unexpected rich-text node "${node.type}"`)
    })
    .join('')
}

const inlineHtml = (value) =>
  (value?.root?.children ?? [])
    .map((p) => inline(p.children))
    .filter(Boolean)
    .join('<br /><br />')

// --- Case studies ----------------------------------------------------------------------------------------

async function caseStudies() {
  // Homepage order first; studies without one go last (Postgres sorts empty values last).
  const { docs } = await get('/case-studies?where[_status][equals]=published&sort=homepageOrder&limit=100&depth=2')
  // An empty list would wipe every case-study page, so treat it as an error rather than content.
  if (docs.length === 0) throw new Error('The CMS returned no published case studies')

  return Promise.all(
    docs.map(async (d) => ({
      // Same field names as the CaseStudy type in src/data/mockdata/case-studies.ts.
      slug: d.slug,
      tab: d.tab,
      brand: d.brand,
      brand_logo: await image(d.brandLogo, 'logos'),
      ...(d.logoScale && { logo_scale: d.logoScale }),
      usp_metric: d.uspMetric,
      usp: d.usp,
      metrics: d.metrics.map(({ label, value }) => ({ label, value })),
      description: d.description,
      reels: await Promise.all(d.reels.map(async (r) => ({ cover: await image(r.cover, 'reels'), link: r.link }))),
      theme: d.theme,
      overview: inlineHtml(d.overview),
      challenge: d.challenge.map((p) => inlineHtml(p.text)),
      approach: d.approach.map((step) => ({ heading: step.heading, points: step.points.map((p) => inlineHtml(p.text)) })),
      results: d.results.map((p) => inlineHtml(p.text)),
      ...(d.learning && { learning: inlineHtml(d.learning) }),
      ...(d.platforms?.length && { platforms: d.platforms }),
      ...(d.reportUrl && { report_url: d.reportUrl }),
      published: d.publishedAt,
      modified: d.updatedAt,
      meta_title: d.seo?.metaTitle || undefined,
      meta_description: d.seo?.metaDescription || undefined,
      show_on_homepage: Boolean(d.showOnHomepage),
      leads: (d.campaignLeads ?? []).map((a) => ({ name: a.name, ...(a.roleTitle && { role: a.roleTitle }) })),
      // Quote blocks only for now; the page's other block types aren't in the CMS yet.
      content: (d.content ?? [])
        .filter((b) => b.blockType === 'quote')
        .map((b) => ({ type: 'quote', quote: b.quote, ...(b.attribution && { attribution: b.attribution }) })),
    })),
  )
}

// ---------------------------------------------------------------------------------------------------------

try {
  const content = { caseStudies: await caseStudies() }
  await mkdir(path.dirname(OUT_FILE), { recursive: true })
  await writeFile(OUT_FILE, JSON.stringify(content, null, 2) + '\n')
  console.log(`Content from ${CMS}: ${content.caseStudies.length} case studies.`)
} catch (error) {
  const cached = await stat(OUT_FILE).catch(() => null)
  if (process.argv.includes('--dev') && cached) {
    console.warn(`Could not refresh content from ${CMS} (${error.message}); using the last copy.`)
  } else {
    console.error(`Could not fetch content from ${CMS}: ${error.message}`)
    process.exit(1)
  }
}
