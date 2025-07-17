import { Metadata } from "next"
import ServicesContent from "./components/services-content"

export const metadata: Metadata = {
  title: "Services | Music Copyright Society of Kenya",
  description: "Explore MCSK's comprehensive services for music creators, including licensing, royalty collection, and rights management.",
  keywords: "MCSK services, music licensing, royalty collection, rights management, music distribution",
  openGraph: {
    title: "Services | Music Copyright Society of Kenya",
    description: "Explore MCSK's comprehensive services for music creators, including licensing, royalty collection, and rights management.",
    url: "https://mcsk.or.ke/services",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Music Copyright Society of Kenya",
    description: "Explore MCSK's comprehensive services for music creators, including licensing, royalty collection, and rights management.",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/services",
  },
}

async function getServicesData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/services`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch services data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching services data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      hero: {
        title: "Our Services",
        description: "MCSK offers a wide range of services to protect and manage music rights in Kenya.",
        image: "/images/services/hero.jpg"
      },
      intro: {
        title: "Supporting Music Creators",
        content: "<p>The Music Copyright Society of Kenya (MCSK) is dedicated to protecting the rights of composers, authors, and publishers of musical works. We provide comprehensive services to ensure our members receive fair compensation for their creative works.</p>"
      },
      services: [
        {
          id: "1",
          title: "Licensing",
          description: "We issue licenses to businesses and organizations that use music, ensuring creators are compensated for the use of their works.",
          icon: "license",
          features: [
            "Public performance licensing",
            "Broadcasting licenses",
            "Digital platform licensing",
            "Event licensing",
            "Customized licensing solutions"
          ],
          cta: { text: "Learn More", url: "/licensing" }
        },
        {
          id: "2",
          title: "Royalty Collection & Distribution",
          description: "We collect royalties from various sources and distribute them fairly to our members based on the usage of their works.",
          icon: "money",
          features: [
            "Transparent collection process",
            "Regular distribution schedules",
            "Detailed royalty statements",
            "International royalty collection",
            "Monitoring of music usage"
          ],
          cta: { text: "Learn More", url: "/membership" }
        },
        {
          id: "3",
          title: "Rights Management",
          description: "We help our members manage their music rights effectively, ensuring proper documentation and protection.",
          icon: "shield",
          features: [
            "Work registration",
            "Rights documentation",
            "Catalog management",
            "Dispute resolution",
            "Rights education"
          ],
          cta: { text: "Learn More", url: "/copyright-law" }
        },
        {
          id: "4",
          title: "Member Support",
          description: "We provide comprehensive support to our members, helping them navigate the complex music industry.",
          icon: "users",
          features: [
            "Legal advice and support",
            "Professional development",
            "Networking opportunities",
            "Industry resources",
            "Educational workshops"
          ],
          cta: { text: "Learn More", url: "/membership" }
        }
      ],
      testimonials: {
        title: "What Our Members Say",
        items: [
          {
            id: "1",
            quote: "MCSK has been instrumental in ensuring I receive fair compensation for my music. Their licensing and royalty collection services have made a significant difference in my career.",
            author: "John Mwangi",
            role: "Composer & Producer",
            image: "/images/testimonials/john.jpg"
          },
          {
            id: "2",
            quote: "As a music publisher, I appreciate MCSK's commitment to protecting our rights. Their rights management services are thorough and professional.",
            author: "Sarah Ochieng",
            role: "Music Publisher",
            image: "/images/testimonials/sarah.jpg"
          },
          {
            id: "3",
            quote: "The support I've received from MCSK has been invaluable. Their team is always ready to assist with any questions or concerns I have about my music rights.",
            author: "Michael Kamau",
            role: "Songwriter",
            image: "/images/testimonials/michael.jpg"
          }
        ]
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            id: "1",
            question: "How do I apply for a music license?",
            answer: "You can apply for a music license through our website, by visiting our offices, or by contacting our licensing department. The process involves completing an application form and paying the applicable fee."
          },
          {
            id: "2",
            question: "How are royalties calculated and distributed?",
            answer: "Royalties are calculated based on music usage reports from various sources, including radio, TV, digital platforms, and public performances. We distribute royalties to our members quarterly."
          },
          {
            id: "3",
            question: "What services do you offer to international members?",
            answer: "We offer the same services to international members as we do to local members, including royalty collection from Kenyan sources, rights management, and legal support. We also work with international copyright organizations to collect royalties for our members from around the world."
          }
        ],
        cta: { text: "View All FAQs", url: "/faqs" }
      }
    }
  }
}

export default async function ServicesPage() {
  const servicesData = await getServicesData()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[300px]" style={{ backgroundImage: "url('/images/hero/services-bg.jpg')" }}>
        <div className="absolute inset-0 bg-[#1a1464]/80"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-xl text-white/90 mb-6">
              We offer comprehensive music rights management services to protect and monetize your creative works.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Licensing Services */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="text-[#1a1464] text-3xl mb-4">
                <i className="fas fa-certificate"></i>
              </div>
              <h2 className="text-xl font-bold text-[#1a1464] mb-4">Licensing Services</h2>
              <p className="text-gray-600 mb-4">We provide comprehensive music licensing solutions for businesses, events, and broadcasting.</p>
              <ul className="text-gray-600 space-y-2 mb-4">
                <li>• Business Premises Licensing</li>
                <li>• Event Licensing</li>
                <li>• Broadcasting Licenses</li>
                <li>• Digital Platform Licensing</li>
              </ul>
            </div>

            {/* Royalty Collection */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="text-[#1a1464] text-3xl mb-4">
                <i className="fas fa-hand-holding-dollar"></i>
              </div>
              <h2 className="text-xl font-bold text-[#1a1464] mb-4">Royalty Collection</h2>
              <p className="text-gray-600 mb-4">Efficient collection of royalties from various music usage sources.</p>
              <ul className="text-gray-600 space-y-2 mb-4">
                <li>• Performance Royalties</li>
                <li>• Broadcasting Royalties</li>
                <li>• Digital Platform Royalties</li>
                <li>• International Collections</li>
              </ul>
            </div>

            {/* Distribution Methods */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="text-[#1a1464] text-3xl mb-4">
                <i className="fas fa-chart-pie"></i>
              </div>
              <h2 className="text-xl font-bold text-[#1a1464] mb-4">Distribution Methods</h2>
              <p className="text-gray-600 mb-4">Fair and transparent distribution of collected royalties to rights holders.</p>
              <ul className="text-gray-600 space-y-2 mb-4">
                <li>• Regular Distribution Cycles</li>
                <li>• Digital Payment Systems</li>
                <li>• Usage-Based Distribution</li>
                <li>• International Remittance</li>
              </ul>
            </div>

            {/* Member Services */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="text-[#1a1464] text-3xl mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h2 className="text-xl font-bold text-[#1a1464] mb-4">Member Services</h2>
              <p className="text-gray-600 mb-4">Comprehensive support services for our members.</p>
              <ul className="text-gray-600 space-y-2 mb-4">
                <li>• Rights Registration</li>
                <li>• Legal Advisory</li>
                <li>• Dispute Resolution</li>
                <li>• Member Portal Access</li>
              </ul>
            </div>

            {/* International Relations */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="text-[#1a1464] text-3xl mb-4">
                <i className="fas fa-globe"></i>
              </div>
              <h2 className="text-xl font-bold text-[#1a1464] mb-4">International Relations</h2>
              <p className="text-gray-600 mb-4">Global partnerships for worldwide rights protection.</p>
              <ul className="text-gray-600 space-y-2 mb-4">
                <li>• Reciprocal Agreements</li>
                <li>• International Copyright Protection</li>
                <li>• Cross-Border Collections</li>
                <li>• Global Rights Management</li>
              </ul>
            </div>

            {/* Tariff Information */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="text-[#1a1464] text-3xl mb-4">
                <i className="fas fa-file-invoice-dollar"></i>
              </div>
              <h2 className="text-xl font-bold text-[#1a1464] mb-4">Tariff Information</h2>
              <p className="text-gray-600 mb-4">Clear and structured tariff systems for various music uses.</p>
              <ul className="text-gray-600 space-y-2 mb-4">
                <li>• Business Tariffs</li>
                <li>• Event Tariffs</li>
                <li>• Broadcasting Tariffs</li>
                <li>• Digital Platform Tariffs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#1a1464] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to License Music for Your Business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Get in touch with our licensing team to find the right solution for your needs.</p>
          <a href="https://online.mcsk.org/" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[#1a1464] px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300 font-bold">
            Apply for License
          </a>
        </div>
      </section>
    </div>
  )
}