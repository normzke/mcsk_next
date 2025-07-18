import { Metadata } from "next"
import { EventForm } from "../_components/event-form"

export const metadata: Metadata = {
  title: "Edit Event - MCSK Admin",
  description: "Edit event details",
}

async function getEvent(id: string) {
  // TODO: Implement API call
  return null
}

export default async function EditEventPage({
  params,
}: {
  params: { id: string }
}) {
  const event = await getEvent(params.id)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Event</h2>
          <p className="text-muted-foreground">
            Update event details and content
          </p>
        </div>
      </div>
      <div className="grid gap-6">
        <EventForm initialData={event} />
      </div>
    </>
  )
} 