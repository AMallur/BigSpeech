'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Check, Copy, Download, Lock, Loader2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getOccasion } from '@/lib/occasions'
import {
  isUnlocked,
  loadRequest,
  loadSpeech,
  saveSpeech,
  toneLabel,
  type SpeechRequest,
  type StoredSpeech,
} from '@/lib/speech'

type Status = 'init' | 'empty' | 'loading' | 'streaming' | 'done' | 'error'

const UNLOCK_PRICE = '$12.99'

function splitAtFraction(text: string, frac: number): [string, string] {
  const tokens = text.split(/(\s+)/)
  const wordCount = tokens.filter((_, i) => i % 2 === 0 && tokens[i] !== '').length
  const keep = Math.max(1, Math.floor(wordCount * frac))
  let seen = 0
  let idx = 0
  for (; idx < tokens.length; idx++) {
    if (idx % 2 === 0 && tokens[idx] !== '') {
      seen++
      if (seen > keep) break
    }
  }
  return [tokens.slice(0, idx).join(''), tokens.slice(idx).join('')]
}

export function ResultView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const canceled = searchParams.get('canceled')

  const [request, setRequest] = useState<SpeechRequest | null>(null)
  const [text, setText] = useState('')
  const [status, setStatus] = useState<Status>('init')
  const [unlocked, setUnlockedState] = useState(false)
  const [copied, setCopied] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    setUnlockedState(isUnlocked())

    const stored = loadSpeech()
    const req = loadRequest()

    if (stored && stored.text) {
      setRequest(stored)
      setText(stored.text)
      setStatus('done')
      return
    }

    if (!req) {
      setStatus('empty')
      return
    }

    setRequest(req)
    void generate(req)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function generate(req: SpeechRequest) {
    setStatus('loading')
    setText('')
    try {
      const res = await fetch('/api/generate-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      })
      if (!res.ok || !res.body) throw new Error('Failed to generate')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      setStatus('streaming')
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setText(acc)
      }
      acc = acc.trim()
      setText(acc)
      setStatus('done')

      const record: StoredSpeech = {
        ...req,
        id: `sp_${Date.now()}`,
        text: acc,
        createdAt: Date.now(),
      }
      saveSpeech(record)
    } catch (err) {
      console.log('[v0] generate error:', err)
      setStatus('error')
    }
  }

  async function handleUnlock() {
    setCheckoutLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', { method: 'POST' })
      if (!res.ok) throw new Error('Checkout failed')
      const data = (await res.json()) as { url: string }
      window.location.href = data.url
    } catch (err) {
      console.log('[v0] checkout error:', err)
      setCheckoutLoading(false)
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.log('[v0] copy error:', err)
    }
  }

  async function handleDownloadPdf() {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF({ unit: 'pt', format: 'letter' })
    const margin = 64
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const maxWidth = pageWidth - margin * 2
    const occasion = request ? getOccasion(request.occasion) : undefined

    doc.setFont('times', 'bold')
    doc.setFontSize(20)
    doc.text(occasion?.title ?? 'Your Speech', margin, margin)

    doc.setFont('times', 'normal')
    doc.setFontSize(12)
    let y = margin + 28
    const paragraphs = text.split(/\n\s*\n/)
    for (const para of paragraphs) {
      const lines = doc.splitTextToSize(para.trim(), maxWidth) as string[]
      for (const line of lines) {
        if (y > pageHeight - margin) {
          doc.addPage()
          y = margin
        }
        doc.text(line, margin, y)
        y += 18
      }
      y += 10
    }

    doc.save('big-speech.pdf')
  }

  // ----- Empty state -----
  if (status === 'empty') {
    return (
      <div className="mt-16 flex flex-col items-center text-center">
        <h1 className="font-serif text-2xl font-semibold text-foreground">
          Let&apos;s start with the details
        </h1>
        <p className="mt-2 max-w-sm text-muted-foreground">
          We couldn&apos;t find a speech in progress. Pick an occasion and tell us who
          it&apos;s for.
        </p>
        <Link
          href="/#occasions"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:-translate-y-0.5"
        >
          Choose an occasion
        </Link>
      </div>
    )
  }

  const occasion = request ? getOccasion(request.occasion) : undefined
  const isGenerating = status === 'loading' || status === 'streaming'
  const showPaywall = status === 'done' && !unlocked

  const [visibleText, hiddenText] = showPaywall
    ? splitAtFraction(text, 0.4)
    : [text, '']

  return (
    <div className="pt-2">
      <Link
        href={occasion ? `/${occasion.id}` : '/#occasions'}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Edit details
      </Link>

      <div className="mt-6 flex flex-col gap-1">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
          {occasion?.title ?? 'Your speech'}
        </h1>
        {request && (
          <p className="text-sm text-muted-foreground">
            {toneLabel(request.tone)} tone
            {request.relationship ? ` · for ${request.relationship}` : ''}
          </p>
        )}
      </div>

      {canceled && !unlocked && status === 'done' && (
        <div className="mt-4 rounded-2xl border border-border bg-secondary/60 px-4 py-3 text-sm text-secondary-foreground">
          Checkout was canceled — your speech is still here whenever you&apos;re ready.
        </div>
      )}

      {/* Loading */}
      {isGenerating && (
        <div className="mt-8 rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
          <div className="flex items-center gap-3 text-foreground">
            <Loader2 className="size-5 animate-spin text-primary" aria-hidden="true" />
            <span className="font-serif text-lg font-semibold">Writing your speech…</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Weaving your memories into something worth reading aloud.
          </p>
          {status === 'streaming' && text && (
            <p className="mt-6 whitespace-pre-wrap font-serif text-lg leading-relaxed text-card-foreground/90">
              {text}
              <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-primary align-middle" />
            </p>
          )}
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="mt-8 rounded-3xl border border-border/70 bg-card p-8 text-center shadow-sm">
          <p className="font-serif text-lg font-semibold text-foreground">
            Something went sideways
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn&apos;t finish your speech. Let&apos;s try that again.
          </p>
          {request && (
            <Button onClick={() => generate(request)} className="mt-5 rounded-full">
              <RefreshCw className="size-4" aria-hidden="true" />
              Try again
            </Button>
          )}
        </div>
      )}

      {/* Result */}
      {status === 'done' && (
        <>
          <div className="mt-8 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
            <div className="p-6 sm:p-8">
              <p className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-card-foreground">
                {visibleText}
              </p>

              {showPaywall && hiddenText && (
                <div className="relative mt-1">
                  <p
                    aria-hidden="true"
                    className="pointer-events-none max-h-72 select-none overflow-hidden whitespace-pre-wrap font-serif text-lg leading-relaxed text-card-foreground blur-[6px]"
                  >
                    {hiddenText}
                  </p>
                  <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-b from-transparent via-card/70 to-card pb-2">
                    <div className="flex w-full flex-col items-center rounded-2xl px-4 text-center">
                      <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Lock className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-3 font-serif text-lg font-semibold text-card-foreground">
                        Unlock your full speech
                      </h3>
                      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                        See every word, copy it anywhere, and download a clean PDF.
                      </p>
                      <Button
                        onClick={handleUnlock}
                        disabled={checkoutLoading}
                        size="lg"
                        className="mt-4 h-12 rounded-full px-6 text-base font-semibold shadow-sm"
                      >
                        {checkoutLoading ? (
                          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                        ) : (
                          <Lock className="size-4" aria-hidden="true" />
                        )}
                        Unlock full speech — {UNLOCK_PRICE}
                      </Button>
                      <span className="mt-2 text-xs text-muted-foreground">
                        One-time payment · No subscription
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {unlocked && (
              <div className="flex items-center gap-2 border-t border-border/70 bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
                <Check className="size-4" aria-hidden="true" />
                Unlocked — the full speech is yours.
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleCopy}
              disabled={!unlocked}
              className="h-12 rounded-full"
            >
              {copied ? (
                <Check className="size-4" aria-hidden="true" />
              ) : (
                <Copy className="size-4" aria-hidden="true" />
              )}
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleDownloadPdf}
              disabled={!unlocked}
              className="h-12 rounded-full"
            >
              <Download className="size-4" aria-hidden="true" />
              Download PDF
            </Button>
          </div>

          {!unlocked && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Copy and PDF download unlock after purchase.
            </p>
          )}

          {request && (
            <button
              type="button"
              onClick={() => router.push(occasion ? `/${occasion.id}` : '/')}
              className="mx-auto mt-6 flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RefreshCw className="size-4" aria-hidden="true" />
              Start a new speech
            </button>
          )}
        </>
      )}
    </div>
  )
}
