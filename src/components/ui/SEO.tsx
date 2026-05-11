import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://aswanthraj.com'
// TODO: Replace with a purpose-made 1200x630 OG card image for better social share previews
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/aswanth-portrait.webp`
const DEFAULT_DESCRIPTION =
  'Aswanth Raj is a product design leader with 15+ years of experience building AI-native consumer products, design systems, and ambient experiences at Glance AI and InMobi.'

interface SEOProps {
  title: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  keywords?: string
  noIndex?: boolean
  jsonLd?: object
}

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  keywords,
  noIndex = false,
  jsonLd,
}: SEOProps) {
  const fullTitle = title.includes('Aswanth Raj')
    ? title
    : `${title} | Aswanth Raj`
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content="Aswanth Raj" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}

export { SITE_URL }
