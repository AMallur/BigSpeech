import Link from 'next/link'
import { Clock, Sparkles, Star } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { OccasionTiles } from '@/components/occasion-tiles'

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-warm-gradient">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-5 pb-24">
        {/* Hero */}
        <section className="flex flex-col items-center pt-10 text-center sm:pt-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            Personalized in about 20 seconds
          </span>

          <h1 className="mt-6 max-w-3xl text-balance font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl">
            Tell us who it&apos;s for. Get a speech ready to read, in 20 seconds.
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Share a few memories and inside jokes. We&apos;ll turn them into a speech
            that sounds like you wrote it yourself — heartfelt, funny, and ready for
            the moment.
          </p>

          <Link
            href="#occasions"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Choose your occasion
          </Link>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4 text-primary" aria-hidden="true" />
              No account needed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-4 text-primary" aria-hidden="true" />
              Written for the moment that matters
            </span>
          </div>
        </section>

        {/* Occasions */}
        <section id="occasions" className="mt-20 scroll-mt-8 sm:mt-28">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
              What are you speaking at?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Pick your occasion and we&apos;ll tailor every word.
            </p>
          </div>
          <OccasionTiles />
        </section>

        {/* How it works */}
        <section className="mt-20 sm:mt-28">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Tell us the details',
                body: "Who it's for, a few memories, the tone, and how long you want it.",
              },
              {
                step: '2',
                title: 'We write your speech',
                body: 'A first draft with a strong opening, your stories woven in, and a closing that lands.',
              },
              {
                step: '3',
                title: 'Read it, copy it, print it',
                body: 'Unlock the full speech, copy it anywhere, or download a clean PDF.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-border/70 bg-card/60 p-6 backdrop-blur"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 font-serif text-lg font-semibold text-primary">
                  {item.step}
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-card-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-5xl px-5 pb-10 text-center text-sm text-muted-foreground">
        <p>Big Speech — heartfelt words for life&apos;s biggest moments.</p>
      </footer>
    </div>
  )
}
