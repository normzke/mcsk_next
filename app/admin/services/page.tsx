import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import type { Service } from '@/types'

export const metadata: Metadata = {
  title: 'Services | MCSK Admin',
  description: 'Manage MCSK services',
}

export default async function ServicesPage() {
  let services: Service[] = []
  try {
    const dbServices = await prisma.service.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        order: 'asc',
      },
    })
    services = dbServices.map((service: any) => ({
      id: service.id,
      title: service.title || '',
      description: service.description || '',
      icon: service.icon || null,
      order: typeof service.order === 'number' ? service.order : 0,
      isActive: typeof service.isActive === 'boolean' ? service.isActive : true,
      createdAt: service.createdAt.toISOString(),
      updatedAt: service.updatedAt.toISOString(),
      deletedAt: service.deletedAt?.toISOString() ?? null,
    }))
  } catch (error) {
    console.error("Error fetching services:", error)
    services = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={services}
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