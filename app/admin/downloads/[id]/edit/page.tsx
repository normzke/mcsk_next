import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DownloadForm } from '../../_components/download-form'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Edit Download | MCSK Admin',
  description: 'Edit MCSK download details',
}

interface EditDownloadPageProps {
  params: {
    id: string
  }
}

export default async function EditDownloadPage({ params }: EditDownloadPageProps) {
  const download = await prisma.download.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!download) {
    notFound()
  }

  const mappedDownload = {
    id: download.id,
    title: download.title,
    description: download.description ?? '',
    file: download.file ?? '',
    order: download.order ?? 0,
    downloads: download.downloads ?? 0,
    isActive: download.isActive ?? true,
    createdAt: download.createdAt.toISOString(),
    updatedAt: download.updatedAt.toISOString(),
    deletedAt: download.deletedAt?.toISOString() ?? null,
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Download</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <DownloadForm initialData={mappedDownload} />
      </div>
    </div>
  )
} 