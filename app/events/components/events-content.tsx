'use client'

import { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format } from 'date-fns'
import { parse } from 'date-fns'
import { startOfWeek } from 'date-fns'
import { getDay } from 'date-fns'
import PageHeader from '@/components/ui/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar as CalendarIcon, MapPin, Clock, Users } from 'lucide-react'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': require('date-fns/locale/en-US'),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

type Event = {
  id: string
  title: string
  start: Date
  end: Date
  location: string
  description: string
  category: string
  capacity: number
  registrationRequired: boolean
}

type EventsData = {
  hero: {
    title: string
    description: string
    image: string
  }
  categories: Array<{
    name: string
    description: string
    color: string
  }>
  events: Event[]
}

export default function EventsContent({ initialData }: { initialData: EventsData }) {
  // Create fallback data for when properties are undefined
  const fallbackData = {
    hero: {
      title: "MCSK Events",
      description: "Stay updated with our latest events, workshops, and industry gatherings.",
      image: "/images/events/hero.jpg"
    },
    featuredEvent: null,
    upcomingEvents: [],
    pastEvents: [],
    categories: [],
    events: []
  };

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  if (!initialData) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Error Loading Events
            </h1>
            <p className="text-slate-600">
              Sorry, we couldn't load the events data. Please try again later.
            </p>
          </div>
        </div>
      </main>
    )
  }

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event)
  }

  const eventStyleGetter = (event: Event) => {
    const category = initialData?.categories?.find(cat => cat.name === event.category)
    return {
      style: {
        backgroundColor: category?.color || '#2563eb',
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    }
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        title={initialData?.hero?.title || fallbackData.hero.title}
        description={initialData?.hero?.description || fallbackData.hero.description}
        image={initialData?.hero?.image || fallbackData.hero.image}
      />

      {/* Calendar Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <div className="flex gap-4 mb-6">
              {(initialData?.categories || []).map((category: any, index: number) => (
                <Badge
                  key={index}
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
          <Card className="p-6">
            <div style={{ height: '600px' }}>
              <Calendar
                localizer={localizer}
                events={initialData.events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
                views={['month', 'week', 'day', 'agenda']}
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(initialData?.events || []).map((event: any) => (
              <Card key={event.id} className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <Badge
                      style={{
                        backgroundColor: initialData.categories.find(
                          cat => cat.name === event.category
                        )?.color
                      }}
                    >
                      {event.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{event.title}</h3>
                  <div className="space-y-3 text-slate-600 flex-grow">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-blue-600" />
                      <span>{format(new Date(event.start), 'MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-blue-600" />
                      <span>
                        {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-600" />
                      <span>Capacity: {event.capacity}</span>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-6">View Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{event.title}</DialogTitle>
                        <DialogDescription>
                          <div className="space-y-4 mt-4">
                            <p>{event.description}</p>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <CalendarIcon className="h-5 w-5 mr-2 text-blue-600" />
                                <span>{format(new Date(event.start), 'MMMM d, yyyy')}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                                <span>
                                  {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-5 w-5 mr-2 text-blue-600" />
                                <span>Capacity: {event.capacity}</span>
                              </div>
                            </div>
                            {event.registrationRequired && (
                              <Button className="w-full mt-4">Register Now</Button>
                            )}
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Event Categories</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {(initialData?.categories || []).map((category: any, index: number) => (
              <Card
                key={index}
                className="p-6"
                style={{
                  backgroundColor: `${category.color}10`,
                  borderColor: `${category.color}33`
                }}
              >
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: category.color }}
                >
                  {category.name}
                </h3>
                <p className="text-slate-600">
                  {category.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 