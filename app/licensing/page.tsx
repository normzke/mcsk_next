import { Metadata } from "next"
import LicensingContent from "./components/licensing-content"
import { safeFetch, getBaseUrl } from '@/lib/api-utils'

// Add dynamic rendering to prevent static generation errors
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Licensing | Music Copyright Society of Kenya",
  description: "Learn about MCSK's music licensing services, fees, and application process for businesses and events.",
  keywords: "MCSK licensing, music license, copyright license, business license, event license, music rights",
  openGraph: {
    title: "Licensing | Music Copyright Society of Kenya",
    description: "Learn about MCSK's music licensing services, fees, and application process for businesses and events.",
    url: "https://mcsk.or.ke/licensing",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Licensing | Music Copyright Society of Kenya",
    description: "Learn about MCSK's music licensing services, fees, and application process for businesses and events.",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/licensing",
  },
}

async function getLicensingData() {
  // Define comprehensive fallback data that matches LicensingData interface
  const fallbackData = {
    hero: {
      title: "Music Licensing",
      description: "Obtain the right license for your business or event to legally use music.",
      image: "/images/licensing/hero.jpg"
    },
    benefits: [
      {
        title: "Legal Compliance",
        description: "Stay compliant with copyright laws and avoid legal penalties",
        icon: "shield"
      },
      {
        title: "Support Artists",
        description: "Ensure music creators receive fair compensation for their work",
        icon: "music"
      },
      {
        title: "Business Protection",
        description: "Protect your business from copyright infringement claims",
        icon: "building"
      }
    ],
    categories: [
      {
        id: "1",
        name: "Business Licenses",
        description: "Licenses for businesses that play music on their premises."
      },
      {
        id: "2",
        name: "Event Licenses",
        description: "One-time licenses for events featuring music."
      }
    ],
    licenses: [
      {
        id: "1",
        title: "Retail License",
        description: "For shops, malls, and retail spaces",
        category: "business",
        price: 10000,
        duration: "1 year",
        requirements: ["Business registration", "Premises details"],
        benefits: ["Legal music usage", "Support for artists"],
        applicationProcess: ["Complete form", "Submit documents", "Pay fee"],
        documents: [{
          name: "Application Form",
          url: "/documents/retail-license-form.pdf"
        }]
      },
      {
        id: "2",
        title: "Event License",
        description: "For concerts, performances and private events",
        category: "event",
        price: 5000,
        duration: "per event",
        requirements: ["Event details", "Venue information"],
        benefits: ["Legal music performance", "Support for artists"],
        applicationProcess: ["Complete form", "Submit event details", "Pay fee"],
        documents: [{
          name: "Event License Form",
          url: "/documents/event-license-form.pdf"
        }]
      }
    ],
    faqs: [
      {
        question: "Do I need a license to play music in my business?",
        answer: "Yes, any business that plays music publicly requires a license from MCSK."
      },
      {
        question: "How much does a music license cost?",
        answer: "License fees vary based on the type of business, venue size, and how music is used."
      },
      {
        question: "How long is a license valid?",
        answer: "Business licenses are typically valid for one year, while event licenses cover specific events."
      }
    ],
    process: {
      title: "Licensing Process",
      description: "Our streamlined process for obtaining a music license",
      steps: [
        { title: "Application", description: "Submit your application form" },
        { title: "Review", description: "We review your application" },
        { title: "Payment", description: "Pay the applicable license fee" },
        { title: "Issuance", description: "Receive your license certificate" }
      ]
    }
  }
  
  // Use the safeFetch utility with timeout and fallback
  return await safeFetch(
    `${getBaseUrl()}/api/licensing`,
    { next: { revalidate: 3600 } }, // Cache for 1 hour
    fallbackData
  )
}

export default async function LicensingPage() {
  let licensingData;
  try {
    licensingData = await getLicensingData();
  } catch (error) {
    console.error('Error in LicensingPage:', error);
    // Use fallback data if API call fails - ensure it matches LicensingData interface
    licensingData = {
      hero: {
        title: "Music Licensing",
        description: "Obtain the right license for your business or event to legally use music.",
        image: "/images/licensing/hero.jpg"
      },
      benefits: [],
      categories: [],
      licenses: [],
      faqs: [],
      process: {
        title: "Licensing Process",
        description: "Our streamlined process for obtaining a music license",
        steps: [
          { title: "Application", description: "Submit your application form" },
          { title: "Review", description: "We review your application" }
        ]
      }
    };
  }
  return <LicensingContent initialData={licensingData} />
}