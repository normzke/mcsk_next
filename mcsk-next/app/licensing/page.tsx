import { Metadata } from "next"
import LicensingContent from "./components/licensing-content"

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
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/licensing`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch licensing data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching licensing data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      hero: {
        title: "Music Licensing",
        description: "Obtain the right license for your business or event to legally use music.",
        image: "/images/licensing/hero.jpg"
      },
      intro: {
        title: "Why License Music?",
        content: "<p>Music licensing is a legal requirement for businesses and events that play or perform music publicly. By obtaining a license from MCSK, you ensure that music creators receive fair compensation for the use of their works.</p><p>Failure to obtain proper licensing may result in legal consequences, including fines and penalties.</p>"
      },
      categories: [
        {
          id: "1",
          name: "Business Licenses",
          description: "Licenses for businesses that play music on their premises.",
          types: [
            {
              id: "1",
              name: "Retail Establishments",
              description: "For shops, malls, and retail spaces.",
              fee: "From KES 10,000 per year",
              requirements: ["Business registration", "Premises details", "Music usage information"]
            },
            {
              id: "2",
              name: "Hospitality Venues",
              description: "For hotels, restaurants, and cafes.",
              fee: "From KES 15,000 per year",
              requirements: ["Business registration", "Venue capacity", "Music usage information"]
            }
          ]
        },
        {
          id: "2",
          name: "Event Licenses",
          description: "One-time licenses for events featuring music.",
          types: [
            {
              id: "3",
              name: "Concerts & Performances",
              description: "For live music events and concerts.",
              fee: "From KES 20,000 per event",
              requirements: ["Event details", "Venue capacity", "Performer information"]
            },
            {
              id: "4",
              name: "Private Events",
              description: "For weddings, parties, and corporate events.",
              fee: "From KES 5,000 per event",
              requirements: ["Event details", "Venue information", "Attendance numbers"]
            }
          ]
        }
      ],
      application: {
        title: "How to Apply",
        steps: [
          { id: "1", title: "Complete Application Form", description: "Fill out our online application form with your details." },
          { id: "2", title: "Submit Required Documents", description: "Provide necessary documentation for verification." },
          { id: "3", title: "Pay License Fee", description: "Make payment through our secure payment channels." },
          { id: "4", title: "Receive License Certificate", description: "Your license will be issued upon successful processing." }
        ],
        cta: { text: "Apply Now", url: "/licensing/apply" }
      },
      faqs: [
        {
          id: "1",
          question: "Do I need a license to play music in my business?",
          answer: "Yes, any business that plays music publicly requires a license from MCSK."
        },
        {
          id: "2",
          question: "How much does a music license cost?",
          answer: "License fees vary based on the type of business, venue size, and how music is used. Contact us for a specific quote."
        },
        {
          id: "3",
          question: "How long is a license valid?",
          answer: "Business licenses are typically valid for one year, while event licenses cover the duration of the specific event."
        }
      ]
    }
  }
}

export default async function LicensingPage() {
  let licensingData;
  try {
    licensingData = await getLicensingData();
  } catch (error) {
    console.error('Error in LicensingPage:', error);
    // Use fallback data if API call fails
    licensingData = {
      hero: {
        title: "Music Licensing",
        description: "Obtain the right license for your business or event to legally use music.",
        image: "/images/licensing/hero.jpg"
      },
      intro: {
        title: "Why License Music?",
        content: "<p>Music licensing is a legal requirement for businesses and events that play or perform music publicly. By obtaining a license from MCSK, you ensure that music creators receive fair compensation for the use of their works.</p><p>Failure to obtain proper licensing may result in legal consequences, including fines and penalties.</p>"
      },
      licenseTypes: [],
      process: {
        title: "Licensing Process",
        steps: []
      },
      faqs: []
    };
  }
  return <LicensingContent initialData={licensingData} />
}