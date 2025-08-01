import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Music Copyright Society of Kenya",
  description: "Get in touch with MCSK for inquiries about music copyright, licensing, membership, and support.",
  keywords: "MCSK contact, music copyright contact, licensing contact, membership support",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 