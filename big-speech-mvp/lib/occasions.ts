import type { LucideIcon } from 'lucide-react'
import { GlassWater, Heart, Feather, PartyPopper, GraduationCap } from 'lucide-react'

export type OccasionId =
  | 'best-man'
  | 'maid-of-honor'
  | 'eulogy'
  | 'retirement'
  | 'graduation'

export type Occasion = {
  id: OccasionId
  title: string
  tileLabel: string
  blurb: string
  icon: LucideIcon
  /** Word used in the intake form, e.g. "the groom" */
  subjectLabel: string
  relationshipPlaceholder: string
  factPlaceholder: string
  /** Extra guidance appended to the system prompt for this occasion. */
  promptGuidance: string
}

export const OCCASIONS: Occasion[] = [
  {
    id: 'best-man',
    title: 'Best Man Speech',
    tileLabel: 'Best Man Speech',
    blurb: 'Toast the groom with warmth, a few laughs, and a heartfelt finish.',
    icon: GlassWater,
    subjectLabel: 'the groom',
    relationshipPlaceholder: 'e.g. My best friend since college, the groom',
    factPlaceholder: 'e.g. The time he got us lost in Rome for 6 hours',
    promptGuidance:
      'This is a best man wedding toast. Address the room, celebrate the groom and the couple, land a couple of good-natured jokes, and finish by raising a glass to the newlyweds.',
  },
  {
    id: 'maid-of-honor',
    title: 'Maid of Honor Speech',
    tileLabel: 'Maid of Honor Speech',
    blurb: 'Celebrate the bride with heartfelt stories and a joyful toast.',
    icon: Heart,
    subjectLabel: 'the bride',
    relationshipPlaceholder: 'e.g. Her older sister and maid of honor',
    factPlaceholder: 'e.g. How she practiced her wedding vows on the dog',
    promptGuidance:
      'This is a maid of honor wedding toast. Celebrate the bride, honor the friendship or bond, weave in touching and lightly funny memories, and finish with a warm toast to the couple.',
  },
  {
    id: 'eulogy',
    title: 'Eulogy',
    tileLabel: 'Eulogy',
    blurb: 'Honor a life with grace, tender memories, and comfort.',
    icon: Feather,
    subjectLabel: 'your loved one',
    relationshipPlaceholder: 'e.g. My grandfather',
    factPlaceholder: 'e.g. He taught every grandkid how to fish',
    promptGuidance:
      'This is a eulogy. Be tender, respectful, and comforting. Honor the life and character of the person, share meaningful memories, and offer solace to those grieving. Keep humor gentle and only if the tone allows.',
  },
  {
    id: 'retirement',
    title: 'Retirement Speech',
    tileLabel: 'Retirement Speech',
    blurb: 'Send them off with gratitude, good memories, and a smile.',
    icon: PartyPopper,
    subjectLabel: 'the retiree',
    relationshipPlaceholder: 'e.g. Her manager of 12 years',
    factPlaceholder: 'e.g. She never once missed the Friday coffee run',
    promptGuidance:
      'This is a retirement speech. Celebrate the career and contributions of the retiree, share fond workplace memories, thank them, and wish them well in this next chapter.',
  },
  {
    id: 'graduation',
    title: 'Graduation Speech',
    tileLabel: 'Graduation Speech',
    blurb: 'Inspire the graduates with reflection, humor, and hope.',
    icon: GraduationCap,
    subjectLabel: 'the graduate',
    relationshipPlaceholder: 'e.g. My younger brother, the graduate',
    factPlaceholder: 'e.g. He rebuilt an old motorcycle in the dorm parking lot',
    promptGuidance:
      'This is a graduation speech. Reflect on the journey, celebrate the achievement, include an uplifting and lightly humorous note, and close with encouragement for the road ahead.',
  },
]

export function getOccasion(id: string): Occasion | undefined {
  return OCCASIONS.find((o) => o.id === id)
}
