import { Metadata } from 'next'
import { ServiceForm } from '../_components/service-form'

export const metadata: Metadata = {
  title: 'New Service | MCSK Admin',
  description: 'Create a new MCSK service',
}

export default function NewServicePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New Service</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <ServiceForm />
      </div>
    </div>
  )
} 