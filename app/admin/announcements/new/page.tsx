import { Metadata } from "next"
import { AnnouncementForm } from "../_components/announcement-form"
import { createAnnouncement } from "../_actions/create-announcement"

export const metadata: Metadata = {
  title: "New Announcement | MCSK Admin",
  description: "Create a new MCSK announcement",
}

export default function NewAnnouncementPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New Announcement</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <AnnouncementForm />
      </div>
    </div>
  )
} 