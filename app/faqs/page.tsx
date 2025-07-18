import { Metadata } from "next"
import FaqsContent from "./components/faqs-content"

export const metadata: Metadata = {
  title: "MCSK FAQs | Music Copyright & Royalties in Kenya",
  description: "Frequently asked questions about MCSK membership, royalties collection, and licensing",
  keywords: "MCSK membership, music royalties Kenya, royalty collection",
  openGraph: {
    title: "MCSK FAQs | Music Copyright & Royalties in Kenya",
    description: "Frequently asked questions about MCSK membership, royalties collection, and licensing",
    url: "https://mcsk.or.ke/faqs",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCSK FAQs | Music Copyright & Royalties in Kenya",
    description: "Frequently asked questions about MCSK membership, royalties collection, and licensing",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/faqs",
  },
}

async function getFaqsData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/faqs`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch FAQs data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching FAQs data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      hero: {
        title: "Frequently Asked Questions",
        description: "Find answers to common questions about MCSK, music copyright, and royalties.",
        image: "/images/faqs/hero.jpg"
      },
      categories: [
        {
          id: "1",
          name: "Membership",
          faqs: [
            {
              id: "1",
              question: "How do I become a member of MCSK?",
              answer: "To become a member, you need to complete an application form, provide required documentation (ID, photos, proof of work), and pay the registration fee. Visit our Membership page for detailed information."
            },
            {
              id: "2",
              question: "What are the benefits of MCSK membership?",
              answer: "Benefits include royalty collection and distribution, legal protection for your works, access to international copyright networks, and professional development opportunities."
            },
            {
              id: "3",
              question: "How much does membership cost?",
              answer: "The standard membership fee is KES 2,500 for composers and authors, and KES 5,000 for publishers. This is a one-time registration fee."
            }
          ]
        },
        {
          id: "2",
          name: "Royalties",
          faqs: [
            {
              id: "4",
              question: "How are royalties calculated?",
              answer: "Royalties are calculated based on usage reports from various platforms, including radio, TV, streaming services, and public performances. The distribution formula takes into account the frequency and context of use."
            },
            {
              id: "5",
              question: "When are royalties distributed?",
              answer: "MCSK distributes royalties on a quarterly basis. The specific dates are announced to members in advance through our communication channels."
            },
            {
              id: "6",
              question: "Can I track my royalty earnings?",
              answer: "Yes, members can access their royalty statements through our online portal or by visiting our offices. The statements provide a breakdown of earnings by source."
            }
          ]
        },
        {
          id: "3",
          name: "Licensing",
          faqs: [
            {
              id: "7",
              question: "Who needs a music license?",
              answer: "Any business or event that plays or performs music publicly requires a license. This includes restaurants, shops, hotels, radio stations, TV broadcasters, and event organizers."
            },
            {
              id: "8",
              question: "How do I apply for a music license?",
              answer: "You can apply for a license through our website, by visiting our offices, or by contacting our licensing department. The process involves completing an application form and paying the applicable fee."
            },
            {
              id: "9",
              question: "What happens if I don't obtain a license?",
              answer: "Playing music without a license constitutes copyright infringement, which can result in legal action, including fines and penalties. It's always best to ensure you have proper licensing in place."
            }
          ]
        }
      ],
      contact: {
        title: "Still Have Questions?",
        description: "If you couldn't find the answer to your question, please contact our support team.",
        email: "info@mcsk.or.ke",
        phone: "+254 20 2535988/9",
        hours: "Monday to Friday, 8:00 AM to 5:00 PM"
      },
      support: {
        title: "Need More Help?",
        description: "Our support team is ready to assist you with any further questions.",
        contact: {
          email: "support@mcsk.or.ke",
          phone: "+254 20 2535988",
          hours: "Mon-Fri, 9 AM - 5 PM EAT"
        },
        links: [
          { title: "Contact Form", description: "Submit your inquiry through our online form.", url: "/contact" },
          { title: "Visit Our Offices", description: "Find directions to our physical location.", url: "/contact#location" }
        ]
      }
    }
  }
}

export default async function FaqsPage() {
  const data = await getFaqsData()
  return <FaqsContent initialData={data} />
}