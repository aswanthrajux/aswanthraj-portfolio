import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '@/lib/analytics'

export function usePageTracking(): void {
  const location = useLocation()
  const prevPath = useRef<string | null>(null)

  useEffect(() => {
    const path = location.pathname + location.search + location.hash
    if (prevPath.current === path) return
    prevPath.current = path

    // Title may not reflect the new page yet; defer one tick
    const timer = setTimeout(() => {
      trackPageView(path, document.title, window.location.href)
    }, 0)
    return () => clearTimeout(timer)
  }, [location])
}
