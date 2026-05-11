import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { formatDate } from '@/lib/utils'
import { saveScrollAnchor } from '@/utils/scrollRestore'

export interface Insight {
  slug: string
  title: string
  navTitle?: string
  excerpt: string
  date: string
  tag: string
  readTime: string
}

export const NOTES: Insight[] = [
  {
    slug: 'ai-native-product-thinking',
    title: 'How to Think Before You Build with AI',
    excerpt: 'Most people use AI. Few know how to design with it. A framework for moving from AI user to AI builder.',
    date: '2026-04-10',
    tag: 'AI / Framework',
    readTime: '5 min read',
  },
  {
    slug: 'design-in-ai-era',
    title: 'Design in the Age of AI',
    excerpt: "AI won't replace designers. But designers who use AI will replace those who don't. Here's what I've learned building AI-native products.",
    date: '2026-03-06',
    tag: 'AI / Opinion',
    readTime: '5 min read',
  },
  {
    slug: 'systems-over-screens',
    title: 'Systems Over Screens',
    excerpt: 'Why building a design system is the highest-leverage thing a design team can do, and why most teams get it wrong.',
    date: '2026-02-18',
    tag: 'Design Systems',
    readTime: '7 min read',
  },
  {
    slug: 'fail-fast-learn-fast',
    title: 'Fail Fast, Learn Fast',
    excerpt: 'What running 50+ design sprints at InMobi taught me about the only metric that matters: time to validated learning.',
    date: '2026-01-31',
    tag: 'Process',
    readTime: '6 min read',
  },
  {
    slug: 'invisible-interface',
    title: 'The Invisible Interface',
    excerpt: "The best UI is the one you don't notice. On ambient computing, zero-UI design philosophy, and what Glance taught me about disappearing design.",
    date: '2026-01-09',
    tag: 'Philosophy',
    readTime: '5 min read',
  },
]

export const AI_LABS: Insight[] = [
  {
    slug: 'ai-native-product-thinking',
    title: 'How to Think Before You Build with AI',
    excerpt: 'Most people use AI. Few know how to design with it. A framework for moving from AI user to AI builder.',
    date: '2026-04-10',
    tag: 'AI / Framework',
    readTime: '5 min read',
  },
  {
    slug: 'uiforge',
    title: 'From Pixels to Systems: Building UIForge',
    excerpt: 'Can AI convert a screenshot into structured, editable UI? I built a Figma plugin to find out. The answer was more clarifying than the tool itself.',
    date: '2026-03-22',
    tag: 'AI · Lab Experiment',
    readTime: '5 min read',
  },
  {
    slug: 'digital-twin',
    title: 'Digital Twin: Designing an AI That Thinks Like You',
    excerpt: 'Most AI systems try to be assistants. This experiment explores what happens when the AI becomes you.',
    date: '2026-04-12',
    tag: 'AI · Lab Experiment',
    readTime: '4 min read',
  },
]

export default function DesignNotes() {
  const featured = AI_LABS[0]
  const gridNotes = AI_LABS.slice(1)

  return (
    <section
      id="ai-labs"
      style={{
        paddingTop: 'clamp(5rem, 10vw, 9rem)',
        paddingBottom: 'clamp(3rem, 5vw, 5rem)',
        paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <FadeIn style={{ marginBottom: '3.5rem' }}>
          <p className="text-eyebrow" style={{ marginBottom: '0.625rem' }}>AI Labs</p>
          <h2 className="text-display-xl" style={{ margin: 0 }}>
            Experiments in AI product thinking,<br />
            <span style={{ fontWeight: 200, opacity: 0.6 }}>frameworks and real builds</span>
          </h2>
        </FadeIn>

        {/* Card container */}
        <div style={{
          border: '1px solid var(--color-border)',
          borderRadius: '1.25rem',
          overflow: 'hidden',
        }}>

          {/* Featured card */}
          <FadeIn>
            <Link
              to={`/ai-labs/${featured.slug}`}
              onClick={() => saveScrollAnchor('#ai-labs')}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <article
                style={{
                  padding: '2.25rem',
                  backgroundColor: 'var(--color-bg)',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-subtle)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-bg)' }}
              >
                {/* Tag + meta row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <span className="type-label">{featured.tag}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="type-meta" style={{ fontSize: '0.8125rem' }}>{formatDate(featured.date)}</span>
                    <span className="type-meta" style={{ fontSize: '0.8125rem' }}>{featured.readTime}</span>
                  </div>
                </div>
                {/* Title */}
                <h3 className="type-name" style={{ fontSize: '1.375rem', margin: 0, lineHeight: 1.25 }}>
                  {featured.title}
                </h3>
                {/* Excerpt + Read on same row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <p className="type-body" style={{ flex: 1, fontSize: '1.0625rem', margin: 0, opacity: 0.65, lineHeight: 1.65 }}>
                    {featured.excerpt}
                  </p>
                  <span style={{
                    flexShrink: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontFamily: 'Metropolis, Inter, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: 'var(--color-text)',
                  }}>
                    Read <ArrowUpRight size={13} />
                  </span>
                </div>
              </article>
            </Link>
          </FadeIn>

          {/* 2x2 grid */}
          <div
            style={{
              display: 'grid',
              gap: '1px',
              backgroundColor: 'var(--color-border)',
            }}
            className="grid-cols-1 sm:grid-cols-2"
          >
            {gridNotes.map((note, i) => (
              <FadeIn key={note.slug} delay={i * 0.06}>
                <Link
                  to={`/ai-labs/${note.slug}`}
                  onClick={() => saveScrollAnchor('#ai-labs')}
                  style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                >
                  <article
                    style={{
                      padding: '1.875rem',
                      backgroundColor: 'var(--color-bg)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.625rem',
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--color-subtle)' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--color-bg)' }}
                  >
                    {/* Tag + read time + date in top meta row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <span className="type-label">{note.tag}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="type-meta" style={{ fontSize: '0.75rem', flexShrink: 0 }}>{note.readTime}</span>
                        <span className="type-meta" style={{ fontSize: '0.75rem', flexShrink: 0 }}>{formatDate(note.date)}</span>
                      </div>
                    </div>
                    {/* Title */}
                    <h3 className="type-name" style={{ fontSize: '1.0625rem', margin: 0, lineHeight: 1.35, flex: 1 }}>
                      {note.title}
                    </h3>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* View All — hidden for now */}

      </div>
    </section>
  )
}
