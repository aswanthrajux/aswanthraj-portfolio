import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

export const BELIEFS = [
  {
    number: '01',
    title: 'AI as a design partner',
    description: "AI doesn't replace the designer's judgement. It amplifies it. I use AI to move faster, ask better questions, and explore ideas at a scale impossible alone.",
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
    accent: '#4a7fe8',
  },
  {
    number: '02',
    title: 'Clarity over complexity',
    description: 'Design should reduce cognitive load, not add to it. Every element on screen must earn its place. The real work is knowing what to remove.',
    gradient: 'linear-gradient(135deg, #0d1a14 0%, #0d3320 100%)',
    accent: '#2ea87e',
  },
  {
    number: '03',
    title: 'Systems over screens',
    description: "A well-designed system scales. A well-designed screen doesn't. I build the thinking first: the components, tokens, and patterns that make every screen better by default.",
    gradient: 'linear-gradient(135deg, #1a0d2e 0%, #3d1580 100%)',
    accent: '#9b6de8',
  },
  {
    number: '04',
    title: 'Ship to learn, not to be done',
    description: "There's a point where more iteration inside the room gives less than one round with real users. I design for that moment, knowing when to take it out, learn fast, and come back sharper.",
    gradient: 'linear-gradient(135deg, #1a0e0a 0%, #5c2010 100%)',
    accent: '#e87a3d',
  },
]

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      style={{
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* AI × Human Creativity — now at top */}
        <FadeIn style={{ marginBottom: '5rem' }}>
          <div style={{
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            borderRadius: '1.5rem',
            background: 'var(--color-subtle)',
            border: '1px solid var(--color-border)',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontWeight: 200,
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              color: 'var(--color-text)',
              margin: '0 0 1.25rem',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
            }}>
              Artificial Intelligence{' '}
              <span style={{ color: 'var(--color-muted)', fontWeight: 200 }}>✦</span>{' '}
              Human Creativity
            </p>
            <p className="type-body" style={{ maxWidth: '560px', margin: '0 auto', fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)' }}>
              In <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>an era driven by AI</strong> and rapid innovation, I see UX as the force that keeps technology human. Transforming complexity into clarity and ideas into experiences that matter.
            </p>
          </div>
        </FadeIn>

        {/* Header */}
        <FadeIn style={{ marginBottom: '3rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p className="text-eyebrow" style={{ marginBottom: '0.625rem' }}>Design Philosophy</p>
            <h2 className="text-display-xl" style={{ margin: 0 }}>
              How I think{' '}
              <span style={{ fontWeight: 200, opacity: 0.6 }}>about design</span>
            </h2>
          </div>
          <Link
            to="/philosophy"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontWeight: 300,
              fontSize: '0.875rem',
              color: 'var(--color-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
          >
            Read More <ArrowUpRight size={14} />
          </Link>
        </FadeIn>

        {/* Belief cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1px',
          border: '1px solid var(--color-border)',
          borderRadius: '1.25rem',
          overflow: 'hidden',
        }}>
          {BELIEFS.map((belief, i) => (
            <FadeIn key={belief.number} delay={i * 0.07}>
              <div style={{
                position: 'relative',
                backgroundColor: 'var(--color-bg)',
                borderRight: '1px solid var(--color-border)',
                borderBottom: '1px solid var(--color-border)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Visual strip */}
                <div style={{
                  height: '120px',
                  background: belief.gradient,
                  position: 'relative',
                  flexShrink: 0,
                }}>
                  {/* Number */}
                  <span style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1.5rem',
                    fontFamily: 'Metropolis, Inter, sans-serif',
                    fontWeight: 200,
                    fontSize: '2.5rem',
                    color: 'rgba(255,255,255,0.15)',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                  }}>
                    {belief.number}
                  </span>
                  {/* Accent dot */}
                  <span style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.5rem',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: belief.accent,
                  }} />
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem', flex: 1 }}>
                  <h3 className="type-name" style={{ fontSize: '1rem', marginBottom: '0.625rem' }}>
                    {belief.title}
                  </h3>
                  <p className="type-body" style={{ fontSize: '0.9rem', margin: 0, lineHeight: 1.65 }}>
                    {belief.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
