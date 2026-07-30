import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getOccasion, OCCASIONS } from '@/lib/occasions'
import { SiteHeader } from '@/components/site-header'
import { IntakeForm } from '@/components/intake-form'

export function generateStaticParams() {
  return OCCASIONS.map((o) => ({ occasion: o.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ occasion: string }>
}): Promise<Metadata> {
  const { occasion: occasionId } = await params
  const occasion = getOccasion(occasionId)

  if (!occasion) {
    return {}
  }

  return {
    title: occasion.title,
    description: `${occasion.blurb} Create a personalized ${occasion.title.toLowerCase()} with Big Speech.`,
    alternates: {
      canonical: `/${occasion.id}`,
    },
    openGraph: {
      type: 'website',
      url: `/${occasion.id}`,
      title: `${occasion.title} | Big Speech`,
      description: occasion.blurb,
    },
  }
}

export default async function OccasionPage({
  params,
}: {
  params: Promise<{ occasion: string }>
}) {
  const { occasion: occasionId } = await params
  const occasion = getOccasion(occasionId)
  if (!occasion) notFound()

  const Icon = occasion.icon

  return (
    <div className="min-h-dvh bg-warm-gradient">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl px-5 pb-24">
        <Link
          href="/#occasions"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All occasions
        </Link>

        <div className="mt-6 flex items-center gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent/60 text-accent-foreground">
            <Icon className="size-7" aria-hidden="true" />
          </span>
          <div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
              {occasion.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{occasion.blurb}</p>
          </div>
        </div>

        <IntakeForm occasionId={occasion.id} />
      </main>
    </div>
  )
}
