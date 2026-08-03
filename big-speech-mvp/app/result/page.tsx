import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { ResultView } from '@/components/result-view'

export const metadata: Metadata = {
  title: 'Your speech',
  description: 'Your personalized speech from Big Speech.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ResultPage() {
  return (
    <div className="min-h-dvh bg-warm-gradient">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl px-5 pb-24">
        <Suspense fallback={null}>
          <ResultView />
        </Suspense>
      </main>
    </div>
  )
}
