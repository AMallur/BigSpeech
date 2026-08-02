import type { MetadataRoute } from 'next'
import { OCCASIONS } from '@/lib/occasions'
import { SITE_URL } from '@/lib/site'

const LAST_CONTENT_UPDATE = new Date('2026-08-02T00:00:00.000Z')

export default function sitemap(): MetadataRoute.Sitemap {
  const occasionPages: MetadataRoute.Sitemap = OCCASIONS.map((occasion) => ({
    url: `${SITE_URL}/${occasion.id}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...occasionPages,
  ]
}
