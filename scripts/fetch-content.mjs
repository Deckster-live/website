#!/usr/bin/env node
// Pulls the published content out of the CMS before every build (npm "prebuild") and dev run ("predev"),
// so the site stays a plain static export that never calls the CMS while people browse it.
//
// It writes:
//   src/data/generated/content.json   the case studies and blog posts, in the shape the pages use
//   public/media/                     their images (logos, reel covers, post covers and photos), downloaded once and reused
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
// than wrapped in <p> tags. Blog posts use the full editor (headings, lists, tables...): see blocks() below.

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Lexical stores formatting as bit flags on each run of text.
const FORMATS = [
  [1, 'strong'],
  [2, 'em'],
  [8, 'u'],
  [4, 's'],
  [16, 'code'],
  [32, 'sub'],
  [64, 'sup'],
]

// A link's address. "Internal" links point at another CMS document, so they become that page's path. A
// link to something that isn't published (the public API then returns only its id) is dropped, keeping its
// text, so a draft never leaks and the build doesn't fail over it.
const PATHS = { posts: '/blog/', 'case-studies': '/case-studies/' }
function href({ linkType, url = '', doc }) {
  if (linkType !== 'internal') return url
  if (typeof doc?.value !== 'object' || !PATHS[doc.relationTo]) return null
  return PATHS[doc.relationTo] + doc.value.slug
}

function inline(nodes = []) {
  return nodes
    .map((node) => {
      if (node.type === 'text') {
        return FORMATS.reduce((html, [bit, tag]) => (node.format & bit ? `<${tag}>${html}</${tag}>` : html), escape(node.text))
      }
      if (node.type === 'linebreak') return '<br />'
      if (node.type === 'link' || node.type === 'autolink') {
        const url = href(node.fields ?? {})
        if (url === null) return inline(node.children)
        const target = node.fields?.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
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

// Blog post bodies: every node the post editor can make. Each H2 gets an id and goes into `toc`, which the
// post page lists as its table of contents. Images inside a post are downloaded like any other upload.
// Text only, for heading ids and the word count. Block nodes end with a space so words don't run together.
const plainText = (node) =>
  node.type === 'text'
    ? node.text
    : (node.children ?? []).map(plainText).join('') + (node.type === 'link' || node.type === 'autolink' ? '' : ' ')

async function blocks(nodes, toc) {
  const html = await Promise.all(
    nodes.map(async (node) => {
      const children = () => blocks(node.children ?? [], toc)
      switch (node.type) {
        case 'paragraph':
          return node.children?.length ? `<p>${inline(node.children)}</p>` : '' // skip empty lines
        case 'heading': {
          if (node.tag !== 'h2') return `<${node.tag}>${inline(node.children)}</${node.tag}>`
          const text = plainText(node).trim()
          // "Why it works?" → "why-it-works"; a repeated heading gets -2, -3...
          const base = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'
          let id = base
          for (let n = 2; toc.some((h) => h.id === id); n++) id = `${base}-${n}`
          toc.push({ id, text })
          return `<h2 id="${id}">${inline(node.children)}</h2>`
        }
        case 'list': {
          const tag = node.listType === 'number' ? 'ol' : 'ul'
          return `<${tag}${node.listType === 'check' ? ' class="checklist"' : ''}>${await children()}</${tag}>`
        }
        case 'listitem': {
          // An item holds text, or a nested list (an indented level).
          const parts = await Promise.all(
            node.children.map((c) => (c.type === 'list' ? blocks([c], toc) : inline([c]))),
          )
          const checked = node.checked === undefined ? '' : ` data-checked="${Boolean(node.checked)}"`
          return `<li${checked}>${parts.join('')}</li>`
        }
        case 'quote':
          return `<blockquote>${inline(node.children)}</blockquote>`
        case 'horizontalrule':
          return '<hr />'
        case 'upload': {
          // The CMS's 1400px-wide copy; uploads smaller than that have none and are used as they are.
          const media = node.value
          const file = media.sizes?.body?.filename ? media.sizes.body : media
          const src = await image(file, 'posts')
          return `<figure><img src="${src}" alt="${escape(media.alt ?? '')}" width="${file.width}" height="${file.height}" loading="lazy" decoding="async" /></figure>`
        }
        // Tables scroll sideways on phones (the wrapper), and header cells become <th>.
        case 'table':
          return `<div class="table-wrap"><table><tbody>${await children()}</tbody></table></div>`
        case 'tablerow':
          return `<tr>${await children()}</tr>`
        case 'tablecell': {
          const tag = node.headerState ? 'th' : 'td'
          return `<${tag}>${await children()}</${tag}>`
        }
        default:
          throw new Error(`Unexpected rich-text node "${node.type}"`)
      }
    }),
  )
  return html.join('')
}

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
      ...(d.theme && { theme: d.theme }), // only needed for the homepage carousel
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

// --- Blog posts ------------------------------------------------------------------------------------------

async function posts() {
  // Newest first. No posts is fine: the blog stays hidden until the first one is published.
  const { docs } = await get('/posts?where[_status][equals]=published&sort=-publishedAt&limit=1000&depth=2')

  return Promise.all(
    docs.map(async (d) => {
      const toc = []
      const html = await blocks(d.content.root.children, toc)
      const words = plainText(d.content.root).split(/\s+/).filter(Boolean).length
      const { author, category, cover } = d
      return {
        slug: d.slug,
        title: d.title,
        ...(d.subtitle && { subtitle: d.subtitle }),
        category: category ? { title: category.title, slug: category.slug } : null,
        author: {
          name: author.name,
          ...(author.roleTitle && { role: author.roleTitle }),
          ...(author.bio && { bio: author.bio }),
          ...(author.linkedin && { linkedin: author.linkedin }),
          // The 800x600 card size: small enough for a round photo next to the byline.
          ...(author.avatar && { avatar: await image(author.avatar.sizes?.card?.filename ? author.avatar.sizes.card : author.avatar, 'authors') }),
        },
        // The CMS makes three sizes of every cover: the post's hero, the cards, and link previews.
        cover: {
          alt: cover.alt ?? '',
          hero: await image(cover.sizes.hero, 'posts'),
          card: await image(cover.sizes.card, 'posts'),
          og: await image(cover.sizes.og, 'posts'),
        },
        html,
        toc,
        reading_minutes: Math.max(1, Math.round(words / 200)), // ~200 words a minute
        faq: (d.seo?.faq ?? []).map(({ question, answer }) => ({ question, answer })),
        published: d.publishedAt,
        modified: d.updatedAt,
        ...(d.seo?.metaTitle && { meta_title: d.seo.metaTitle }),
        meta_description: d.seo?.metaDescription,
        show_on_homepage: Boolean(d.showOnHomepage),
      }
    }),
  )
}

// ---------------------------------------------------------------------------------------------------------

try {
  const content = { caseStudies: await caseStudies(), posts: await posts() }
  await mkdir(path.dirname(OUT_FILE), { recursive: true })
  await writeFile(OUT_FILE, JSON.stringify(content, null, 2) + '\n')
  console.log(`Content from ${CMS}: ${content.caseStudies.length} case studies, ${content.posts.length} blog posts.`)
} catch (error) {
  const cached = await stat(OUT_FILE).catch(() => null)
  if (process.argv.includes('--dev') && cached) {
    console.warn(`Could not refresh content from ${CMS} (${error.message}); using the last copy.`)
  } else {
    console.error(`Could not fetch content from ${CMS}: ${error.message}`)
    process.exit(1)
  }
}
