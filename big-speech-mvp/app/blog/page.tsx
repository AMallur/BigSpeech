import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { BLOG_POSTS } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Speech Writing Guides',
  description:
    'Practical guides for writing best man speeches, maid of honor toasts, eulogies, retirement speeches, and more.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Speech Writing Guides | Big Speech',
    description:
      'Practical guides for writing best man speeches, maid of honor toasts, eulogies, retirement speeches, and more.',
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div className="min-h-dvh bg-warm-gradient">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl px-5 pb-24">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
          Speech Writing Guides
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Practical, no-fluff advice for the speech you actually have to give.
        </p>

        <ul className="mt-8 flex flex-col gap-6">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-border pb-6 last:border-none">
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="font-serif text-xl font-semibold tracking-tight text-foreground group-hover:underline">
                  {post.title}
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{post.description}</p>
                <p className="mt-2 text-xs text-muted-foreground/80">{formatDate(post.date)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
