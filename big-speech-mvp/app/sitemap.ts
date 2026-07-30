import type { MetadataRoute } from 'next'
import { OCCASIONS } from '@/lib/occasions'

const siteUrl = 'https://bigspeech.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const occasionPages: MetadataRoute.Sitemap = OCCASIONS.map((occasion) => ({
    url: `${siteUrl}/${occasion.id}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...occasionPages,
  ]
}
