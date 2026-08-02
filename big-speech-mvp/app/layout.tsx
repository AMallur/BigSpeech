import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Big Speech',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'AI speech writer',
    'speech generator',
    'best man speech',
    'maid of honor speech',
    'eulogy writer',
    'retirement speech',
    'graduation speech',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Big Speech personalized speech writer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/opengraph-image'],
  },
  category: 'writing',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/icon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/icon-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
}

const websiteIdentity = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: 'BigSpeech',
      url: `${SITE_URL}/`,
      description: DEFAULT_DESCRIPTION,
      inLanguage: 'en-US',
    },
    {
      '@type': 'WebApplication',
      '@id': `${SITE_URL}/#application`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'Any',
      description: DEFAULT_DESCRIPTION,
    },
  ],
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7efe6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${inter.variable} ${playfair.variable}`}>
      <body className="bg-background font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteIdentity) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
