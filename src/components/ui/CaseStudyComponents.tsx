import React, { useRef, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { VideoPlayer } from './VideoPlayer'

// ─── SectionEyebrow ────────────────────────────────────────────────────────
// Small uppercase tracking label placed above an h2.
// Registers itself as a ToC anchor via id + data-toc-item.

export function SectionEyebrow({ children }: { children: ReactNode }) {
  const text = typeof children === 'string' ? children : ''
  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return (
    <div
      id={id || undefined}
      data-toc-item="true"
      data-toc-eyebrow="true"
      data-toc-level="2"
      style={{
        fontFamily: 'Metropolis, Inter, sans-serif',
        fontSize: '0.625rem',
        fontWeight: 400,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
        marginBottom: '0.875rem',
        marginTop: '6rem',
      }}
    >
      {children}
    </div>
  )
}

// ─── Pullquote ─────────────────────────────────────────────────────────────
// Large italic quote with left border accent

export function Pullquote({ children }: { children: ReactNode }) {
  return (
    <blockquote
      style={{
        borderLeft: '2px solid var(--color-text)',
        paddingLeft: '1.5rem',
        paddingTop: '0.125rem',
        paddingBottom: '0.125rem',
        margin: '2.5rem 0',
      }}
    >
      <p
        style={{
          fontFamily: 'Metropolis, Inter, sans-serif',
          fontSize: '1.3125rem',
          fontWeight: 300,
          lineHeight: 1.55,
          letterSpacing: '-0.015em',
          color: 'var(--color-text)',
          fontStyle: 'italic',
          margin: 0,
        }}
      >
        {children}
      </p>
    </blockquote>
  )
}

// ─── ReframeList ───────────────────────────────────────────────────────────
// Arrow-separated concept shift rows e.g. Content → Identity

interface ReframeListProps {
  items: [string, string][]
}

export function ReframeList({ items }: ReframeListProps) {
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: '1.5rem 0 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      {items.map(([from, to], i) => (
        <li
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.875rem',
            fontFamily: 'Metropolis, Inter, sans-serif',
            fontSize: '1rem',
            fontWeight: 400,
            color: 'var(--color-muted)',
          }}
        >
          <strong style={{ color: 'var(--color-text)', fontWeight: 400 }}>{from}</strong>
          <span style={{ color: 'var(--color-border)', fontSize: '0.875rem' }}>→</span>
          <strong style={{ color: 'var(--color-text)', fontWeight: 400 }}>{to}</strong>
        </li>
      ))}
    </ul>
  )
}

// ─── MediaBlock ────────────────────────────────────────────────────────────
// Full-width landscape image or video with optional centered caption

