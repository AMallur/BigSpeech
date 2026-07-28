import { getOccasion } from './occasions'
import { targetWords, toneLabel, type SpeechRequest } from './speech'

/**
 * Builds a believable placeholder speech so the whole UI is clickable in preview
 * before real API keys are wired up. When ANTHROPIC_API_KEY is set, the real
 * model output replaces this.
 */
export function buildMockSpeech(req: SpeechRequest): string {
  const occasion = getOccasion(req.occasion)
  const who = occasion?.subjectLabel ?? 'this wonderful person'
  const funny = req.tone >= 55
  const facts = req.facts.filter((f) => f.trim().length > 0)
  const words = targetWords(req.length)

  const opening = funny
    ? `Good evening, everyone. For those who don't know me, I'm the person who was told to "keep it short" — so naturally I wrote four pages. Don't worry, I'll only read three.`
    : `Good evening, everyone. Thank you for being here tonight. Standing up here, looking around this room, I'm reminded of just how many lives ${who} has touched.`

  const relationshipLine = req.relationship.trim()
    ? `For anyone I haven't met, I'm ${req.relationship.trim()}. Which means I've earned the right to tell a few of these stories.`
    : `I've known ${who} for longer than either of us would like to admit.`

  const anecdotes = facts.length
    ? facts.slice(0, 4).map((fact, i) => {
        const lead = [
          'One story I have to share:',
          'Then there was the time',
          'And I&apos;ll never forget',
          'But my favorite memory is this:',
        ][i % 4].replace('&apos;', "'")
        return `${lead} ${fact.trim()}${/[.!?]$/.test(fact.trim()) ? '' : '.'} It says everything you need to know about the kind of person we're celebrating today.`
      })
    : [
        `There are a hundred little moments I could tell you about — the ordinary afternoons that somehow became the memories we hold onto.`,
        `Every one of them comes back to the same thing: a generosity and a warmth that never asked for anything in return.`,
      ]

  const closing = funny
    ? `So please, raise your glass. Here's to ${who} — may your happiness be as endless as this speech nearly was. Cheers.`
    : `So tonight, let's simply say thank you. Thank you, ${who}, for showing us what it looks like to lead with your whole heart. Here's to you.`

  const paragraphs = [opening, relationshipLine, ...anecdotes, closing]

  // Pad toward the requested length so short/medium/long visibly differ.
  const fillers = funny
    ? [
        `Now, I promised I'd behave, and I've mostly kept that promise — which, if you know me, is a genuine achievement worthy of its own toast.`,
        `I did consider hiring a professional writer for tonight, but then I remembered no professional could possibly have this much material to work with.`,
        `People keep asking if I was nervous. Nervous? I've been rehearsing this in the shower for three weeks. My neighbors could give this speech by now.`,
        `And yes, before anyone asks, there are stories I'm choosing not to tell tonight — mostly out of kindness, partly because some of you are still in the room.`,
      ]
    : [
        `It's a rare thing to be able to say, out loud and in front of everyone, exactly how much someone means to you. Tonight I get to do that, and I don't take it for granted.`,
        `The truth is, the best people in our lives rarely realize how much they've given us. They're too busy giving it to keep count.`,
        `If you look around this room, every single person here is a story that ${who} helped write. That's not something everyone can say at the end of a day, let alone a lifetime.`,
        `Years from now, we'll still be telling these stories — a little embellished, maybe, but always with the same warmth we feel tonight.`,
      ]

  let text = paragraphs.join('\n\n')
  let i = 0
  while (text.split(/\s+/).length < words) {
    text += `\n\n${fillers[i % fillers.length]}`
    i += 1
  }

  return `${text}\n\n— Drafted in a ${toneLabel(req.tone)} tone.`
}
