import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import NavHeader from '@/components/ui/nav-header'
import Footer from '@/components/ui/footer'
import { SiteStructuredData } from '@/components/seo/StructuredDataScript'

export const metadata: Metadata = {
  title: 'MCSK - Music Copyright Society of Kenya | Official Website',
  description: 'The Music Copyright Society of Kenya (MCSK) is a collective management organization that protects the rights of music creators and publishers in Kenya.',
  metadataBase: new URL('https://mcsk.or.ke'),
  keywords: 'music copyright kenya, royalties, music licensing, copyright protection, musicians kenya, mcsk',
  authors: [{ name: 'MCSK', url: 'https://mcsk.or.ke' }],
  creator: 'Music Copyright Society of Kenya',
  publisher: 'Music Copyright Society of Kenya',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://mcsk.or.ke',
    siteName: 'Music Copyright Society of Kenya',
    title: 'MCSK - Music Copyright Society of Kenya | Official Website',
    description: 'The Music Copyright Society of Kenya (MCSK) is a collective management organization that protects the rights of music creators and publishers in Kenya.',
    images: [
      {
        url: 'https://mcsk.or.ke/images/mcsk-og-image.jpg',
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
    images: ['https://mcsk.or.ke/images/mcsk-twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://mcsk.or.ke',
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <Providers>
          <SiteStructuredData />
          <NavHeader />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
