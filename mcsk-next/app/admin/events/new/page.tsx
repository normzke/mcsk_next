import { Metadata } from 'next'
import { EventForm } from '../_components/event-form'

export const metadata: Metadata = {
  title: 'New Event | MCSK Admin',
  description: 'Create a new MCSK event',
}

export default function NewEventPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New Event</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <EventForm />
      </div>
    </div>
  )
} 