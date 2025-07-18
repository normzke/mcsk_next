import { Metadata } from "next"
import DownloadsContent from "./components/downloads-content"

export const metadata: Metadata = {
  title: "MCSK Downloads | Music Copyright Forms & Documents",
  description: "Download essential MCSK forms and documents for licensing and membership",
  keywords: "MCSK forms, licensing application, membership application",
  openGraph: {
    title: "MCSK Downloads | Music Copyright Forms & Documents",
    description: "Download essential MCSK forms and documents for licensing and membership",
    url: "https://mcsk.or.ke/downloads",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCSK Downloads | Music Copyright Forms & Documents",
    description: "Download essential MCSK forms and documents for licensing and membership",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/downloads",
  },
}

async function getDownloadsData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/downloads`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch downloads data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching downloads data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      hero: {
        title: "Downloads & Resources",
        description: "Access and download essential MCSK forms, documents, and resources.",
        image: "/images/downloads/hero.jpg"
      },
      intro: {
        title: "Available Resources",
        content: "<p>Here you can find all the necessary forms and documents for MCSK membership, licensing, and other services. If you need assistance with any of these documents, please contact our support team.</p>"
      },
      categories: [
        {
          id: "1",
          name: "Membership Forms",
          description: "Forms required for MCSK membership application and management.",
          documents: [
            {
              id: "1",
              title: "Composer/Author Membership Application",
              description: "Application form for composers and songwriters.",
              fileType: "PDF",
              fileSize: "245 KB",
              downloadUrl: "/documents/membership/composer-application.pdf"
            },
            {
              id: "2",
              title: "Publisher Membership Application",
              description: "Application form for music publishers.",
              fileType: "PDF",
              fileSize: "260 KB",
              downloadUrl: "/documents/membership/publisher-application.pdf"
            },
            {
              id: "3",
              title: "Work Registration Form",
              description: "Form for registering musical works with MCSK.",
              fileType: "PDF",
              fileSize: "180 KB",
              downloadUrl: "/documents/membership/work-registration.pdf"
            }
          ]
        },
        {
          id: "2",
          name: "Licensing Documents",
          description: "Forms and documents related to music licensing and usage.",
          documents: [
            {
              id: "4",
              title: "Public Performance License Application",
              description: "Form for businesses requiring music licenses.",
              fileType: "PDF",
              fileSize: "210 KB",
              downloadUrl: "/documents/licensing/public-performance.pdf"
            },
            {
              id: "5",
              title: "Event License Application",
              description: "Form for one-time events featuring music.",
              fileType: "PDF",
              fileSize: "195 KB",
              downloadUrl: "/documents/licensing/event-license.pdf"
            },
            {
              id: "6",
              title: "Tariff Structure",
              description: "Current licensing fees for different categories.",
              fileType: "PDF",
              fileSize: "320 KB",
              downloadUrl: "/documents/licensing/tariff-structure.pdf"
            }
          ]
        },
        {
          id: "3",
          name: "Reports & Publications",
          description: "Annual reports, newsletters, and other MCSK publications.",
          documents: [
            {
              id: "7",
              title: "Annual Report 2023",
              description: "MCSK's annual financial and operational report.",
              fileType: "PDF",
              fileSize: "4.2 MB",
              downloadUrl: "/documents/reports/annual-report-2023.pdf"
            },
            {
              id: "8",
              title: "Quarterly Newsletter Q1 2024",
              description: "Latest news and updates from MCSK.",
              fileType: "PDF",
              fileSize: "1.8 MB",
              downloadUrl: "/documents/reports/newsletter-q1-2024.pdf"
            },
            {
              id: "9",
              title: "Distribution Report 2023",
              description: "Summary of royalty distributions for the year.",
              fileType: "PDF",
              fileSize: "2.5 MB",
              downloadUrl: "/documents/reports/distribution-2023.pdf"
            }
          ]
        }
      ],
      faqs: [
        {
          id: "1",
          question: "How do I submit completed forms?",
          answer: "Completed forms can be submitted in person at our offices, via email to forms@mcsk.or.ke, or through our online portal."
        },
        {
          id: "2",
          question: "Are these forms available in other formats?",
          answer: "Yes, you can request Word or editable PDF versions by contacting our support team."
        },
        {
          id: "3",
          question: "Do I need to print and sign the forms?",
          answer: "Yes, most forms require a physical signature. However, we also accept digital signatures for online submissions."
        }
      ]
    }
  }
}

export default async function DownloadsPage() {
  let downloadsData;
  try {
    downloadsData = await getDownloadsData();
  } catch (error) {
    console.error('Error in DownloadsPage:', error);
    // Use fallback data if API call fails
    downloadsData = {
      hero: {
        title: "Downloads & Resources",
        description: "Access and download essential MCSK forms, documents, and resources.",
        image: "/images/downloads/hero.jpg"
      },
      categories: [],
      help: {
        title: "Need Help?",
        description: "If you need assistance with downloads, please contact us",
        sections: []
      }
    };
  }
  return <DownloadsContent initialData={downloadsData} />
}