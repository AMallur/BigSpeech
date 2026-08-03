import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SuccessView } from '@/components/success-view'

export const metadata: Metadata = {
  title: 'Payment successful',
  description: 'Your Big Speech unlock was successful.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SuccessPage() {
  return (
    <div className="min-h-dvh bg-warm-gradient">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 py-24 text-center">
        <Suspense fallback={null}>
          <SuccessView />
        </Suspense>
      </main>
    </div>
  )
}
