import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import type { Gallery } from '@/types'

export const metadata: Metadata = {
  title: 'Gallery | MCSK Admin',
  description: 'Manage MCSK gallery',
}

export default async function GalleryPage() {
  let gallery: Gallery[] = []
  try {
    const dbGallery = await prisma.gallery.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        order: 'asc',
      },
    })
    gallery = dbGallery.map((item: any) => ({
      ...item,
      createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
      updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt,
      deletedAt: item.deletedAt ? (item.deletedAt instanceof Date ? item.deletedAt.toISOString() : item.deletedAt) : null,
    }))
  } catch (error) {
    console.error("Error fetching gallery items:", error)
    gallery = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gallery</h2>
        <Button asChild>
          <Link href="/admin/gallery/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={gallery}
        searchKey="title"
        filters={[
          {
            key: 'type',
            label: 'Type',
            options: [
              { label: 'Image', value: 'image' },
              { label: 'Video', value: 'video' },
            ],
          },
          {
            key: 'isActive',
            label: 'Status',
            options: [
              { label: 'Active', value: 'true' },
              { label: 'Inactive', value: 'false' },
            ],
          },
        ]}
      />
    </div>
  )
} 