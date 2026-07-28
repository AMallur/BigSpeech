'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getOccasion, type OccasionId } from '@/lib/occasions'
import {
  clearSpeech,
  LENGTH_OPTIONS,
  saveRequest,
  toneLabel,
  type Length,
  type SpeechRequest,
} from '@/lib/speech'

const MAX_FACTS = 5
const MIN_FACTS = 3

export function IntakeForm({ occasionId }: { occasionId: OccasionId }) {
  const router = useRouter()
  const occasion = getOccasion(occasionId)!
  const [relationship, setRelationship] = useState('')
  const [facts, setFacts] = useState<string[]>(['', '', ''])
  const [tone, setTone] = useState(45)
  const [length, setLength] = useState<Length>('medium')
  const [submitting, setSubmitting] = useState(false)

  function updateFact(index: number, value: string) {
    setFacts((prev) => prev.map((f, i) => (i === index ? value : f)))
  }

  function addFact() {
    setFacts((prev) => (prev.length < MAX_FACTS ? [...prev, ''] : prev))
  }

  function removeFact(index: number) {
    setFacts((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const request: SpeechRequest = {
      occasion: occasion.id,
      relationship: relationship.trim(),
      facts: facts.map((f) => f.trim()).filter(Boolean),
      tone,
      length,
    }
    clearSpeech()
    saveRequest(request)
    router.push('/result')
  }

  const filledFacts = facts.filter((f) => f.trim().length > 0).length

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
      {/* Relationship */}
      <fieldset className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
        <label htmlFor="relationship" className="block font-serif text-lg font-semibold text-card-foreground">
          Who is this speech for?
        </label>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us your relationship to {occasion.subjectLabel}.
        </p>
        <input
          id="relationship"
          type="text"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          placeholder={occasion.relationshipPlaceholder}
          className="mt-4 w-full rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/40"
        />
      </fieldset>

      {/* Facts */}
      <fieldset className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
        <legend className="font-serif text-lg font-semibold text-card-foreground">
          Share a few memories
        </legend>
        <p className="mt-1 text-sm text-muted-foreground">
          Add {MIN_FACTS}–{MAX_FACTS} short facts, memories, or inside jokes. The more
          specific, the better.
        </p>

        <div className="mt-4 flex flex-col gap-3">
          {facts.map((fact, index) => (
            <div key={index} className="flex items-start gap-2">
              <input
                type="text"
                value={fact}
                onChange={(e) => updateFact(index, e.target.value)}
                placeholder={index === 0 ? occasion.factPlaceholder : 'Another memory or inside joke'}
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/40"
              />
              {facts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFact(index)}
                  aria-label={`Remove memory ${index + 1}`}
                  className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              )}
            </div>
          ))}
        </div>

        {facts.length < MAX_FACTS && (
          <button
            type="button"
            onClick={addFact}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/5"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add another memory
          </button>
        )}
      </fieldset>

      {/* Tone */}
      <fieldset className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
        <div className="flex items-baseline justify-between">
          <legend className="font-serif text-lg font-semibold text-card-foreground">
            Tone
          </legend>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {toneLabel(tone)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={tone}
          onChange={(e) => setTone(Number(e.target.value))}
          aria-label="Tone from heartfelt to funny"
          style={{ accentColor: 'var(--primary)' }}
          className="mt-5 w-full cursor-pointer"
        />
        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>Heartfelt</span>
          <span>Funny</span>
        </div>
      </fieldset>

      {/* Length */}
      <fieldset className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
        <legend className="font-serif text-lg font-semibold text-card-foreground">
          Length
        </legend>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {LENGTH_OPTIONS.map((opt) => {
            const active = length === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setLength(opt.id)}
                aria-pressed={active}
                className={`flex flex-col items-center rounded-2xl border px-3 py-4 text-center transition-all ${
                  active
                    ? 'border-primary bg-primary/10 text-foreground shadow-sm'
                    : 'border-input bg-background text-muted-foreground hover:border-primary/40'
                }`}
              >
                <span className="text-base font-semibold">{opt.label}</span>
                <span className="mt-0.5 text-xs">{opt.hint}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="h-14 rounded-full text-base font-semibold shadow-sm"
      >
        <Sparkles className="size-5" aria-hidden="true" />
        {submitting ? 'Getting ready…' : 'Generate my speech'}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        {filledFacts > 0
          ? `${filledFacts} ${filledFacts === 1 ? 'memory' : 'memories'} added — you can generate anytime.`
          : 'Tip: even one specific memory makes a big difference.'}
      </p>
    </form>
  )
}
