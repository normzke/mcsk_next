import { Metadata } from "next"
import CopyrightLawContent from "./components/copyright-law-content"

export const metadata: Metadata = {
  title: "Music Copyright Law in Kenya | MCSK Copyright Protection",
  description: "Learn about music copyright law in Kenya, rights protection, and how MCSK helps protect intellectual property rights",
  keywords: "music copyright law Kenya, music rights protection, copyright registration",
  openGraph: {
    title: "Music Copyright Law in Kenya | MCSK Copyright Protection",
    description: "Learn about music copyright law in Kenya, rights protection, and how MCSK helps protect intellectual property rights",
    url: "https://mcsk.or.ke/copyright-law",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Music Copyright Law in Kenya | MCSK Copyright Protection",
    description: "Learn about music copyright law in Kenya, rights protection, and how MCSK helps protect intellectual property rights",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/copyright-law",
  },
}

async function getCopyrightLawData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/copyright-law`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch copyright law data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching copyright law data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      hero: {
        title: "Music Copyright Law in Kenya",
        description: "Understanding your rights and protections as a music creator.",
        image: "/images/copyright-law/hero.jpg"
      },
      intro: {
        title: "What is Copyright?",
        content: "<p>Copyright is a legal right that grants the creator of an original work exclusive rights for its use and distribution. In Kenya, copyright protection is automatic upon creation of an original work in a tangible form.</p><p>For musical works, copyright protects both the composition (melody, harmony, and lyrics) and the sound recording (the specific recorded performance of the composition).</p>"
      },
      overview: {
        title: "Overview of Music Copyright",
        description: "Learn the basics of music copyright in Kenya and how it affects you as a creator.",
        keyPoints: [
          "Automatic protection upon creation",
          "Grants exclusive rights (reproduction, distribution, performance, etc.)",
          "Governed by the Copyright Act of Kenya (Cap. 130)",
          "Duration typically life of author plus 50 years"
        ]
      },
      sections: [
        {
          id: "1",
          title: "Kenya Copyright Act",
          content: "<p>The Copyright Act of Kenya (Cap. 130) is the primary legislation governing copyright protection in the country. It provides legal protection for various works including musical compositions, sound recordings, and performances.</p><p>The Act grants copyright owners exclusive rights to:</p><ul><li>Reproduce the work</li><li>Distribute copies to the public</li><li>Perform the work publicly</li><li>Make adaptations or arrangements of the work</li><li>Broadcast the work</li></ul><p>These rights are protected for the life of the author plus 50 years after their death.</p>"
        },
        {
          id: "2",
          title: "Copyright Registration",
          content: "<p>While copyright protection is automatic in Kenya, registering your works with the Kenya Copyright Board (KECOBO) provides additional benefits:</p><ul><li>Public record of your copyright ownership</li><li>Certificate of registration as evidence in court</li><li>Ability to seek statutory damages and attorney's fees</li></ul><p>MCSK works closely with KECOBO to help our members register their works and ensure proper documentation of their rights.</p>"
        },
        {
          id: "3",
          title: "Copyright Infringement",
          content: "<p>Copyright infringement occurs when someone uses copyrighted material without permission. Common forms of music copyright infringement include:</p><ul><li>Unauthorized reproduction or distribution</li><li>Public performance without a license</li><li>Creating derivative works without permission</li><li>Sampling without clearance</li><li>Streaming or broadcasting without proper licensing</li></ul><p>MCSK actively monitors for infringement of our members' works and takes appropriate action to protect their rights.</p>"
        }
      ],
      resources: {
        title: "Copyright Resources",
        categories: [
          {
            id: "1",
            name: "Legal Documents",
            items: [
              { id: "1", title: "Kenya Copyright Act", url: "/documents/copyright-act.pdf" },
              { id: "2", title: "Copyright Registration Form", url: "/documents/registration-form.pdf" },
              { id: "3", title: "MCSK Membership Agreement", url: "/documents/membership-agreement.pdf" }
            ]
          },
          {
            id: "2",
            name: "Guides & Information",
            items: [
              { id: "4", title: "Copyright Protection Guide", url: "/documents/protection-guide.pdf" },
              { id: "5", title: "Understanding Music Rights", url: "/documents/music-rights.pdf" },
              { id: "6", title: "Digital Rights Management", url: "/documents/digital-rights.pdf" }
            ]
          }
        ]
      },
      faqs: [
        {
          id: "1",
          question: "How long does copyright protection last in Kenya?",
          answer: "For musical works, copyright protection lasts for the life of the author plus 50 years after their death."
        },
        {
          id: "2",
          question: "Do I need to register my songs to have copyright protection?",
          answer: "No, copyright protection is automatic upon creation of your work. However, registration provides additional benefits and evidence of ownership."
        },
        {
          id: "3",
          question: "What should I do if someone infringes on my copyright?",
          answer: "Contact MCSK immediately. As a member, we can help you take appropriate legal action to protect your rights and seek compensation."
        }
      ]
    }
  }
}

export default async function CopyrightLawPage() {
  const data = await getCopyrightLawData()
  return <CopyrightLawContent initialData={data} />
}