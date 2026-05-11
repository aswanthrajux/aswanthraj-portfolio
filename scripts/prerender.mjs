/**
 * prerender.mjs
 *
 * Post-build static pre-rendering script.
 *
 * Strategy: HTML injection (no Node-side React rendering).
 * - Reads dist/index.html (produced by vite build)
 * - For each route, creates dist/<route>/index.html with injected
 *   <title> and <meta name="description"> so Google sees real content.
 * - The SPA hydrates normally on load; react-helmet-async overwrites
 *   the injected tags client-side with the final values.
 *
 * Why not vite-react-ssg or renderToString?
 * - GSAP registers plugins at module scope (window required)
 * - main.tsx has a localStorage / window.matchMedia IIFE
 * - CaseStudy / Note frontmatter is loaded asynchronously via useEffect,
 *   so renderToString would produce empty titles anyway
 * - This approach is zero-risk: we never run browser code in Node
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '../dist')
const SITE_URL = 'https://aswanthraj.com'

// ---------------------------------------------------------------------------
// Route manifest
// Each entry maps a URL path to its SEO metadata.
// Update this list whenever routes are added or frontmatter changes.
// ---------------------------------------------------------------------------

const ROUTES = [
  {
    path: '/',
    title: 'Aswanth Raj — Product Design and AI Experience Leader',
    description:
      'UX Manager at Glance AI. 15+ years designing AI-native consumer products, design systems, and ambient experiences reaching hundreds of millions of users.',
    ogImage: `${SITE_URL}/images/aswanth-portrait.webp`,
    ogType: 'website',
  },
  {
    path: '/work',
    title: 'Work | Aswanth Raj',
    description:
      'Case studies from 15+ years of product design: AI-native consumer products, design systems, TV experiences, and 0-to-1 products at Glance AI and InMobi.',
    ogImage: `${SITE_URL}/images/aswanth-portrait.webp`,
    ogType: 'website',
  },
  {
    path: '/about',
    title: 'About Aswanth Raj',
    description:
      'UX Manager at Glance AI. 15+ years designing products that reach hundreds of millions. Background spanning AI-native consumer products, design systems, mobile advertising, and enterprise software.',
    ogImage: `${SITE_URL}/images/aswanth-portrait.webp`,
    ogType: 'website',
  },
  {
    path: '/philosophy',
    title: 'Design Philosophy | Aswanth Raj',
    description:
      'The principles Aswanth Raj keeps coming back to: on AI, clarity, systems, and shipping. Four lenses for finding signal in noise and making better bets.',
    ogImage: `${SITE_URL}/images/aswanth-portrait.webp`,
    ogType: 'website',
  },
  {
    path: '/ai-labs',
    title: 'AI Labs | Aswanth Raj',
    description:
      'Real experiments, frameworks, and AI-native product thinking. Built, not theorized. Systems and insights from designing at the frontier of AI and product.',
    ogImage: `${SITE_URL}/images/aswanth-portrait.webp`,
    ogType: 'website',
  },
  // ── Case studies ──────────────────────────────────────────────────────────
  {
    path: '/case-study/glance-tv',
    title: 'From Screensaver to AI Commerce Platform | Aswanth Raj',
    description:
      'Reimagining idle TV as an AI-driven commerce surface.',
    ogImage: `${SITE_URL}/images/case-studies/glance-tv-cover.webp`,
    ogType: 'article',
  },
  {
    path: '/case-study/travel-moments',
    title: 'Travel Moments: Designing Shared AI Experiences on TV | Aswanth Raj',
    description:
      'Turning collective attention into an AI-native travel experience on TV.',
    ogImage: `${SITE_URL}/images/case-studies/travel-moments-cover.webp`,
    ogType: 'article',
  },
  {
    path: '/case-study/shop-app',
    title: 'Shop What You Watch | Aswanth Raj',
    description:
      'When Samsung opened the door to a pre-installed TV app, the question was what it should be. The first AI-native shopping app for Samsung TV.',
    ogImage: `${SITE_URL}/images/case-studies/shop-app-cover.webp`,
    ogType: 'article',
  },
  {
    path: '/case-study/bedtime-stories',
    title: 'Bedtime Stories: Exploring AI-Generated Narratives on TV | Aswanth Raj',
    description:
      'What happens when AI writes, illustrates, and narrates a bedtime story on your TV screen? A concept exploration on ambient surfaces.',
    ogImage: `${SITE_URL}/images/case-studies/bedtime-stories-cover.webp`,
    ogType: 'article',
  },
  {
    path: '/case-study/inmobi-design-system',
    title: 'Beyond Components: Building the Language of a Product Organisation | Aswanth Raj',
    description:
      'How a design system became the cultural infrastructure for 15+ products, and why the vocabulary built in 2019 is the vocabulary AI design tools speak today.',
    ogImage: `${SITE_URL}/images/case-studies/inmobi-ds-cover.webp`,
    ogType: 'article',
  },
  // ── AI Labs entries ───────────────────────────────────────────────────────
  {
    path: '/ai-labs/ai-native-product-thinking',
    title: 'How to Think Before You Build with AI | Aswanth Raj',
    description:
      'Most people use AI. Few know how to design with it. A framework for moving from AI user to AI builder.',
    ogImage: `${SITE_URL}/images/aswanth-portrait.webp`,
    ogType: 'article',
  },
  {
    path: '/ai-labs/uiforge',
    title: 'From Pixels to Systems: Building UIForge | Aswanth Raj',
    description:
      'Can AI convert a screenshot into structured, editable UI? I built a Figma plugin to find out.',
    ogImage: `${SITE_URL}/images/aswanth-portrait.webp`,
    ogType: 'article',
  },
  {
    path: '/ai-labs/digital-twin',
    title: 'Digital Twin: Designing an AI That Thinks Like You | Aswanth Raj',
    description:
      'Most AI systems try to be assistants. This experiment explores what happens when the AI becomes you.',
    ogImage: `${SITE_URL}/images/aswanth-portrait.webp`,
    ogType: 'article',
  },
]

// ---------------------------------------------------------------------------
// HTML manipulation helpers
// ---------------------------------------------------------------------------

/**
 * Inject or replace a <meta> tag by name attribute.
 */
