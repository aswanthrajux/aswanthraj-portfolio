import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { trackEvent } from '@/lib/analytics'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Clock, Tag } from 'lucide-react'
import { MDXProvider } from '@mdx-js/react'
import { ProtectedSection } from '@/components/ui/ProtectedSection'
import { SEO } from '@/components/ui/SEO'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  SectionEyebrow,
  Pullquote,
  ReframeList,
  MediaBlock,
  BeforeAfterSlider,
  MetricsRow,
  EvolutionGrid,
  SystemLoop,
  DecisionCards,
  StatGrid,
  FailureList,
  ClosingStatement,
  ImageCarousel,
} from '@/components/ui/CaseStudyComponents'

// ─── Helpers ───────────────────────────────────────────────────────────────

const fm = (val: unknown): string => (typeof val === 'string' ? val : '')

function toId(children: ReactNode): string {
  const text =
    typeof children === 'string'
      ? children
      : Array.isArray(children)
      ? (children as ReactNode[]).map(c => (typeof c === 'string' ? c : '')).join('')
      : ''
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

interface ToCItem { id: string; text: string; level: 2 | 3 }

// Slugs that should redirect to a specific route instead of 404ing to /
const SLUG_REDIRECTS: Record<string, string> = {
  'selected-works': '/work',
}

// ─── Case study order + metadata for next-study nav ───────────────────────

const CASE_STUDY_LIST = [
  {
    slug: 'glance-tv',
    title: 'Glance AI TV',
    excerpt: 'Reimagining idle TV as an AI-driven commerce surface.',
    tag: 'AI · Consumer Product',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
  },
  {
    slug: 'travel-moments',
    title: 'Travel Moments',
    excerpt: 'Turning collective attention into an AI-native travel experience on TV.',
    tag: 'AI · Consumer Product',
    gradient: 'linear-gradient(135deg, #0d1f2d 0%, #1a3a4a 100%)',
  },
  {
    slug: 'hub-lockscreen',
    title: 'Hub & Lockscreen',
    excerpt: 'Reimagining mobile surfaces into intelligent spaces that deliver personalised content and boost app engagement.',
    tag: 'Mobile · Systems Design',
    gradient: 'linear-gradient(135deg, #141414 0%, #2d2d2d 100%)',
  },
  {
    slug: 'folderwall',
    title: 'FolderWall',
    excerpt: 'A new paradigm for how users relate to their installed apps, through contextual grouping and intelligent recommendations.',
    tag: 'Product Innovation',
    gradient: 'linear-gradient(135deg, #12100e 0%, #2b4162 100%)',
  },
  {
    slug: 'inmobi-design-system',
    title: 'InMobi Design System',
    excerpt: 'How a design system became the cultural infrastructure for 15+ products.',
    tag: 'Design Systems · Enterprise',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1e1e1e 100%)',
  },
  {
    slug: 'bedtime-stories',
    title: 'Bedtime Stories',
    excerpt: 'What happens when AI writes, illustrates, and narrates a bedtime story on your TV screen?',
    tag: 'AI · Concept',
    gradient: 'linear-gradient(135deg, #0d0d1a 0%, #1a1a3e 100%)',
  },
  {
    slug: 'shop-app',
    title: 'Shop What You Watch',
    excerpt: 'The first AI-native shopping app for Samsung TV. Agent-driven browsing, vision AI product discovery, and virtual try-on.',
    tag: 'AI · 0→1 Product',
    gradient: 'linear-gradient(135deg, #1a0f0a 0%, #3d2010 50%, #2a0a0a 100%)',
  },
]

// ─── Module-level lazy MDX components (created ONCE, never recreated) ──────
// This is the fix for flickering — lazy() must live outside any component body.

