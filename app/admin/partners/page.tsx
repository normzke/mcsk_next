import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import type { Partner } from '@/types'

export const metadata: Metadata = {
  title: 'Partners | MCSK Admin',
  description: 'Manage MCSK partners',
}

export default async function PartnersPage() {
  let partners: Partner[] = []
  try {
    const dbPartners = await prisma.partner.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        order: 'asc',
      },
    })
    partners = dbPartners.map((partner: any) => ({
      id: partner.id,
      name: partner.name || '',
      website: partner.website || '',
      logo: partner.logo || '',
      order: typeof partner.order === 'number' ? partner.order : 0,
      createdAt: partner.createdAt ? partner.createdAt.toISOString() : '',
      updatedAt: partner.updatedAt ? partner.updatedAt.toISOString() : '',
      deletedAt: partner.deletedAt ? partner.deletedAt.toISOString() : null,
    }))
  } catch (error) {
    console.error("Error fetching partners:", error)
    partners = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Partners</h2>
        <Button asChild>
          <Link href="/admin/partners/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={partners}
        searchKey="name"
        filters={[
          {
            key: 'isActive',
            label: 'Active',
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