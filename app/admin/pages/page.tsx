import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import type { Page } from '@/types'

export const metadata: Metadata = {
  title: 'Pages | MCSK Admin',
  description: 'Manage MCSK pages',
}

export default async function PagesPage() {
  let pages: Page[] = []
  try {
    const dbPages = await prisma.page.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    pages = dbPages.map((page: any) => ({
      id: page.id,
      title: page.title || '',
      content: page.content || '',
      slug: page.slug || '',
      isActive: typeof page.isActive === 'boolean' ? page.isActive : true,
      createdAt: page.createdAt ? page.createdAt.toISOString() : '',
      updatedAt: page.updatedAt ? page.updatedAt.toISOString() : '',
      deletedAt: page.deletedAt ? page.deletedAt.toISOString() : null,
    }))
  } catch (error) {
    console.error("Error fetching pages:", error)
    pages = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pages</h2>
        <Button asChild>
          <Link href="/admin/pages/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={pages}
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