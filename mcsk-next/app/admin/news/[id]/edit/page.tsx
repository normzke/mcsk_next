import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NewsForm } from '../../_components/news-form'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Edit News Article | MCSK Admin',
  description: 'Edit MCSK news article details',
}

interface EditNewsPageProps {
  params: {
    id: string
  }
}

export default async function EditNewsPage({ params }: EditNewsPageProps) {
  const news = await prisma.news.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!news) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit News Article</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <NewsForm initialData={news} />
      </div>
    </div>
  )
} 