import { useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import FeaturedWork from '@/components/sections/FeaturedWork'
import CaseStudies from '@/components/sections/CaseStudies'
import DesignNotes from '@/components/sections/DesignNotes'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import { restoreScroll } from '@/utils/scrollRestore'
import { SEO } from '@/components/ui/SEO'

export default function Home() {
  // Restore scroll position when navigating back from any page
  useEffect(() => {
    restoreScroll('/')
  }, [])

  return (
    <>
      <SEO
        title="Aswanth Raj — Product Design and AI Experience Leader"
        description="UX Manager at Glance AI. 15+ years designing AI-native consumer products, design systems, and ambient experiences reaching hundreds of millions of users."
        canonical="/"
        keywords="product design, AI product design, AI-native design, design systems, UX leadership, design leadership, ambient computing, Glance AI, InMobi, UX manager"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Aswanth Raj',
          url: 'https://aswanthraj.com',
          image: 'https://aswanthraj.com/images/aswanth-portrait.webp',
          jobTitle: 'UX Manager',
          worksFor: { '@type': 'Organization', name: 'Glance AI' },
          description: 'Product design leader with 15+ years of experience building AI-native consumer products, design systems, and ambient experiences.',
          sameAs: [
            'https://www.linkedin.com/in/ashwanthraj/',
            'https://x.com/aswanth_ra89243',
          ],
        }}
      />
      <Header />
      <main>
        <Hero />
        <FeaturedWork />
        <CaseStudies />
        <DesignNotes />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
