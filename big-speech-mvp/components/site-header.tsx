import Link from 'next/link'
import { Mic } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5">
      <Link href="/" className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Mic className="size-5" aria-hidden="true" />
        </span>
        <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
          Big Speech
        </span>
      </Link>
      <nav className="flex items-center gap-1">
        <Link
          href="/#occasions"
          className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Occasions
        </Link>
        <Link
          href="/blog"
          className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Blog
        </Link>
      </nav>
    </header>
  )
}
