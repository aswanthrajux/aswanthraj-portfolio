import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Download } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/FadeIn'
import { SEO } from '@/components/ui/SEO'

// ─── Data ──────────────────────────────────────────────────────────────────

const DISCIPLINES = [
  {
    title: 'UX Strategy',
    desc: 'Framing the right problem before designing the solution, aligning business goals with user needs at every layer.',
  },
  {
    title: 'Consumer Product Design',
    desc: 'Crafting experiences that feel effortless at scale. From the lock screen to the living room, designing for hundreds of millions.',
  },
  {
    title: 'Design Systems',
    desc: 'Building the shared vocabulary that lets teams move fast without breaking the product\'s coherence.',
  },
  {
    title: 'AI-Driven Workflows',
    desc: 'Using generative tools and AI-assisted prototyping to compress the gap between idea and tested reality.',
  },
  {
    title: 'Design Leadership',
    desc: 'Enabling teams to design and learn fast, through clarity, psychological safety, and a bias toward shipping.',
  },
  {
    title: 'Motion Direction',
    desc: 'Treating animation as communication, not decoration. Motion that carries meaning and makes interfaces feel alive.',
  },
]

const EXPERIENCE = [
  {
    company: 'Glance AI',
    role: 'UX Manager',
    period: '2021–Present',
    location: 'Bengaluru',
    desc: 'Leading design for AI-native experiences on Android lock screens and connected TVs. Serving 200M+ users across India and Southeast Asia, with products at the intersection of ambient intelligence and consumer delight.',
  },
  {
    company: 'InMobi',
    role: 'Design Lead',
    period: '2015–2021',
    location: 'Bengaluru',
    desc: 'Shaped mobile advertising and commerce products through the era of smartphone ubiquity. 3× InMobi Oscar nominee. Contributed to products reaching 1.5B+ devices across 200+ countries.',
  },
  {
    company: 'Purpos / 1st Play',
    role: 'Co-founder',
    period: 'Aug 2020–Mar 2021',
    location: 'Bengaluru',
    desc: 'Co-founded a sports performance platform to help youth academies track athletes, analyze progress, and surface coaching recommendations. Live with 10+ academies managing player development across age groups.',
  },
  {
    company: 'InEight',
    role: 'Senior Product Designer',
    period: 'Sep 2013–2015',
    location: 'Bengaluru',
    desc: 'Designed enterprise construction management tools used by project teams at the world\'s largest infrastructure companies. Elevated design maturity from ad-hoc to a systematic, research-driven process.',
  },
  {
    company: 'Freelance',
    role: 'App Designer',
    period: 'Mar 2011–Aug 2013',
    location: 'Remote',
    desc: 'Partnered with early-stage founders to translate raw product ideas into fully realized app experiences. Delivered end-to-end design across consumer and utility apps, with detailed specs ready for engineering handoff.',
  },
]

const ACHIEVEMENTS = [
  { value: '10+', label: 'Design Awards', sub: 'InMobi & Glance' },
  { value: '3×',  label: 'InMobi Oscar',  sub: 'Nominee' },
  { value: '1',   label: 'US Patent',      sub: 'Filed 2017' },
  { value: '—',   label: 'Nasscom',        sub: 'Design4India Finalist' },
]

