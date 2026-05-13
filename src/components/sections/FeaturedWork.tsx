import { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Play, X } from 'lucide-react'
import { saveScrollAnchor } from '@/utils/scrollRestore'
import { trackEvent } from '@/lib/analytics'

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([^?&#\n]+)/)
  return m ? m[1] : null
}

gsap.registerPlugin(ScrollTrigger)

interface WorkCard {
  id: string
  title: string
  description: string
  tag: string
  video: string
  poster?: string
  slug: string
  slugType?: 'case-study' | 'ai-labs'
  gradient: string
  showOnHome: boolean
  portrait?: boolean
}

const PRODUCTS: WorkCard[] = [
  // ── Visible on home ──────────────────────────────────────────────────────────
  {
    id: 'glance-tv',
    title: 'Glance AI TV',
    description: 'Reimagining the TV home screen as an AI-powered ambient canvas for content, discovery, and commerce.',
    tag: 'AI / Consumer',
    video: 'https://youtu.be/Y3yCMnubrsQ',
    slug: 'glance-tv',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    showOnHome: true,
  },
  {
    id: 'travel-moments',
    title: 'Travel Moments',
    description: 'AI-native travel planning for the living room. Explore destinations through a 3D globe and generate personalised travel videos together.',
    tag: 'AI / Consumer',
    video: 'https://youtu.be/Mvp2WyUzAuQ',
    slug: 'travel-moments',
    gradient: 'linear-gradient(135deg, #0d1f2d 0%, #1a3a4a 50%, #0d2a3d 100%)',
    showOnHome: true,
  },
  {
    id: 'bedtime-stories',
    title: 'Bedtime Stories',
    description: 'AI writes the story, illustrates each scene, and narrates it live on your TV. Generative storytelling on ambient screens.',
    tag: 'AI / Concept',
    video: 'https://youtu.be/HIHQ3tjDrmw',
    slug: 'bedtime-stories',
    gradient: 'linear-gradient(135deg, #0d0d1a 0%, #1a1040 50%, #0d1a3e 100%)',
    showOnHome: true,
  },
  {
    id: 'shopping-agent-tv',
    title: 'Shop What You Watch',
    description: 'A conversational shopping agent for Samsung TV. Browse trending content, discover products, and complete purchases without leaving the screen.',
    tag: 'AI / Commerce',
    video: 'https://youtu.be/B12mCKhfwmI',
    slug: 'shop-app',
    gradient: 'linear-gradient(135deg, #1a0f2e 0%, #2d1458 50%, #0f1a3e 100%)',
    showOnHome: true,
  },
  {
    id: 'ai-native-product-thinking',
    title: 'How to Build AI Native Products',
    description: 'A framework for designers and builders who want to move from AI user to AI thinker. What changes when the model is the interface.',
    tag: 'AI / Framework',
    video: 'https://youtube.com/shorts/QiBwPwEONyc',
    poster: '/images/ai-native-selfie.webp',
    slug: 'ai-native-product-thinking',
    slugType: 'ai-labs',
    gradient: 'linear-gradient(135deg, #080c14 0%, #0f1f3d 50%, #1a0f2e 100%)',
    showOnHome: true,
    portrait: true,
  },
  {
    id: 'uiforge',
    title: 'Building UIForge',
    description: 'Can AI convert a screenshot into structured, editable UI? I built a Figma plugin to find out.',
    tag: 'AI / Lab Experiment',
    video: 'https://youtu.be/uR6EH0WLM44',
    slug: 'uiforge',
    slugType: 'ai-labs',
    gradient: 'linear-gradient(135deg, #0d0d1a 0%, #1a1040 50%, #0f2e1a 100%)',
    showOnHome: true,
  },
  {
    id: 'year-end-2023',
    title: '2023 Showreel',
    description: 'A year of shipping at scale. Products and systems that defined AI-native design across mobile and ambient surfaces.',
    tag: 'Annual Showcase',
    video: 'https://youtu.be/BdN-PvsOHXY',
    slug: '',
    gradient: 'linear-gradient(135deg, #1a1208 0%, #3d2e10 50%, #1a1a0a 100%)',
    showOnHome: true,
  },
  {
    id: 'year-end-2024',
    title: '2024 Showreel',
    description: 'A full year of AI-native product work. Ambient commerce, generative experiences, and the next screen taking shape.',
    tag: 'Annual Showcase',
    video: 'https://youtu.be/VrNVH6oi6p4',
    slug: '',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0a2840 100%)',
    showOnHome: true,
  },
  // ── Pending (videos not yet added) ───────────────────────────────────────────
  // Uncomment each entry once the corresponding video file is placed in /public/videos/
  //
  // { id: 'hub-lockscreen', title: 'Hub & Lockscreen', description: 'Designing the ambient layer between lock screen and home. Intelligent, contextual, personal.', tag: 'Mobile / Systems', video: '/videos/hub-lockscreen-demo.mp4', slug: 'hub-lockscreen', gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2d2d2d 100%)', showOnHome: false },
  // { id: 'folderwall', title: 'FolderWall', description: 'Driving app discovery through smart organisation and contextual recommendations.', tag: 'Product Innovation', video: '/videos/folderwall-demo.mp4', slug: 'folderwall', gradient: 'linear-gradient(135deg, #12100e 0%, #2b4162 50%, #12100e 100%)', showOnHome: false },
  // { id: 'google-glance', title: 'Google Glance', description: "Integrating Glance's intelligent content layer into the Android ecosystem at scale.", tag: 'Partnership / Scale', video: '/videos/google-glance-demo.mp4', slug: 'glance-tv', gradient: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)', showOnHome: false },
  // { id: 'inmobi-design-system', title: 'InMobi Design System', description: 'Building a unified design language across 23 products, from tokens to team adoption.', tag: 'Design Systems', video: '/videos/inmobi-ds-demo.mp4', slug: 'inmobi-design-system', gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a0a2e 50%, #2d1458 100%)', showOnHome: false },
  // { id: 'ai-hackathon', title: 'AI Hackathon', description: 'Rapid prototyping AI-native experiences across 48 hours, from ideation to working demo.', tag: 'AI / Rapid Prototyping', video: '/videos/ai-hackathon-demo.mp4', slug: 'glance-tv', gradient: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0a2840 100%)', showOnHome: false },
  // { id: 'glance-commerce', title: 'Glance Commerce', description: 'Turning ambient lock screen moments into seamless shopping journeys without interrupting flow.', tag: 'E-Commerce / AI', video: '/videos/glance-commerce-demo.mp4', slug: 'hub-lockscreen', gradient: 'linear-gradient(135deg, #1a0a0a 0%, #3d1515 50%, #5c1c1c 100%)', showOnHome: false },
  // { id: 'glance-smart-tv', title: 'Smart TV 2.0', description: 'Evolving the connected TV experience, from passive viewing to active, AI-curated discovery.', tag: 'TV / Smart Home', video: '/videos/smart-tv-demo.mp4', slug: 'glance-tv', gradient: 'linear-gradient(135deg, #0a1a10 0%, #0d3320 50%, #0a2818 100%)', showOnHome: false },
]

