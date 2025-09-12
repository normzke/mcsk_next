import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch events from database
    const dbEvents = await prisma.event.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Separate upcoming and past events
    const now = new Date();
    const upcomingEvents = dbEvents
      .filter(event => new Date(event.date) > now)
      .map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date.toISOString(),
        endDate: event.endTime ? event.endTime.toISOString() : null,
        location: event.location || 'TBD',
        image: event.image || '/images/events/default.jpg',
        category: event.category || 'Event',
        isVirtual: false,
        registrationRequired: false,
        registrationLink: null,
        contact: {
          name: "MCSK Secretariat",
          email: "events@mcsk.org",
          phone: "+254 20 XXX XXXX"
        }
      }));

    const pastEvents = dbEvents
      .filter(event => new Date(event.date) <= now)
      .map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date.toISOString(),
        endDate: event.endTime ? event.endTime.toISOString() : null,
        location: event.location || 'TBD',
        image: event.image || '/images/events/default.jpg',
        category: event.category || 'Event',
        highlights: []
      }));

    const eventsData = {
      hero: {
        title: "Events & Calendar",
        description: "Stay updated on MCSK events, workshops, and important dates for members.",
        image: "/images/events/hero.jpg"
      },
      upcomingEvents,
      pastEvents,
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