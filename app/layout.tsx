import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { getLogoUrl } from '@/lib/site-settings';
import { ViewportPrefetcher } from '@/components/ui/viewport-prefetcher';
import type { NavHeaderProps } from '@/components/ui/nav-header.types';

// Client-side only components
const RouteTransition = dynamic(
  () => import('@/components/ui/route-transition').then(mod => ({
    default: (props: any) => <mod.RouteTransition {...props} />
  })),
  { ssr: false, loading: () => null }
);

const LoadingFallback = dynamic(
  () => import('@/app/loading'),
  { ssr: false, loading: () => null }
);

// Dynamically import NavHeader component
const NavHeader = dynamic<NavHeaderProps>(
  () => import('@/components/ui/nav-header').then(mod => ({
    default: (props: NavHeaderProps) => <mod.NavHeader {...props} />
  })),
  { ssr: true, loading: () => null }
);

const Footer = dynamic(
  () => import('@/components/ui/footer'), 
  { ssr: true, loading: () => null }
);

const SiteStructuredData = dynamic(
  () => import('@/components/seo/StructuredDataScript').then(mod => ({
    default: () => <mod.SiteStructuredData />
  })),
  { ssr: true, loading: () => null }
);

// Preload critical resources
const preloadResources = () => (
  <>
    <link
      rel="preload"
      href="/_next/static/css/app/layout.css"
      as="style"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      href="/_next/static/chunks/main-app.js"
      as="script"
      crossOrigin="anonymous"
    />
  </>
);

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
  const headerLogo = await getLogoUrl('header');
  const logoUrl = await getLogoUrl('main');
  const footerLogo = await getLogoUrl('footer');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <SiteStructuredData />
        <Suspense fallback={null}>
          {preloadResources()}
        </Suspense>
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <Providers>
          <NavHeader logo={logoUrl} />
          <main className="flex-grow relative">
            <Suspense fallback={<LoadingFallback />}>
              <RouteTransition>
                <>{children}</>
              </RouteTransition>
            </Suspense>
          </main>
          <Footer />
          <ViewportPrefetcher />
        </Providers>
      </body>
    </html>
  )
}
