import { Metadata } from 'next'
import { BoardMemberForm } from '../_components/board-member-form'

export const metadata: Metadata = {
  title: 'New Board Member | MCSK Admin',
  description: 'Create a new MCSK board member',
}

export default function NewBoardMemberPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New Board Member</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <BoardMemberForm />
      </div>
    </div>
  )
} 