function getYouTubeId(src: string): string | null {
  const m = src.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([^?&#\n]+)/)
  return m ? m[1] : null
}

interface MediaBlockProps {
  src: string
  alt?: string
  caption?: string
  portrait?: boolean
  fit?: 'cover' | 'contain'
  natural?: boolean
  noBorder?: boolean
}

export function MediaBlock({ src, alt = '', caption, portrait, fit = 'cover', natural = false, noBorder = false }: MediaBlockProps) {
  const [playing, setPlaying] = useState(false)
  const [thumbError, setThumbError] = useState(false)
  const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(src)
  const ytId = getYouTubeId(src)
  const borderStyle = noBorder ? 'none' : '1px solid var(--color-border)'

  let mediaStyle: React.CSSProperties
  if (natural) {
    mediaStyle = {
      width: '100%',
      height: 'auto',
      borderRadius: '1rem',
      border: borderStyle,
      display: 'block',
    }
  } else if (portrait) {
    mediaStyle = {
      width: '100%',
      aspectRatio: '9 / 16',
      borderRadius: '1rem',
      border: borderStyle,
      objectFit: fit,
      display: 'block',
      ...(fit === 'contain' && { background: 'var(--color-subtle)' }),
    }
  } else {
    mediaStyle = {
      width: '100%',
      aspectRatio: '16 / 9',
      borderRadius: '1rem',
      border: borderStyle,
      objectFit: fit,
      display: 'block',
      ...(fit === 'contain' && { background: 'var(--color-subtle)' }),
    }
  }

  if (ytId) {
    const thumbSrc = thumbError
      ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
      : `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`

    const containerStyle: React.CSSProperties = {
      width: '100%',
      aspectRatio: portrait ? '9 / 16' : '16 / 9',
      borderRadius: '1rem',
      border: borderStyle,
      overflow: 'hidden',
      position: 'relative',
      display: 'block',
      cursor: playing ? 'default' : 'pointer',
      ...(fit === 'contain' && { background: 'var(--color-subtle)' }),
    }

    return (
      <figure
        style={{
          margin: '2rem 0 0.875rem',
          ...(portrait ? { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } : {}),
        }}
      >
        <div style={containerStyle} onClick={!playing ? () => setPlaying(true) : undefined}>
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={alt}
            />
          ) : (
            <>
              <img
                src={thumbSrc}
                alt={alt}
                loading="lazy"
                onError={() => setThumbError(true)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.14)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.28)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                    <path d="M1 1.5L15 9L1 16.5V1.5Z" fill="white" />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
        {caption && (
          <figcaption
            style={{
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 400,
              color: 'var(--color-muted)',
              textAlign: 'center',
              marginTop: '0.875rem',
              lineHeight: 1.5,
            }}
          >
            {caption}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <figure
      style={{
        margin: '2rem 0 0.875rem',
        ...(portrait ? { maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' } : {}),
      }}
    >
      {isVideo ? (
        <VideoPlayer src={src} style={mediaStyle} initialMuted />
      ) : (
        <img src={src} alt={alt} style={mediaStyle} />
      )}
      {caption && (
        <figcaption
          style={{
            fontFamily: 'Metropolis, Inter, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 400,
            color: 'var(--color-muted)',
            textAlign: 'center',
            marginTop: '0.875rem',
            lineHeight: 1.5,
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// ─── BeforeAfterSlider ─────────────────────────────────────────────────────
// Horizontal drag-to-reveal comparison between two images

const clampPct = (v: number) => Math.max(2, Math.min(98, v))

interface BeforeAfterSliderProps {
  before: string
  after: string
  beforeAlt?: string
  afterAlt?: string
  caption?: string
}

export function BeforeAfterSlider({
  before,
  after,
  beforeAlt = 'Before',
  afterAlt = 'After',
  caption,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(50)

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!(e.buttons & 1)) return
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      setPct(clampPct(((e.clientX - rect.left) / rect.width) * 100))
    },
    []
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      setPct(clampPct(((e.clientX - rect.left) / rect.width) * 100))
    },
    []
  )

  const mediaStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  }

  return (
    <figure style={{ margin: '2rem 0 0.875rem' }}>
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: '1rem',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          cursor: 'col-resize',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        {/* After image — sits beneath */}
        <img src={after} alt={afterAlt} draggable={false} style={mediaStyle} />

        {/* Before image — clipped on the right */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: `inset(0 ${100 - pct}% 0 0)`,
          }}
        >
          <img src={before} alt={beforeAlt} draggable={false} style={mediaStyle} />
        </div>

        {/* Divider line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${pct}%`,
            width: '2px',
            background: 'rgba(255,255,255,0.9)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        >
          {/* Drag handle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            }}
          >
            {/* Left arrow chevron */}
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M6 2L2 6l4 4" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* Right arrow chevron */}
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M2 2l4 4-4 4" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.875rem',
            fontFamily: 'Metropolis, Inter, sans-serif',
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.85)',
            pointerEvents: 'none',
          }}
        >
          Before
        </span>
        <span
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.875rem',
            fontFamily: 'Metropolis, Inter, sans-serif',
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.85)',
            pointerEvents: 'none',
          }}
        >
          After
        </span>
      </div>

      {caption && (
        <figcaption
          style={{
            fontFamily: 'Metropolis, Inter, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 400,
            color: 'var(--color-muted)',
            textAlign: 'center',
            marginTop: '0.875rem',
            lineHeight: 1.5,
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// ─── MetricsRow ────────────────────────────────────────────────────────────
// 4-cell horizontal stats bar — place anywhere in MDX body

interface MetricItem {
  value: string
  label: string
}

interface MetricsRowProps {
  metrics: MetricItem[]
}

export function MetricsRow({ metrics }: MetricsRowProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${metrics.length}, 1fr)`,
        border: '1px solid var(--color-border)',
        borderRadius: '0.875rem',
        overflow: 'hidden',
        margin: '2rem 0',
      }}
    >
      {metrics.map((m, i) => (
        <div
          key={i}
          style={{
            padding: '1.25rem 1.5rem',
            borderRight: i < metrics.length - 1 ? '1px solid var(--color-border)' : 'none',
            background: 'var(--color-subtle)',
          }}
        >
          <div
            style={{
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontWeight: 200,
              fontSize: '1.75rem',
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
              lineHeight: 1,
              marginBottom: '0.375rem',
            }}
          >
            {m.value}
          </div>
          <div
            style={{
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontWeight: 400,
              fontSize: '0.6875rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
            }}
          >
            {m.label}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── EvolutionGrid ─────────────────────────────────────────────────────────
// 3-column V1/V2/V3 grid with version label, title, body, and tag pills

interface EvolutionVersion {
  version: string
  title: string
  body: string
  tags: string[]
}

interface EvolutionGridProps {
  versions: EvolutionVersion[]
}

export function EvolutionGrid({ versions }: EvolutionGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1px',
        background: 'var(--color-border)',
        border: '1px solid var(--color-border)',
        borderRadius: '1rem',
        overflow: 'hidden',
        margin: '2rem 0',
      }}
    >
      {versions.map((v, i) => (
        <div
          key={i}
          style={{ background: 'var(--color-subtle)', padding: '1.75rem 1.5rem' }}
        >
          <div
            style={{
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontSize: '0.625rem',
              fontWeight: 400,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              marginBottom: '0.625rem',
            }}
          >
            {v.version}
          </div>
          <div
            style={{
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontWeight: 300,
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
              marginBottom: '0.875rem',
              lineHeight: 1.2,
            }}
          >
            {v.title}
          </div>
          <p
            style={{
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontSize: '0.9375rem',
              fontWeight: 400,
              lineHeight: 1.7,
              color: 'var(--color-muted)',
              margin: '0 0 1.25rem',
            }}
          >
            {v.body}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {v.tags.map((tag, j) => (
              <span
                key={j}
                style={{
                  fontFamily: 'Metropolis, Inter, sans-serif',
                  fontSize: '0.6875rem',
                  fontWeight: 400,
                  color: 'var(--color-muted)',
                  padding: '0.2rem 0.625rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '100px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── SystemLoop ────────────────────────────────────────────────────────────
// Numbered dot loop row + attached 6-col description grid

interface SystemLoopProps {
  steps: string[]
  descriptions: string[]
}

export function SystemLoop({ steps, descriptions }: SystemLoopProps) {
  return (
    <div style={{ margin: '2rem 0' }}>
      {/* Dot row */}
      <div
        className="case-study-system-loop-dots"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '2rem 1.5rem',
          background: 'var(--color-subtle)',
          border: '1px solid var(--color-border)',
          borderRadius: '1rem 1rem 0 0',
          borderBottom: 'none',
        }}
      >
        {steps.flatMap((step, i) => {
          const stepEl = (
            <div
              key={`step-${i}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Metropolis, Inter, sans-serif',
                  fontSize: '0.625rem',
                  fontWeight: 500,
                  color: 'var(--color-bg)',
                  letterSpacing: '0.04em',
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontFamily: 'Metropolis, Inter, sans-serif',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  textAlign: 'center',
                }}
              >
                {step}
              </div>
            </div>
          )
          if (i < steps.length - 1) {
            return [stepEl, (
              <div
                key={`arrow-${i}`}
                style={{
                  color: 'var(--color-border)',
                  fontSize: '1rem',
                  flexShrink: 0,
                  padding: '0 0.5rem',
                  marginBottom: '1.625rem',
                }}
              >
                →
              </div>
            )]
          }
          return [stepEl]
        })}
      </div>

      {/* Description grid */}
      <div
        className="case-study-system-loop-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(steps.length, 3)}, 1fr)`,
          gap: '1px',
          background: 'var(--color-border)',
          border: '1px solid var(--color-border)',
          borderRadius: '0 0 1rem 1rem',
          overflow: 'hidden',
        }}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            style={{ background: 'var(--color-subtle)', padding: '1.5rem 1.5rem' }}
          >
            <div
              className="system-loop-step-label"
              style={{
                fontFamily: 'Metropolis, Inter, sans-serif',
                fontSize: '0.5625rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                marginBottom: '0.5rem',
              }}
            >
              {step}
            </div>
            <div
              style={{
                fontFamily: 'Metropolis, Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'var(--color-muted)',
              }}
            >
              {descriptions[i] ?? ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── DecisionCards ─────────────────────────────────────────────────────────
// 3×N numbered decision card grid

interface Decision {
  title: string
  body: string
}

interface DecisionCardsProps {
  decisions: Decision[]
}

export function DecisionCards({ decisions }: DecisionCardsProps) {
  // Pad to even multiple of 3 with an empty cell
  const padded = decisions.length % 3 !== 0
    ? [...decisions, ...Array(3 - (decisions.length % 3)).fill(null)]
    : decisions

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1px',
        background: 'var(--color-border)',
        border: '1px solid var(--color-border)',
        borderRadius: '1rem',
        overflow: 'hidden',
        margin: '2rem 0',
      }}
    >
      {padded.map((d, i) =>
        d ? (
          <div key={i} style={{ background: 'var(--color-subtle)', padding: '2rem 1.75rem' }}>
            <div
              style={{
                fontFamily: 'Metropolis, Inter, sans-serif',
                fontSize: '0.625rem',
                fontWeight: 400,
                letterSpacing: '0.14em',
                color: 'var(--color-border)',
                marginBottom: '0.625rem',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div
              style={{
                fontFamily: 'Metropolis, Inter, sans-serif',
                fontWeight: 400,
                fontSize: '1rem',
                color: 'var(--color-text)',
                marginBottom: '0.625rem',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
              }}
            >
              {d.title}
            </div>
            <div
              style={{
                fontFamily: 'Metropolis, Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: 1.65,
                color: 'var(--color-muted)',
              }}
            >
              {d.body}
            </div>
          </div>
        ) : (
          <div key={i} style={{ background: 'var(--color-bg)' }} />
        )
      )}
    </div>
  )
}

