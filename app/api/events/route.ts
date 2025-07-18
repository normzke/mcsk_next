import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for events
    const eventsData = {
      hero: {
        title: "Events & Calendar",
        description: "Stay updated on MCSK events, workshops, and important dates for members.",
        image: "/images/events/hero.jpg"
      },
      upcomingEvents: [
        {
          id: "1",
          title: "Annual General Meeting 2024",
          description: "Join us for the MCSK Annual General Meeting where we will discuss achievements, challenges, and plans for the coming year.",
          date: "2024-07-15T09:00:00.000Z",
          endDate: "2024-07-15T16:00:00.000Z",
          location: "Kenyatta International Convention Centre, Nairobi",
          image: "/images/events/agm.jpg",
          category: "Meeting",
          isVirtual: false,
          registrationRequired: true,
          registrationLink: "/events/register/agm-2024",
          contact: {
            name: "MCSK Secretariat",
            email: "events@mcsk.or.ke",
            phone: "+254 20 XXX XXXX"
          }
        },
        {
          id: "2",
          title: "Music Rights Workshop",
          description: "A comprehensive workshop on music rights, royalties, and copyright protection for musicians and producers.",
          date: "2024-06-20T10:00:00.000Z",
          endDate: "2024-06-20T15:00:00.000Z",
          location: "Sarova Stanley Hotel, Nairobi",
          image: "/images/events/workshop.jpg",
          category: "Workshop",
          isVirtual: false,
          registrationRequired: true,
          registrationLink: "/events/register/rights-workshop-2024",
          contact: {
            name: "Education Department",
            email: "education@mcsk.or.ke",
            phone: "+254 20 XXX XXXX"
          }
        },
        {
          id: "3",
          title: "Digital Music Distribution Webinar",
          description: "Learn about digital music distribution platforms, streaming royalties, and how to maximize your online presence.",
          date: "2024-06-10T14:00:00.000Z",
          endDate: "2024-06-10T16:00:00.000Z",
          location: "Online (Zoom)",
          image: "/images/events/webinar.jpg",
          category: "Webinar",
          isVirtual: true,
          registrationRequired: true,
          registrationLink: "/events/register/digital-distribution-webinar",
          contact: {
            name: "Digital Rights Department",
            email: "digital@mcsk.or.ke",
            phone: "+254 20 XXX XXXX"
          }
        }
      ],
      pastEvents: [
        {
          id: "4",
          title: "MCSK Music Festival",
          description: "Annual music festival showcasing Kenya's top musical talent and celebrating our rich musical heritage.",
          date: "2024-03-25T12:00:00.000Z",
          endDate: "2024-03-25T22:00:00.000Z",
          location: "Uhuru Gardens, Nairobi",
          image: "/images/events/festival.jpg",
          category: "Festival",
          highlights: [
            "/images/events/festival-highlight1.jpg",
            "/images/events/festival-highlight2.jpg",
            "/images/events/festival-highlight3.jpg"
          ]
        },
        {
          id: "5",
          title: "Copyright Law Seminar",
          description: "Seminar on recent changes to copyright law and their implications for musicians and rights holders.",
          date: "2024-02-15T09:00:00.000Z",
          endDate: "2024-02-15T13:00:00.000Z",
          location: "Hilton Hotel, Nairobi",
          image: "/images/events/seminar.jpg",
          category: "Seminar",
          highlights: [
            "/images/events/seminar-highlight1.jpg",
            "/images/events/seminar-highlight2.jpg"
          ]
        }
      ],
      categories: [
        "Meeting",
        "Workshop",
        "Webinar",
        "Festival",
        "Seminar",
        "Conference",
        "Training"
      ],
      calendar: {
        title: "Events Calendar",
        description: "View all upcoming MCSK events in our interactive calendar."
      }
    };

    return NextResponse.json({ data: eventsData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Removed Prisma dependency and event schema validation
    // You may want to add your own validation logic here
    const body = await request.json();
    return NextResponse.json(body, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
} 