import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GalleryForm } from '../../_components/gallery-form'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Edit Gallery Item | MCSK Admin',
  description: 'Edit MCSK gallery item details',
}

interface EditGalleryPageProps {
  params: {
    id: string
  }
}

export default async function EditGalleryPage({ params }: EditGalleryPageProps) {
  const gallery = await prisma.gallery.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!gallery) {
    notFound()
  }

  const mappedGallery = {
    id: gallery.id,
    title: gallery.title,
    url: gallery.image ?? '',
    type: (gallery.type as 'image' | 'video') ?? 'image',
    isActive: gallery.isActive ?? true,
    createdAt: gallery.createdAt,
    updatedAt: gallery.updatedAt,
    deletedAt: gallery.deletedAt,
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Gallery Item</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <GalleryForm initialData={mappedGallery} />
      </div>
    </div>
  )
} 