function setMeta(html, name, content) {
  const escaped = content.replace(/"/g, '&quot;')
  const tag = `<meta name="${name}" content="${escaped}" />`
  const re = new RegExp(`<meta\\s+name="${name}"[^>]*>`, 'i')
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n</head>`)
}

/**
 * Inject or replace a <meta property="..."> (Open Graph / Twitter) tag.
 */
function setMetaProp(html, property, content) {
  const escaped = content.replace(/"/g, '&quot;')
  const tag = `<meta property="${property}" content="${escaped}" />`
  const re = new RegExp(`<meta\\s+property="${property.replace('.', '\\.')}"[^>]*>`, 'i')
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n</head>`)
}

/**
 * Inject or replace a <meta name="twitter:..."> tag.
 */
function setTwitterMeta(html, name, content) {
  const escaped = content.replace(/"/g, '&quot;')
  const tag = `<meta name="${name}" content="${escaped}" />`
  const re = new RegExp(`<meta\\s+name="${name}"[^>]*>`, 'i')
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n</head>`)
}

/**
 * Inject or replace the <title> tag.
 */
function setTitle(html, title) {
  const escaped = title.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return html.replace(/<title>[^<]*<\/title>/, `<title>${escaped}</title>`)
}

/**
 * Inject or replace <link rel="canonical">.
 */
function setCanonical(html, url) {
  const tag = `<link rel="canonical" href="${url}" />`
  const re = /<link\s+rel="canonical"[^>]*>/i
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n</head>`)
}

/**
 * Inject a JSON-LD <script> block, replacing any existing one.
 */
function setJsonLd(html, data) {
  const tag = `<script type="application/ld+json">${JSON.stringify(data)}</script>`
  const re = /<script\s+type="application\/ld\+json">[^<]*<\/script>/i
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `  ${tag}\n</head>`)
}

/**
 * Build the full patched HTML for a route.
 */
function buildHtml(template, route) {
  let html = template

  html = setTitle(html, route.title)
  html = setMeta(html, 'description', route.description)
  html = setCanonical(html, `${SITE_URL}${route.path}`)

  // OG tags
  html = setMetaProp(html, 'og:title', route.title)
  html = setMetaProp(html, 'og:description', route.description)
  html = setMetaProp(html, 'og:url', `${SITE_URL}${route.path}`)
  html = setMetaProp(html, 'og:type', route.ogType || 'website')
  if (route.ogImage) {
    html = setMetaProp(html, 'og:image', route.ogImage)
  }

  // Twitter / X
  html = setTwitterMeta(html, 'twitter:title', route.title)
  html = setTwitterMeta(html, 'twitter:description', route.description)
  if (route.ogImage) {
    html = setTwitterMeta(html, 'twitter:image', route.ogImage)
  }

  // Structured data (basic WebPage / Article schema)
  const schema =
    route.ogType === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: route.title,
          description: route.description,
          url: `${SITE_URL}${route.path}`,
          ...(route.ogImage ? { image: route.ogImage } : {}),
          author: { '@type': 'Person', name: 'Aswanth Raj', url: SITE_URL },
          publisher: { '@type': 'Person', name: 'Aswanth Raj', url: SITE_URL },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: route.title,
          description: route.description,
          url: `${SITE_URL}${route.path}`,
        }

  html = setJsonLd(html, schema)

  return html
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const indexHtmlPath = path.join(DIST, 'index.html')

  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`\n[prerender] ERROR: ${indexHtmlPath} not found.`)
    console.error('[prerender] Run "vite build" before this script.\n')
    process.exit(1)
  }

  const template = fs.readFileSync(indexHtmlPath, 'utf-8')

  // Patch root index.html in-place (for the "/" route)
  const rootRoute = ROUTES.find(r => r.path === '/')
  if (rootRoute) {
    const rootHtml = buildHtml(template, rootRoute)
    fs.writeFileSync(indexHtmlPath, rootHtml, 'utf-8')
    console.log(`[prerender] Patched  /  -> dist/index.html`)
  }

  // Write per-route index.html files
  for (const route of ROUTES) {
    if (route.path === '/') continue

    const routeDir = path.join(DIST, route.path)
    fs.mkdirSync(routeDir, { recursive: true })

    const outFile = path.join(routeDir, 'index.html')
    const html = buildHtml(template, route)
    fs.writeFileSync(outFile, html, 'utf-8')
    console.log(`[prerender] Created  ${route.path}  -> dist${route.path}/index.html`)
  }

  // Summary
  console.log(`\n[prerender] Done. ${ROUTES.length} routes pre-rendered.\n`)
}

main().catch(err => {
  console.error('[prerender] Fatal error:', err)
  process.exit(1)
})
