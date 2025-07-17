import { Metadata } from 'next'
import { PartnerForm } from '../_components/partner-form'

export const metadata: Metadata = {
  title: 'New Partner | MCSK Admin',
  description: 'Create a new MCSK partner',
}

export default function NewPartnerPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New Partner</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <PartnerForm />
      </div>
    </div>
  )
} 