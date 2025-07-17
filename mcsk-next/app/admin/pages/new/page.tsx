import { Metadata } from 'next'
import { PageForm } from '../_components/page-form'

export const metadata: Metadata = {
  title: 'New Page | MCSK Admin',
  description: 'Create a new MCSK page',
}

export default function NewPagePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New Page</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <PageForm />
      </div>
    </div>
  )
} 