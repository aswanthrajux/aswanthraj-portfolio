import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/FadeIn'
import { AI_LABS } from '@/components/sections/DesignNotes'
import { formatDate } from '@/lib/utils'
import { SEO } from '@/components/ui/SEO'

export default function Notes() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <>
      <SEO
        title="AI Labs"
        description="Real experiments, frameworks, and AI-native product thinking. Built, not theorized. Systems and insights from designing at the frontier of AI and product."
        canonical="/ai-labs"
        keywords="AI design thinking, AI-native product, design frameworks, AI product experiments, generative AI design, UX research"
      />
      <Header />
      <main style={{ paddingTop: '5rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
        {/* Hero */}
        <section style={{
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem)',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          {/* Back link — aligned to same left grid as logo */}
          <div style={{ marginBottom: '2rem' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8125rem',
                color: 'var(--color-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              <ArrowLeft size={13} />
              Back
            </Link>
          </div>
          <FadeIn>
            <p className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>AI Labs</p>
            <h1 className="text-display-xl" style={{ margin: '0 0 1rem', maxWidth: '640px' }}>
              Real experiments, frameworks, and AI-native product thinking.
            </h1>
            <p className="type-body" style={{ fontSize: '1.0625rem', maxWidth: '520px', margin: 0 }}>
              Built, not theorized. Systems and workflows from{' '}
              <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>working directly with AI</strong> to ship products.
            </p>
          </FadeIn>
        </section>

        {/* Article list */}
        <section style={{
          padding: '0 clamp(1.5rem, 6vw, 5rem) clamp(5rem, 10vw, 8rem)',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {AI_LABS.map((note, i) => (
              <FadeIn key={note.slug} delay={i * 0.05}>
                <Link
                  to={`/ai-labs/${note.slug}`}
                  state={{ from: 'ai-labs' }}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <article
                    style={{
                      padding: '2.25rem 0',
                      borderBottom: '1px solid var(--color-border)',
                      display: 'grid',
                      gap: '1.5rem',
                      alignItems: 'start',
                    }}
                    className="md:grid-cols-[1fr_auto]"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <span className="type-label">{note.tag}</span>
                        <span className="type-meta" style={{ fontSize: '0.8125rem' }}>{note.readTime}</span>
                        <span className="type-meta" style={{ fontSize: '0.8125rem' }}>{formatDate(note.date)}</span>
                      </div>
                      <h2 className="type-name" style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', margin: 0 }}>
                        {note.title}
                      </h2>
                      <p className="type-body" style={{ fontSize: '1.0625rem', margin: 0, maxWidth: '640px' }}>
                        {note.excerpt}
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      fontFamily: 'Metropolis, Inter, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.875rem',
                      color: 'var(--color-muted)',
                      whiteSpace: 'nowrap',
                      alignSelf: 'center',
                      opacity: hoveredIndex === i ? 1 : 0,
                      transform: hoveredIndex === i ? 'translateX(0)' : 'translateX(-4px)',
                      transition: 'opacity 0.2s ease, transform 0.2s ease',
                    }}>
                      Read <ArrowUpRight size={14} />
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
