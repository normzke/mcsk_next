import { Metadata } from "next"
import EventsContent from "./components/events-content"

export const metadata: Metadata = {
  title: "Events | Music Copyright Society of Kenya",
  description: "Stay updated with MCSK's upcoming events, workshops, meetings, and music industry gatherings.",
  keywords: "MCSK events, music events, workshops, meetings, industry events, Kenya music",
  openGraph: {
    title: "Events | Music Copyright Society of Kenya",
    description: "Stay updated with MCSK's upcoming events, workshops, meetings, and music industry gatherings.",
    url: "https://mcsk.or.ke/events",
    siteName: "Music Copyright Society of Kenya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events | Music Copyright Society of Kenya",
    description: "Stay updated with MCSK's upcoming events, workshops, meetings, and music industry gatherings.",
  },
  alternates: {
    canonical: "https://mcsk.or.ke/events",
  },
}

async function getEventsData() {
  try {
    // Use relative URL for API route within the same Next.js app
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/events`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch events data: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching events data:', error)
    // Return fallback data instead of null to ensure the page always renders
    return {
      hero: {
        title: "MCSK Events",
        description: "Stay updated with our latest events, workshops, and industry gatherings.",
        image: "/images/events/hero.jpg"
      },
      featuredEvent: {
        id: "1",
        title: "Annual General Meeting 2024",
        description: "Join us for our Annual General Meeting where we'll discuss achievements, challenges, and plans for the coming year.",
        date: "2024-06-15T09:00:00Z",
        location: "Kenyatta International Convention Centre, Nairobi",
        image: "/images/events/agm.jpg",
        registrationUrl: "/events/agm-2024/register"
      },
      upcomingEvents: [
        {
          id: "2",
          title: "Music Rights Workshop",
          description: "Learn about your rights as a music creator and how to protect your intellectual property.",
          date: "2024-07-10T14:00:00Z",
          location: "MCSK Headquarters, Westlands, Nairobi",
          image: "/images/events/workshop.jpg",
          category: "Workshop"
        },
        {
          id: "3",
          title: "Regional Members Meeting - Mombasa",
          description: "Meeting for MCSK members in the Coast region to discuss local issues and opportunities.",
          date: "2024-07-25T10:00:00Z",
          location: "Sarova Whitesands Beach Resort, Mombasa",
          image: "/images/events/regional-meeting.jpg",
          category: "Meeting"
        },
        {
          id: "4",
          title: "Digital Music Distribution Seminar",
          description: "Learn about digital platforms, streaming services, and how to maximize your music's reach.",
          date: "2024-08-05T09:00:00Z",
          location: "iHub, Nairobi",
          image: "/images/events/digital-seminar.jpg",
          category: "Seminar"
        }
      ],
      pastEvents: [
        {
          id: "5",
          title: "Copyright Law Symposium",
          description: "A discussion on recent changes to copyright law and their impact on musicians.",
          date: "2024-05-20T09:00:00Z",
          location: "University of Nairobi, Main Campus",
          image: "/images/events/law-symposium.jpg",
          category: "Symposium"
        },
        {
          id: "6",
          title: "Music Industry Networking Event",
          description: "Connect with fellow musicians, producers, and industry professionals.",
          date: "2024-04-15T18:00:00Z",
          location: "Kiza Lounge, Nairobi",
          image: "/images/events/networking.jpg",
          category: "Networking"
        }
      ],
      categories: [
        { id: "1", name: "Workshop", count: 5 },
        { id: "2", name: "Meeting", count: 3 },
        { id: "3", name: "Seminar", count: 4 },
        { id: "4", name: "Symposium", count: 2 },
        { id: "5", name: "Networking", count: 3 }
      ]
    }
  }
}

export default async function EventsPage() {
  let eventsData;
  try {
    eventsData = await getEventsData();
  } catch (error) {
    console.error('Error in EventsPage:', error);
    // Use fallback data if API call fails
    eventsData = {
      hero: {
        title: "MCSK Events",
        description: "Stay updated with our latest events, workshops, and industry gatherings.",
        image: "/images/events/hero.jpg"
      },
      featuredEvent: {
        id: "1",
        title: "Annual General Meeting 2024",
        description: "Join us for our Annual General Meeting where we'll discuss achievements, challenges, and plans for the coming year.",
        date: "2024-06-15T09:00:00Z",
        location: "Kenyatta International Convention Centre, Nairobi",
        image: "/images/events/agm.jpg",
        category: "Meeting"
      },
      upcomingEvents: [],
      pastEvents: [],
      categories: [
        { id: "1", name: "Workshop", count: 5 },
        { id: "2", name: "Meeting", count: 3 },
        { id: "3", name: "Seminar", count: 4 }
      ]
    };
  }
  return <EventsContent initialData={eventsData} />
}