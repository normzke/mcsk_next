import { Metadata } from "next"
import LeadershipContent from "./components/leadership-content"

export const metadata: Metadata = {
  title: "Board & Management | Music Copyright Society of Kenya",
  description: "Meet the dedicated leaders guiding MCSK's mission to protect and promote music rights in Kenya.",
  keywords: "MCSK leadership, board of directors, management team, music copyright leadership",
  openGraph: {
    title: "Board & Management | Music Copyright Society of Kenya",
    description: "Meet the dedicated leaders guiding MCSK's mission to protect and promote music rights in Kenya.",
    url: "https://mcsk.or.ke/about/leadership",
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
    canonical: "https://mcsk.or.ke/about/leadership",
  },
}

async function getLeadershipData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/leadership`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch leadership data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching leadership data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      boardMembers: [
        {
          name: "Dr. James Mwangi",
          position: "Chairperson",
          image: "/images/team/chairperson.jpg",
          bio: "Dr. James Mwangi is a renowned music producer and advocate for artists' rights with over 20 years of experience in the music industry.",
          expertise: ["Strategic Leadership", "Music Production", "Artists' Rights"],
          contact: {
            email: "chairman@mcsk.or.ke",
            linkedin: "https://linkedin.com/in/james-mwangi"
          }
        },
        {
          name: "Sarah Wangari",
          position: "Vice Chairperson",
          image: "/images/team/vice-chair.jpg",
          bio: "Sarah Wangari is an accomplished musician and lawyer specializing in intellectual property rights.",
          expertise: ["Intellectual Property", "Legal Affairs", "Music Industry"],
          contact: {
            email: "vice.chairman@mcsk.or.ke",
            linkedin: "https://linkedin.com/in/sarah-wangari"
          }
        },
        {
          name: "John Kamau",
          position: "Treasurer",
          image: "/images/team/treasurer.jpg",
          bio: "John Kamau brings over 15 years of financial management experience to the MCSK board.",
          expertise: ["Financial Management", "Audit", "Risk Management"],
          contact: {
            email: "treasurer@mcsk.or.ke",
            linkedin: "https://linkedin.com/in/john-kamau"
          }
        },
        {
          name: "Elizabeth Otieno",
          position: "Secretary",
          image: "/images/team/secretary.jpg",
          bio: "Elizabeth Otieno is a veteran in the music industry with expertise in copyright administration.",
          expertise: ["Copyright Administration", "Industry Relations", "Board Governance"],
          contact: {
            email: "secretary@mcsk.or.ke",
            linkedin: "https://linkedin.com/in/elizabeth-otieno"
          }
        }
      ],
      managementTeam: [
        {
          name: "Michael Onyango",
          position: "Chief Executive Officer",
          image: "/images/team/ceo.jpg",
          bio: "Michael Onyango leads MCSK with a vision to transform music rights management in Kenya. He has over 15 years of experience in the music and entertainment industry.",
          expertise: ["Executive Leadership", "Strategic Planning", "Industry Relations"],
          contact: {
            email: "ceo@mcsk.or.ke",
            phone: "+254 20 2535988 Ext. 100",
            linkedin: "https://linkedin.com/in/michael-onyango"
          }
        },
        {
          name: "Jane Muthoni",
          position: "Chief Operations Officer",
          image: "/images/team/coo.jpg",
          bio: "Jane Muthoni oversees the day-to-day operations of MCSK, ensuring efficient service delivery to members.",
          expertise: ["Operations Management", "Process Optimization", "Service Delivery"],
          contact: {
            email: "coo@mcsk.or.ke",
            phone: "+254 20 2535988 Ext. 101",
            linkedin: "https://linkedin.com/in/jane-muthoni"
          }
        },
        {
          name: "Peter Njoroge",
          position: "Chief Financial Officer",
          image: "/images/team/cfo.jpg",
          bio: "Peter Njoroge manages MCSK's financial operations, ensuring transparency and accountability in royalty collection and distribution.",
          expertise: ["Financial Planning", "Royalty Management", "Compliance"],
          contact: {
            email: "cfo@mcsk.or.ke",
            phone: "+254 20 2535988 Ext. 102",
            linkedin: "https://linkedin.com/in/peter-njoroge"
          }
        },
        {
          name: "Grace Kimani",
          position: "Head of Legal Affairs",
          image: "/images/team/legal.jpg",
          bio: "Grace Kimani leads MCSK's legal team, handling copyright enforcement and legal representation for members.",
          expertise: ["Copyright Law", "Legal Compliance", "Rights Protection"],
          contact: {
            email: "legal@mcsk.or.ke",
            phone: "+254 20 2535988 Ext. 103",
            linkedin: "https://linkedin.com/in/grace-kimani"
          }
        },
        {
          name: "Samuel Odhiambo",
          position: "Head of Licensing",
          image: "/images/team/licensing.jpg",
          bio: "Samuel Odhiambo manages MCSK's licensing operations, working with businesses to ensure proper music licensing.",
          expertise: ["Licensing Operations", "Business Relations", "Compliance"],
          contact: {
            email: "licensing@mcsk.or.ke",
            phone: "+254 20 2535988 Ext. 104",
            linkedin: "https://linkedin.com/in/samuel-odhiambo"
          }
        }
      ],
      commitment: {
        title: "Our Leadership Commitment",
        description: "MCSK's leadership team is committed to transparency, innovation, and excellence in serving our members and protecting music rights in Kenya.",
        values: [
          {
            title: "Transparency",
            description: "We maintain open communication and accountability in all our operations."
          },
          {
            title: "Innovation",
            description: "We embrace digital solutions to better serve our members."
          },
          {
            title: "Excellence",
            description: "We strive for the highest standards in rights management."
          }
        ]
      }
    }
  }
}

export default async function LeadershipPage() {
  let leadershipData;
  try {
    leadershipData = await getLeadershipData();
  } catch (error) {
    console.error('Error in LeadershipPage:', error);
    // Use fallback data if API call fails
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
