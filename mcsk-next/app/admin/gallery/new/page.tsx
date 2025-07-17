import { Metadata } from 'next'
import { GalleryForm } from '../_components/gallery-form'

export const metadata: Metadata = {
  title: 'New Gallery Item | MCSK Admin',
  description: 'Create a new MCSK gallery item',
}

export default function NewGalleryPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New Gallery Item</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <GalleryForm />
      </div>
    </div>
  )
} 