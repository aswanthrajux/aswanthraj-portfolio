import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { saveScroll } from '@/utils/scrollRestore'

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 5rem)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Section label row */}
        <FadeIn direction="up">
          <div style={{
            marginBottom: 'clamp(0.875rem, 1.5vw, 1.25rem)',
          }}>
            <p className="text-eyebrow" style={{ margin: 0 }}>About</p>
          </div>
        </FadeIn>

        {/* Main grid: text left, photo right */}
        <div
          style={{
            display: 'grid',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'center',
          }}
          className="md:grid-cols-[1fr_400px]"
        >

          {/* ── Left: bio ── */}
          <FadeIn direction="right">
            <h2 className="text-display-xl" style={{ margin: '0 0 2rem' }}>
              Fifteen years turning hard problems into{' '}
              <span style={{ fontWeight: 200, opacity: 0.45 }}>products that feel obvious.</span>
            </h2>

            <p className="type-body" style={{ fontSize: '1.0625rem', marginBottom: '1.25rem', maxWidth: '580px' }}>
              I'm{' '}
              <strong className="type-name" style={{ fontSize: 'inherit' }}>Aswanth Raj</strong>
              {', UX Manager at '}
              <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>Glance AI</strong>.
              {' '}Over 15 years I've led design across mobile advertising, enterprise software,
              and AI-native consumer products, across InMobi, InEight, and Glance.
            </p>

            <p className="type-body" style={{ fontSize: '1.0625rem', marginBottom: '1.25rem', maxWidth: '580px' }}>
              I work at the point where{' '}
              <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>
                product strategy, systems thinking, and AI
              </strong>
              {' '}meet. Translating problems that feel complex into experiences that feel inevitable.
            </p>

            <p className="type-body" style={{ fontSize: '0.9375rem', marginBottom: '2.5rem', maxWidth: '580px', fontStyle: 'italic', opacity: 0.65 }}>
              "I see UX as the force that keeps technology human."
            </p>

            <Link
              to="/about"
              onClick={() => saveScroll('/')}
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
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-text)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            >
              The longer story <ArrowUpRight size={14} />
            </Link>
          </FadeIn>

          {/* ── Right: profile photo ── */}
          <FadeIn direction="left" delay={0.15}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '100%',
                aspectRatio: '4 / 5',
                borderRadius: '1.5rem',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
              }}>
                <img
                  src="/images/aswanth-portrait.webp"
                  alt="Aswanth Raj"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
              </div>

              {/* Floating chip */}
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
                <span style={{
                  fontFamily: 'Metropolis, Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '0.8125rem',
                  color: 'var(--color-text)',
                  whiteSpace: 'nowrap',
                }}>
                  UX Manager @ Glance AI
                </span>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
