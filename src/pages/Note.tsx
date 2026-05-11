import { lazy, Suspense, useEffect, useRef, useState, useCallback, type ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Clock, Tag } from 'lucide-react'
import { MDXProvider } from '@mdx-js/react'
import { SEO } from '@/components/ui/SEO'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { formatDate } from '@/lib/utils'
import { AI_LABS } from '@/components/sections/DesignNotes'
import {
  SectionEyebrow,
  Pullquote,
  ReframeList,
  MediaBlock,
  SystemLoop,
  FailureList,
  ClosingStatement,
  DecisionCards,
  MetricsRow,
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

// ─── Module-level lazy MDX + FM loaders (never recreated) ──────────────────

const LAZY_MDX: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'design-in-ai-era':
    lazy(() => import('@/content/insights/design-in-ai-era.mdx').then(m => ({ default: m.default }))),
  'systems-over-screens':
    lazy(() => import('@/content/insights/systems-over-screens.mdx').then(m => ({ default: m.default }))),
  'fail-fast-learn-fast':
    lazy(() => import('@/content/insights/fail-fast-learn-fast.mdx').then(m => ({ default: m.default }))),
  'invisible-interface':
    lazy(() => import('@/content/insights/invisible-interface.mdx').then(m => ({ default: m.default }))),
  'ai-native-product-thinking':
    lazy(() => import('@/content/insights/ai-native-product-thinking.mdx').then(m => ({ default: m.default }))),
  'uiforge':
    lazy(() => import('@/content/case-studies/uiforge.mdx').then(m => ({ default: m.default }))),
  'digital-twin':
    lazy(() => import('@/content/case-studies/digital-twin.mdx').then(m => ({ default: m.default }))),
}

const FM_LOADERS: Record<string, () => Promise<Record<string, unknown>>> = {
  'design-in-ai-era':
    () => import('@/content/insights/design-in-ai-era.mdx').then(m => m.frontmatter),
  'systems-over-screens':
    () => import('@/content/insights/systems-over-screens.mdx').then(m => m.frontmatter),
  'fail-fast-learn-fast':
    () => import('@/content/insights/fail-fast-learn-fast.mdx').then(m => m.frontmatter),
  'invisible-interface':
    () => import('@/content/insights/invisible-interface.mdx').then(m => m.frontmatter),
  'ai-native-product-thinking':
    () => import('@/content/insights/ai-native-product-thinking.mdx').then(m => m.frontmatter),
  'uiforge':
    () => import('@/content/case-studies/uiforge.mdx').then(m => m.frontmatter),
  'digital-twin':
    () => import('@/content/case-studies/digital-twin.mdx').then(m => m.frontmatter),
}

// ─── MDX component overrides ───────────────────────────────────────────────

const MDX_COMPONENTS = {
  SectionEyebrow,
  Pullquote,
  ReframeList,
  MediaBlock,
  SystemLoop,
  FailureList,
  ClosingStatement,
  DecisionCards,
  MetricsRow,
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
        paddingTop: '0.125rem',
        paddingBottom: '0.125rem',
        margin: '2.5rem 0',
        fontFamily: 'Metropolis, Inter, sans-serif',
        fontSize: '1.3125rem',
        fontWeight: 300,
        lineHeight: 1.55,
        letterSpacing: '-0.015em',
        color: 'var(--color-text)',
        fontStyle: 'italic',
      }}
      {...props}
    />
  ),
  hr: () => (
    <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '3.5rem 0' }} />
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

// ─── Table of Contents ─────────────────────────────────────────────────────

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
          fontSize: '0.625rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-muted)',
          marginBottom: '0.75rem',
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
                  fontSize: '0.8125rem',
                  lineHeight: 1.45,
                  color: isActive ? 'var(--color-text)' : 'var(--color-muted)',
                  textDecoration: 'none',
                  padding: '0.25rem 0.625rem',
                  paddingLeft: item.level === 3 ? '1.125rem' : '0.625rem',
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

// ─── Read next ─────────────────────────────────────────────────────────────

