import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EventForm } from '../../_components/event-form'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Edit Event | MCSK Admin',
  description: 'Edit MCSK event details',
}

interface EditEventPageProps {
  params: {
    id: string
  }
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const event = await prisma.event.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!event) {
    notFound()
  }

  // Map Prisma event to unified Event type
  const mappedEvent = {
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date.toISOString(),
    location: event.location ?? null,
    image: event.image ?? null,
    category: event.category ?? null,
    venue: event.venue ?? null,
    startTime: event.startTime ? event.startTime.toISOString() : null,
    endTime: event.endTime ? event.endTime.toISOString() : null,
    isActive: event.isActive,
    createdAt: event.createdAt.toISOString(),
    updatedAt: event.updatedAt.toISOString(),
    deletedAt: event.deletedAt ? event.deletedAt.toISOString() : null,
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Event</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <EventForm initialData={mappedEvent} />
      </div>
    </div>
  )
} 