const VISIBLE_PRODUCTS = PRODUCTS.filter(c => c.showOnHome)

// ─── Video Modal ────────────────────────────────────────────────────────────────

function VideoModal({ card, onClose }: { card: WorkCard; onClose: () => void }) {
  const ytId = getYouTubeId(card.video)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Fire video_play once on modal open (autoplay=1 means it plays immediately)
  useEffect(() => {
    trackEvent('video_play', {
      video_title: card.title,
      video_id_or_url: card.video,
      page_path: window.location.pathname,
      section: 'featured-work',
      content_type: card.tag,
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      onClick={() => { onClose(); saveScrollAnchor('#products') }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(0,0,0,0.94)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '1120px', position: 'relative' }}
      >
        <button
          onClick={() => { onClose(); saveScrollAnchor('#products') }}
          style={{
            position: 'absolute',
            top: '-3rem',
            right: 0,
            background: 'none',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '100px',
            color: '#fff',
            cursor: 'pointer',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={15} />
        </button>

        {ytId && (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={card.title}
            style={card.portrait ? {
              width: 'auto',
              maxHeight: '78vh',
              aspectRatio: '9 / 16',
              borderRadius: '1rem',
              backgroundColor: '#000',
              display: 'block',
              margin: '0 auto',
              border: 'none',
            } : {
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '1rem',
              backgroundColor: '#000',
              display: 'block',
              border: 'none',
            }}
          />
        )}

        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span className="type-label">{card.tag}</span>
            <span style={{ color: '#fff', fontFamily: 'Metropolis, Inter, sans-serif', fontWeight: 300, fontSize: '1.0625rem' }}>
              {card.title}
            </span>
          </div>
          {card.slug && (
            <Link
              to={card.slugType === 'ai-labs' ? `/ai-labs/${card.slug}` : `/case-study/${card.slug}`}
              onClick={() => { onClose(); saveScrollAnchor('#products') }}
              style={{
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Metropolis, Inter, sans-serif',
                fontWeight: 300,
                fontSize: '0.875rem',
                textDecoration: 'none',
              }}
            >
              {card.slugType === 'ai-labs' ? 'Read' : 'Case Study'} <ArrowUpRight size={13} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Product Card ───────────────────────────────────────────────────────────────

function ProductCard({ card, onPlay }: { card: WorkCard; onPlay: (card: WorkCard) => void }) {
  const [thumbError, setThumbError] = useState(false)
  const ytId = getYouTubeId(card.video)
  const thumbnailSrc = card.poster ?? (ytId
    ? (thumbError
      ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
      : `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`)
    : undefined)

  return (
    <div
      className="featured-card"
      onClick={() => onPlay(card)}
      style={{
        flexShrink: 0,
        width: 'clamp(280px, 68vw, 960px)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Video thumbnail — aspect-ratio container */}
      <article
        className="featured-card-video"
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: '1.25rem',
          overflow: 'hidden',
          aspectRatio: '16 / 9',
          transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Background gradient + thumbnail */}
        <div style={{ position: 'absolute', inset: 0, background: card.gradient }}>
          {thumbnailSrc && (
            <img
              src={thumbnailSrc}
              alt={card.title}
              onError={!card.poster ? () => setThumbError(true) : undefined}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.65,
              }}
            />
          )}
        </div>

        {/* Subtle bottom scrim for visual depth */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Play button — revealed on hover */}
        <div
          className="play-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.2s ease',
          }}
        >
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}>
            <Play size={20} fill="currentColor" />
          </div>
        </div>
      </article>

      {/* Text below the video */}
      <div style={{
        padding: 'clamp(1rem, 1.5vw, 1.25rem) 0.125rem 0',
      }}>
        <span
          className="type-label"
          style={{ color: 'var(--color-muted)', display: 'block', marginBottom: '0.375rem' }}
        >
          {card.tag}
        </span>
        <h3 style={{
          fontFamily: 'Metropolis, Inter, sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(1rem, 1.75vw, 1.375rem)',
          color: 'var(--color-text)',
          margin: 0,
          lineHeight: 1.25,
        }}>
          {card.title}
        </h3>
        <p style={{
          fontFamily: 'Metropolis, Inter, sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
          color: 'var(--color-muted)',
          margin: '0.375rem 0 0',
          lineHeight: 1.55,
        }}>
          {card.description}
        </p>
      </div>
    </div>
  )
}

// ─── Section ────────────────────────────────────────────────────────────────────

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState<WorkCard | null>(null)
  const handlePlay = useCallback((card: WorkCard) => {
    trackEvent('video_thumbnail_click', {
      video_title: card.title,
      video_id_or_url: card.video,
      page_path: window.location.pathname,
      section: 'featured-work',
      content_type: card.tag,
    })
    setActiveCard(card)
  }, [])
  const handleClose = useCallback(() => setActiveCard(null), [])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1025px)', () => {
      const getTotalScroll = () => track.scrollWidth - window.innerWidth

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getTotalScroll()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // 88% of scroll animates the track; final 12% holds at end position so the
      // last card is fully visible before the pin releases (scrub:1 catch-up time).
      tl.to(track, { x: () => -getTotalScroll(), ease: 'none', duration: 0.88 })
      tl.to({}, { duration: 0.12 })

      return () => {
        ScrollTrigger.getAll().forEach(st => st.kill())
        gsap.set(track, { clearProps: 'x' })
      }
    })

    return () => { mm.revert() }
  }, [])

  return (
    <>
      {activeCard && <VideoModal card={activeCard} onClose={handleClose} />}

      <style>{`
        /* Hover: reveal play button */
        .featured-card:hover .play-overlay { opacity: 1 !important; }

        /* Hover: scale only the video thumbnail, not the text below */
        @media (hover: hover) and (pointer: fine) {
          .featured-card:hover .featured-card-video { transform: scale(1.018); }
        }

        /* Desktop: section is exactly 100vh, content vertically centred */
        @media (min-width: 1025px) {
          #products { height: 100vh; }
          .products-inner {
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
        }

        /* Mobile + iPad: native horizontal scroll with snap */
        @media (max-width: 1024px) {
          /* Allow track to scroll — section overflow:hidden clips the padding */
          #products { overflow: visible !important; }
          .products-track {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            /* Align left edge with other page content; scroll-padding keeps snap intact */
            padding-left: clamp(1.25rem, 4vw, 2rem) !important;
            scroll-padding-left: clamp(1.25rem, 4vw, 2rem);
          }
          .products-track::-webkit-scrollbar { display: none; }
          .featured-card { scroll-snap-align: start; }
          /* Align hint text with track's left edge */
          .products-hint { padding-left: clamp(1.25rem, 4vw, 2rem) !important; }
        }
      `}</style>

      <section
        id="products"
        ref={sectionRef}
        style={{ overflow: 'hidden', backgroundColor: 'var(--color-bg)' }}
      >
        <div
          className="products-inner"
          style={{ paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)', paddingBottom: 'clamp(2rem, 3vw, 3rem)' }}
        >
          {/* Hint text — left-aligned with card track */}
          <p
            className="products-hint"
            style={{
              margin: '0 0 1.5rem',
              fontSize: '0.8rem',
              color: 'var(--color-muted)',
              paddingLeft: 'calc(max((100vw - 1400px) / 2, 0px) + clamp(1.5rem, 2.5vw, 2.5rem))',
              fontFamily: 'Metropolis, Inter, sans-serif',
              letterSpacing: '0.04em',
            }}
          >
            Click to play · Scroll to explore →
          </p>

          {/* ── Card track ──
              Left padding mirrors the header container so card 1 left-aligns
              with the header text. Right padding leaves a deliberate peek gap
              so the next card is partially visible.
          ── */}
          <div
            ref={trackRef}
            className="products-track"
            style={{
              display: 'flex',
              gap: 'clamp(1.25rem, 2vw, 2rem)',
              paddingLeft: 'calc(max((100vw - 1400px) / 2, 0px) + clamp(1.5rem, 2.5vw, 2.5rem))',
              paddingRight: 'clamp(2rem, 6vw, 6rem)',
            }}
          >
            {VISIBLE_PRODUCTS.map(card => (
              <ProductCard key={card.id} card={card} onPlay={handlePlay} />
            ))}
          </div>

        </div>
      </section>

    </>
  )
}
