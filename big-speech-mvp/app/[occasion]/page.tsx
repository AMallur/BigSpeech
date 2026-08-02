import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getOccasion, OCCASIONS } from '@/lib/occasions'
import { SiteHeader } from '@/components/site-header'
import { IntakeForm } from '@/components/intake-form'
import { SITE_URL } from '@/lib/site'

export const dynamicParams = false

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
    title: `${occasion.title} Generator`,
    description: occasion.seoDescription,
    alternates: {
      canonical: `/${occasion.id}`,
    },
    openGraph: {
      type: 'website',
      url: `/${occasion.id}`,
      title: `${occasion.title} Generator | Big Speech`,
      description: occasion.seoDescription,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${occasion.title} generator by Big Speech`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${occasion.title} Generator | Big Speech`,
      description: occasion.seoDescription,
      images: ['/opengraph-image'],
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
  const pageUrl = `${SITE_URL}/${occasion.id}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}/#webpage`,
        url: pageUrl,
        name: `${occasion.title} Generator`,
        description: occasion.seoDescription,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Big Speech',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: occasion.title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: `How to write a ${occasion.title.toLowerCase()}`,
        description: occasion.seoDescription,
        step: [
          {
            '@type': 'HowToStep',
            name: 'Describe your relationship',
            text: `Explain your relationship to ${occasion.subjectLabel}.`,
          },
          {
            '@type': 'HowToStep',
            name: 'Add specific memories',
            text: 'Share personal stories, details, or inside jokes you want included.',
          },
          {
            '@type': 'HowToStep',
            name: 'Choose tone and length',
            text: 'Select how heartfelt or funny the speech should be and how long it should run.',
          },
          {
            '@type': 'HowToStep',
            name: 'Generate and review',
            text: 'Create the draft, read it aloud, and personalize any final wording before the event.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: occasion.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  }

  return (
    <div className="min-h-dvh bg-warm-gradient">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl px-5 pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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

        <section aria-labelledby="guide-heading" className="mt-20 border-t border-border/70 pt-12">
          <h2 id="guide-heading" className="font-serif text-2xl font-semibold text-foreground">
            How to write a memorable {occasion.title.toLowerCase()}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{occasion.intro}</p>

          <h3 className="mt-8 font-serif text-xl font-semibold text-foreground">
            What to include
          </h3>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            {occasion.tips.map((tip) => (
              <li key={tip} className="flex gap-3 leading-relaxed">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq-heading" className="mt-14">
          <h2 id="faq-heading" className="font-serif text-2xl font-semibold text-foreground">
            {occasion.title} questions
          </h2>
          <div className="mt-5 space-y-4">
            {occasion.faqs.map((faq) => (
              <details key={faq.question} className="rounded-2xl border border-border/70 bg-card p-5">
                <summary className="cursor-pointer font-semibold text-card-foreground">
                  {faq.question}
                </summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <nav aria-label="Other speech types" className="mt-14 border-t border-border/70 pt-10">
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Explore other speech types
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {OCCASIONS.filter((item) => item.id !== occasion.id).map((item) => (
              <Link
                key={item.id}
                href={`/${item.id}`}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
      </main>
    </div>
  )
}