function ReadNext({ currentSlug }: { currentSlug: string }) {
  const others = AI_LABS.filter(n => n.slug !== currentSlug).slice(0, 2)
  if (others.length === 0) return null
  return (
    <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '5rem', paddingTop: '3rem' }}>
      <p style={{
        fontFamily: 'Metropolis, Inter, sans-serif',
        fontSize: '0.6875rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
        marginBottom: '1.5rem',
      }}>
        Keep reading
      </p>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--color-border)',
        borderRadius: '0.875rem',
        overflow: 'hidden',
      }}>
        {others.map((note, i) => (
          <Link
            key={note.slug}
            to={`/ai-labs/${note.slug}`}
            state={{ from: 'ai-labs' }}
            style={{ textDecoration: 'none' }}
          >
            <article
              style={{
                padding: '1.25rem 1.5rem',
                backgroundColor: 'var(--color-bg)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                borderBottom: i < others.length - 1 ? '1px solid var(--color-border)' : 'none',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-subtle)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-bg)' }}
            >
              <div style={{ flex: 1 }}>
                <span style={{
                  fontFamily: 'Metropolis, Inter, sans-serif',
                  fontSize: '0.75rem',
                  color: 'var(--color-muted)',
                  display: 'block',
                  marginBottom: '0.3rem',
                }}>
                  {note.tag} · {note.readTime}
                </span>
                <p style={{
                  fontFamily: 'Metropolis, Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '1rem',
                  color: 'var(--color-text)',
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {note.navTitle || note.title}
                </p>
              </div>
              <ArrowUpRight size={16} style={{ flexShrink: 0, color: 'var(--color-muted)' }} />
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── Note content ──────────────────────────────────────────────────────────

interface PageMeta { title: string; description: string; date?: string }

function NoteContent({ slug, onReady, onMeta }: { slug: string; onReady: () => void; onMeta: (m: PageMeta) => void }) {
  const navigate = useNavigate()
  const [frontmatter, setFrontmatter] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    setFrontmatter(null)
    const loader = FM_LOADERS[slug]
    if (!loader) { navigate('/'); return }
    loader().then(data => {
      setFrontmatter(data)
      onMeta({
        title: typeof data.title === 'string' ? data.title : '',
        description: typeof data.excerpt === 'string' ? data.excerpt : (typeof data.title === 'string' ? data.title : ''),
        date: typeof data.date === 'string' ? data.date : undefined,
      })
    })
  }, [slug, navigate, onMeta])

  const LazyMDX = LAZY_MDX[slug]
  if (!LazyMDX) return null

  if (!frontmatter) {
    return (
      <div style={{
        padding: '4rem 0',
        color: 'var(--color-muted)',
        fontFamily: 'Metropolis, Inter, sans-serif',
        fontSize: '0.875rem',
      }}>
        Loading…
      </div>
    )
  }

  const title       = fm(frontmatter.title)
  const excerpt     = fm(frontmatter.excerpt)
  const tag         = fm(frontmatter.tag)
  const readTime    = fm(frontmatter.readTime)
  const date        = fm(frontmatter.date)
  const hideExcerpt = frontmatter.hideExcerpt === true

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
        {date && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontSize: '0.8125rem',
              color: 'var(--color-muted)',
            }}
          >
            {formatDate(date)}
          </span>
        )}
      </div>

      {/* ── Page title ── */}
      <h1
        style={{
          fontFamily: 'Metropolis, Inter, sans-serif',
          fontWeight: 500,
          fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          color: 'var(--color-text)',
          margin: '0 0 1rem',
        }}
      >
        {title}
      </h1>

      {/* ── Excerpt ── */}
      {excerpt && !hideExcerpt && (
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

      {/* ── Divider before body ── */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', marginBottom: '3.5rem' }} />

      {/* ── MDX body ── */}
      <MDXProvider components={MDX_COMPONENTS}>
        <Suspense
          fallback={
            <div style={{
              padding: '2rem 0',
              color: 'var(--color-muted)',
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontSize: '0.875rem',
            }}>
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

export default function Note() {
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

  // Fire ai_lab_view once per slug load, after meta is available
  useEffect(() => {
    if (!pageMeta?.title || !slug) return
    if (viewFiredRef.current === slug) return
    viewFiredRef.current = slug
    trackEvent('ai_lab_view', { slug, title: pageMeta.title })
  }, [pageMeta, slug])

  const handleMeta = useCallback((m: PageMeta) => {
    setPageMeta(prev =>
      prev?.title === m.title && prev?.description === m.description ? prev : m
    )
  }, [])

  const handleContentReady = useCallback(() => {
    requestAnimationFrame(() => {
      if (!contentRef.current) return
      // Prefer SectionEyebrow labels when present (short, scannable)
      // Fall back to all data-toc-item elements (h2/h3) for prose-only articles
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
            const text = full.length > 35 ? full.slice(0, 34).trimEnd() + '…' : full
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
          canonical={slug ? `/ai-labs/${slug}` : undefined}
          ogType="article"
          keywords="AI design, product thinking, design systems, UX leadership, design philosophy"
          jsonLd={{
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: pageMeta.title,
            description: pageMeta.description,
            url: `https://aswanthraj.com/ai-labs/${slug}`,
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
            padding: 'clamp(2rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2.5rem) 0',
          }}
        >
          {/* Content + ToC grid */}
          <div
            style={{ display: 'grid', gap: '4rem', alignItems: 'start' }}
            className={tocItems.length ? 'lg:grid-cols-[1fr_156px]' : ''}
          >
            {/* Main article */}
            <div ref={contentRef} style={{ minWidth: 0 }}>
              {slug && (
                <NoteContent slug={slug} onReady={handleContentReady} onMeta={handleMeta} />
              )}
              {slug && <ReadNext currentSlug={slug} />}
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
      </main>
      <Footer />
    </>
  )
}