// ─── Shared section label ──────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{
      marginBottom: 'clamp(2rem, 4vw, 3rem)',
      paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
    }}>
      <p className="text-eyebrow" style={{ margin: 0 }}>{label}</p>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function AboutPage() {
  // Always start at the top of the page
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <SEO
        title="About Aswanth Raj"
        description="UX Manager at Glance AI. 15+ years designing products that reach hundreds of millions. Background spanning AI-native consumer products, design systems, mobile advertising, and enterprise software."
        canonical="/about"
        ogImage="https://aswanthraj.com/images/aswanth-portrait.webp"
        keywords="Aswanth Raj, UX Manager, Glance AI, InMobi, product designer, design leader, AI design, design systems, Bengaluru"
      />
      <Header />
      <main style={{ paddingTop: '5rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 5rem) clamp(5rem, 10vw, 8rem)',
        }}>

          {/* ══════════════════════════════════════════════════════
              HERO
          ══════════════════════════════════════════════════════ */}
          <div
            style={{ display: 'grid', gap: 'clamp(3rem, 6vw, 5rem)', alignItems: 'start', marginBottom: 'clamp(4rem, 8vw, 7rem)' }}
            className="md:grid-cols-[1fr_420px]"
          >
            <FadeIn direction="right">
              <p className="text-eyebrow" style={{ marginBottom: '1.25rem' }}>About</p>
              <h1 className="text-display-xl" style={{ margin: '0 0 2rem' }}>
                Aswanth Raj
              </h1>
              <p className="type-body" style={{ fontSize: '1.0625rem', maxWidth: '540px', margin: 0 }}>
                Fifteen years of designing products that reach hundreds of millions.
                Currently leading UX at{' '}
                <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>Glance AI</strong>
                {' '}in Bengaluru, where AI meets the ambient screen.
              </p>
            </FadeIn>

            <FadeIn direction="left" delay={0.15}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '100%',
                  aspectRatio: '1200 / 1348',
                  borderRadius: '1.5rem',
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                }}>
                  <img
                    src="/images/aswanth-anniversary.webp"
                    alt="Aswanth Raj"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      display: 'block',
                    }}
                  />
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '-1.5rem',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '100px',
                  padding: '0.625rem 1.125rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E5334B', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Metropolis, Inter, sans-serif', fontWeight: 400, fontSize: '0.8125rem', color: 'var(--color-text)', whiteSpace: 'nowrap' }}>
                    UX Manager @ Glance AI
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ══════════════════════════════════════════════════════
              STORY
          ══════════════════════════════════════════════════════ */}
          <FadeIn direction="up">
            <SectionLabel label="Story" />
            <div
              style={{ display: 'grid', gap: 'clamp(2rem, 5vw, 5rem)' }}
              className="md:grid-cols-[160px_1fr]"
            >
              <div>
                <p
                  style={{
                    fontFamily: 'Metropolis, Inter, sans-serif',
                    fontWeight: 200,
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    color: 'var(--color-border)',
                    margin: 0,
                  }}
                >
                  15+
                </p>
                <p className="type-label" style={{ marginTop: '0.5rem' }}>Years designing</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.375rem' }}>
                <p className="type-body" style={{ fontSize: '1.125rem', margin: 0 }}>
                  I didn't start out wanting to be a designer. I started out wanting to understand why some things felt right and others didn't. That question has been the thread through fifteen years of work, across mobile advertising, enterprise software, and AI-native consumer products.
                </p>
                <p className="type-body" style={{ fontSize: '1.125rem', margin: 0 }}>
                  At <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>InMobi</strong>, I learned what it means to design for scale: systems that serve a billion users across 200 countries. At <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>InEight</strong>, I learned what it means to design for complexity: tools that project managers at the world's largest infrastructure companies depend on every day. At <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>Glance AI</strong>, I've been learning what it means to design for ambient intelligence, where the screen finds you, not the other way around.
                </p>
                <p className="type-body" style={{ fontSize: '1.125rem', margin: 0 }}>
                  My philosophy:{' '}
                  <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>
                    design without intention is just decoration.
                  </strong>{' '}
                  Every decision should trace back to a real user need, a clear business outcome, or a principle worth standing for. I care about the teams I build, the designers I help grow, and making things that are still useful long after we've shipped them.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ══════════════════════════════════════════════════════
              DISCIPLINES
          ══════════════════════════════════════════════════════ */}
          <FadeIn direction="up">
            <SectionLabel label="Disciplines" />
            <div
              style={{ display: 'grid', gap: '1px', backgroundColor: 'var(--color-border)' }}
              className="md:grid-cols-2 lg:grid-cols-3"
            >
              {DISCIPLINES.map((d, i) => (
                <div
                  key={d.title}
                  style={{
                    padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                    backgroundColor: 'var(--color-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.625rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                    <h3 style={{
                      fontFamily: 'Metropolis, Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '1rem',
                      color: 'var(--color-text)',
                      margin: 0,
                    }}>
                      {d.title}
                    </h3>
                    <span className="type-label" style={{ flexShrink: 0, marginTop: '2px' }}>0{i + 1}</span>
                  </div>
                  <p className="type-body" style={{ fontSize: '0.875rem', margin: 0, lineHeight: 1.65 }}>
                    {d.desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* ══════════════════════════════════════════════════════
              EXPERIENCE
          ══════════════════════════════════════════════════════ */}
          <FadeIn direction="up">
            <SectionLabel label="Experience" />
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-1rem' }}>
            {EXPERIENCE.map((exp, i) => (
              <FadeIn key={exp.company} direction="up" delay={i * 0.07}>
                <div
                  style={{
                    display: 'grid',
                    gap: 'clamp(1rem, 3vw, 3rem)',
                    padding: 'clamp(1.5rem, 3vw, 2.5rem) 0',
                    borderBottom: '1px solid var(--color-border)',
                    alignItems: 'start',
                  }}
                  className="md:grid-cols-[180px_1fr]"
                >
                  <div>
                    <p style={{
                      fontFamily: 'Metropolis, Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '0.9375rem',
                      color: 'var(--color-text)',
                      margin: '0 0 0.25rem',
                    }}>
                      {exp.company}
                    </p>
                    <p className="type-label" style={{ margin: '0 0 0.25rem' }}>{exp.period}</p>
                    <p className="type-label" style={{ margin: 0 }}>{exp.location}</p>
                  </div>

                  <div>
                    <p style={{
                      fontFamily: 'Metropolis, Inter, sans-serif',
                      fontWeight: 300,
                      fontSize: '1.125rem',
                      color: 'var(--color-text)',
                      margin: '0 0 0.75rem',
                      letterSpacing: '-0.01em',
                    }}>
                      {exp.role}
                    </p>
                    <p className="type-body" style={{ fontSize: '0.9375rem', margin: 0 }}>
                      {exp.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* ══════════════════════════════════════════════════════
              RECOGNITION
          ══════════════════════════════════════════════════════ */}
          <FadeIn direction="up">
            <SectionLabel label="Recognition" />
            <div
              style={{ display: 'grid', gap: '1px', backgroundColor: 'var(--color-border)' }}
              className="grid-cols-2 md:grid-cols-4"
            >
              {ACHIEVEMENTS.map(a => (
                <div
                  key={a.label}
                  style={{
                    padding: 'clamp(1.25rem, 2.5vw, 2rem)',
                    backgroundColor: 'var(--color-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                  }}
                >
                  <p style={{
                    fontFamily: 'Metropolis, Inter, sans-serif',
                    fontWeight: 200,
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: 'var(--color-text)',
                    margin: '0 0 0.5rem',
                  }}>
                    {a.value}
                  </p>
                  <p className="type-name" style={{ fontSize: '0.875rem', margin: 0 }}>{a.label}</p>
                  <p className="type-meta" style={{ margin: 0 }}>{a.sub}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* ══════════════════════════════════════════════════════
              PHILOSOPHY TEASER
          ══════════════════════════════════════════════════════ */}
          <FadeIn direction="up">
            <SectionLabel label="Design Philosophy" />
            <div style={{
              padding: 'clamp(2rem, 4vw, 3rem)',
              borderRadius: '1.25rem',
              background: 'var(--color-subtle)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
            }}>
              <div style={{ maxWidth: '560px' }}>
                <p style={{
                  fontFamily: 'Metropolis, Inter, sans-serif',
                  fontWeight: 200,
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.025em',
                  color: 'var(--color-text)',
                  margin: '0 0 0.875rem',
                }}>
                  "Design without intention is just decoration."
                </p>
                <p className="type-body" style={{ fontSize: '0.9375rem', margin: 0 }}>
                  Four principles I keep coming back to, on AI, clarity, systems, and shipping.
                </p>
              </div>
              <Link
                to="/philosophy"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontFamily: 'Metropolis, Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.9375rem',
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: '2px',
                  transition: 'border-color 0.2s ease',
                  flexShrink: 0,
                  alignSelf: 'center',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-text)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
              >
                Read the full philosophy <ArrowUpRight size={14} />
              </Link>
            </div>
          </FadeIn>

          {/* ══════════════════════════════════════════════════════
              CTA
          ══════════════════════════════════════════════════════ */}
          <FadeIn direction="up">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.5rem',
                borderTop: '1px solid var(--color-border)',
                paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
                marginTop: 'clamp(3rem, 6vw, 5rem)',
              }}
            >
              <div>
                <p style={{
                  fontFamily: 'Metropolis, Inter, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text)',
                  margin: '0 0 0.375rem',
                }}>
                  If you want to talk design, strategy, or where AI is taking product, I'm genuinely interested in that conversation.
                </p>
                <p className="type-body" style={{ fontSize: '0.9375rem', margin: 0 }}>
                  Let's connect.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <a
                  href="/resume/aswanthraj_ux_resume_2025.pdf"
                  download
                  className="btn btn-primary"
                  style={{ gap: '0.5rem' }}
                >
                  <Download size={15} />
                  Resume
                </a>
                <a
                  href="mailto:hello@aswanthraj.com"
                  className="btn btn-outline"
                  style={{ gap: '0.5rem' }}
                >
                  Say hello
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </FadeIn>

        </div>
      </main>
      <Footer />
    </>
  )
}