const LAZY_MDX: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'glance-tv':
    lazy(() => import('@/content/case-studies/glance-tv.mdx').then(m => ({ default: m.default }))),
  'travel-moments':
    lazy(() => import('@/content/case-studies/travel-moments.mdx').then(m => ({ default: m.default }))),
  'hub-lockscreen':
    lazy(() => import('@/content/case-studies/hub-lockscreen.mdx').then(m => ({ default: m.default }))),
  'folderwall':
    lazy(() => import('@/content/case-studies/folderwall.mdx').then(m => ({ default: m.default }))),
  'inmobi-design-system':
    lazy(() => import('@/content/case-studies/inmobi-design-system.mdx').then(m => ({ default: m.default }))),
  'bedtime-stories':
    lazy(() => import('@/content/case-studies/bedtime-stories.mdx').then(m => ({ default: m.default }))),
  'shop-app':
    lazy(() => import('@/content/case-studies/shop-app.mdx').then(m => ({ default: m.default }))),
  // selected-works and digital-twin are not routed here
}

// Frontmatter loaders — same chunk as above; browser caches so only one fetch
const FM_LOADERS: Record<string, () => Promise<Record<string, unknown>>> = {
  'glance-tv':
    () => import('@/content/case-studies/glance-tv.mdx').then(m => m.frontmatter),
  'travel-moments':
    () => import('@/content/case-studies/travel-moments.mdx').then(m => m.frontmatter),
  'hub-lockscreen':
    () => import('@/content/case-studies/hub-lockscreen.mdx').then(m => m.frontmatter),
  'folderwall':
    () => import('@/content/case-studies/folderwall.mdx').then(m => m.frontmatter),
  'inmobi-design-system':
    () => import('@/content/case-studies/inmobi-design-system.mdx').then(m => m.frontmatter),
  'bedtime-stories':
    () => import('@/content/case-studies/bedtime-stories.mdx').then(m => m.frontmatter),
  'shop-app':
    () => import('@/content/case-studies/shop-app.mdx').then(m => m.frontmatter),
  // selected-works and digital-twin are not routed here
}

// ─── MDX component overrides ───────────────────────────────────────────────

const MDX_COMPONENTS = {
  ProtectedSection,
  SectionEyebrow,
  Pullquote,
  ReframeList,
  MediaBlock,
  BeforeAfterSlider,
  MetricsRow,
  EvolutionGrid,
  SystemLoop,
  DecisionCards,
  StatGrid,
  FailureList,
  ClosingStatement,
  ImageCarousel,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = toId(props.children)
    return (
      <h1
        id={id || undefined}
        style={{
          fontFamily: 'Metropolis, Inter, sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          color: 'var(--color-text)',
          marginTop: '3.5rem',
          marginBottom: '0.875rem',
        }}
        {...props}
      />
    )
  },
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = toId(props.children)
    return (
      <h2
        id={id || undefined}
        data-toc-item="true"
        data-toc-level="2"
        style={{
          fontFamily: 'Metropolis, Inter, sans-serif',
          fontWeight: 400,
          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          color: 'var(--color-text)',
          marginTop: '0.5rem',
          marginBottom: '1.375rem',
        }}
        {...props}
      />
    )
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = toId(props.children)
    return (
      <h3
        id={id || undefined}
        data-toc-item="true"
        data-toc-level="3"
        style={{
          fontFamily: 'Metropolis, Inter, sans-serif',
          fontWeight: 500,
          fontSize: '1.125rem',
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
          color: 'var(--color-text)',
          marginTop: '2.5rem',
          marginBottom: '0.5rem',
        }}
        {...props}
      />
    )
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: 1.8,
        color: 'var(--color-muted)',
        marginBottom: '1.5rem',
      }}
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ color: 'var(--color-text)', fontWeight: 600 }} {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em style={{ color: 'var(--color-muted)', fontStyle: 'italic' }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      style={{
        fontFamily: 'Metropolis, Inter, sans-serif',
        paddingLeft: '1.5rem',
        marginBottom: '1.5rem',
        listStyleType: 'disc',
      }}
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      style={{
        fontFamily: 'Metropolis, Inter, sans-serif',
        paddingLeft: '1.5rem',
        marginBottom: '1.5rem',
      }}
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: 1.8,
        color: 'var(--color-muted)',
        marginBottom: '0.5rem',
      }}
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      style={{
        borderLeft: '2px solid var(--color-text)',
        paddingLeft: '1.5rem',
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem',
        margin: '2.5rem 0',
        fontFamily: 'Metropolis, Inter, sans-serif',
        fontSize: '1.25rem',
        fontStyle: 'italic',
        fontWeight: 300,
        lineHeight: 1.6,
        color: 'var(--color-text)',
      }}
      {...props}
    />
  ),
  hr: () => (
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid var(--color-border)',
        margin: '3.5rem 0',
      }}
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      loading="lazy"
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        borderRadius: '1rem',
        objectFit: 'cover',
        margin: '2rem 0 0.875rem',
        display: 'block',
        border: '1px solid var(--color-border)',
      }}
      {...props}
    />
  ),
}

