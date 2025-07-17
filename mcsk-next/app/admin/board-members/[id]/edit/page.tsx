import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BoardMemberForm } from '../../_components/board-member-form'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Edit Board Member | MCSK Admin',
  description: 'Edit MCSK board member details',
}

interface EditBoardMemberPageProps {
  params: {
    id: string
  }
}

export default async function EditBoardMemberPage({ params }: EditBoardMemberPageProps) {
  const boardMember = await prisma.boardMember.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!boardMember) {
    notFound()
  }

  const mappedBoardMember = {
    id: boardMember.id,
    name: boardMember.name ?? '',
    position: boardMember.position ?? '',
    image: boardMember.image ?? '',
    bio: boardMember.bio ?? '',
    order: boardMember.order ?? 0,
    isActive: boardMember.isActive ?? true,
    createdAt: boardMember.createdAt,
    updatedAt: boardMember.updatedAt,
    deletedAt: boardMember.deletedAt,
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Board Member</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <BoardMemberForm initialData={mappedBoardMember} />
      </div>
    </div>
  )
} 