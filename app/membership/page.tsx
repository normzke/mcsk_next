import { Metadata } from "next"
import MembershipContent from "./components/membership-content"

export const metadata: Metadata = {
  title: "Membership | Music Copyright Society of Kenya",
  description: "Join MCSK as a member. Learn about membership benefits, requirements, and application process.",
  keywords: "MCSK membership, music rights membership, copyright membership, royalty collection, member benefits",
  openGraph: {
    title: "Membership | Music Copyright Society of Kenya",
    description: "Join MCSK as a member. Learn about membership benefits, requirements, and application process.",
    url: "https://mcsk.or.ke/membership",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Membership | Music Copyright Society of Kenya",
    description: "Join MCSK as a member. Learn about membership benefits, requirements, and application process.",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/membership",
  },
}

async function getMembershipData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/membership`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch membership data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching membership data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      hero: {
        title: "MCSK Membership",
        description: "Join Kenya's premier music copyright organization and protect your creative works.",
        image: "/images/membership/hero.jpg"
      },
      intro: {
        title: "Why Join MCSK?",
        content: "<p>As a member of MCSK, you gain access to comprehensive protection for your musical works and ensure you receive fair compensation when your music is used commercially.</p><p>Our collective management approach gives you greater leverage in the music industry and provides a reliable stream of royalty income.</p>"
      },
      benefits: {
        title: "Membership Benefits",
        items: [
          {
            id: "1",
            title: "Royalty Collection",
            description: "We collect royalties from various sources including radio, TV, streaming platforms, and public performances.",
            icon: "cash"
          },
          {
            id: "2",
            title: "Legal Protection",
            description: "We provide legal support and representation in copyright disputes and infringement cases.",
            icon: "shield"
          },
          {
            id: "3",
            title: "International Network",
            description: "Access to international copyright networks through our partnerships with organizations worldwide.",
            icon: "globe"
          },
          {
            id: "4",
            title: "Professional Development",
            description: "Access to workshops, training, and networking opportunities to enhance your music career.",
            icon: "graduation-cap"
          }
        ]
      },
      categories: [
        {
          id: "1",
          name: "Composer Membership",
          description: "For creators of musical compositions.",
          requirements: [
            "Proof of musical work creation",
            "National ID or passport",
            "Two passport photos",
            "Application fee payment"
          ],
          fee: "KES 2,500 one-time registration fee"
        },
        {
          id: "2",
          name: "Author Membership",
          description: "For lyricists and songwriters.",
          requirements: [
            "Proof of lyrical work creation",
            "National ID or passport",
            "Two passport photos",
            "Application fee payment"
          ],
          fee: "KES 2,500 one-time registration fee"
        },
        {
          id: "3",
          name: "Publisher Membership",
          description: "For music publishing companies.",
          requirements: [
            "Company registration documents",
            "List of represented works",
            "Director identification",
            "Application fee payment"
          ],
          fee: "KES 5,000 one-time registration fee"
        }
      ],
      application: {
        title: "How to Apply",
        steps: [
          { id: "1", title: "Complete Application Form", description: "Fill out our membership application form with your details." },
          { id: "2", title: "Submit Required Documents", description: "Provide necessary documentation for verification." },
          { id: "3", title: "Pay Registration Fee", description: "Make payment through our secure payment channels." },
          { id: "4", title: "Membership Approval", description: "Your application will be reviewed and approved by our board." }
        ],
        cta: { text: "Apply Now", url: "/membership/apply" }
      },
      faqs: [
        {
          id: "1",
          question: "How long does the application process take?",
          answer: "The standard processing time is 30 days from submission of all required documents and payment."
        },
        {
          id: "2",
          question: "How are royalties calculated and distributed?",
          answer: "Royalties are calculated based on usage reports from various platforms and distributed quarterly to members."
        },
        {
          id: "3",
          question: "Can I be a member of multiple copyright organizations?",
          answer: "Yes, but you must declare this during registration as it affects how your royalties are managed."
        }
      ]
    }
  }
}

export default async function MembershipPage() {
  const data = await getMembershipData()
  return <MembershipContent initialData={data} />
} 