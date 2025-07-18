import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import type { Faq } from '@/types'

export const metadata: Metadata = {
  title: 'FAQs | MCSK Admin',
  description: 'Manage MCSK frequently asked questions',
}

export default async function FAQsPage() {
  const dbFaqs = await prisma.faq.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  const faqs = dbFaqs.map((faq: any) => ({
    ...faq,
    createdAt: faq.createdAt instanceof Date ? faq.createdAt.toISOString() : faq.createdAt,
    updatedAt: faq.updatedAt instanceof Date ? faq.updatedAt.toISOString() : faq.updatedAt,
    deletedAt: faq.deletedAt ? (faq.deletedAt instanceof Date ? faq.deletedAt.toISOString() : faq.deletedAt) : null,
  }))

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">FAQs</h2>
        <Button asChild>
          <Link href="/admin/faqs/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={faqs}
        searchKey="question"
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