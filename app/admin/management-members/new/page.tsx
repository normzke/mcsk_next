import { Metadata } from 'next'
import { ManagementMemberForm } from '../_components/management-member-form'

export const metadata: Metadata = {
  title: 'New Management Member | MCSK Admin',
  description: 'Create a new MCSK management member',
}

export default function NewManagementMemberPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New Management Member</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <ManagementMemberForm />
      </div>
    </div>
  )
} 