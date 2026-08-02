import { Suspense } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SuccessView } from '@/components/success-view'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment Confirmation',
  alternates: { canonical: '/success' },
  robots: { index: false, follow: false, nocache: true },
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