// ─── Table of Contents sidebar ─────────────────────────────────────────────

function TableOfContents({ items, activeId }: { items: ToCItem[]; activeId: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top: offset, behavior: 'smooth' })
    }
  }

  return (
    <nav aria-label="Table of contents">
      <p
        style={{
          fontFamily: 'Metropolis, Inter, sans-serif',
          fontWeight: 400,
          fontSize: '0.6875rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-muted)',
          marginBottom: '1rem',
          marginTop: 0,
        }}
      >
        On this page
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map(item => {
          const isActive = item.id === activeId
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={e => handleClick(e, item.id)}
                style={{
                  display: 'block',
                  fontFamily: 'Metropolis, Inter, sans-serif',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  color: isActive ? 'var(--color-text)' : 'var(--color-muted)',
                  textDecoration: 'none',
                  padding: '0.375rem 0.75rem',
                  paddingLeft: item.level === 3 ? '1.25rem' : '0.75rem',
                  borderLeft: `2px solid ${isActive ? 'var(--color-text)' : 'var(--color-border)'}`,
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// ─── Content ready signal ──────────────────────────────────────────────────

function ContentReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(() => { onReady() }, [onReady])
  return null
}

// ─── Case study content ────────────────────────────────────────────────────

interface PageMeta { title: string; description: string; ogImage?: string; date?: string }

function CaseStudyContent({ slug, onReady, onMeta }: { slug: string; onReady: () => void; onMeta: (m: PageMeta) => void }) {
  const navigate = useNavigate()
  const [frontmatter, setFrontmatter] = useState<Record<string, unknown> | null>(null)

  // Load frontmatter via same module chunk (cached after first load)
  useEffect(() => {
    setFrontmatter(null)
    const loader = FM_LOADERS[slug]
    if (!loader) { navigate(SLUG_REDIRECTS[slug] ?? '/'); return }
    loader().then(data => {
      setFrontmatter(data)
      onMeta({
        title: typeof data.title === 'string' ? data.title : '',
        description: typeof data.excerpt === 'string' ? data.excerpt : (typeof data.title === 'string' ? data.title : ''),
        ogImage: typeof data.coverImage === 'string' ? data.coverImage : undefined,
        date: typeof data.date === 'string' ? data.date : undefined,
      })
    })
  }, [slug, navigate, onMeta])

  const LazyMDX = LAZY_MDX[slug]
  if (!LazyMDX) return null

  // Show simple skeleton while frontmatter loads (usually <100ms once chunk cached)
  if (!frontmatter) {
    return (
      <div style={{ padding: '4rem 0', color: 'var(--color-muted)', fontFamily: 'Metropolis, Inter, sans-serif', fontSize: '0.875rem' }}>
        Loading…
      </div>
    )
  }

  const title      = fm(frontmatter.title)
  const excerpt    = fm(frontmatter.excerpt)
  const tag        = fm(frontmatter.tag)
  const readTime   = fm(frontmatter.readTime)
  const coverImage = fm(frontmatter.coverImage)
  const coverVideo = fm(frontmatter.coverVideo)

  return (
    <>
      {/* ── Meta bar ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
        {tag && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontSize: '0.8125rem',
              color: 'var(--color-muted)',
              padding: '0.375rem 0.875rem',
              border: '1px solid var(--color-border)',
              borderRadius: '100px',
              backgroundColor: 'var(--color-subtle)',
            }}
          >
            <Tag size={11} />
            {tag}
          </span>
        )}
        {readTime && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontSize: '0.8125rem',
              color: 'var(--color-muted)',
            }}
          >
            <Clock size={11} />
            {readTime}
          </span>
        )}
      </div>

      {/* ── Page title ── */}
      <h1
        style={{
          fontFamily: 'Metropolis, Inter, sans-serif',
          fontWeight: 500,
          fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          color: 'var(--color-text)',
          margin: '0 0 1rem',
          maxWidth: '18ch',
        }}
      >
        {title}
      </h1>

      {/* ── Excerpt ── */}
      {excerpt && (
        <p
          style={{
            fontFamily: 'Metropolis, Inter, sans-serif',
            fontSize: '1.125rem',
            lineHeight: 1.75,
            color: 'var(--color-muted)',
            margin: '0 0 2.5rem',
          }}
        >
          {excerpt}
        </p>
      )}

      {/* ── Hero media ── */}
      {coverVideo ? (
        <video
          src={coverVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            aspectRatio: '16 / 7',
            borderRadius: '1.25rem',
            objectFit: 'cover',
            marginBottom: '3.5rem',
            display: 'block',
            border: '1px solid var(--color-border)',
          }}
        />
      ) : coverImage ? (
        <img
          src={coverImage}
          alt={title}
          style={{
            width: '100%',
            borderRadius: '1.25rem',
            objectFit: 'contain',
            marginBottom: '3.5rem',
            display: 'block',
            border: '1px solid var(--color-border)',
          }}
        />
      ) : (
        <div
          style={{
            aspectRatio: '16 / 7',
            borderRadius: '1.25rem',
            background: 'linear-gradient(135deg, var(--color-subtle) 0%, var(--color-border) 100%)',
            marginBottom: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--color-border)',
          }}
        >
          <span
            style={{
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontWeight: 300,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
            }}
          >
            {title}
          </span>
        </div>
      )}

      {/* ── Divider before MDX body ── */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', marginBottom: '3.5rem' }} />

      {/* ── MDX body — stable Suspense with module-level lazy component ── */}
      <MDXProvider components={MDX_COMPONENTS}>
        <Suspense
          fallback={
            <div style={{ padding: '2rem 0', color: 'var(--color-muted)', fontFamily: 'Metropolis, Inter, sans-serif', fontSize: '0.875rem' }}>
              Loading content…
            </div>
          }
        >
          <LazyMDX />
          <ContentReadySignal onReady={onReady} />
        </Suspense>
      </MDXProvider>
    </>
  )
}


// ─── Main page ─────────────────────────────────────────────────────────────

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const contentRef = useRef<HTMLDivElement>(null)
  const [tocItems, setTocItems] = useState<ToCItem[]>([])
  const [activeId, setActiveId] = useState('')
  const [pageMeta, setPageMeta] = useState<PageMeta | null>(null)
  const viewFiredRef = useRef<string | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    setTocItems([])
    setActiveId('')
    setPageMeta(null)
    viewFiredRef.current = null
  }, [slug])

  // Fire case_study_view once per slug load, after meta is available
  useEffect(() => {
    if (!pageMeta?.title || !slug) return
    if (viewFiredRef.current === slug) return
    viewFiredRef.current = slug
    trackEvent('case_study_view', { slug, title: pageMeta.title })
  }, [pageMeta, slug])

  const handleMeta = useCallback((m: PageMeta) => {
    setPageMeta(prev =>
      prev?.title === m.title && prev?.description === m.description ? prev : m
    )
  }, [])

  const handleContentReady = useCallback(() => {
    requestAnimationFrame(() => {
      if (!contentRef.current) return
      // Prefer SectionEyebrow labels (short, scannable) when present.
      // Fall back to h2/h3 data-toc-item for plain-markdown case studies (e.g. hub-lockscreen, folderwall).
      const eyebrows = Array.from(
        contentRef.current.querySelectorAll<HTMLElement>('[data-toc-eyebrow]')
      )
      const source = eyebrows.length > 0
        ? eyebrows
        : Array.from(contentRef.current.querySelectorAll<HTMLElement>('[data-toc-item]'))
      setTocItems(
        source
          .filter(h => h.id && h.textContent)
          .map(h => {
            const full = h.textContent!.trim()
            const text = full.length > 45 ? full.slice(0, 44).trimEnd() + '…' : full
            return { id: h.id, text, level: (h.dataset.tocLevel === '3' ? 3 : 2) as 2 | 3 }
          })
      )
    })
  }, [])

  useEffect(() => {
    if (!tocItems.length) return
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 }
    )
    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [tocItems])

  return (
    <>
      {pageMeta && (
        <SEO
          title={pageMeta.title}
          description={pageMeta.description}
          canonical={slug ? `/case-study/${slug}` : undefined}
          ogImage={pageMeta.ogImage ? `https://aswanthraj.com${pageMeta.ogImage}` : undefined}
          ogType="article"
          keywords="product design, AI product design, UX case study, design leadership, Glance AI"
          jsonLd={{
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: pageMeta.title,
            description: pageMeta.description,
            url: `https://aswanthraj.com/case-study/${slug}`,
            ...(pageMeta.ogImage ? { image: `https://aswanthraj.com${pageMeta.ogImage}` } : {}),
            ...(pageMeta.date ? { datePublished: pageMeta.date } : {}),
            author: { '@type': 'Person', name: 'Aswanth Raj', url: 'https://aswanthraj.com' },
            publisher: { '@type': 'Person', name: 'Aswanth Raj', url: 'https://aswanthraj.com' },
          }}
        />
      )}
      <Header />
      <main style={{ paddingTop: '5rem', paddingBottom: '6rem', minHeight: '100vh' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 clamp(1.25rem, 4vw, 2.5rem)',
          }}
        >
          {/* Content + ToC grid */}
          <div
            style={{ display: 'grid', gap: '4rem', alignItems: 'start' }}
            className={tocItems.length ? 'lg:grid-cols-[1fr_180px]' : ''}
          >
            {/* Main article */}
            <div ref={contentRef} style={{ minWidth: 0 }}>
              {slug && (
                <CaseStudyContent slug={slug} onReady={handleContentReady} onMeta={handleMeta} />
              )}
            </div>

            {/* Sticky ToC sidebar */}
            {tocItems.length > 0 && (
              <aside
                className="hidden lg:block"
                style={{ position: 'sticky', top: '7rem', alignSelf: 'start' }}
              >
                <TableOfContents items={tocItems} activeId={activeId} />
              </aside>
            )}
          </div>
        </div>

        {/* ── Next case study ── */}
        {slug && (() => {
          const idx = CASE_STUDY_LIST.findIndex(c => c.slug === slug)
          if (idx === -1) return null
          const next = CASE_STUDY_LIST[(idx + 1) % CASE_STUDY_LIST.length]
          return (
            <Link
              to={`/case-study/${next.slug}`}
              style={{ display: 'block', textDecoration: 'none', marginTop: '4rem' }}
            >
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: next.gradient,
                  padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 2.5rem)',
                  cursor: 'pointer',
                  transition: 'filter 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.12)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
              >
                {/* Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 100%)',
                  pointerEvents: 'none',
                }} />

                <div style={{
                  maxWidth: '1200px',
                  margin: '0 auto',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '2rem',
                  flexWrap: 'wrap',
                }}>
                  <div>
                    <p style={{
                      fontFamily: 'Metropolis, Inter, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.6875rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.5)',
                      marginBottom: '0.75rem',
                    }}>
                      Next case study
                    </p>
                    <h2 style={{
                      fontFamily: 'Metropolis, Inter, sans-serif',
                      fontWeight: 300,
                      fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
                      lineHeight: 1.1,
                      letterSpacing: '-0.025em',
                      color: '#fff',
                      margin: '0 0 0.875rem',
                    }}>
                      {next.title}
                    </h2>
                    <p style={{
                      fontFamily: 'Metropolis, Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '0.9375rem',
                      lineHeight: 1.65,
                      color: 'rgba(255,255,255,0.6)',
                      margin: 0,
                      maxWidth: '480px',
                    }}>
                      {next.excerpt}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'Metropolis, Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '0.9375rem',
                    color: 'rgba(255,255,255,0.75)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '100px',
                    padding: '0.75rem 1.375rem',
                    transition: 'color 0.2s ease, border-color 0.2s ease',
                    flexShrink: 0,
                  }}>
                    Read case study <ArrowUpRight size={15} />
                  </div>
                </div>
              </div>
            </Link>
          )
        })()}

      </main>
      <Footer />
    </>
  )
}
