import { Suspense } from 'react'
import { SiteHeader } from '@/components/site-header'
import { ResultView } from '@/components/result-view'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Speech',
  alternates: { canonical: '/result' },
  robots: { index: false, follow: false, nocache: true },
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
