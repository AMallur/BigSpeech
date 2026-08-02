import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Big Speech',
    short_name: 'Big Speech',
    description:
      'Create a personalized speech from your memories in about 20 seconds.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7efe6',
    theme_color: '#b9513b',
    icons: [
      { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
