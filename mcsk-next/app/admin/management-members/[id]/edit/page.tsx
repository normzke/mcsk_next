import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ManagementMemberForm } from '../../_components/management-member-form'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Edit Management Member | MCSK Admin',
  description: 'Edit MCSK management member details',
}

interface EditManagementMemberPageProps {
  params: {
    managementMemberId: string
  }
}

export default async function EditManagementMemberPage({ params }: EditManagementMemberPageProps) {
  const managementMember = await prisma.managementMember.findUnique({
    where: {
      id: params.managementMemberId,
    },
  })

  if (!managementMember) {
    notFound()
  }

  const mappedManagementMember = {
    id: managementMember.id,
    name: managementMember.name ?? '',
    position: managementMember.position ?? '',
    image: managementMember.image ?? '',
    bio: managementMember.bio ?? '',
    order: managementMember.order ?? 0,
    isActive: managementMember.isActive ?? true,
    createdAt: managementMember.createdAt,
    updatedAt: managementMember.updatedAt,
    deletedAt: managementMember.deletedAt,
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Management Member</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <ManagementMemberForm initialData={mappedManagementMember} />
      </div>
    </div>
  )
} 