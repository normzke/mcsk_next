import { Metadata } from "next"
import PrivacyContent from "./components/privacy-content"

export const metadata: Metadata = {
  title: "Privacy Policy | Music Copyright Society of Kenya",
  description: "Learn about how MCSK collects, uses, and protects your personal information. Understand our data protection practices.",
  keywords: "MCSK privacy policy, data protection, personal information, privacy rights, data security",
  openGraph: {
    title: "Privacy Policy | Music Copyright Society of Kenya",
    description: "Learn about how MCSK collects, uses, and protects your personal information. Understand our data protection practices.",
    url: "https://mcsk.or.ke/privacy",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Music Copyright Society of Kenya",
    description: "Learn about how MCSK collects, uses, and protects your personal information. Understand our data protection practices.",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/privacy",
  },
}

async function getPrivacyData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/privacy`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch privacy data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching privacy data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      hero: {
        title: "Privacy Policy",
        description: "How we collect, use, and protect your personal information.",
        image: "/images/privacy/hero.jpg",
        lastUpdated: "2024-01-15"
      },
      intro: {
        content: "<p>At the Music Copyright Society of Kenya (MCSK), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you interact with our services, website, or mobile applications.</p><p>Please read this policy carefully to understand our practices regarding your personal data and how we will treat it. By using our services, you consent to the data practices described in this statement.</p>"
      },
      sections: [
        {
          id: "1",
          title: "Information We Collect",
          content: "<p>We collect several types of information from and about users of our services, including:</p><ul><li><strong>Personal Identification Information:</strong> Name, postal address, email address, telephone number, date of birth, national ID or passport number, and other similar identifiers.</li><li><strong>Professional Information:</strong> Details about your musical works, performances, recordings, and other creative content.</li><li><strong>Financial Information:</strong> Bank account details, payment information, and transaction history related to royalty distributions.</li><li><strong>Usage Data:</strong> Information about how you use our website, services, and applications.</li><li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types and versions, operating system, and platform.</li></ul>"
        },
        {
          id: "2",
          title: "How We Use Your Information",
          content: "<p>We use the information we collect for various purposes, including:</p><ul><li>To register you as a member and manage your account</li><li>To collect and distribute royalties</li><li>To provide and maintain our services</li><li>To notify you about changes to our services</li><li>To allow you to participate in interactive features of our services</li><li>To provide customer support</li><li>To gather analysis or valuable information so that we can improve our services</li><li>To monitor the usage of our services</li><li>To detect, prevent and address technical issues</li><li>To comply with legal obligations</li></ul>"
        },
        {
          id: "3",
          title: "Data Security",
          content: "<p>We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, accessed, altered, or disclosed in an unauthorized way. These measures include:</p><ul><li>Encryption of sensitive data</li><li>Regular security assessments</li><li>Access controls and authentication procedures</li><li>Staff training on data protection</li><li>Physical security measures for our premises</li></ul><p>While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.</p>"
        },
        {
          id: "4",
          title: "Your Rights",
          content: "<p>Under data protection laws, you have rights in relation to your personal data, including:</p><ul><li><strong>Access:</strong> You can request copies of your personal data.</li><li><strong>Rectification:</strong> You can request that we correct inaccurate personal data.</li><li><strong>Erasure:</strong> You can request that we delete your personal data in certain circumstances.</li><li><strong>Restriction:</strong> You can request that we restrict the processing of your personal data.</li><li><strong>Data Portability:</strong> You can request the transfer of your personal data to you or a third party.</li><li><strong>Objection:</strong> You can object to our processing of your personal data.</li></ul><p>To exercise any of these rights, please contact us using the details provided below.</p>"
        },
        {
          id: "5",
          title: "Cookies Policy",
          content: "<p>We use cookies and similar tracking technologies to track activity on our services and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.</p><p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our services.</p>"
        },
        {
          id: "6",
          title: "Changes to This Privacy Policy",
          content: "<p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date at the top of this page.</p><p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>"
        }
      ],
      contact: {
        title: "Contact Us",
        content: "<p>If you have any questions about this Privacy Policy, please contact us:</p>",
        email: "privacy@mcsk.or.ke",
        phone: "+254 20 2535988/9",
        address: "Maua Close, Off Parklands Road, Westlands, Nairobi, Kenya"
      }
    }
  }
}

export default async function PrivacyPage() {
  const data = await getPrivacyData()
  return <PrivacyContent initialData={data} />
}