// ─── StatGrid ──────────────────────────────────────────────────────────────
// 2×2 impact metrics grid — use inside ProtectedSection

interface Stat {
  value: string
  label: string
  note?: string
}

interface StatBlock {
  title: string
  stats: Stat[]
}

export function StatGrid({ blocks }: { blocks: StatBlock[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '2.5rem',
        padding: '3.5rem 0',
      }}
    >
      {blocks.map((block, i) => (
        <div key={i}>
          <div
            style={{
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontSize: '0.6875rem',
              fontWeight: 400,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              marginBottom: '1rem',
            }}
          >
            {block.title}
          </div>
          {block.stats.map((s, j) => (
            <div key={j} style={{ marginBottom: j < block.stats.length - 1 ? '1rem' : 0 }}>
              <div
                style={{
                  fontFamily: 'Metropolis, Inter, sans-serif',
                  fontWeight: 200,
                  fontSize: '1.75rem',
                  letterSpacing: '-0.03em',
                  color: 'var(--color-text)',
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: 'Metropolis, Inter, sans-serif',
                  fontSize: '0.8125rem',
                  fontWeight: 400,
                  color: 'var(--color-muted)',
                  lineHeight: 1.5,
                }}
              >
                {s.label}
              </div>
              {s.note && (
                <div
                  style={{
                    fontFamily: 'Metropolis, Inter, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    color: 'var(--color-border)',
                    lineHeight: 1.4,
                    marginTop: '0.25rem',
                    fontStyle: 'italic',
                  }}
                >
                  {s.note}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── FailureList ───────────────────────────────────────────────────────────
// Single-column list of honest failure cards — title left, body right

interface FailureItem {
  title: string
  body: string
}

interface FailureListProps {
  items: FailureItem[]
}

export function FailureList({ items }: FailureListProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
        background: 'var(--color-border)',
        border: '1px solid var(--color-border)',
        borderRadius: '1rem',
        overflow: 'hidden',
        margin: '2rem 0',
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="case-study-failure-card"
          style={{
            background: 'var(--color-subtle)',
            padding: '1.75rem 2rem',
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontWeight: 400,
              fontSize: '1rem',
              color: 'var(--color-text)',
              letterSpacing: '-0.01em',
              lineHeight: 1.4,
              paddingTop: '0.1em',
            }}
          >
            {item.title}
          </div>
          <div
            style={{
              fontFamily: 'Metropolis, Inter, sans-serif',
              fontSize: '0.9375rem',
              fontWeight: 400,
              lineHeight: 1.7,
              color: 'var(--color-muted)',
            }}
          >
            {item.body}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── ImageCarousel ─────────────────────────────────────────────────────────
// Horizontal one-by-one carousel with prev/next arrows and counter

interface CarouselImage {
  src: string
  alt?: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
  caption?: string
  aspectRatio?: string
}

export function ImageCarousel({ images, caption, aspectRatio = '16 / 9' }: ImageCarouselProps) {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setIndex(i => (i + 1) % images.length)

  return (
    <figure style={{ margin: '2rem 0 0.875rem' }}>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            width: '100%',
            aspectRatio,
            borderRadius: '1rem',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            background: 'var(--color-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={images[index].src}
            alt={images[index].alt ?? ''}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </div>

        {/* Prev button */}
        <button
          onClick={prev}
          aria-label="Previous image"
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M6 2L2 6l4 4" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Next image"
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M2 2l4 4-4 4" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Counter */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.875rem',
            right: '1rem',
            fontFamily: 'Metropolis, Inter, sans-serif',
            fontSize: '0.6875rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: 'rgba(255,255,255,0.85)',
            background: 'rgba(0,0,0,0.35)',
            padding: '0.2rem 0.5rem',
            borderRadius: '100px',
          }}
        >
          {index + 1} / {images.length}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '0.875rem' }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            style={{
              width: i === index ? '20px' : '6px',
              height: '6px',
              borderRadius: '100px',
              background: i === index ? 'var(--color-text)' : 'var(--color-border)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 0.2s ease, background 0.2s ease',
            }}
          />
        ))}
      </div>

      {caption && (
        <figcaption
          style={{
            fontFamily: 'Metropolis, Inter, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 400,
            color: 'var(--color-muted)',
            textAlign: 'center',
            marginTop: '0.625rem',
            lineHeight: 1.5,
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// ─── ClosingStatement ───────────────────────────────────────────────────────
// Editorial ending treatment — two lines rendered with high visual impact.
// Accepts lines as a prop to bypass the MDX p-override styles.

interface ClosingStatementProps {
  lines: string[]
}

export function ClosingStatement({ lines }: ClosingStatementProps) {
  const [first, ...rest] = lines
  return (
    <div
      style={{
        margin: '5rem 0 0',
        padding: '3.5rem 0',
        borderTop: '1px solid var(--color-border)',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'Metropolis, Inter, sans-serif',
          fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)',
          fontWeight: 200,
          lineHeight: 1.45,
          letterSpacing: '-0.025em',
          color: 'var(--color-text)',
          margin: '0 auto 1.5rem',
          maxWidth: '640px',
        }}
      >
        {first}
      </p>
      {rest.map((line, i) => (
        <p
          key={i}
          style={{
            fontFamily: 'Metropolis, Inter, sans-serif',
            fontSize: 'clamp(1rem, 1.75vw, 1.3125rem)',
            fontWeight: 300,
            lineHeight: 1.6,
            letterSpacing: '-0.015em',
            fontStyle: 'italic',
            color: 'var(--color-muted)',
            margin: i < rest.length - 1 ? '0 auto 0.5rem' : '0 auto',
            maxWidth: '560px',
          }}
        >
          {line}
        </p>
      ))}
    </div>
  )
}
