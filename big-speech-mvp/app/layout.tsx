import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
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
  metadataBase: new URL('https://bigspeech.vercel.app'),
  title: {
    default: 'Big Speech — A heartfelt speech, ready to read in 20 seconds',
    template: '%s | Big Speech',
  },
  description:
    "Tell us who it's for and share a few memories. Big Speech writes a personalized best man, maid of honor, eulogy, retirement, or graduation speech in seconds.",
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
    siteName: 'Big Speech',
    title: 'Big Speech — A heartfelt speech, ready to read in 20 seconds',
    description:
      "Tell us who it's for and share a few memories. Big Speech writes a personalized speech in seconds.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Big Speech — A heartfelt speech, ready to read in 20 seconds',
    description:
      "Tell us who it's for and share a few memories. Big Speech writes a personalized speech in seconds.",
  },
  generator: 'v0.app',
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
  '@type': 'WebSite',
  name: 'Big Speech',
  alternateName: 'BigSpeech',
  url: 'https://bigspeech.vercel.app/',
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
