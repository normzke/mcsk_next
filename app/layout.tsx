import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import NavHeader from '@/components/ui/nav-header'
import Footer from '@/components/ui/footer'
import { SiteStructuredData } from '@/components/seo/StructuredDataScript'
import { getLogoUrl } from '@/lib/site-settings'

export const metadata: Metadata = {
  title: 'MCSK - Music Copyright Society of Kenya | Official Website',
  description: 'The Music Copyright Society of Kenya (MCSK) is a collective management organization that protects the rights of music creators and publishers in Kenya. We provide music licensing, royalty collection, and copyright protection services.',
  metadataBase: new URL('https://mcsk.org'),
  keywords: 'music copyright kenya, royalties, music licensing, copyright protection, musicians kenya, mcsk, music society, copyright society, kenya music, music rights, intellectual property',
  authors: [{ name: 'MCSK', url: 'https://mcsk.org' }],
  creator: 'Music Copyright Society of Kenya',
  publisher: 'Music Copyright Society of Kenya',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://mcsk.org',
    siteName: 'Music Copyright Society of Kenya',
    title: 'MCSK - Music Copyright Society of Kenya | Official Website',
    description: 'The Music Copyright Society of Kenya (MCSK) is a collective management organization that protects the rights of music creators and publishers in Kenya.',
    images: [
      {
        url: 'https://mcsk.org/images/mcsk-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MCSK - Music Copyright Society of Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCSK - Music Copyright Society of Kenya | Official Website',
    description: 'The Music Copyright Society of Kenya (MCSK) is a collective management organization that protects the rights of music creators and publishers in Kenya.',
    creator: '@mcsk_kenya',
    images: ['https://mcsk.org/images/mcsk-twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://mcsk.org',
  },
  verification: {
    // TODO: Add your actual Google Search Console verification code
    // google: 'your-google-verification-code',
  },
  other: {
    'geo.region': 'KE',
    'geo.placename': 'Nairobi',
    'geo.position': '-1.2921;36.8219',
    'ICBM': '-1.2921, 36.8219',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch logo URLs
  const headerLogo = await getLogoUrl('header')
  const footerLogo = await getLogoUrl('footer')

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <Providers>
          <SiteStructuredData />
          <NavHeader headerLogo={headerLogo} />
          <main className="flex-grow">{children}</main>
          <Footer footerLogo={footerLogo} />
        </Providers>
      </body>
    </html>
  )
}
