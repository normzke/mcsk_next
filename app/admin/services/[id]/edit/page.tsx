import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceForm } from '../../_components/service-form'
import { prisma } from '@/lib/prisma'
import type { Service } from '@/types'

export const metadata: Metadata = {
  title: 'Edit Service | MCSK Admin',
  description: 'Edit MCSK service details',
}

interface EditServicePageProps {
  params: {
    id: string
  }
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const service = await prisma.service.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!service) {
    notFound()
  }

  const mappedService: Service = {
    id: service.id,
    title: service.title || '',
    description: service.description || '',
    icon: service.icon || null,
    order: typeof service.order === 'number' ? service.order : 0,
    isActive: typeof service.isActive === 'boolean' ? service.isActive : true,
    createdAt: service.createdAt.toISOString(),
    updatedAt: service.updatedAt.toISOString(),
    deletedAt: service.deletedAt?.toISOString() ?? null,
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Service</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <ServiceForm initialData={mappedService} />
      </div>
    </div>
  )
} 