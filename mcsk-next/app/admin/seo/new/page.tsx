import { Metadata } from 'next'
import { SEOForm } from '../_components/seo-form'

export const metadata: Metadata = {
  title: 'New SEO Meta | MCSK Admin',
  description: 'Create a new SEO meta entry',
}

export default function NewSEOMetaPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New SEO Meta</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <SEOForm />
      </div>
    </div>
  )
} 