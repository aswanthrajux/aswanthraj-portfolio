import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Download } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

const NAV_LINKS = [
  { label: 'Case Studies', href: '/#case-studies' },
  { label: 'AI Labs', href: '/#ai-labs' },
  { label: 'About', href: '/#about' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '')
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      } else {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-md border-b'
            : ''
        }`}
        style={{
          backgroundColor: scrolled ? `color-mix(in srgb, var(--color-bg) 85%, transparent)` : 'transparent',
          borderColor: scrolled ? 'var(--color-border)' : 'transparent',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="flex-shrink-0"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', textDecoration: 'none' }}
            onClick={(e) => {
              e.preventDefault()
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              } else {
                navigate('/')
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
              }
            }}
          >
            <span
              style={{
                fontSize: '0.9375rem',
                letterSpacing: '0.02em',
                color: 'var(--color-text)',
              }}
            >
              <span style={{ fontWeight: 800 }}>BUILD.</span>
              <span style={{ fontWeight: 400 }}>WITH ASWANTH</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: 'var(--color-muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem 0.875rem',
                  borderRadius: '100px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
              >
                {link.label}
              </button>
            ))}

            <div
              style={{
                width: '1px',
                height: '20px',
                backgroundColor: 'var(--color-border)',
                margin: '0 0.5rem',
              }}
            />

            <a
              href="/resume/aswanthraj_ux_resume_2026.pdf"
              download
              title="Download Resume"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 400,
                color: 'var(--color-muted)',
                textDecoration: 'none',
                padding: '0.5rem 0.875rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              <Download size={13} strokeWidth={2} />
              Resume
            </a>

            <button
              onClick={() => handleNavClick('/#contact')}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--color-bg)',
                backgroundColor: 'var(--color-text)',
                border: '1.5px solid var(--color-text)',
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                borderRadius: '100px',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Contact
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                marginLeft: '0.5rem',
                width: '36px',
                height: '36px',
                borderRadius: '100px',
                border: '1.5px solid var(--color-border)',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-text)',
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-text)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </nav>

          {/* Mobile: contact + theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('/#contact')}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'var(--color-bg)',
                backgroundColor: 'var(--color-text)',
                border: '1.5px solid var(--color-text)',
                cursor: 'pointer',
                padding: '0.375rem 0.875rem',
                borderRadius: '100px',
              }}
            >
              Contact
            </button>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '100px',
                border: '1.5px solid var(--color-border)',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-text)',
              }}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '100px',
                border: '1.5px solid var(--color-border)',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-text)',
              }}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 40,
                backgroundColor: 'rgba(0,0,0,0.4)',
              }}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 35 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '80%',
                maxWidth: '320px',
                zIndex: 50,
                backgroundColor: 'var(--color-bg)',
                borderLeft: '1px solid var(--color-border)',
                padding: '5rem 2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {NAV_LINKS.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  {link.label}
                </button>
              ))}

              <div style={{ marginTop: '1.5rem' }}>
                <a
                  href="/resume/aswanthraj_ux_resume_2026.pdf"
                  download
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1rem',
                    border: '1.5px solid var(--color-text)',
                    borderRadius: '100px',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                >
                  <Download size={15} strokeWidth={2} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
