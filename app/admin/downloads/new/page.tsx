import { Metadata } from 'next'
import { DownloadForm } from '../_components/download-form'

export const metadata: Metadata = {
  title: 'New Download | MCSK Admin',
  description: 'Create a new MCSK download',
}

export default function NewDownloadPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New Download</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <DownloadForm />
      </div>
    </div>
  )
} 