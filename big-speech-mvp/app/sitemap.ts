import type { MetadataRoute } from 'next'
import { OCCASIONS } from '@/lib/occasions'
import { BLOG_POSTS } from '@/lib/blog'

const siteUrl = 'https://bigspeech.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const occasionPages: MetadataRoute.Sitemap = OCCASIONS.map((occasion) => ({
    url: `${siteUrl}/${occasion.id}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...occasionPages,
    {
      url: `${siteUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...blogPages,
  ]
}
