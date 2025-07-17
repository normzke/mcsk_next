import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AnnouncementForm } from '../../_components/announcement-form'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Edit Announcement | MCSK Admin',
  description: 'Edit MCSK announcement details',
}

interface EditAnnouncementPageProps {
  params: {
    id: string
  }
}

export default async function EditAnnouncementPage({ params }: EditAnnouncementPageProps) {
  const announcement = await prisma.announcement.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!announcement) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Announcement</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <AnnouncementForm initialData={announcement} />
      </div>
    </div>
  )
} 