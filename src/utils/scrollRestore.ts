import { getLenis } from '@/hooks/useLenis'

/** Save a section anchor (e.g. '#products') to return to when navigating back */
export function saveScrollAnchor(anchor: string) {
  sessionStorage.setItem('scroll:/', anchor)
}

/** Save current scroll position for a given path (raw Y — only use outside GSAP-pinned sections) */
export function saveScroll(path: string) {
  sessionStorage.setItem(`scroll:${path}`, String(Math.round(window.scrollY)))
}

/** Restore and clear saved scroll for a given path */
export function restoreScroll(path: string) {
  const raw = sessionStorage.getItem(`scroll:${path}`)
  sessionStorage.removeItem(`scroll:${path}`)
  if (!raw) return

  // Wait one RAF so Lenis has processed the route change
  requestAnimationFrame(() => {
    const lenis = getLenis()

    if (raw.startsWith('#')) {
      // Anchor-based: scroll to the element matching the selector
      const el = document.querySelector(raw)
      if (lenis && el) {
        lenis.scrollTo(el as HTMLElement, { duration: 0 } as Parameters<typeof lenis.scrollTo>[1])
      } else if (el) {
        el.scrollIntoView()
      }
      return
    }

    // Raw Y fallback
    const y = parseInt(raw, 10)
    if (!y) return
    if (lenis) {
      lenis.scrollTo(y, { duration: 0 } as Parameters<typeof lenis.scrollTo>[1])
    } else {
      window.scrollTo(0, y)
    }
  })
}
