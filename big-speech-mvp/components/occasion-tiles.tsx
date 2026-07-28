import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { OCCASIONS } from '@/lib/occasions'

export function OccasionTiles() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {OCCASIONS.map((occasion) => {
        const Icon = occasion.icon
        return (
          <Link
            key={occasion.id}
            href={`/${occasion.id}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-accent/60 text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-card-foreground">
                {occasion.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {occasion.blurb}
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Start writing
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        )
      })}
    </div>
  )
}
