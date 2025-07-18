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

  const allowedTypes = ["info", "success", "warning", "danger"] as const;
  const safeType = allowedTypes.includes((announcement as any).type) ? (announcement as any).type : "info";
  const announcementUnified = {
    ...announcement,
    type: safeType,
    publishAt: announcement.publishAt ? new Date(announcement.publishAt).toISOString() : '',
    expireAt: announcement.expireAt ? new Date(announcement.expireAt).toISOString() : null,
    createdAt: announcement.createdAt ? new Date(announcement.createdAt).toISOString() : '',
    updatedAt: announcement.updatedAt ? new Date(announcement.updatedAt).toISOString() : '',
    deletedAt: announcement.deletedAt ? new Date(announcement.deletedAt).toISOString() : null,
    isFeatured: typeof announcement.isFeatured === 'boolean' ? announcement.isFeatured : false,
    isPublished: typeof announcement.isPublished === 'boolean' ? announcement.isPublished : announcement.isActive ?? true,
    buttonText: 'buttonText' in announcement ? (announcement as any).buttonText : null,
    buttonUrl: 'buttonUrl' in announcement ? (announcement as any).buttonUrl : null,
    attachment: 'attachment' in announcement ? (announcement as any).attachment : null,
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Announcement</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <AnnouncementForm initialData={announcementUnified} />
      </div>
    </div>
  )
} 