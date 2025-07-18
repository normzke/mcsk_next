import { Metadata } from "next"
import TermsContent from "./components/terms-content"

export const metadata: Metadata = {
  title: "Terms of Service | Music Copyright Society of Kenya",
  description: "Read MCSK's terms of service, user agreements, and legal policies for music copyright management.",
  keywords: "MCSK terms, terms of service, user agreement, legal terms, copyright policy",
  openGraph: {
    title: "Terms of Service | Music Copyright Society of Kenya",
    description: "Read MCSK's terms of service, user agreements, and legal policies for music copyright management.",
    url: "https://mcsk.or.ke/terms",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Music Copyright Society of Kenya",
    description: "Read MCSK's terms of service, user agreements, and legal policies for music copyright management.",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/terms",
  },
}

async function getTermsData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/terms`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch terms data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching terms data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      hero: {
        title: "Terms of Service",
        description: "Please read these terms carefully before using our services.",
        image: "/images/terms/hero.jpg",
        lastUpdated: "2024-01-15"
      },
      intro: {
        content: "<p>Welcome to the Music Copyright Society of Kenya (MCSK). By accessing or using our website, services, or applications, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.</p>"
      },
      sections: [
        {
          id: "1",
          title: "Definitions",
          content: "<p>For the purposes of these Terms of Service:</p><ul><li><strong>MCSK</strong> refers to the Music Copyright Society of Kenya.</li><li><strong>Services</strong> refers to the website, applications, and services provided by MCSK.</li><li><strong>User</strong> refers to the individual accessing or using our Services.</li><li><strong>Member</strong> refers to a registered rights holder with MCSK.</li><li><strong>Content</strong> refers to information, data, text, music, sound, photographs, graphics, video, messages, or other materials.</li></ul>"
        },
        {
          id: "2",
          title: "Use of Services",
          content: "<p>Our Services are intended for users who are at least 18 years old. By using our Services, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these terms.</p><p>You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to use our Services:</p><ul><li>In any way that violates any applicable national or international law or regulation.</li><li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services.</li><li>To attempt to gain unauthorized access to any portion of the Services or any other systems or networks connected to the Services.</li><li>To harvest or collect email addresses or other contact information of other users from the Services by electronic or other means.</li></ul>"
        },
        {
          id: "3",
          title: "Intellectual Property",
          content: "<p>The Services and their original content, features, and functionality are and will remain the exclusive property of MCSK and its licensors. The Services are protected by copyright, trademark, and other laws of both Kenya and foreign countries.</p><p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of MCSK.</p>"
        },
        {
          id: "4",
          title: "User Accounts",
          content: "<p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Services.</p><p>You are responsible for safeguarding the password that you use to access the Services and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>"
        },
        {
          id: "5",
          title: "Limitation of Liability",
          content: "<p>In no event shall MCSK, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p><ul><li>Your access to or use of or inability to access or use the Services.</li><li>Any conduct or content of any third party on the Services.</li><li>Any content obtained from the Services.</li><li>Unauthorized access, use, or alteration of your transmissions or content.</li></ul>"
        },
        {
          id: "6",
          title: "Changes to Terms",
          content: "<p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p><p>By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Services.</p>"
        }
      ],
      contact: {
        title: "Contact Us",
        content: "<p>If you have any questions about these Terms, please contact us:</p>",
        email: "legal@mcsk.or.ke",
        phone: "+254 20 2535988/9",
        address: "Maua Close, Off Parklands Road, Westlands, Nairobi, Kenya"
      }
    }
  }
}

export default async function TermsPage() {
  const data = await getTermsData()
  return <TermsContent initialData={data} />
}