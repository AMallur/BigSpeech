import type { OccasionId } from '@/lib/occasions'

export type BlogContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  relatedOccasion: OccasionId
  content: BlogContentBlock[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-write-a-best-man-speech',
    title: 'How to Write a Best Man Speech (Structure, Examples, and Mistakes to Avoid)',
    description:
      'A practical, step-by-step guide to writing a best man speech that lands the jokes and still means something — with a structure you can fill in today.',
    date: '2026-07-15',
    relatedOccasion: 'best-man',
    content: [
      {
        type: 'p',
        text: "If you've just been asked to be the best man, congratulations — and take a breath. A good best man speech isn't about being the funniest person in the room. It's about being the person who knew the groom well enough to say something true about him, delivered with enough warmth that everyone, including the groom, is glad you're the one holding the mic.",
      },
      {
        type: 'h2',
        text: 'The structure that always works',
      },
      {
        type: 'p',
        text: "Most best man speeches that land follow the same shape, whether they're two minutes or seven: introduce yourself and your relationship to the groom, tell one or two stories that show who he really is, address the couple directly, and close with a toast. You don't need more than that.",
      },
      {
        type: 'ul',
        items: [
          'Opening (15-20 seconds): who you are and how you know the groom — keep it quick, the room already wants to like you.',
          "1-2 stories (the bulk of the speech): specific, not generic. 'He's a great friend' means nothing. 'He drove four hours in a snowstorm to help me move because I didn't have anyone else to ask' means everything.",
          'The pivot to the bride: how you saw him change, or how you knew she was the one — this is where the speech turns from funny to genuine.',
          'The toast: a single sentence everyone can raise a glass to.',
        ],
      },
      {
        type: 'h2',
        text: 'The mistakes that sink an otherwise good speech',
      },
      {
        type: 'p',
        text: "The most common mistake is treating the speech like a comedy set instead of a tribute with jokes in it. If every line is a joke, nobody remembers a single one of them. The second most common mistake is an inside joke that only three people in the room understand — hilarious to you, alienating to everyone else. Cut it, or explain enough context that the joke lands for the room, not just the wedding party.",
      },
      {
        type: 'p',
        text: "The third mistake is length. Ninety seconds of specific, well-told story beats five minutes of rambling every time. If you're not sure it's too long, it's too long.",
      },
      {
        type: 'h2',
        text: "What to do if you're stuck",
      },
      {
        type: 'p',
        text: "If you know you want to say something meaningful but the blank page isn't cooperating, the fastest way through is to just start listing memories — don't write sentences yet, just facts. The night he called you at 2am with wedding-planning anxiety. The trip you took together before either of you had real jobs. Once you have three or four real memories in front of you, the speech basically writes itself around them.",
      },
    ],
  },
  {
    slug: 'maid-of-honor-speech-ideas-that-arent-cheesy',
    title: "Maid of Honor Speech Ideas That Aren't Cheesy",
    description:
      "How to write a maid of honor speech that actually sounds like you — warm and specific instead of generic and greeting-card sweet.",
    date: '2026-07-18',
    relatedOccasion: 'maid-of-honor',
    content: [
      {
        type: 'p',
        text: "The hardest part of a maid of honor speech isn't finding something nice to say — it's avoiding the trap of saying the same nice things every maid of honor speech says. \"She's my best friend, she's always been there for me, I'm so happy for her\" is true, but it's also what everyone expects to hear, which means it doesn't actually land.",
      },
      {
        type: 'h2',
        text: 'Specific beats sweet, every time',
      },
      {
        type: 'p',
        text: 'The fix is almost always the same: replace a general statement with a specific memory. Instead of "she\'s always been so supportive," tell the actual story — the time she took a red-eye flight to be there for something that mattered to you, or drove two states over on a random Tuesday because you needed her. One well-chosen, concrete memory does more work than five adjectives.',
      },
      {
        type: 'ul',
        items: [
          "Pick one story that shows the bride's character, not just your friendship — how she treats people, what she cares about, what she's like under pressure.",
          'Pick one story about her and the groom — how you knew, or when you knew, that this relationship was different.',
          "Keep the humor affectionate, never at anyone's expense, especially not the groom's, on his wedding day.",
          "End with a direct address to the bride, then the toast — this is the moment people remember, so don't rush it.",
        ],
      },
      {
        type: 'h2',
        text: 'A structure that avoids the cheese',
      },
      {
        type: 'p',
        text: "Open with your relationship to the bride in one sentence. Move into your story (or two, if they're short). Say something true and specific about who she is. Turn to the couple and say something true and specific about their relationship. Toast. That's it — five beats, and none of them require a single greeting-card line.",
      },
      {
        type: 'h2',
        text: 'If you keep writing lines that feel like a Hallmark card',
      },
      {
        type: 'p',
        text: "That's usually a sign you're writing from adjectives (\"amazing,\" \"beautiful,\" \"perfect\") instead of memories. Every time you catch yourself reaching for an adjective, stop and ask: what's the actual moment that made me believe that? Write the moment instead of the adjective, and the cheese disappears on its own.",
      },
    ],
  },
  {
    slug: 'eulogy-writing-guide',
    title: 'How to Write a Eulogy: A Gentle, Practical Guide',
    description:
      "Writing a eulogy while grieving is hard. Here's a clear, compassionate structure to help you honor someone well, even when you don't know where to start.",
    date: '2026-07-22',
    relatedOccasion: 'eulogy',
    content: [
      {
        type: 'p',
        text: "Writing a eulogy is one of the few kinds of writing you do while actively grieving, which makes it uniquely hard — you're trying to find the right words at the exact moment your mind is least available for that. If you're staring at a blank page right now, know that a simple, honest eulogy said with a steady voice will always mean more than an elaborate one you're too overwhelmed to deliver.",
      },
      {
        type: 'h2',
        text: 'A structure that carries you through it',
      },
      {
        type: 'ul',
        items: [
          'Who you are to them (10-15 seconds): your relationship, simply stated.',
          'Who they were: not a resume — a few qualities that defined them, illustrated with a short memory each.',
          'One story that captures them: the memory that, if someone only heard this one thing about them, would understand who they were.',
          'What they gave you, or taught you, that you carry forward.',
          'A closing line of comfort, gratitude, or farewell.',
        ],
      },
      {
        type: 'h2',
        text: 'Permission to keep it simple',
      },
      {
        type: 'p',
        text: "You do not need to cover their entire life. You do not need to be a great writer. A eulogy is not a biography — it's a small number of true, well-chosen moments that let the room feel who this person was. Two or three specific memories, told honestly, will do more than an exhaustive account of everything they ever did.",
      },
      {
        type: 'h2',
        text: 'On humor and difficult relationships',
      },
      {
        type: 'p',
        text: "Gentle humor is welcome if it fits how the person actually was — a genuinely funny habit, a running joke the family shares. It should never feel forced. If the relationship was complicated, you don't have to pretend otherwise; focus on what was true and good, and it's completely fine to keep the eulogy warm without making it dishonest.",
      },
      {
        type: 'h2',
        text: "If you're too close to it to write alone",
      },
      {
        type: 'p',
        text: 'This is one of the hardest kinds of writing to do solo, especially on a deadline, while grieving. It can help to talk it through out loud first — with a friend, a family member, or even by describing the person and your memories of them to a tool that can help you turn those thoughts into something you can actually read at the service.',
      },
    ],
  },
  {
    slug: 'retirement-speech-tips',
    title: 'Retirement Speech Tips: How to Send Someone Off Well',
    description:
      'A short guide to writing a retirement speech that actually captures someone\'s career and character, instead of a generic "best of luck" send-off.',
    date: '2026-07-26',
    relatedOccasion: 'retirement',
    content: [
      {
        type: 'p',
        text: "A retirement speech has an easy trap built into it: it's tempting to just list job titles and years of service, which is accurate but forgettable. The retirement speeches people actually remember are the ones that capture what someone was like to work with, not just what they did.",
      },
      {
        type: 'h2',
        text: 'What to actually include',
      },
      {
        type: 'ul',
        items: [
          'One or two specific stories about how they handled work — a project they saved, a habit everyone knew them for, a moment they showed up for someone.',
          'What changed because of them — a process, a team culture, a mentee who became someone because of their guidance.',
          "A lighter, affectionate detail — the coffee order, the desk decoration, the phrase they always said — something that's unmistakably them.",
          'A closing note of thanks and good wishes for whatever comes next.',
        ],
      },
      {
        type: 'h2',
        text: 'Keep the tone warm, not just complimentary',
      },
      {
        type: 'p',
        text: 'The difference between a forgettable retirement speech and a great one is usually specificity again: "she was always so dedicated" versus "she was the only person who remembered every single person\'s birthday on a 40-person team, for twelve years, without ever being asked." The second one gets a laugh and a genuine moment of recognition. The first gets polite nodding.',
      },
      {
        type: 'p',
        text: "If you're giving this speech and you didn't work with them directly for their whole career, that's fine — a speech built from a few genuine, well-observed years is better than a vague summary of decades you didn't witness.",
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
