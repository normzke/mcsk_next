import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageForm } from '../../_components/page-form'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Edit Page | MCSK Admin',
  description: 'Edit MCSK page details',
}

interface EditPagePageProps {
  params: {
    id: string
  }
}

export default async function EditPagePage({ params }: EditPagePageProps) {
  const page = await prisma.page.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!page) {
    notFound()
  }

  const mappedPage = {
    id: page.id,
    title: page.title ?? '',
    content: page.content ?? '',
    slug: page.slug ?? '',
    isActive: page.isActive ?? true,
    createdAt: page.createdAt,
    updatedAt: page.updatedAt,
    deletedAt: page.deletedAt,
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Page</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <PageForm initialData={mappedPage} />
      </div>
    </div>
  )
} 