import { Metadata } from 'next'
import { DataTable } from '@/components/admin/DataTable'
import { columns } from './_components/columns'
import type { Event } from '@/types'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Events | MCSK Admin',
  description: 'Manage MCSK events',
}

export default async function EventsPage() {
  let events: Event[] = []
  try {
    const dbEvents = await prisma.event.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        date: 'desc',
      },
      take: 100,
    })
    events = dbEvents.map((event: any) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date instanceof Date ? event.date.toISOString() : event.date,
      location: event.location ?? null,
      image: event.image ?? null,
      category: event.category ?? null,
      venue: event.venue ?? null,
      startTime: event.startTime ? (event.startTime instanceof Date ? event.startTime.toISOString() : event.startTime) : null,
      endTime: event.endTime ? (event.endTime instanceof Date ? event.endTime.toISOString() : event.endTime) : null,
      isActive: event.isActive,
      createdAt: event.createdAt instanceof Date ? event.createdAt.toISOString() : event.createdAt,
      updatedAt: event.updatedAt instanceof Date ? event.updatedAt.toISOString() : event.updatedAt,
      deletedAt: event.deletedAt ? (event.deletedAt instanceof Date ? event.deletedAt.toISOString() : event.deletedAt) : null,
    }))
  } catch (error) {
    console.error("Error fetching events:", error)
    events = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Events</h2>
        <Link href="/admin/events/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </Link>
      </div>

      <DataTable data={events} columns={columns} searchKey="title" />
    </div>
  )
} 