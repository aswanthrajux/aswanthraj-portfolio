import { useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/FadeIn'
import { SEO } from '@/components/ui/SEO'
import { getLenis } from '@/hooks/useLenis'

const SECTIONS = [
  {
    title: 'What I collect',
    body: `This portfolio does not collect your name, email, or any personal information on its own. The only data gathered comes from analytics (page views, scroll depth, clicks) and from the booking form if you choose to schedule a call. Both are handled by third-party services listed below.`,
  },
  {
    title: 'How it is used',
    body: `Analytics data helps me understand which work resonates, how people navigate the site, and where the experience can improve. That's it. The data is aggregated and never linked to an individual person.`,
  },
  {
    title: 'Third-party services',
    items: [
      {
        name: 'Google Analytics (GA4)',
        detail: 'Tracks page views, session duration, and interaction events. Data is processed by Google and subject to their privacy policy. IP addresses are anonymised.',
      },
      {
        name: 'Cal.com',
        detail: 'Powers the booking form at /book. If you schedule a call, Cal.com collects your name, email, and meeting preferences. Their privacy policy applies to that data.',
      },
    ],
  },
  {
    title: 'Contact',
    body: `Questions about privacy? Reach me at aswanthraj.ux@gmail.com and I will get back to you.`,
  },
]

export default function PrivacyPage() {
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { duration: 0 } as Parameters<typeof lenis.scrollTo>[1])
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <>
      <SEO
        title="Privacy Policy — Aswanth Raj"
        description="How this portfolio handles data: what is collected, how it is used, and the third-party services involved."
        canonical="/privacy"
      />
      <Header />
      <main style={{ paddingTop: '5rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
        <div style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 5rem) clamp(5rem, 10vw, 8rem)',
        }}>

          {/* Header */}
          <FadeIn>
            <p className="text-eyebrow" style={{ marginBottom: '0.75rem' }}>Legal</p>
            <h1 className="text-display-xl" style={{ margin: '0 0 1rem' }}>
              Privacy Policy
            </h1>
            <p className="type-meta" style={{ margin: '0 0 3rem', color: 'var(--color-muted)' }}>
              Last updated: May 2026
            </p>
          </FadeIn>

          {/* Sections */}
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {SECTIONS.map((section, i) => (
              <FadeIn key={section.title} delay={i * 0.07}>
                <div style={{
                  padding: 'clamp(2rem, 4vw, 2.75rem) 0',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'grid',
                  gap: '1rem',
                  alignItems: 'start',
                }}
                  className="md:grid-cols-[200px_1fr]"
                >
                  {/* Section title */}
                  <h2 style={{
                    fontFamily: 'Metropolis, Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.9375rem',
                    color: 'var(--color-text)',
                    margin: 0,
                    lineHeight: 1.4,
                    paddingTop: '0.1em',
                  }}>
                    {section.title}
                  </h2>

                  {/* Content */}
                  <div>
                    {section.body && (
                      <p className="type-body" style={{ margin: 0, lineHeight: 1.75 }}>
                        {section.body}
                      </p>
                    )}
                    {section.items && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {section.items.map(item => (
                          <div key={item.name}>
                            <p style={{
                              fontFamily: 'Metropolis, Inter, sans-serif',
                              fontWeight: 500,
                              fontSize: '0.9375rem',
                              color: 'var(--color-text)',
                              margin: '0 0 0.25rem',
                            }}>
                              {item.name}
                            </p>
                            <p className="type-body" style={{ margin: 0, lineHeight: 1.75 }}>
                              {item.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
