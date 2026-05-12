/* eslint-disable prefer-rest-params */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { gtag?: (...args: any[]) => void; dataLayer?: unknown[] }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

export function initGA(): void {
  if (typeof window === 'undefined') return
  if (!GA_ID) return

  window.dataLayer = window.dataLayer || []

  // gtag.js requires the Arguments object pushed to dataLayer, not a rest-params array.
  // Google's own TypeScript snippet does the same: accepts ...args but pushes `arguments`.
  function gtag(..._args: unknown[]) { window.dataLayer!.push(arguments) }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', GA_ID, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  if (!window.gtag) return
  window.gtag('event', name, params ?? {})
}

export function trackPageView(path: string, title: string, url: string): void {
  if (typeof window === 'undefined') return
  if (!window.gtag || !GA_ID) return
  window.gtag('config', GA_ID, {
    page_path: path,
    page_title: title,
    page_location: url,
  })
}
