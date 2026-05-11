import { Link } from 'react-router-dom'
import { Dribbble, Linkedin, Twitter, Instagram } from 'lucide-react'

const SOCIAL = [
  { icon: Dribbble, label: 'Dribbble', href: 'https://dribbble.com/ashwanth' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ashwanthraj/' },
  { icon: Twitter, label: 'X', href: 'https://x.com/aswanthraj' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/ashwanthux/' },
]

const NAV = [
  { label: 'Case Studies', href: '/#case-studies' },
  { label: 'AI Labs', href: '/#ai-labs' },
  { label: 'About', href: '/about' },
  { label: 'Philosophy', href: '/philosophy' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', padding: '3rem 0' }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(1.5rem, 6vw, 5rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}>
        {/* Top row */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          className="md:flex-row md:items-center md:justify-between"
        >
          {/* Brand */}
          <span style={{
            fontFamily: 'Metropolis, Inter, sans-serif',
            fontSize: '0.9375rem',
            letterSpacing: '0.02em',
            color: 'var(--color-text)',
          }}>
            <span style={{ fontWeight: 500 }}>BUILD.</span>
            <span style={{ fontWeight: 300 }}>WITH ASWANTH</span>
          </span>

          {/* Nav */}
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {NAV.map(item => {
              const linkStyle = {
                fontFamily: 'Metropolis, Inter, sans-serif',
                fontWeight: 300,
                fontSize: '0.875rem',
                color: 'var(--color-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }
              const handlers = {
                onMouseEnter: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = 'var(--color-text)'),
                onMouseLeave: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.color = 'var(--color-muted)'),
              }
              return item.href.startsWith('/#') ? (
                <a key={item.label} href={item.href} style={linkStyle} {...handlers}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.href} style={linkStyle} {...handlers}>
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Social icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {SOCIAL.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-text)'
                  e.currentTarget.style.borderColor = 'var(--color-text)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--color-muted)'
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          className="md:flex-row md:items-center md:justify-between"
        >
          <p className="type-meta" style={{ margin: 0, fontSize: '0.8125rem' }}>
            © {year} Aswanth Raj. All rights reserved.
          </p>
          <p className="type-meta" style={{ margin: 0, fontSize: '0.8125rem' }}>
            UX Manager @ Glance AI · aswanthraj.ux@gmail.com
          </p>
        </div>
      </div>
    </footer>
  )
}
