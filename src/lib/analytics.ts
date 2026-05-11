type GTagArgs = [string, ...unknown[]]

declare global {
  interface Window {
    gtag?: (...args: GTagArgs) => void
    dataLayer?: unknown[]
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

export function initGA(): void {
  if (typeof window === 'undefined') return
  if (!GA_ID) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []

  function gtag(...args: GTagArgs) {
    window.dataLayer!.push(args)
  }
  window.gtag = gtag

  gtag('js', new Date() as unknown as string)
  gtag('config', GA_ID, { send_page_view: false } as unknown)
}

export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  if (!window.gtag) return
  window.gtag('event', name, params ?? {})
}

export function trackPageView(path: string, title: string, url: string): void {
  if (typeof window === 'undefined') return
  if (!window.gtag || !GA_ID) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: url,
  } as unknown)
}
