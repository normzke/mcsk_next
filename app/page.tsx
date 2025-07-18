import { Metadata } from "next"
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import PageHeader from '@/components/ui/page-header';
import MusicAnimation from '@/components/ui/music-animation';
import HeroCarousel from '@/components/ui/hero-carousel';
import PartnerCard from '@/components/ui/partner-card';
import SocialFeed from '@/components/ui/social-feed';

interface NewsItem {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  slug: string
}

interface Partner {
  id: string
  name: string
  logo: string
  url: string
  description?: string
}

export const metadata: Metadata = {
  title: "Music Copyright Society of Kenya | Protecting Music Rights",
  description: "MCSK is Kenya's premier collective management organization for musical works, protecting and promoting the rights of composers, authors, and publishers.",
  keywords: "MCSK, music copyright Kenya, music rights, royalties, music licensing",
  openGraph: {
    title: "Music Copyright Society of Kenya | Protecting Music Rights",
    description: "MCSK is Kenya's premier collective management organization for musical works, protecting and promoting the rights of composers, authors, and publishers.",
    url: "https://mcsk.or.ke",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Music Copyright Society of Kenya | Protecting Music Rights",
    description: "MCSK is Kenya's premier collective management organization for musical works, protecting and promoting the rights of composers, authors, and publishers.",
  },
  alternates: {
    canonical: "https://mcsk.or.ke",
  },
}

