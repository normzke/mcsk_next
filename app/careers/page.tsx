import { Metadata } from "next"
import CareersContent from "./components/careers-content"

export const metadata: Metadata = {
  title: "Careers | Music Copyright Society of Kenya",
  description: "Join our team at MCSK and help shape the future of music rights management in Kenya.",
  keywords: "MCSK careers, music jobs, copyright jobs, employment, music industry careers",
  openGraph: {
    title: "Careers | Music Copyright Society of Kenya",
    description: "Join our team at MCSK and help shape the future of music rights management in Kenya.",
    url: "https://mcsk.or.ke/careers",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Music Copyright Society of Kenya",
    description: "Join our team at MCSK and help shape the future of music rights management in Kenya.",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/careers",
  },
}

async function getCareersData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/careers`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch careers data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching careers data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      hero: {
        title: "Careers at MCSK",
        description: "Join us in shaping the future of music rights management in Kenya.",
        image: "/images/careers-hero.jpg"
      },
      values: {
        title: "Our Values",
        description: "At MCSK, we are guided by these core values that define our culture and work environment.",
        items: [
          {
            id: "1",
            title: "Integrity",
            description: "We uphold the highest ethical standards in all our operations and interactions with members, partners, and the public."
          },
          {
            id: "2",
            title: "Innovation",
            description: "We embrace creative solutions and new technologies to improve our services and adapt to the evolving music industry."
          },
          {
            id: "3",
            title: "Excellence",
            description: "We strive for excellence in everything we do, from member services to rights management and distribution."
          }
        ]
      },
      jobs: [
        {
          id: "1",
          title: "Licensing Officer",
          department: "Licensing",
          location: "Nairobi",
          type: "full-time",
          experience: "3-5 years",
          description: "We are seeking a dedicated Licensing Officer to join our team and help manage music licensing operations.",
          responsibilities: [
            "Process and review music licensing applications",
            "Conduct compliance checks and audits",
            "Liaise with businesses and establishments",
            "Maintain accurate licensing records",
            "Generate reports on licensing activities"
          ],
          requirements: [
            "Bachelor's degree in Business, Law, or related field",
            "3-5 years experience in licensing or copyright management",
            "Strong understanding of copyright law",
            "Excellent communication and negotiation skills",
            "Proficiency in MS Office and database management"
          ],
          benefits: [
            "Competitive salary package",
            "Health insurance",
            "Professional development opportunities",
            "Performance bonuses",
            "Flexible working hours"
          ],
          deadline: "2024-05-15"
        },
        {
          id: "2",
          title: "Digital Rights Manager",
          department: "Rights Management",
          location: "Nairobi",
          type: "full-time",
          experience: "5+ years",
          description: "Looking for an experienced Digital Rights Manager to oversee our digital music rights and streaming platforms.",
          responsibilities: [
            "Manage digital rights and streaming partnerships",
            "Monitor digital usage and revenue",
            "Implement digital rights strategies",
            "Negotiate digital licensing agreements",
            "Ensure accurate digital royalty distribution"
          ],
          requirements: [
            "Bachelor's degree in Music Business, Technology, or related field",
            "5+ years experience in digital rights management",
            "Strong knowledge of music streaming platforms",
            "Experience with rights management systems",
            "Excellent analytical and problem-solving skills"
          ],
          benefits: [
            "Competitive salary package",
            "Health and life insurance",
            "Professional development budget",
            "Annual performance bonus",
            "Remote work options"
          ],
          deadline: "2024-05-30"
        }
      ],
      benefits: {
        title: "Benefits & Perks",
        categories: [
          {
            id: "1",
            name: "Health & Wellness",
            items: [
              "Comprehensive medical cover",
              "Life insurance",
              "Wellness programs",
              "Mental health support"
            ]
          },
          {
            id: "2",
            name: "Professional Growth",
            items: [
              "Training programs",
              "Conference attendance",
              "Certification support",
              "Career development"
            ]
          },
          {
            id: "3",
            name: "Work-Life Balance",
            items: [
              "Flexible hours",
              "Remote work options",
              "Paid time off",
              "Parental leave"
            ]
          },
          {
            id: "4",
            name: "Additional Benefits",
            items: [
              "Performance bonuses",
              "Transport allowance",
              "Phone allowance",
              "Team building events"
            ]
          }
        ]
      }
    }
  }
}

export default async function CareersPage() {
  const data = await getCareersData()
  return <CareersContent initialData={data} />
}
