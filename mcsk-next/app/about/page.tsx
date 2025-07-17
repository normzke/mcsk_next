import { Metadata } from "next"
import AboutContent from "./components/about-content"
import AnimatedNotes from "./components/AnimatedNotes"

export const metadata: Metadata = {
  title: "About Us | Music Copyright Society of Kenya",
  description: "Learn about MCSK's mission, history, leadership team, and commitment to protecting music rights in Kenya.",
  keywords: "MCSK about, mission statement, history, leadership team, music rights organization",
  openGraph: {
    title: "About Us | Music Copyright Society of Kenya",
    description: "Learn about MCSK's mission, history, leadership team, and commitment to protecting music rights in Kenya.",
    url: "https://mcsk.or.ke/about",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Music Copyright Society of Kenya",
    description: "Learn about MCSK's mission, history, leadership team, and commitment to protecting music rights in Kenya.",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/about",
  },
}

async function getAboutData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/about`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch about data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching about data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      hero: {
        title: "About Music Copyright Society of Kenya",
        description: "Protecting and promoting the rights of musicians in Kenya since 1983.",
        image: "/images/about/hero.jpg"
      },
      mission: {
        title: "Our Mission",
        content: "To protect the rights of music creators and ensure fair compensation for the use of their works."
      },
      vision: {
        title: "Our Vision",
        content: "To be the leading collective management organization in Africa, providing excellent service to music creators and users."
      },
      history: {
        title: "Our Journey",
        content: [
          {
            title: "Establishment",
            description: "MCSK was established in 1983 to protect the rights of composers, authors, and publishers of musical works in Kenya. Founded on the principle that creators deserve fair compensation for their work, MCSK began its journey with a small team of dedicated professionals passionate about music rights."
          },
          {
            title: "Growth & Evolution",
            description: "Over the decades, we have grown to become the premier collective management organization in Kenya, representing thousands of local and international music creators. Our evolution has been marked by technological advancement, expanded services, and stronger advocacy for robust copyright laws."
          },
          {
            title: "Today & Tomorrow",
            description: "Today, MCSK stands at the forefront of music rights management in Africa, embracing digital transformation to better serve our members. We continue to innovate and adapt to the changing landscape of music consumption, ensuring that creators receive fair compensation in the digital age."
          }
        ],
        milestones: [
          {
            year: "1983",
            description: "Foundation of MCSK"
          },
          {
            year: "1990s",
            description: "Expansion of membership"
          },
          {
            year: "2000s",
            description: "Digital rights management"
          },
          {
            year: "2010s",
            description: "International partnerships"
          },
          {
            year: "Today",
            description: "Digital transformation"
          }
        ],
        stats: [
          {
            value: "40+",
            description: "Years of Service"
          },
          {
            value: "15,000+",
            description: "Members"
          }
        ]
      },
      team: [
        {
          id: "1",
          name: "John Doe",
          position: "Chief Executive Officer",
          image: "/images/team/placeholder.jpg",
          bio: "John has over 20 years of experience in copyright management and music industry leadership."
        },
        {
          id: "2",
          name: "Jane Smith",
          position: "Chief Operations Officer",
          image: "/images/team/placeholder.jpg",
          bio: "Jane oversees the day-to-day operations of MCSK, ensuring efficient service delivery to our members."
        }
      ],
      stats: [
        { id: "1", label: "Members", value: "15,000+" },
        { id: "2", label: "Years of Service", value: "40+" },
        { id: "3", label: "Royalties Distributed", value: "KES 500M+" },
        { id: "4", label: "International Partners", value: "80+" }
      ]
    }
  }
}

export default async function AboutPage() {
  const aboutData = await getAboutData()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[500px] overflow-hidden" style={{ backgroundImage: "url('/images/hero/about-bg.jpg')" }}>
        <AnimatedNotes />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1464]/90 via-[#1a1464]/80 to-[#3b2e8c]/90"></div>
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center mb-6">
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-4"></div>
              <span className="text-blue-300 font-medium tracking-wider">ESTABLISHED 1983</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">About MCSK</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
              Protecting and promoting the rights of musicians in Kenya through innovation and excellence.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#mission" className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition duration-300 flex items-center group">
                Our Mission
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a href="/about/leadership" className="px-6 py-3 text-white hover:text-blue-200 transition duration-300">Our Leadership →</a>
            </div>
          </div>
        </div>
        
        {/* Animated wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      

      
      {/* Vision & Mission Section */}
      <section id="mission" className="py-24 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -right-24 top-24 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"></div>
        <div className="absolute -left-24 bottom-24 w-80 h-80 rounded-full bg-indigo-100/30 blur-3xl"></div>
        
        {/* Decorative music staff lines */}
        <div className="absolute left-0 right-0 top-1/3 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
        <div className="absolute left-0 right-0 top-1/3 translate-y-6 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
        <div className="absolute left-0 right-0 top-1/3 translate-y-12 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
        <div className="absolute left-0 right-0 top-1/3 translate-y-18 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
        <div className="absolute left-0 right-0 top-1/3 translate-y-24 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1464] mb-4 tracking-tight">Our Purpose</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Guiding the future of music rights management in Kenya with innovation and integrity</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-white to-blue-50 p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100/50 relative group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mt-8 -mr-8 group-hover:bg-blue-500/10 transition-colors duration-300"></div>
              
              <div className="text-4xl text-blue-500 mb-6">♪</div>
              <h2 className="text-2xl font-bold text-[#1a1464] mb-4 tracking-tight">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed relative z-10">
                To be the leading collective management organization in Africa, providing excellent service to music creators and users while setting the standard for innovation in rights management.
              </p>
              
              <div className="absolute bottom-4 right-4 text-6xl text-blue-200/40 font-bold">01</div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-indigo-50 p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-indigo-100/50 relative group mt-8 md:mt-0">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full -mt-8 -mr-8 group-hover:bg-indigo-500/10 transition-colors duration-300"></div>
              
              <div className="text-4xl text-indigo-500 mb-6">♫</div>
              <h2 className="text-2xl font-bold text-[#1a1464] mb-4 tracking-tight">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed relative z-10">
                To protect the rights of music creators and ensure fair compensation for the use of their works through transparent systems, education, and advocacy for strong copyright laws.
              </p>
              
              <div className="absolute bottom-4 right-4 text-6xl text-indigo-200/40 font-bold">02</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1a1464] mb-12 text-center">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Integrity */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-[#1a1464]/10 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1a1464]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1464] ml-4">Integrity and Transparency</h3>
                </div>
                <p className="text-gray-700">We maintain the highest standards of honesty and openness in all our operations.</p>
              </div>
              
              {/* Professionalism */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-[#1a1464]/10 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1a1464]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1464] ml-4">Professionalism</h3>
                </div>
                <p className="text-gray-700">We uphold professional excellence in serving our members and stakeholders.</p>
              </div>
              
              {/* Innovation */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-[#1a1464]/10 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1a1464]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1464] ml-4">Innovation and Creativity</h3>
                </div>
                <p className="text-gray-700">We embrace new ideas and creative solutions to better serve the music industry.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      
      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1a1464] mb-12 text-center">Contact Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-[#1a1464] text-3xl mb-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-xl mb-2 text-center text-[#1a1464]">Visit Us</h4>
              <p className="text-gray-600 text-center">Sports Road, Westlands<br/>P.O. BOX 14806-00800<br/>Nairobi, Kenya</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-[#1a1464] text-3xl mb-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="font-bold text-xl mb-2 text-center text-[#1a1464]">Call Us</h4>
              <p className="text-gray-600 text-center">+254 733 400204</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-[#1a1464] text-3xl mb-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-bold text-xl mb-2 text-center text-[#1a1464]">Email Us</h4>
              <p className="text-gray-600 text-center">music@mcsk.org</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}