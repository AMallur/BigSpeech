import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { BLOG_POSTS, getBlogPost } from '@/lib/blog'
import { getOccasion } from '@/lib/occasions'

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const occasion = getOccasion(post.relatedOccasion)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Big Speech',
    },
  }

  return (
    <div className="min-h-dvh bg-warm-gradient">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl px-5 pb-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All guides
        </Link>

        <article className="mt-6">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
            {post.title}
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">{formatDate(post.date)}</p>

          <div className="mt-8 flex flex-col gap-4 text-[15px] leading-relaxed text-foreground/90">
            {post.content.map((block, i) => {
              if (block.type === 'h2') {
                return (
                  <h2
                    key={i}
                    className="mt-4 font-serif text-xl font-semibold tracking-tight text-foreground"
                  >
                    {block.text}
                  </h2>
                )
              }
              if (block.type === 'ul') {
                return (
                  <ul key={i} className="list-disc space-y-2 pl-5">
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )
              }
              return <p key={i}>{block.text}</p>
            })}
          </div>

          {occasion && (
            <div className="mt-10 rounded-2xl border border-border bg-card p-6">
              <p className="font-serif text-lg font-semibold tracking-tight text-foreground">
                Need to write one of these this week?
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Big Speech turns a few memories into a full {occasion.title.toLowerCase()},
                ready to read in 20 seconds.
              </p>
              <Link
                href={`/${occasion.id}`}
                className="mt-4 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                Write my {occasion.title.toLowerCase()}
              </Link>
            </div>
          )}
        </article>
      </main>
    </div>
  )
}
