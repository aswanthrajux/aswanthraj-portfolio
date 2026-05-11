import { motion } from 'framer-motion'

const CREDIBILITY = [
  { value: '15+', label: 'Years Experience' },
  { value: '10+', label: 'Design Awards' },
  { value: '30+', label: 'Products Shipped' },
  { value: '1', label: 'Patent Filed' },
]

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] } },
}

function BrandLogo() {
  return (
    <svg
      width="48"
      height="34"
      viewBox="0 0 64 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: 'block' }}
    >
      <path d="M30 0H53L23 45H0L30 0Z" fill="url(#brand_g0)" />
      <path d="M30 0H53L23 45H0L30 0Z" fill="url(#brand_g1)" />
      <path d="M30 0H53L23 45H0L30 0Z" fill="#FF0000" fillOpacity="0.5" />
      <circle cx="52.5" cy="33.5" r="11.5" fill="url(#brand_g2)" />
      <circle cx="52.5" cy="33.5" r="11.5" fill="url(#brand_g3)" />
      <circle cx="52.5" cy="33.5" r="11.5" fill="#FF0000" fillOpacity="0.5" />
      <defs>
        <linearGradient id="brand_g0" x1="26.5" y1="0" x2="26.5" y2="45" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DF99F7" />
          <stop offset="1" stopColor="#FFDBB0" />
        </linearGradient>
        <linearGradient id="brand_g1" x1="53.2571" y1="3.20962" x2="1.05716" y2="46.6086" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FD6422" />
          <stop offset="0.33" stopColor="#FD399D" />
          <stop offset="0.66" stopColor="#FF5CD4" />
          <stop offset="1" stopColor="#DF7EFF" />
        </linearGradient>
        <linearGradient id="brand_g2" x1="52.5" y1="22" x2="52.5" y2="45" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DF99F7" />
          <stop offset="1" stopColor="#FFDBB0" />
        </linearGradient>
        <linearGradient id="brand_g3" x1="64.1116" y1="23.6405" x2="38.542" y2="41.6902" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FD6422" />
          <stop offset="0.33" stopColor="#FD399D" />
          <stop offset="0.66" stopColor="#FF5CD4" />
          <stop offset="1" stopColor="#DF7EFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 'clamp(8rem, 16vh, 11rem)',
        paddingBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
        paddingLeft: 'clamp(1.5rem, 6vw, 6rem)',
        paddingRight: 'clamp(1.5rem, 6vw, 6rem)',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ maxWidth: '900px' }}
      >
        {/* Brand logo + Tagline */}
        <style>{`
          @media (max-width: 639px) {
            .hero-tagline { font-size: 0.75rem !important; letter-spacing: 0.06em !important; }
          }
        `}</style>
        <motion.div
          variants={item}
          className="flex-col sm:flex-row"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            marginBottom: '2.25rem',
          }}
        >
          {/* paddingTop nudges logo down so its visual top
              aligns with the text cap-height rather than the em-box top */}
          <div style={{ paddingTop: '3px', flexShrink: 0 }}>
            <BrandLogo />
          </div>
          <p
            className="hero-tagline"
            style={{
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontSize: '0.9375rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              margin: 0,
              lineHeight: 1.55,
            }}
          >
            Senior UX Leader · Glance AI<br />
            Crafting AI-native experiences that reach millions.
          </p>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={item}
          style={{
            fontFamily: 'Metropolis, Inter, sans-serif',
            fontWeight: 300,
            color: 'var(--color-text)',
            margin: '0 0 2.5rem',
            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
          }}
        >
          Turning complexity into clarity, across enterprise tools, consumer platforms, and{' '}
          <strong style={{ fontWeight: 600 }}>AI-native</strong> products.
        </motion.h1>

        {/* Credibility row */}
        <motion.div variants={item}>
          {/* Desktop: single nowrap row */}
          <div
            className="hidden sm:flex"
            style={{ alignItems: 'baseline' }}
          >
            {CREDIBILITY.map(({ value, label }, i) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '0.4rem',
                  paddingRight: 'clamp(1.75rem, 3vw, 2.75rem)',
                  marginRight: i < CREDIBILITY.length - 1 ? 'clamp(1.75rem, 3vw, 2.75rem)' : 0,
                  borderRight: i < CREDIBILITY.length - 1 ? '1px solid var(--color-border)' : 'none',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Metropolis, Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '1.125rem',
                    color: 'var(--color-text)',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontFamily: 'Metropolis, Inter, sans-serif',
                    fontSize: '0.9375rem',
                    fontWeight: 300,
                    color: 'var(--color-muted)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile: 2×2 grid */}
          <div
            className="grid sm:hidden"
            style={{
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem 1.5rem',
              width: 'fit-content',
            }}
          >
            {CREDIBILITY.map(({ value, label }) => (
              <div
                key={label}
                style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}
              >
                <span
                  style={{
                    fontFamily: 'Metropolis, Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '1.125rem',
                    color: 'var(--color-text)',
                    lineHeight: 1,
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontFamily: 'Metropolis, Inter, sans-serif',
                    fontSize: '0.9375rem',
                    fontWeight: 300,
                    color: 'var(--color-muted)',
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
