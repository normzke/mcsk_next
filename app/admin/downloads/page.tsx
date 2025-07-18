import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import type { Download } from '@/types'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Downloads | MCSK Admin',
  description: 'Manage MCSK downloads',
}

export default async function DownloadsPage() {
  let downloads: Download[] = []
  try {
    const dbDownloads = await prisma.download.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    downloads = dbDownloads.map((d: any) => ({
      ...d,
      order: d.order ?? 0,
      createdAt: d.createdAt instanceof Date ? d.createdAt.toISOString() : d.createdAt,
      updatedAt: d.updatedAt instanceof Date ? d.updatedAt.toISOString() : d.updatedAt,
      deletedAt: d.deletedAt ? (d.deletedAt instanceof Date ? d.deletedAt.toISOString() : d.deletedAt) : null,
    }))
  } catch (error) {
    console.error("Error fetching downloads:", error)
    downloads = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Downloads</h2>
        <Button asChild>
          <Link href="/admin/downloads/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={downloads}
        searchKey="title"
        filters={[
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