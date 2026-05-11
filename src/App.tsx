import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLenis } from '@/hooks/useLenis'
import Home from '@/pages/Home'

const CaseStudy = lazy(() => import('@/pages/CaseStudy'))
const AILabEntry = lazy(() => import('@/pages/Note'))
const AILabs = lazy(() => import('@/pages/Notes'))
const PhilosophyPage = lazy(() => import('@/pages/PhilosophyPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const WorkPage = lazy(() => import('@/pages/WorkPage'))

function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-muted)',
        fontFamily: 'Metropolis, Inter, sans-serif',
        fontWeight: 300,
        fontSize: '0.875rem',
        letterSpacing: '0.08em',
      }}
    >
      Loading…
    </div>
  )
}

export default function App() {
  useLenis()

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/:slug" element={<CaseStudy />} />
        <Route path="/ai-labs/:slug" element={<AILabEntry />} />
        <Route path="/ai-labs" element={<AILabs />} />
        <Route path="/philosophy" element={<PhilosophyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
      </Routes>
    </Suspense>
  )
}
