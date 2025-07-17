import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SEOForm } from '../../_components/seo-form'

export const metadata: Metadata = {
  title: 'Edit SEO Meta | MCSK Admin',
  description: 'Edit SEO meta details',
}

interface EditSEOMetaPageProps {
  params: {
    id: string
  }
}

export default async function EditSEOMetaPage({ params }: EditSEOMetaPageProps) {
  const seoMeta = await prisma.sEOMeta.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!seoMeta) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit SEO Meta</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <SEOForm initialData={seoMeta} />
      </div>
    </div>
  )
} 