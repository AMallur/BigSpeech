'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, Loader2, AlertCircle } from 'lucide-react'
import { setUnlocked } from '@/lib/speech'

type State = 'verifying' | 'success' | 'failed'

export function SuccessView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [state, setState] = useState<State>('verifying')
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const sessionId = searchParams.get('session_id')
    if (!sessionId) {
      setState('failed')
      return
    }

    async function verify(id: string) {
      try {
        const res = await fetch(`/api/verify-session?session_id=${encodeURIComponent(id)}`)
        const data = (await res.json()) as { unlocked: boolean }
        if (data.unlocked) {
          setUnlocked(id)
          setState('success')
          setTimeout(() => router.replace('/result'), 1400)
        } else {
          setState('failed')
        }
      } catch (err) {
        console.log('[v0] verify error:', err)
        setState('failed')
      }
    }

    void verify(sessionId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (state === 'verifying') {
    return (
      <div className="flex flex-col items-center">
        <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
        <h1 className="mt-5 font-serif text-2xl font-semibold text-foreground">
          Confirming your payment…
        </h1>
        <p className="mt-2 text-muted-foreground">This will only take a moment.</p>
      </div>
    )
  }

  if (state === 'failed') {
    return (
      <div className="flex flex-col items-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <AlertCircle className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-serif text-2xl font-semibold text-foreground">
          We couldn&apos;t confirm that payment
        </h1>
        <p className="mt-2 max-w-sm text-muted-foreground">
          If you were charged, don&apos;t worry — head back to your speech and try
          unlocking again.
        </p>
        <Link
          href="/result"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:-translate-y-0.5"
        >
          Back to my speech
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check className="size-7" aria-hidden="true" />
      </span>
      <h1 className="mt-5 font-serif text-2xl font-semibold text-foreground">
        You&apos;re all set!
      </h1>
      <p className="mt-2 text-muted-foreground">
        Taking you back to your full speech…
      </p>
    </div>
  )
}
