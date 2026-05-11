import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackEvent } from '@/lib/analytics'

const THRESHOLDS = [25, 50, 75, 100]

export function useScrollDepth(): void {
  const location = useLocation()
  const firedRef = useRef<Set<number>>(new Set())
  const pathRef = useRef(location.pathname)

  // Reset fired set on route change
  useEffect(() => {
    firedRef.current = new Set()
    pathRef.current = location.pathname
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const percent = Math.floor((scrollTop / docHeight) * 100)

      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold)
          trackEvent('scroll_depth', {
            percent: threshold,
            page_path: pathRef.current,
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}
