import type { OccasionId } from './occasions'

export type Tone = number // 0 = fully heartfelt, 100 = fully funny
export type Length = 'short' | 'medium' | 'long'

export type SpeechRequest = {
  occasion: OccasionId
  relationship: string
  facts: string[]
  tone: Tone
  length: Length
}

export const LENGTH_OPTIONS: { id: Length; label: string; hint: string }[] = [
  { id: 'short', label: 'Short', hint: '~1 min' },
  { id: 'medium', label: 'Medium', hint: '~2 min' },
  { id: 'long', label: 'Long', hint: '~4 min' },
]

export function toneLabel(tone: Tone): string {
  if (tone <= 20) return 'Heartfelt'
  if (tone <= 40) return 'Mostly heartfelt'
  if (tone < 60) return 'Balanced'
  if (tone < 80) return 'Mostly funny'
  return 'Funny'
}

/** Approximate target word count used for both the real prompt and the mock. */
export function targetWords(length: Length): number {
  switch (length) {
    case 'short':
      return 160
    case 'medium':
      return 320
    case 'long':
      return 620
  }
}

const SESSION_KEY = 'big-speech:current'

export type StoredSpeech = SpeechRequest & {
  id: string
  text: string
  createdAt: number
}

export function saveSpeech(data: StoredSpeech) {
  if (typeof window === 'undefined') return
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(data))
}

export function loadSpeech(): StoredSpeech | null {
  if (typeof window === 'undefined') return null
  const raw = window.sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as StoredSpeech
  } catch {
    return null
  }
}

export function clearSpeech() {
  if (typeof window === 'undefined') return
  window.sessionStorage.removeItem(SESSION_KEY)
  window.sessionStorage.removeItem(UNLOCK_KEY)
}

const UNLOCK_KEY = 'big-speech:unlocked'

export function setUnlocked(sessionId: string) {
  if (typeof window === 'undefined') return
  window.sessionStorage.setItem(UNLOCK_KEY, sessionId)
}

export function isUnlocked(): boolean {
  if (typeof window === 'undefined') return false
  return Boolean(window.sessionStorage.getItem(UNLOCK_KEY))
}

const REQUEST_KEY = 'big-speech:request'

export function saveRequest(data: SpeechRequest) {
  if (typeof window === 'undefined') return
  window.sessionStorage.setItem(REQUEST_KEY, JSON.stringify(data))
}

export function loadRequest(): SpeechRequest | null {
  if (typeof window === 'undefined') return null
  const raw = window.sessionStorage.getItem(REQUEST_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as SpeechRequest
  } catch {
    return null
  }
}
