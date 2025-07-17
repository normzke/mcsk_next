import { Metadata } from "next"
import ContactContent from "./components/contact-content"

export const metadata: Metadata = {
  title: "Contact Us | Music Copyright Society of Kenya",
  description: "Get in touch with MCSK. Find our contact information, office locations, and send us your inquiries.",
  keywords: "MCSK contact, contact form, office locations, support, inquiries, customer service",
  openGraph: {
    title: "Contact Us | Music Copyright Society of Kenya",
    description: "Get in touch with MCSK. Find our contact information, office locations, and send us your inquiries.",
    url: "https://mcsk.or.ke/contact",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Music Copyright Society of Kenya",
    description: "Get in touch with MCSK. Find our contact information, office locations, and send us your inquiries.",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/contact",
  },
}

async function getContactData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/contact`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch contact data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching contact data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      hero: {
        title: "Contact Us",
        description: "Get in touch with the Music Copyright Society of Kenya.",
        image: "/images/contact/hero.jpg"
      },
      intro: {
        title: "We're Here to Help",
        content: "<p>Have questions about music copyright, licensing, or membership? Our team is ready to assist you with any inquiries or support you may need.</p>"
      },
      offices: [
        {
          id: "1",
          name: "Headquarters - Nairobi",
          address: "Maua Close, Off Parklands Road, Westlands, Nairobi",
          phone: "+254 20 2535988/9",
          email: "info@mcsk.or.ke",
          hours: "Monday - Friday: 8:00 AM - 5:00 PM",
          mapUrl: "https://maps.google.com/?q=MCSK+Headquarters+Nairobi"
        },
        {
          id: "2",
          name: "Mombasa Regional Office",
          address: "Moi Avenue, Mombasa",
          phone: "+254 41 2229461",
          email: "mombasa@mcsk.or.ke",
          hours: "Monday - Friday: 8:00 AM - 5:00 PM",
          mapUrl: "https://maps.google.com/?q=MCSK+Mombasa+Office"
        },
        {
          id: "3",
          name: "Kisumu Regional Office",
          address: "Oginga Odinga Street, Kisumu",
          phone: "+254 57 2021712",
          email: "kisumu@mcsk.or.ke",
          hours: "Monday - Friday: 8:00 AM - 5:00 PM",
          mapUrl: "https://maps.google.com/?q=MCSK+Kisumu+Office"
        }
      ],
      departments: [
        {
          id: "1",
          name: "Membership Services",
          email: "membership@mcsk.or.ke",
          phone: "+254 20 2535988 Ext. 101"
        },
        {
          id: "2",
          name: "Licensing Department",
          email: "licensing@mcsk.or.ke",
          phone: "+254 20 2535988 Ext. 102"
        },
        {
          id: "3",
          name: "Distribution & Documentation",
          email: "distribution@mcsk.or.ke",
          phone: "+254 20 2535988 Ext. 103"
        },
        {
          id: "4",
          name: "Media & Communications",
          email: "media@mcsk.or.ke",
          phone: "+254 20 2535988 Ext. 104"
        }
      ],
      socialMedia: [
        { id: "1", platform: "Facebook", url: "https://facebook.com/mcskenya", icon: "facebook" },
        { id: "2", platform: "Twitter", url: "https://twitter.com/mcsk_kenya", icon: "twitter" },
        { id: "3", platform: "Instagram", url: "https://instagram.com/mcsk_kenya", icon: "instagram" },
        { id: "4", platform: "YouTube", url: "https://youtube.com/mcskenya", icon: "youtube" }
      ],
      form: {
        title: "Send Us a Message",
        description: "Fill out the form below and we'll get back to you as soon as possible.",
        submitEndpoint: "/api/contact/submit"
      }
    }
  }
}

export default async function ContactPage() {
  const contactData = await getContactData()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[300px]" style={{ backgroundImage: "url('/images/hero/contact-bg.jpg')" }}>
        <div className="absolute inset-0 bg-[#1a1464]/80"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-white/90 mb-6">
              Get in touch with MCSK for music rights management, licensing, and royalty collection inquiries.
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1464] mb-6">Get in Touch</h2>
            
            {/* Office Location */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#1a1464]">Head Office</h3>
              <div className="space-y-4">
                <p className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1a1464] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="ml-2">
                    Sports Road, Westlands<br />
                    P.O. BOX 14806-00800<br />
                    Nairobi, Kenya
                  </span>
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1a1464] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="ml-2">+254 733 400204 / +020 4400200</span>
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1a1464] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="ml-2">music@mcsk.org</span>
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#1a1464]">Working Hours</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>8:00 AM - 5:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span>Closed</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday & Public Holidays:</span>
                  <span>Closed</span>
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#1a1464]">Follow Us @MCSKOfficial</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com/MCSKOfficial" target="_blank" rel="noopener noreferrer" className="bg-[#1a1464] text-white p-3 rounded-full hover:bg-blue-700 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="https://twitter.com/MCSKOfficialKe" target="_blank" rel="noopener noreferrer" className="bg-[#1a1464] text-white p-3 rounded-full hover:bg-blue-700 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="https://instagram.com/mcskofficial" target="_blank" rel="noopener noreferrer" className="bg-[#1a1464] text-white p-3 rounded-full hover:bg-blue-700 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#1a1464] mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a1464] focus:border-transparent" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a1464] focus:border-transparent" placeholder="Your email" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" id="subject" name="subject" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a1464] focus:border-transparent" placeholder="Subject of your message" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" name="message" rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a1464] focus:border-transparent" placeholder="Your message"></textarea>
              </div>
              <button type="submit" className="bg-[#1a1464] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1a1464] mb-8 text-center">Find Us</h2>
          <div className="max-w-6xl mx-auto">
            <div className="h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176571848747!2d36.80943!3d-1.2676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17f8a94c9e0f%3A0x6e9b9e8b8a1ab32e!2sWestlands%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1620564896245!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="MCSK Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}