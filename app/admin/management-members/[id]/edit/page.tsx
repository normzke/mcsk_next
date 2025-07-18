import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ManagementMemberForm } from '../../_components/management-member-form'
import type { ManagementMember } from '@/types'
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
  let member = await prisma.managementMember.findUnique({
    where: {
      id: params.managementMemberId,
    },
  })
  if (!member) {
    notFound()
  }
  // Map to custom type
  const mappedMember: ManagementMember = {
    id: member.id,
    name: member.name || '',
    firstName: member.firstName || '',
    lastName: member.lastName || '',
    email: member.email || '',
    position: member.position || '',
    role: (member.role as 'board_member' | 'executive' | 'director' | 'manager'),
    department: (member.department as 'board' | 'finance' | 'licensing' | 'distribution' | 'legal' | 'operations' | 'it' | 'hr'),
    order: typeof member.order === 'number' ? member.order : 0,
    isActive: typeof member.isActive === 'boolean' ? member.isActive : true,
    status: (member.status as "active" | "inactive" | "on_leave") || 'active',
    createdAt: member.createdAt,
    updatedAt: member.updatedAt,
    deletedAt: member.deletedAt,
    startDate: member.startDate || undefined,
    endDate: member.endDate || undefined,
    profileImage: member.profileImage || '',
    image: member.image || '',
    bio: member.bio || '',
    phone: member.phone || '',
    twitterUrl: member.twitterUrl || '',
    linkedinUrl: member.linkedinUrl || '',
  }
  if (typeof mappedMember.order !== 'number') mappedMember.order = 0;
  if (typeof mappedMember.isActive !== 'boolean') mappedMember.isActive = true;
  return (
    <ManagementMemberForm initialData={mappedMember} />
  )
} 