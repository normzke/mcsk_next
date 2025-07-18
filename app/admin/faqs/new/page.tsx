import { Metadata } from 'next'
import { FAQForm } from '../_components/faq-form'

export const metadata: Metadata = {
  title: 'New FAQ | MCSK Admin',
  description: 'Create a new MCSK FAQ',
}

export default function NewFAQPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New FAQ</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <FAQForm />
      </div>
    </div>
  )
} 