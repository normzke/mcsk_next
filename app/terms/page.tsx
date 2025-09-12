import { Metadata } from "next"
import TermsContent from "./components/terms-content"

export const metadata: Metadata = {
  title: "Terms of Service | Music Copyright Society of Kenya",
  description: "Read MCSK's terms of service, user agreements, and legal policies for music copyright management.",
  keywords: "MCSK terms, terms of service, user agreement, legal terms, copyright policy",
  openGraph: {
    title: "Terms of Service | Music Copyright Society of Kenya",
    description: "Read MCSK's terms of service, user agreements, and legal policies for music copyright management.",
    url: "https://mcsk.org/terms",
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
    canonical: "https://mcsk.org/terms",
  },
}

function getTermsData() {
  // Static data for terms of service
  return {
    hero: {
      title: "Terms of Service",
      description: "Please read these terms carefully before using our services.",
      image: "/images/terms/hero.jpg"
    },
    lastUpdated: "2024-01-15",
    introduction: "Welcome to the Music Copyright Society of Kenya (MCSK). By accessing or using our website, services, or applications, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.",
    sections: [
      {
        id: "1",
        title: "Definitions",
        content: "For the purposes of these Terms of Service: MCSK refers to the Music Copyright Society of Kenya. Services refers to the website, applications, and services provided by MCSK. User refers to the individual accessing or using our Services. Member refers to a registered rights holder with MCSK. Content refers to information, data, text, music, sound, photographs, graphics, video, messages, or other materials."
      },
      {
        id: "2",
        title: "Use of Services",
        content: "Our Services are intended for users who are at least 18 years old. By using our Services, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these terms. You agree to use our Services only for lawful purposes and in accordance with these Terms."
      },
      {
        id: "3",
        title: "Intellectual Property",
        content: "The Services and their original content, features, and functionality are and will remain the exclusive property of MCSK and its licensors. The Services are protected by copyright, trademark, and other laws of both Kenya and foreign countries."
      },
      {
        id: "4",
        title: "User Accounts",
        content: "When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Services."
      },
      {
        id: "5",
        title: "Limitation of Liability",
        content: "In no event shall MCSK, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses."
      },
      {
        id: "6",
        title: "Changes to Terms",
        content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect."
      }
    ],
    disclaimer: {
      title: "Disclaimer",
      content: "The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website for any purpose."
    },
    contact: {
      title: "Contact Us",
      description: "If you have any questions about these Terms, please contact us:",
      email: "legal@mcsk.org",
      phone: "+254 20 2535988/9"
    }
  }
}

export default function TermsPage() {
  const data = getTermsData()
  return <TermsContent initialData={data} />
}