async function getHomeData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/home`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) throw new Error('Failed to fetch home data');
    const data = await res.json();
    
    // Fetch partners from the dedicated partners API endpoint
    const partnersRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/partners`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!partnersRes.ok) throw new Error('Failed to fetch partners data');
    const partnersData = await partnersRes.json();
    
    // Fetch social media feed data
    const socialFeedRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/social-feed`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!socialFeedRes.ok) throw new Error('Failed to fetch social feed data');
    const socialFeedData = await socialFeedRes.json();
    
    // Combine all data
    return { 
      ...data, 
      partners: partnersData.partners || [],
      socialPosts: socialFeedData.posts || []
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    // Fallback data in case the API fails
    return {
      hero_slides: [
        {
          id: '1',
          title: 'Protecting Music Rights',
          content: 'MCSK is dedicated to protecting the rights of musicians and ensuring they receive fair compensation for their creative work.',
          image: '/images/hero/hero-1.jpg'
        },
        {
          id: '2',
          title: 'Join MCSK Today',
          content: 'Become a member and enjoy the benefits of copyright protection and royalty collection.',
          image: '/images/hero/hero-2.jpg'
        }
      ],
      announcements: [
        {
          id: '1',
          title: 'Annual General Meeting 2024',
          content: 'The MCSK AGM will be held on March 15th, 2024. All members are invited to attend.',
          date: '2024-03-15'
        },
        {
          id: '2',
          title: 'New Digital Licensing Platform',
          content: 'MCSK launches new online platform for easy music licensing.',
          date: '2024-02-01'
        }
      ],
      latest_news: [
        {
          id: '1',
          title: 'MCSK Partners with Global Rights Organizations',
          excerpt: 'New international partnerships expand opportunities for Kenyan musicians.',
          image: '/images/news/partnership.jpg',
          date: '2024-02-20',
          slug: 'mcsk-global-partnerships'
        },
        {
          id: '2',
          title: 'Music Industry Workshop Series',
          excerpt: 'Free workshops for members on music business and copyright.',
          image: '/images/news/workshop.jpg',
          date: '2024-02-15',
          slug: 'music-industry-workshops'
        }
      ],
      partners: [
        {
          id: '1',
          name: 'CISAC',
          logo: '/images/partners/cisac.png',
          url: 'https://www.cisac.org',
          description: 'International Confederation of Societies of Authors and Composers'
        },
        {
          id: '2',
          name: 'KECOBO',
          logo: '/images/partners/kecobo.png',
          url: 'https://www.copyright.go.ke',
          description: 'Kenya Copyright Board'
        },
        {
          id: '3',
          name: 'WIPO',
          logo: '/images/partners/wipo.svg',
          url: 'https://www.wipo.int',
          description: 'World Intellectual Property Organization'
        },
        {
          id: '4',
          name: 'ARIPO',
          logo: '/images/partners/aripo.svg',
          url: 'https://www.aripo.org',
          description: 'African Regional Intellectual Property Organization'
        },
        {
          id: '5',
          name: 'Ministry of Culture',
          logo: '/images/partners/ministry.svg',
          url: 'https://www.culture.go.ke',
          description: 'Ministry of Sports, Culture and Heritage'
        },
        {
          id: '6',
          name: 'KAMP',
          logo: '/images/partners/kamp.svg',
          url: 'https://www.kamp.or.ke',
          description: 'Kenya Association of Music Producers'
        }
      ],
      socialPosts: [
        {
          id: '1',
          platform: 'twitter',
          content: 'Exciting news! MCSK has partnered with @WIPO to enhance copyright protection for Kenyan musicians. This collaboration will help our members receive fair compensation for their creative work globally. #MusicRights #Copyright',
          author: 'MCSK Kenya',
          authorImage: '/images/mcsk-logo.svg',
          date: '2025-05-28T10:30:00Z',
          likes: 124,
          comments: 32,
          shares: 56,
          url: 'https://twitter.com/MCSKenya'
        },
        {
          id: '2',
          platform: 'facebook',
          content: 'Join us for our upcoming workshop series on "Understanding Music Rights in the Digital Age" happening next month in Nairobi, Mombasa, and Kisumu. Free for all MCSK members!',
          image: '/images/news/workshop.jpg',
          author: 'Music Copyright Society of Kenya',
          authorImage: '/images/mcsk-logo.svg',
          date: '2025-05-25T14:15:00Z',
          likes: 287,
          comments: 45,
          shares: 78,
          url: 'https://facebook.com/MCSKenya'
        },
        {
          id: '3',
          platform: 'instagram',
          content: 'Congratulations to all the winners at last night\'s Kenyan Music Awards! MCSK is proud to support our talented musicians. #KenyanMusic #MusicAwards',
          image: '/images/news/partnership.jpg',
          author: 'mcsk_kenya',
          authorImage: '/images/mcsk-logo.svg',
          date: '2025-05-22T20:45:00Z',
          likes: 563,
          comments: 89,
          shares: 34,
          url: 'https://instagram.com/mcsk_kenya'
        }
      ]
    }
  }
}

export default async function HomePage() {
  const homeData = await getHomeData()

  return (
    <div>
      {/* Hero Section with Carousel */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Musical animation overlay */}
        <MusicAnimation />
        
        {/* Hero Carousel */}
        <HeroCarousel 
          slides={[
            {
              id: '1',
              image: '/images/hero/studio-bg.svg',
              title: 'Protecting Music Rights in Kenya',
              subtitle: 'Empowering musicians through copyright protection, licensing, and royalty collection'
            },
            {
              id: '2',
              image: '/images/hero/concert-bg.svg',
              title: 'Your Music, Your Rights',
              subtitle: 'Join thousands of Kenyan artists who trust MCSK to protect their creative work'
            },
            {
              id: '3',
              image: '/images/hero/recording-bg.svg',
              title: 'Collect What You Deserve',
              subtitle: 'We ensure you receive fair compensation whenever your music is used commercially'
            }
          ]}
        />
        
        <div className="absolute bottom-32 left-0 right-0 z-20 flex justify-center">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/membership" className="bg-white text-[#1a1464] hover:bg-white/90 px-6 py-3 rounded-md font-medium transition-colors">
              Become a Member
            </Link>
            <Link href="/licensing" className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors">
              Get a License
            </Link>
          </div>
        </div>
      </section>
      
      {/* Audio wave animation */}
      <div className="relative h-16 bg-[#1a1464] overflow-hidden">
        <div className="w-full flex justify-center items-end gap-1 h-full">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i} 
              className="bg-white/30 w-2 rounded-t-full animate-sound-wave" 
              style={{ 
                height: `${Math.sin(i * 0.4) * 20 + 30}px`,
                animationDelay: `${i * 0.05}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <div className="rounded-lg shadow-xl h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('/images/MCSK Logo.png')" }}></div>
            </div>
            <div className="w-full md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-6 text-[#1a1464]">About MCSK</h2>
              <p className="text-gray-600 mb-6">The Music Copyright Society of Kenya (MCSK) is a collective management organization that represents the rights of music composers, authors and publishers in Kenya.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-bold mb-2 text-[#1a1464]">Our Mission</h3>
                  <p className="text-gray-600">To promote and protect the rights of authors, composers and publishers.</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-bold mb-2 text-[#1a1464]">Our Vision</h3>
                  <p className="text-gray-600">To be the leading Collective Management Organization in Africa.</p>
                </div>
              </div>
              <Link href="/about" className="inline-block bg-[#1a1464] text-white px-6 py-3 rounded-full hover:bg-blue-800 transition duration-300">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Updates Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#1a1464]">Latest Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Notice 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <Image 
                src="/images/notices/0000389702-02_MUSIC COPYRIGHT SOCIETY OF KENYA-1.png" 
                alt="MCSK Notice 1" 
                width={400}
                height={300}
                className="w-full h-auto"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-[#1a1464]">Public Notice</h3>
                    <p className="text-gray-600 text-sm">May 10, 2025</p>
                  </div>
                </div>
                <Link href="/images/notices/0000389702-02_MUSIC COPYRIGHT SOCIETY OF KENYA-1.png" target="_blank" className="text-[#1a1464] hover:text-blue-800 font-semibold">
                  View Full Notice →
                </Link>
              </div>
            </div>

            {/* Notice 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <Image 
                src="/images/notices/0000389702-01-1.png" 
                alt="MCSK Notice 2" 
                width={400}
                height={300}
                className="w-full h-auto"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-[#1a1464]">Official Communication</h3>
                    <p className="text-gray-600 text-sm">May 10, 2025</p>
                  </div>
                </div>
                <Link href="/images/notices/0000389702-01-1.png" target="_blank" className="text-[#1a1464] hover:text-blue-800 font-semibold">
                  View Full Notice →
                </Link>
              </div>
            </div>

            {/* Notice 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Image 
                    src="/images/mcsk.jpg" 
                    alt="MCSK Logo" 
                    width={48}
                    height={48}
                    className="object-contain mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-[#1a1464]">Important Update</h3>
                    <p className="text-gray-600 text-sm">May 8, 2025</p>
                  </div>
                </div>
                <h4 className="font-bold text-xl mb-4">Official Communication to MCSK Members</h4>
                <p className="text-gray-700 mb-4">The Music Copyright Society of Kenya (MCSK) is taking steps to restore full accountability and transparency in its operations...</p>
                <Link href="/news" className="text-[#1a1464] hover:text-blue-800 font-semibold">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        {/* Key Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#1a1464]">Key Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/licensing" className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white hover:bg-gray-50">
              <h3 className="text-xl font-bold mb-2 text-[#1a1464]">Music Licensing</h3>
              <p className="text-gray-700 mb-3">Obtain licenses to legally use music in your business or event.</p>
              <span className="text-[#1a1464] font-medium text-sm">Learn more →</span>
            </Link>
            <Link href="/membership" className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white hover:bg-gray-50">
              <h3 className="text-xl font-bold mb-2 text-[#1a1464]">Membership</h3>
              <p className="text-gray-700 mb-3">Join MCSK and enjoy benefits designed for music creators.</p>
              <span className="text-[#1a1464] font-medium text-sm">Learn more →</span>
            </Link>
            <Link href="/services" className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white hover:bg-gray-50">
              <h3 className="text-xl font-bold mb-2 text-[#1a1464]">Royalty Collection</h3>
              <p className="text-gray-700 mb-3">We collect and distribute royalties to music creators.</p>
              <span className="text-[#1a1464] font-medium text-sm">Learn more →</span>
            </Link>
            <Link href="/copyright-law" className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white hover:bg-gray-50">
              <h3 className="text-xl font-bold mb-2 text-[#1a1464]">Copyright Protection</h3>
              <p className="text-gray-700 mb-3">We protect the intellectual property rights of our members.</p>
              <span className="text-[#1a1464] font-medium text-sm">Learn more →</span>
            </Link>
          </div>
        </section>
        
        {/* Featured Sections */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#1a1464]">Explore MCSK</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/gallery" className="group relative h-64 rounded-lg overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all z-10"></div>
              <Image 
                src="/images/gallery/hero.jpg" 
                alt="MCSK Gallery"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">Gallery</h3>
                <p className="text-white/90 mb-3">Browse photos and videos from our events and activities</p>
                <span className="text-white font-medium text-sm">View Gallery →</span>
              </div>
            </Link>
            <Link href="/events" className="group relative h-64 rounded-lg overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all z-10"></div>
              <Image 
                src="/images/events/hero.jpg" 
                alt="MCSK Events"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">Events</h3>
                <p className="text-white/90 mb-3">Stay updated on upcoming MCSK events and workshops</p>
                <span className="text-white font-medium text-sm">View Events →</span>
              </div>
            </Link>
            <Link href="/downloads" className="group relative h-64 rounded-lg overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all z-10"></div>
              <Image 
                src="/images/downloads/hero.jpg" 
                alt="MCSK Downloads"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">Downloads</h3>
                <p className="text-white/90 mb-3">Access forms, documents, and resources</p>
                <span className="text-white font-medium text-sm">View Downloads →</span>
              </div>
            </Link>
            <Link href="/careers" className="group relative h-64 rounded-lg overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all z-10"></div>
              <Image 
                src="/images/careers/hero.jpg" 
                alt="MCSK Careers"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">Careers</h3>
                <p className="text-white/90 mb-3">Join our team and help protect music rights in Kenya</p>
                <span className="text-white font-medium text-sm">View Careers →</span>
              </div>
            </Link>
          </div>
        </section>
        
        {/* Latest News */}
        {homeData && homeData.latest_news && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#1a1464]">Latest News</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {homeData.latest_news.map((news: NewsItem) => (
                <div key={news.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <Image 
                      src={news.image} 
                      alt={news.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 text-[#1a1464]">{news.title}</h3>
                    <p className="text-gray-600 mb-3">{news.excerpt}</p>
                    <Link href={`/news/${news.slug}`} className="text-[#1a1464] hover:underline font-medium">
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Music Impact Section */}
        <section className="py-16 bg-gradient-to-r from-[#1a1464] to-[#3a2b8c] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">The Power of Music Rights</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="5.5" cy="17.5" r="2.5"/>
                    <circle cx="18.5" cy="17.5" r="2.5"/>
                    <path d="M5.5 17.5V6.5l13 2v9"/>
                    <path d="M5.5 6.5l13 2"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Protect Your Music</h3>
                <p className="text-white/80">Ensure your creative work is protected and you receive fair compensation for your talent and effort.</p>
              </div>
              
              <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13"/>
                    <circle cx="6" cy="18" r="3"/>
                    <circle cx="18" cy="16" r="3"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Collect Royalties</h3>
                <p className="text-white/80">Receive royalties whenever your music is played on radio, TV, streaming platforms, or in public venues.</p>
              </div>
              
              <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Grow Your Career</h3>
                <p className="text-white/80">Focus on creating music while we handle the complex world of rights management and royalty collection.</p>
              </div>
            </div>
            
            <div className="mt-12">
              <Link href="/membership" className="inline-block bg-white text-[#1a1464] hover:bg-white/90 font-medium py-3 px-8 rounded-full transition-colors">
                Join MCSK Today
              </Link>
            </div>
          </div>
        </section>
        
        {/* Success Stories Carousel */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-2 text-[#1a1464]">Success Stories</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Hear from musicians who have benefited from MCSK's rights management services</p>
            
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:shrink-0">
                  <div className="relative h-64 w-full md:h-full md:w-48">
                    <Image 
                      src="/images/testimonials/musician1.jpg" 
                      alt="Kenyan Musician"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="p-8 text-left">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="italic text-gray-600 mb-4">
                    "Since joining MCSK, I've been able to focus on creating music while they handle my royalty collection. The consistent income has allowed me to invest in better equipment and collaborate with other artists."
                  </blockquote>
                  <div className="font-bold text-[#1a1464]">Sarah Wanjiku</div>
                  <div className="text-gray-500 text-sm">Singer-Songwriter, Nairobi</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Partners */}
        {homeData && homeData.partners && Array.isArray(homeData.partners) && (
          <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-center text-[#1a1464]">Our Partners</h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">MCSK collaborates with these organizations to protect music rights and support artists across Kenya and beyond</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {homeData.partners.map((partner: Partner) => (
                  <PartnerCard
                    key={partner.id}
                    id={partner.id}
                    name={partner.name}
                    logo={partner.logo}
                    url={partner.url}
                    description={partner.description || ''}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Social Media Feed */}
        {homeData && homeData.socialPosts && Array.isArray(homeData.socialPosts) && (
          <SocialFeed 
            posts={homeData.socialPosts} 
            title="Connect With Us" 
            subtitle="Stay updated with the latest news and updates from MCSK on social media"
          />
        )}
      </div>
    </div>
  )
}
