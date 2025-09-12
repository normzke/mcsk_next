import { Metadata } from "next"
import LeadershipContent from "./components/leadership-content"
import { LeadershipData } from "@/types/leadership"

export const metadata: Metadata = {
  title: "Board & Management | Music Copyright Society of Kenya",
  description: "Meet the dedicated leaders guiding MCSK's mission to protect and promote music rights in Kenya.",
  keywords: "MCSK leadership, board of directors, management team, music copyright leadership",
  openGraph: {
    title: "Board & Management | Music Copyright Society of Kenya",
    description: "Meet the dedicated leaders guiding MCSK's mission to protect and promote music rights in Kenya.",
    url: "https://mcsk.org/about/leadership",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Board & Management | Music Copyright Society of Kenya",
    description: "Meet the dedicated leaders guiding MCSK's mission to protect and promote music rights in Kenya.",
  },
  alternates: {
    canonical: "https://mcsk.org/about/leadership",
  },
}

async function getLeadershipData(): Promise<LeadershipData> {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/leadership`, {
      next: { revalidate: 60 }, // Cache for 1 minute for faster updates
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch leadership data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data as LeadershipData
    
  } catch (error) {
    console.error('Error fetching leadership data:', error)
    // Return empty data structure - no fallback hardcoded data
    return {
      hero: {
        title: "Our Leadership",
        description: "Meet the dedicated leaders guiding MCSK's mission to protect and promote music rights in Kenya.",
        image: "/images/team/leadership-hero.jpg"
      },
      boardMembers: [],
      managementTeam: [],
      commitment: {
        title: "Our Leadership Commitment",
        description: "MCSK's leadership team is committed to transparency, innovation, and excellence in serving our members and protecting music rights in Kenya.",
        values: []
      }
    }
  }
}

export default async function LeadershipPage() {
  let leadershipData: LeadershipData;
  try {
    leadershipData = await getLeadershipData();
  } catch (error) {
    console.error('Error in LeadershipPage:', error);
    // Return empty data structure - no fallback hardcoded data
    leadershipData = {
      hero: {
        title: "Our Leadership",
        description: "Meet the dedicated leaders guiding MCSK's mission to protect and promote music rights in Kenya.",
        image: "/images/team/leadership-hero.jpg"
      },
      boardMembers: [],
      managementTeam: [],
      commitment: {
        title: "Our Leadership Commitment",
        description: "MCSK's leadership team is committed to transparency, innovation, and excellence in serving our members and protecting music rights in Kenya.",
        values: []
      }
    };
  }
  return <LeadershipContent initialData={leadershipData} />
}
