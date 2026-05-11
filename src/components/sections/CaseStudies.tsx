import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { saveScrollAnchor } from '@/utils/scrollRestore'

interface CaseStudy {
  slug: string
  title: string
  excerpt: string
  tag: string
  year: string
  gradient: string
  thumbnail?: string
  showOnHome: boolean
}

const CASE_STUDIES: CaseStudy[] = [
  // ── Visible on home ──────────────────────────────────────────────────────────
  {
    slug: 'glance-tv',
    title: 'Glance AI TV',
    excerpt: 'A TV screensaver reimagined as an AI commerce platform. Conversational shopping, fashion try-on, and personalised discovery on the ambient screen.',
    tag: 'AI · Consumer Product',
    year: '2026',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
    thumbnail: '/images/case-studies/glance-tv-cover.webp?v=2',
    showOnHome: true,
  },
  {
    slug: 'travel-moments',
    title: 'Travel Moments',
    excerpt: 'AI-native travel planning for the living room. Explore destinations through a 3D globe and generate personalised travel videos, together.',
    tag: 'AI · Consumer Product',
    year: '2026',
    gradient: 'linear-gradient(135deg, #0d1f2d 0%, #1a3a4a 100%)',
    thumbnail: '/images/case-studies/travel-moments-cover.webp?v=2',
    showOnHome: true,
  },
  {
    slug: 'shop-app',
    title: 'Shop What You Watch',
    excerpt: 'The first AI-native shopping app for Samsung TV. Conversational product discovery, vision AI, and virtual try-on on the biggest screen in the room.',
    tag: 'AI · 0→1 Product',
    year: '2026',
    gradient: 'linear-gradient(135deg, #1a0f0a 0%, #3d2010 50%, #2a0a0a 100%)',
    thumbnail: '/images/case-studies/shop-app-cover.webp?v=2',
    showOnHome: true,
  },
  {
    slug: 'bedtime-stories',
    title: 'Bedtime Stories',
    excerpt: 'AI writes the story, illustrates each scene, and narrates it live on your TV. A concept exploring generative storytelling on ambient surfaces.',
    tag: 'AI · Concept',
    year: '2026',
    gradient: 'linear-gradient(135deg, #0d0d1a 0%, #1a1040 100%)',
    thumbnail: '/images/case-studies/bedtime-stories-cover.webp?v=2',
    showOnHome: true,
  },
  // ── Hidden on home (visible via View All) ────────────────────────────────────
  {
    slug: 'inmobi-design-system',
    title: 'InMobi Design System',
    excerpt: 'How a design system became the cultural infrastructure for 15+ products. The vocabulary built in 2019 is the vocabulary AI design tools speak today.',
    tag: 'Design Systems · Enterprise',
    year: '2020',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1e1e1e 100%)',
    thumbnail: '/images/case-studies/inmobi-ds-cover.webp?v=1',
    showOnHome: false,
  },
  {
    slug: 'hub-lockscreen',
    title: 'Hub & Lockscreen',
    excerpt: 'Reimagining mobile surfaces like lock-screen and widgets into intelligent spaces, delivering personalised content and recommendations that boost engagement.',
    tag: 'Mobile · Systems Design',
    year: '2023',
    gradient: 'linear-gradient(135deg, #141414 0%, #2d2d2d 100%)',
    showOnHome: false,
  },
  {
    slug: 'folderwall',
    title: 'FolderWall',
    excerpt: 'Driving app discovery through smart organisation. A new paradigm for how users relate to their installed apps through contextual grouping.',
    tag: 'Product Innovation',
    year: '2022',
    gradient: 'linear-gradient(135deg, #12100e 0%, #2b4162 100%)',
    showOnHome: false,
  },
  {
    slug: 'digital-twin',
    title: 'Digital Twin',
    excerpt: 'What if AI modeled your thinking instead of supplementing it? An experiment in building a behavioral model of yourself through conversation.',
    tag: 'AI · Lab Experiment',
    year: '2026',
    gradient: 'linear-gradient(135deg, #080c14 0%, #0f1f3d 50%, #1a0f2e 100%)',
    showOnHome: false,
  },
]

export default function CaseStudies() {
  const visible = CASE_STUDIES.filter(s => s.showOnHome)

  return (
    <section
      id="case-studies"
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 5rem)',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <FadeIn style={{ marginBottom: '3.5rem' }}>
        <p className="text-eyebrow" style={{ marginBottom: '0.625rem' }}>Case Studies</p>
        <h2 className="text-display-xl" style={{ margin: 0 }}>
          Real work,{' '}
          <span style={{ fontWeight: 200, opacity: 0.5 }}>real impact.</span>
        </h2>
      </FadeIn>

      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: '1.25rem',
        }}
      >
        {visible.map((study, i) => (
          <FadeIn key={study.slug} delay={i * 0.07}>
            <Link
              to={`/case-study/${study.slug}`} onClick={() => saveScrollAnchor('#case-studies')}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <article
                style={{
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  backgroundColor: 'var(--color-subtle)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Cover */}
                <div
                  style={{
                    aspectRatio: '16 / 9',
                    background: study.gradient,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {study.thumbnail ? (
                    <img
                      src={study.thumbnail}
                      alt={study.title}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {study.title}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.625rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.75rem',
                        color: 'var(--color-muted)',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {study.tag}
                    </span>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.75rem',
                        color: 'var(--color-muted)',
                      }}
                    >
                      {study.year}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      color: 'var(--color-text)',
                      margin: '0 0 0.625rem',
                      lineHeight: 1.25,
                    }}
                  >
                    {study.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.9375rem',
                      color: 'var(--color-muted)',
                      lineHeight: 1.65,
                      margin: '0 0 1.25rem',
                    }}
                  >
                    {study.excerpt}
                  </p>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                    }}
                  >
                    Read Case Study <ArrowUpRight size={14} />
                  </span>
                </div>
              </article>
            </Link>
          </FadeIn>
        ))}
      </div>

      {/* View All */}
      <FadeIn delay={0.3}>
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link
            to="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontWeight: 400,
              fontSize: '0.9375rem',
              color: 'var(--color-text)',
              textDecoration: 'none',
              padding: '0.875rem 2rem',
              border: '1px solid var(--color-border)',
              borderRadius: '100px',
              transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'var(--color-subtle)'
              el.style.borderColor = 'var(--color-text)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'transparent'
              el.style.borderColor = 'var(--color-border)'
            }}
          >
            View all work <ArrowUpRight size={14} />
          </Link>
        </div>
      </FadeIn>
    </section>
  )
}
