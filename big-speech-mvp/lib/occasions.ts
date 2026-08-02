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
  seoDescription: string
  intro: string
  tips: readonly string[]
  faqs: readonly { question: string; answer: string }[]
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
    seoDescription:
      'Create a personalized best man speech from your memories. Get a warm, funny wedding toast with a strong opening and heartfelt finish in about 20 seconds.',
    intro:
      'A memorable best man speech balances real stories, good-natured humor, and a sincere toast to the couple. Share how you know the groom and the moments that capture him best; Big Speech shapes those details into a natural wedding toast you can confidently deliver.',
    tips: [
      'Open by introducing yourself and your relationship to the groom.',
      'Choose one or two specific stories that reveal his character.',
      'Keep jokes warm and appropriate for the whole room.',
      'End by celebrating the couple and inviting guests to raise a glass.',
    ],
    faqs: [
      {
        question: 'How long should a best man speech be?',
        answer:
          'Most best man speeches work well at three to five minutes. Choose a shorter version for a packed reception schedule and a longer version only when you have meaningful stories to tell.',
      },
      {
        question: 'What should I include in a best man speech?',
        answer:
          'Include a brief introduction, one or two specific memories, sincere praise for the groom and couple, and a clear closing toast. Avoid private stories that could embarrass anyone.',
      },
    ],
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
    seoDescription:
      'Write a personalized maid of honor speech from your favorite memories. Create a heartfelt, joyful wedding toast with a polished opening and closing in seconds.',
    intro:
      'The best maid of honor speeches feel personal without becoming a private conversation. Give Big Speech a few memories, your relationship to the bride, and the tone you want; it will turn them into a joyful wedding toast that honors both the bride and the couple.',
    tips: [
      'Introduce your relationship to the bride so every guest has context.',
      'Use a vivid memory that shows what makes her special.',
      'Welcome and celebrate her partner as part of the story.',
      'Close with a warm wish for the couple and a clear toast.',
    ],
    faqs: [
      {
        question: 'How long should a maid of honor speech be?',
        answer:
          'Aim for roughly three to five minutes. That is usually enough time for a personal story, a few heartfelt observations, and a toast without slowing the reception.',
      },
      {
        question: 'How do I make a maid of honor speech personal?',
        answer:
          'Use specific memories, small details, and language you would naturally say aloud. Focus on what the bride means to you and why the couple works well together.',
      },
    ],
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
    seoDescription:
      'Create a thoughtful, personalized eulogy from meaningful memories. Organize your words into a respectful tribute that honors a loved one with warmth and grace.',
    intro:
      'Writing a eulogy can feel overwhelming when emotions are close. Start with the qualities, stories, and small details you most want people to remember. Big Speech helps organize those memories into a respectful tribute while keeping your voice and relationship at the center.',
    tips: [
      'Begin with your relationship to the person and what defined them.',
      'Share one or two concrete memories that bring their character to life.',
      'Use simple, sincere language that feels comfortable to say aloud.',
      'Close with gratitude, a lasting lesson, or a gentle farewell.',
    ],
    faqs: [
      {
        question: 'How long should a eulogy be?',
        answer:
          'A eulogy is often five to ten minutes, though the right length depends on the service. A focused tribute with a few meaningful memories is more important than reaching a particular word count.',
      },
      {
        question: 'What memories should I include in a eulogy?',
        answer:
          'Choose memories that reveal the person’s values, personality, relationships, or impact. Small everyday details can be as powerful as major life achievements.',
      },
    ],
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
    seoDescription:
      'Create a personalized retirement speech that celebrates a career, shares memorable stories, and sends the retiree into their next chapter with gratitude and humor.',
    intro:
      'A strong retirement speech recognizes both the work and the person behind it. Share the retiree’s role, contributions, workplace stories, and the tone of the event; Big Speech turns those details into a polished send-off filled with gratitude and personality.',
    tips: [
      'Recognize specific contributions instead of relying on generic praise.',
      'Include a workplace story colleagues will recognize and enjoy.',
      'Thank the retiree for the effect they had on people around them.',
      'Finish with an optimistic wish for the next chapter.',
    ],
    faqs: [
      {
        question: 'What should a retirement speech include?',
        answer:
          'Include the retiree’s key contributions, one or two memorable stories, sincere thanks, and positive wishes for what comes next. Match the humor and formality to the workplace and event.',
      },
      {
        question: 'How long should a retirement speech be?',
        answer:
          'Three to seven minutes is a useful target for most retirement events. Keep it focused on the retiree and leave room for other speakers when the program includes several tributes.',
      },
    ],
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
    seoDescription:
      'Write a personalized graduation speech with meaningful reflections, light humor, and an inspiring finish. Turn real memories into words ready to deliver.',
    intro:
      'A graduation speech should celebrate the work behind the achievement while looking ahead with energy and hope. Tell Big Speech about the graduate, the journey, and the moments that matter so it can create an uplifting speech grounded in real experience.',
    tips: [
      'Start with a moment that captures the graduate’s journey.',
      'Celebrate effort, growth, and the people who helped along the way.',
      'Use humor that supports the message instead of distracting from it.',
      'End with a clear, hopeful thought about what comes next.',
    ],
    faqs: [
      {
        question: 'What makes a good graduation speech?',
        answer:
          'A good graduation speech combines a specific story, an honest reflection on growth, appreciation for the people involved, and an encouraging idea the audience can carry forward.',
      },
      {
        question: 'How long should a graduation speech be?',
        answer:
          'For a personal graduation celebration, three to five minutes is often enough. Formal commencement speeches may be longer, but concise stories and a clear message usually have more impact.',
      },
    ],
  },
]

export function getOccasion(id: string): Occasion | undefined {
  return OCCASIONS.find((o) => o.id === id)
}
