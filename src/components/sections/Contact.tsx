import { Mail } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        paddingTop: 'clamp(3rem, 5vw, 5rem)',
        paddingBottom: 'clamp(5rem, 10vw, 9rem)',
        paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid var(--color-border)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <FadeIn>
          <p className="text-eyebrow" style={{ marginBottom: '1rem' }}>Let's Talk</p>
          <h2
            className="text-display-2xl"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 800,
              color: 'var(--color-text)',
              margin: '0 0 1.25rem',
            }}
          >
            Say Hello.
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.0625rem',
              lineHeight: 1.75,
              color: 'var(--color-muted)',
              margin: '0 0 2.5rem',
              maxWidth: '480px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Whether it's a product challenge, a collaboration, or a conversation about design and AI, I'd love to hear from you.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.875rem',
              justifyContent: 'center',
            }}
          >
            <a
              href="mailto:aswanthraj.ux@gmail.com"
              className="btn btn-primary"
            >
              <Mail size={16} />
              aswanthraj.ux@gmail.com
            </a>
            <button
              disabled
              className="btn btn-outline"
              style={{ opacity: 0.45, cursor: 'not-allowed' }}
            >
              Book a call (coming soon)
            </button>
          </div>

        </FadeIn>
      </div>
    </section>
  )
}
