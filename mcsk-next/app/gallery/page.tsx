import { Metadata } from "next"
import Image from "next/image"
import GalleryContent from "./components/gallery-content"

export const metadata: Metadata = {
  title: "Gallery | Music Copyright Society of Kenya",
  description: "Browse photos and videos from MCSK events, performances, workshops, and member activities.",
  keywords: "MCSK gallery, music events, photos, videos, performances, workshops",
  openGraph: {
    title: "Gallery | Music Copyright Society of Kenya",
    description: "Browse photos and videos from MCSK events, performances, workshops, and member activities.",
    url: "https://mcsk.or.ke/gallery",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Music Copyright Society of Kenya",
    description: "Browse photos and videos from MCSK events, performances, workshops, and member activities.",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/gallery",
  },
}

async function getGalleryData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/gallery`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch gallery data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching gallery data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      hero: {
        title: "MCSK Gallery",
        description: "Browse photos and videos from our events, performances, and activities.",
        image: "/images/gallery/hero.jpg"
      },
      categories: [
        { id: "1", name: "Events", count: 12 },
        { id: "2", name: "Performances", count: 8 },
        { id: "3", name: "Workshops", count: 6 },
        { id: "4", name: "Awards", count: 4 },
        { id: "5", name: "Member Activities", count: 7 }
      ],
      featured: [
        {
          id: "1",
          title: "Annual General Meeting 2023",
          description: "Members gathered for our annual meeting to discuss the society's progress.",
          image: "/images/gallery/agm-2023.jpg",
          date: "2023-06-15",
          category: "Events"
        },
        {
          id: "2",
          title: "Music Rights Workshop",
          description: "Educational workshop on copyright and music rights for our members.",
          image: "/images/gallery/workshop.jpg",
          date: "2023-09-22",
          category: "Workshops"
        },
        {
          id: "3",
          title: "MCSK Awards Night",
          description: "Celebrating excellence in the Kenyan music industry.",
          image: "/images/gallery/awards.jpg",
          date: "2023-11-30",
          category: "Awards"
        }
      ],
      albums: [
        {
          id: "1",
          title: "Annual General Meeting 2023",
          cover: "/images/gallery/albums/agm-2023-cover.jpg",
          date: "2023-06-15",
          itemCount: 24,
          category: "Events",
          items: [
            { id: "1-1", type: "image", url: "/images/gallery/albums/agm-2023-1.jpg", caption: "Opening address by the Chairperson" },
            { id: "1-2", type: "image", url: "/images/gallery/albums/agm-2023-2.jpg", caption: "Members registration" },
            { id: "1-3", type: "image", url: "/images/gallery/albums/agm-2023-3.jpg", caption: "Financial report presentation" },
            { id: "1-4", type: "video", url: "/videos/gallery/agm-2023-highlights.mp4", thumbnail: "/images/gallery/albums/agm-2023-video.jpg", caption: "AGM Highlights" }
          ]
        },
        {
          id: "2",
          title: "Music Rights Workshop",
          cover: "/images/gallery/albums/workshop-cover.jpg",
          date: "2023-09-22",
          itemCount: 18,
          category: "Workshops",
          items: [
            { id: "2-1", type: "image", url: "/images/gallery/albums/workshop-1.jpg", caption: "Workshop introduction" },
            { id: "2-2", type: "image", url: "/images/gallery/albums/workshop-2.jpg", caption: "Group discussion" },
            { id: "2-3", type: "image", url: "/images/gallery/albums/workshop-3.jpg", caption: "Q&A session" },
            { id: "2-4", type: "video", url: "/videos/gallery/workshop-recap.mp4", thumbnail: "/images/gallery/albums/workshop-video.jpg", caption: "Workshop Recap" }
          ]
        },
        {
          id: "3",
          title: "MCSK Awards Night",
          cover: "/images/gallery/albums/awards-cover.jpg",
          date: "2023-11-30",
          itemCount: 32,
          category: "Awards",
          items: [
            { id: "3-1", type: "image", url: "/images/gallery/albums/awards-1.jpg", caption: "Red carpet arrivals" },
            { id: "3-2", type: "image", url: "/images/gallery/albums/awards-2.jpg", caption: "Best Composer award presentation" },
            { id: "3-3", type: "image", url: "/images/gallery/albums/awards-3.jpg", caption: "Live performance" },
            { id: "3-4", type: "video", url: "/videos/gallery/awards-highlights.mp4", thumbnail: "/images/gallery/albums/awards-video.jpg", caption: "Awards Highlights" }
          ]
        }
      ]
    }
  }
}

export default async function GalleryPage() {
  let galleryData;
  try {
    galleryData = await getGalleryData();
  } catch (error) {
    console.error('Error in GalleryPage:', error);
    // Use fallback data if API call fails
    galleryData = {
      hero: {
        title: "MCSK Gallery",
        description: "Browse photos and videos from our events, performances, and activities.",
        image: "/images/gallery/hero.jpg"
      },
      categories: [
        { id: "1", name: "Events", count: 12 },
        { id: "2", name: "Performances", count: 8 },
        { id: "3", name: "Workshops", count: 5 }
      ],
      albums: [],
      featuredPhotos: []
    };
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[300px]" style={{ backgroundImage: "url('/images/hero/gallery-bg.jpg')" }}>
        <div className="absolute inset-0 bg-[#1a1464]/80"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">MCSK Gallery</h1>
            <p className="text-xl text-white/90 mb-6">
              View photos from MCSK events, workshops, and activities supporting music copyright and artists' rights in Kenya.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Gallery Images */}
            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-64">
              <Image 
                src="/images/gallery/IMG-20250510-WA0050.jpg" 
                alt="MCSK Event" 
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-64">
              <Image 
                src="/images/gallery/IMG-20250510-WA0051.jpg" 
                alt="MCSK Event" 
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-64">
              <Image 
                src="/images/gallery/IMG-20250510-WA0052.jpg" 
                alt="MCSK Event" 
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-64">
              <Image 
                src="/images/gallery/IMG-20250510-WA0053.jpg" 
                alt="MCSK Event" 
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-64">
              <Image 
                src="/images/gallery/IMG-20250510-WA0054.jpg" 
                alt="MCSK Event" 
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-64">
              <Image 
                src="/images/gallery/IMG-20250510-WA0055.jpg" 
                alt="MCSK Event" 
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-64">
              <Image 
                src="/images/gallery/IMG-20250510-WA0056.jpg" 
                alt="MCSK Event" 
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-64">
              <Image 
                src="/images/gallery/IMG-20250510-WA0057.jpg" 
                alt="MCSK Event" 
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}