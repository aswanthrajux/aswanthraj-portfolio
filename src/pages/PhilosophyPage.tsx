import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/FadeIn'
import { BELIEFS } from '@/components/sections/Philosophy'
import { SEO } from '@/components/ui/SEO'

export default function PhilosophyPage() {
  return (
    <>
      <SEO
        title="Design Philosophy"
        description="The principles Aswanth Raj keeps coming back to: on AI, clarity, systems, and shipping. Four lenses for finding signal in noise and making better bets."
        canonical="/philosophy"
        keywords="design philosophy, UX principles, AI design principles, systems thinking, design leadership, design without intention"
      />
      <Header />
      <main style={{ paddingTop: '5rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>

        {/* Hero */}
        <section style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem)',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          <FadeIn>
            <p className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>Design Philosophy</p>
            <h1 className="text-display-xl" style={{ margin: '0 0 1.25rem', maxWidth: '700px' }}>
              The principles I keep coming back to.
            </h1>
            <p className="type-body" style={{ fontSize: '1.0625rem', maxWidth: '520px', margin: 0 }}>
              These aren't rules. They're lenses. I use them to find signal in noise, align teams, and make better bets.
            </p>
          </FadeIn>
        </section>

        {/* AI × Human Creativity */}
        <section style={{
          padding: '0 clamp(1.5rem, 6vw, 5rem)',
          maxWidth: '1400px',
          margin: '0 auto 5rem',
        }}>
          <FadeIn>
            <div style={{
              padding: 'clamp(3rem, 6vw, 5rem)',
              borderRadius: '1.5rem',
              background: 'var(--color-subtle)',
              border: '1px solid var(--color-border)',
              textAlign: 'center',
            }}>
              <p className="type-body" style={{ maxWidth: '640px', margin: '0 auto', fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', lineHeight: 1.6, fontStyle: 'italic' }}>
                In an era shaped by AI and rapid change, I see UX as the force that keeps technology human. Transforming complexity into clarity, and ideas into experiences that matter. My role isn't just craft anymore. It's judgment, context, and the courage to say "this isn't right yet."
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Beliefs — full detail */}
        <section style={{
          padding: '0 clamp(1.5rem, 6vw, 5rem) clamp(5rem, 10vw, 8rem)',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {BELIEFS.map((belief, i) => (
              <FadeIn key={belief.number} delay={i * 0.06}>
                <div style={{
                  padding: 'clamp(2rem, 4vw, 3rem) 0',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'grid',
                  gap: '2rem',
                  alignItems: 'start',
                }}
                  className="md:grid-cols-[3rem_1fr_2fr]"
                >
                  {/* Number */}
                  <span style={{
                    fontFamily: 'Metropolis, Inter, sans-serif',
                    fontWeight: 200,
                    fontSize: '2rem',
                    color: 'var(--color-border)',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                  }}>
                    {belief.number}
                  </span>

                  {/* Title + accent */}
                  <div>
                    <span style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: belief.accent,
                      marginBottom: '0.75rem',
                    }} />
                    <h2 className="text-display-lg" style={{ margin: 0 }}>
                      {belief.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="type-body" style={{ fontSize: '1.0625rem', margin: 0, lineHeight: 1.75 }}>
                    {belief.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
