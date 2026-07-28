import { getOccasion } from '@/lib/occasions'
import { buildMockSpeech } from '@/lib/mock-speech'
import { targetWords, toneLabel, type SpeechRequest } from '@/lib/speech'

export const runtime = 'nodejs'

// TODO: Add ANTHROPIC_API_KEY to your environment variables to enable real
// AI-generated speeches. Without it, the route streams a realistic placeholder
// speech so the UI stays fully clickable.
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY
const MODEL = 'claude-haiku-4-5'

function buildSystemPrompt(req: SpeechRequest): string {
  const occasion = getOccasion(req.occasion)
  const words = targetWords(req.length)
  return [
    'You are an award-winning speechwriter who writes speeches that sound like they were written by the speaker themselves — natural, personal, and ready to read aloud.',
    occasion ? occasion.promptGuidance : '',
    'Structure the speech as: (1) an opening hook that grabs the room, (2) two to three personalized anecdotes woven naturally into the flow using the facts provided, and (3) a warm or funny closing line that lands.',
    `Tone: ${toneLabel(req.tone)} (on a scale where 0 is deeply heartfelt and 100 is very funny, this request is ${req.tone}). Match this tone throughout.`,
    `Target length: about ${words} words.`,
    'Write only the speech itself — no headings, no stage directions, no markdown, no preamble. Use plain paragraphs separated by blank lines.',
  ]
    .filter(Boolean)
    .join('\n\n')
}

function buildUserPrompt(req: SpeechRequest): string {
  const occasion = getOccasion(req.occasion)
  const facts = req.facts.filter((f) => f.trim().length > 0)
  return [
    `Occasion: ${occasion?.title ?? req.occasion}`,
    `The speaker's relationship to ${occasion?.subjectLabel ?? 'the person'}: ${req.relationship || 'not specified'}`,
    'Facts, memories, and inside jokes to weave in:',
    facts.length ? facts.map((f) => `- ${f}`).join('\n') : '- (none provided; keep it warm and general)',
    'Write the speech now.',
  ].join('\n')
}

function streamText(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()
  // Emit the placeholder in small word chunks to mimic live token streaming.
  const chunks = text.match(/\S+\s*/g) ?? [text]
  let i = 0
  return new ReadableStream({
    async pull(controller) {
      if (i >= chunks.length) {
        controller.close()
        return
      }
      const take = Math.min(3, chunks.length - i)
      controller.enqueue(encoder.encode(chunks.slice(i, i + take).join('')))
      i += take
      await new Promise((r) => setTimeout(r, 24))
    },
  })
}

export async function POST(req: Request) {
  let body: SpeechRequest
  try {
    body = (await req.json()) as SpeechRequest
  } catch {
    return new Response('Invalid request body', { status: 400 })
  }

  if (!body?.occasion || !getOccasion(body.occasion)) {
    return new Response('Unknown occasion', { status: 400 })
  }

  // Fallback: no key configured -> stream the mock speech.
  if (!ANTHROPIC_API_KEY) {
    return new Response(streamText(buildMockSpeech(body)), {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  // Real Anthropic Messages API call with streaming.
  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2048,
      stream: true,
      system: buildSystemPrompt(body),
      messages: [{ role: 'user', content: buildUserPrompt(body) }],
    }),
  })

  if (!anthropicRes.ok || !anthropicRes.body) {
    // Graceful degradation to the mock speech if the API errors.
    return new Response(streamText(buildMockSpeech(body)), {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const transformed = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = anthropicRes.body!.getReader()
      let buffer = ''
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''
          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed.startsWith('data:')) continue
            const data = trimmed.slice(5).trim()
            if (!data || data === '[DONE]') continue
            try {
              const evt = JSON.parse(data)
              if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
                controller.enqueue(encoder.encode(evt.delta.text))
              }
            } catch {
              // ignore keep-alive / non-JSON lines
            }
          }
        }
      } finally {
        controller.close()
      }
    },
  })

  return new Response(transformed, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
