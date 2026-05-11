import { useEffect, useRef } from 'react'
import { ArrowUpRight, Clock, Mail } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FadeIn } from '@/components/ui/FadeIn'
import { SEO } from '@/components/ui/SEO'

const SLOTS = [
  {
    duration: '15 MIN',
    label: 'Quick Connect',
    description: 'A focused intro call. Good for getting to know each other, exploring a collaboration, or asking a specific question.',
    href: 'https://cal.eu/aswanth-raj-l3hby9/15min',
    featured: false,
  },
  {
    duration: '30 MIN',
    label: 'Deep Dive',
    description: 'A longer conversation. Ideal for discussing a product challenge, design leadership, or a potential engagement in detail.',
    href: 'https://cal.eu/aswanth-raj-l3hby9/30min',
    featured: true,
  },
]

export default function BookingPage() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <>
      <SEO
        title="Book a Call: Aswanth Raj, UX Manager"
        description="Schedule a 15-minute or 30-minute call with Aswanth Raj, UX Manager at Glance AI. Pick a time that works for you."
        canonical="https://aswanthraj.com/book"
        keywords="book a call, schedule meeting, UX design consultation, Aswanth Raj"
      />
      <Header />

      <main
        ref={mainRef}
        style={{
          paddingTop: 'clamp(5rem, 10vw, 8rem)',
          paddingBottom: 'clamp(4rem, 6vw, 5rem)',
          paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
          paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
          backgroundColor: 'var(--color-bg)',
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>

          {/* Header */}
          <FadeIn>
            <p className="text-eyebrow" style={{ marginBottom: '1rem' }}>
              Let's Talk
            </p>
            <h1
              className="text-display-xl"
              style={{ margin: '0 0 1rem', color: 'var(--color-text)' }}
            >
              Pick a time that works.
            </h1>
            <p
              style={{
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                color: 'var(--color-muted)',
                margin: '0 0 3rem',
                maxWidth: '480px',
              }}
            >
              Choose a slot below and you'll land directly on the booking calendar. No forms, no friction.
            </p>
          </FadeIn>

          {/* Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {SLOTS.map((slot, i) => (
              <FadeIn key={slot.duration} delay={i * 0.08}>
                <a
                  href={slot.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '2.5rem',
                    border: slot.featured
                      ? '2px solid var(--color-text)'
                      : '1px solid var(--color-border)',
                    borderRadius: '1rem',
                    textDecoration: 'none',
                    backgroundColor: 'var(--color-bg)',
                    transition: 'border-color 0.2s ease, transform 0.2s ease',
                    minHeight: '300px',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    if (!slot.featured) el.style.borderColor = 'var(--color-text)'
                    el.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    if (!slot.featured) el.style.borderColor = 'var(--color-border)'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  {slot.featured && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '1.25rem',
                        right: '1.25rem',
                        backgroundColor: 'var(--color-text)',
                        color: 'var(--color-bg)',
                        fontSize: '0.6875rem',
                        fontWeight: 500,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '100px',
                      }}
                    >
                      Most booked
                    </span>
                  )}

                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <Clock size={16} style={{ color: 'var(--color-muted)', flexShrink: 0 }} />
                      <span
                        style={{
                          fontFamily: 'Metropolis, Inter, sans-serif',
                          fontWeight: 500,
                          fontSize: '1rem',
                          letterSpacing: '0.06em',
                          color: 'var(--color-text)',
                        }}
                      >
                        {slot.duration}
                      </span>
                    </div>

                    <p
                      className="type-section"
                      style={{
                        fontSize: '1.75rem',
                        margin: '0 0 1rem',
                        color: 'var(--color-text)',
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {slot.label}
                    </p>

                    <p
                      className="type-body"
                      style={{
                        fontSize: '0.9375rem',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {slot.description}
                    </p>
                  </div>

                  <SelectTimeLink />
                </a>
              </FadeIn>
            ))}
          </div>

          {/* Divider + email fallback */}
          <FadeIn delay={0.2}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                margin: '2.5rem 0 2rem',
              }}
            >
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
              <span
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--color-muted)',
                  fontFamily: 'Metropolis, Inter, sans-serif',
                  fontWeight: 300,
                  letterSpacing: '0.04em',
                }}
              >
                or
              </span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
            </div>

            <div style={{ textAlign: 'center' }}>
              <EmailLink />
            </div>
          </FadeIn>

        </div>
      </main>

      <Footer />
    </>
  )
}

function SelectTimeLink() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        marginTop: '2rem',
        color: 'var(--color-text)',
        fontSize: '0.9375rem',
        fontWeight: 600,
        transition: 'gap 0.2s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        const span = el.querySelector('span') as HTMLSpanElement
        if (span) span.style.textDecoration = 'underline'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        const span = el.querySelector('span') as HTMLSpanElement
        if (span) span.style.textDecoration = 'none'
      }}
    >
      <span style={{ textDecoration: 'none', transition: 'text-decoration 0.15s ease' }}>
        Select time
      </span>
      <ArrowUpRight size={15} />
    </div>
  )
}

function EmailLink() {
  return (
    <a
      href="mailto:aswanthraj.ux@gmail.com"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--color-muted)',
        textDecoration: 'none',
        fontSize: '0.9375rem',
        fontFamily: 'Metropolis, Inter, sans-serif',
        fontWeight: 300,
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-muted)'
      }}
    >
      <Mail size={15} />
      <span>Prefer email? aswanthraj.ux@gmail.com</span>
    </a>
  )
}
