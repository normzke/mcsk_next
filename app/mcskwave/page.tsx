import { Metadata } from "next"
import McskWaveContent from "./components/mcskwave-content"

export const metadata: Metadata = {
  title: "MCSK Wave | Music Copyright Society of Kenya",
  description: "Join Kenya's premier music streaming platform. Share your music, connect with fans, and manage your rights with MCSK Wave.",
  keywords: "MCSK Wave, music streaming, digital distribution, music platform, Kenyan music",
  openGraph: {
    title: "MCSK Wave | Music Copyright Society of Kenya",
    description: "Join Kenya's premier music streaming platform. Share your music, connect with fans, and manage your rights with MCSK Wave.",
    url: "https://mcsk.or.ke/mcskwave",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCSK Wave | Music Copyright Society of Kenya",
    description: "Join Kenya's premier music streaming platform. Share your music, connect with fans, and manage your rights with MCSK Wave.",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/mcskwave",
  },
}

async function getMcskWaveData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/mcskwave`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch MCSK Wave data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching MCSK Wave data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      hero: {
        title: "MCSK Wave",
        description: "Kenya's premier music streaming platform for artists and fans.",
        image: "/images/mcskwave/hero.jpg"
      },
      intro: {
        title: "Discover, Stream, Connect",
        content: "<p>MCSK Wave is a revolutionary digital platform designed specifically for Kenyan musicians and music lovers. Stream your favorite tracks, discover new artists, and connect with the vibrant Kenyan music community.</p>"
      },
      features: [
        {
          id: "1",
          title: "For Artists",
          description: "Upload and share your music with fans across Kenya and beyond. Track your streams, manage your rights, and receive royalties directly.",
          icon: "microphone",
          benefits: [
            "Direct royalty payments",
            "Music rights management",
            "Fan engagement tools",
            "Performance analytics",
            "Promotional opportunities"
          ],
          cta: { text: "Join as Artist", url: "/mcskwave/artists" }
        },
        {
          id: "2",
          title: "For Listeners",
          description: "Access thousands of tracks from Kenya's best musicians. Create playlists, follow your favorite artists, and discover new music tailored to your taste.",
          icon: "headphones",
          benefits: [
            "Unlimited streaming",
            "Personalized recommendations",
            "Offline listening",
            "High-quality audio",
            "Exclusive content"
          ],
          cta: { text: "Start Listening", url: "/mcskwave/listeners" }
        },
        {
          id: "3",
          title: "For Rights Holders",
          description: "Manage your music catalog effectively. Monitor usage, collect royalties, and protect your intellectual property across digital platforms.",
          icon: "shield",
          benefits: [
            "Rights monitoring",
            "Transparent royalty tracking",
            "Usage analytics",
            "Copyright protection",
            "Licensing management"
          ],
          cta: { text: "Manage Rights", url: "/mcskwave/rights" }
        }
      ],
      testimonials: {
        title: "What Users Say",
        items: [
          {
            id: "1",
            quote: "MCSK Wave has transformed how I share my music and connect with fans. The royalty system is transparent and the platform is easy to use.",
            author: "David Muthami",
            role: "Recording Artist",
            image: "/images/testimonials/david.jpg"
          },
          {
            id: "2",
            quote: "As a music lover, I appreciate having a platform dedicated to Kenyan music. The discovery features help me find new artists I wouldn't have heard otherwise.",
            author: "Jane Wambui",
            role: "MCSK Wave Listener",
            image: "/images/testimonials/jane.jpg"
          },
          {
            id: "3",
            quote: "The rights management tools on MCSK Wave give me peace of mind knowing my music is protected while reaching a wider audience.",
            author: "Samuel Odhiambo",
            role: "Composer & Producer",
            image: "/images/testimonials/samuel.jpg"
          }
        ]
      },
      stats: [
        { id: "1", value: "10,000+", label: "Artists" },
        { id: "2", value: "50,000+", label: "Tracks" },
        { id: "3", value: "500,000+", label: "Monthly Listeners" },
        { id: "4", value: "2M+", label: "Streams per Month" }
      ],
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            id: "1",
            question: "How do I join MCSK Wave as an artist?",
            answer: "To join as an artist, create an account, verify your identity, and upload your music through our artist portal. MCSK members receive priority verification."
          },
          {
            id: "2",
            question: "How are royalties calculated and paid?",
            answer: "Royalties are calculated based on stream counts, listener engagement, and subscription revenue. Payments are made monthly to verified artists through our secure payment system."
          },
          {
            id: "3",
            question: "Is MCSK Wave available on mobile devices?",
            answer: "Yes, MCSK Wave is available as a mobile app for both Android and iOS devices. You can download it from the respective app stores."
          }
        ],
        cta: { text: "View All FAQs", url: "/mcskwave/faq" }
      },
      cta: {
        title: "Ready to Join MCSK Wave?",
        description: "Start streaming, sharing, and connecting with Kenya's vibrant music community today.",
        primaryButton: { text: "Sign Up Now", url: "/mcskwave/signup" },
        secondaryButton: { text: "Learn More", url: "/mcskwave/about" }
      }
    }
  }
}

export default async function McskWavePage() {
  const data = await getMcskWaveData()
  return <McskWaveContent initialData={data} />
}