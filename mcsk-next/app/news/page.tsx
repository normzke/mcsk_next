import { Metadata } from "next"
import NewsContent from "./components/news-content"

export const metadata: Metadata = {
  title: "News & Updates | Music Copyright Society of Kenya",
  description: "Stay informed with the latest news, updates, and announcements from MCSK.",
  keywords: "MCSK news, music industry news, copyright updates, announcements, press releases",
  openGraph: {
    title: "News & Updates - Music Copyright Society of Kenya | MCSK",
    description: "Latest news, announcements, and updates about music copyright and licensing",
    url: "https://mcsk.or.ke/news",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News & Updates - Music Copyright Society of Kenya | MCSK",
    description: "Latest news, announcements, and updates about music copyright and licensing",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/news",
  },
}

async function getNewsData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/news`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch news data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching news data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      featured: {
        id: '1',
        title: 'MCSK Partners with Global Rights Organizations',
        excerpt: 'New international partnerships expand opportunities for Kenyan musicians.',
        image: '/images/news/partnership.jpg',
        date: '2024-02-20',
        slug: 'mcsk-global-partnerships',
        author: 'MCSK Communications Team',
        category: 'Partnerships'
      },
      articles: [
        {
          id: '2',
          title: 'Music Industry Workshop Series',
          excerpt: 'Free workshops for members on music business and copyright.',
          image: '/images/news/workshop.jpg',
          date: '2024-02-15',
          slug: 'music-industry-workshops',
          author: 'MCSK Events Team',
          category: 'Education'
        },
        {
          id: '3',
          title: 'Copyright Law Updates',
          excerpt: 'Important changes to Kenyan copyright law affecting musicians.',
          image: '/images/news/copyright.jpg',
          date: '2024-02-10',
          slug: 'copyright-law-updates',
          author: 'MCSK Legal Team',
          category: 'Legal'
        }
      ],
      categories: [
        { id: '1', name: 'Partnerships', count: 5 },
        { id: '2', name: 'Education', count: 8 },
        { id: '3', name: 'Legal', count: 6 },
        { id: '4', name: 'Governance', count: 4 },
        { id: '5', name: 'Events', count: 7 }
      ]
    }
  }
}

export default async function NewsPage() {
  let newsData;
  try {
    newsData = await getNewsData();
  } catch (error) {
    console.error('Error in NewsPage:', error);
    // Use fallback data if API call fails
    newsData = {
      featured: {
        id: '1',
        title: 'MCSK Partners with Global Rights Organizations',
        excerpt: 'New international partnerships expand opportunities for Kenyan musicians.',
        image: '/images/news/partnership.jpg',
        date: '2024-02-20',
        slug: 'mcsk-global-partnerships',
        author: 'MCSK Communications Team',
        category: 'Partnerships'
      },
      categories: ['Partnerships', 'Events', 'Announcements', 'Industry News'],
      articles: []
    };
  }
  return <NewsContent initialData={newsData} />
}