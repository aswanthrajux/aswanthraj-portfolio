import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/FadeIn'
import { SEO } from '@/components/ui/SEO'

interface CaseStudy {
  slug: string
  title: string
  description: string
  tag: string
  year: string
  gradient: string
  thumbnail?: string
  visible?: boolean
}

const ALL_CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'glance-tv',
    title: 'Glance AI TV',
    description: 'Reimagining the TV home screen as an AI-powered ambient canvas for content, discovery, and commerce. From screensaver to shopping surface.',
    tag: 'AI · Consumer Product',
    year: '2026',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
    thumbnail: '/images/case-studies/glance-tv-cover.webp?v=2',
    visible: true,
  },
  {
    slug: 'travel-moments',
    title: 'Travel Moments',
    description: 'AI-native travel planning for the living room. Explore destinations through a 3D globe and generate personalised travel videos together.',
    tag: 'AI · Consumer Product',
    year: '2026',
    gradient: 'linear-gradient(135deg, #0d1f2d 0%, #1a3a4a 100%)',
    thumbnail: '/images/case-studies/travel-moments-cover.webp?v=2',
    visible: true,
  },
  {
    slug: 'shop-app',
    title: 'Shop What You Watch',
    description: 'The first AI-native shopping app for Samsung TV. Conversational product discovery, vision AI, and virtual try-on on the biggest screen in the room.',
    tag: 'AI · 0\u21921 Product',
    year: '2026',
    gradient: 'linear-gradient(135deg, #1a0f0a 0%, #3d2010 50%, #2a0a0a 100%)',
    thumbnail: '/images/case-studies/shop-app-cover.webp?v=2',
    visible: true,
  },
  {
    slug: 'bedtime-stories',
    title: 'Bedtime Stories',
    description: 'AI writes the story, illustrates each scene, and narrates it live on your TV. A concept exploring generative storytelling on ambient surfaces.',
    tag: 'AI · Concept',
    year: '2026',
    gradient: 'linear-gradient(135deg, #0d0d1a 0%, #1a1040 100%)',
    thumbnail: '/images/case-studies/bedtime-stories-cover.webp?v=2',
    visible: true,
  },
  {
    slug: 'inmobi-design-system',
    title: 'InMobi Design System',
    description: 'How a design system became the cultural infrastructure for 15+ products. The vocabulary built in 2019 is the vocabulary AI design tools speak today.',
    tag: 'Design Systems · Enterprise',
    year: '2020',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1e1e1e 100%)',
    thumbnail: '/images/case-studies/inmobi-ds-cover.webp?v=1',
    visible: true,
  },
  // ── Hidden for now ────────────────────────────────────────────────────────────
  {
    slug: 'hub-lockscreen',
    title: 'Hub & Lockscreen',
    description: 'Reimagining mobile surfaces like lock-screen and widgets into intelligent spaces, delivering personalised content and recommendations that boost engagement.',
    tag: 'Mobile · Systems Design',
    year: '2023',
    gradient: 'linear-gradient(135deg, #141414 0%, #2d2d2d 100%)',
    visible: false,
  },
  {
    slug: 'folderwall',
    title: 'FolderWall',
    description: 'Driving app discovery through smart organisation. A new paradigm for how users relate to their installed apps through contextual grouping.',
    tag: 'Product Innovation',
    year: '2022',
    gradient: 'linear-gradient(135deg, #12100e 0%, #2b4162 100%)',
    visible: false,
  },
]

const VISIBLE_STUDIES = ALL_CASE_STUDIES.filter(s => s.visible !== false)

export default function WorkPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <SEO
        title="Case Studies"
        description="AI-native products, design systems, and ambient experiences designed for scale. Case studies from Glance AI TV, Travel Moments, Shop App, InMobi Design System, and more."
        canonical="/work"
        keywords="product design case studies, AI product design, TV UX, design systems, ambient computing, Glance AI, InMobi, UX portfolio"
      />
      <Header />
      <main>
        <section
          style={{
            padding: 'clamp(7rem, 12vw, 10rem) clamp(1.5rem, 6vw, 5rem) clamp(5rem, 10vw, 9rem)',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <FadeIn style={{ marginBottom: '3.5rem' }}>
            <p className="text-eyebrow" style={{ marginBottom: '0.625rem' }}>Case Studies</p>
            <h1 className="text-display-xl" style={{ margin: '0 0 1.25rem' }}>
              Products at the intersection of AI,<br />
              <span style={{ fontWeight: 200, opacity: 0.5 }}>behaviour, and scale.</span>
            </h1>
            <p
              style={{
                fontFamily: 'Metropolis, Inter, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                color: 'var(--color-muted)',
                lineHeight: 1.7,
                maxWidth: '52ch',
                margin: 0,
              }}
            >
              AI-native products, design systems, and ambient experiences. Each project shipped, each system scaled for millions of people.
            </p>
          </FadeIn>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {VISIBLE_STUDIES.map((study, i) => (
              <FadeIn key={study.slug} delay={i * 0.06}>
                <Link
                  to={`/case-study/${study.slug}`}
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
                        {study.description}
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
        </section>
      </main>
      <Footer />
    </>
  )
}
