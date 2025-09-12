import { Metadata } from "next"
import MemberApplicationForm from "./components/member-application-form"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Apply for Membership | Music Copyright Society of Kenya",
  description: "Apply to become a member of MCSK. Complete your application form and start your journey in music rights protection.",
  keywords: "MCSK membership application, music rights membership, copyright membership application",
  openGraph: {
    title: "Apply for Membership | Music Copyright Society of Kenya",
    description: "Apply to become a member of MCSK. Complete your application form and start your journey in music rights protection.",
    url: "https://mcsk.org/membership/apply",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply for Membership | Music Copyright Society of Kenya",
    description: "Apply to become a member of MCSK. Complete your application form and start your journey in music rights protection.",
  },
  alternates: {
    canonical: "https://mcsk.org/membership/apply",
  },
}

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Apply for MCSK Membership
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join Kenya's premier music copyright organization and protect your creative works. 
              Complete the application form below to start your membership journey.
            </p>
          </div>
          
          <MemberApplicationForm />
        </div>
      </div>
    </div>
  )
} 