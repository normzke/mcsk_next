import { Metadata } from 'next'
import { NewsForm } from '../_components/news-form'

export const metadata: Metadata = {
  title: 'Add News | MCSK Admin',
  description: 'Add a new news article',
}

export default function NewNewsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Add News</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <NewsForm />
      </div>
    </div>
  )
} 