import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PartnerForm } from '../../_components/partner-form'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Edit Partner | MCSK Admin',
  description: 'Edit MCSK partner details',
}

interface EditPartnerPageProps {
  params: {
    id: string
  }
}

export default async function EditPartnerPage({ params }: EditPartnerPageProps) {
  const partner = await prisma.partner.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!partner) {
    notFound()
  }

  const mappedPartner = {
    id: partner.id,
    name: partner.name,
    logo: partner.logo ?? '',
    website: partner.website ?? '',
    order: partner.order ?? 0,
    isActive: partner.isActive ?? true,
    createdAt: partner.createdAt,
    updatedAt: partner.updatedAt,
    deletedAt: partner.deletedAt,
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Partner</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <PartnerForm initialData={mappedPartner} />
      </div>
    </div>
  )
} 