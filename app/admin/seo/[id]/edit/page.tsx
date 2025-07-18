import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SEOForm } from '../../_components/seo-form'
import type { SeoMeta } from '@/types'

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
  const seoMeta = await prisma.seoMeta.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!seoMeta) {
    notFound()
  }

  const mappedSeoMeta: SeoMeta = {
    id: seoMeta.id,
    path: seoMeta.path || '',
    title: seoMeta.title || null,
    description: seoMeta.description || null,
    keywords: seoMeta.keywords || null,
    ogTitle: seoMeta.ogTitle || null,
    ogDescription: seoMeta.ogDescription || null,
    ogImage: seoMeta.ogImage || null,
    createdAt: seoMeta.createdAt.toISOString(),
    updatedAt: seoMeta.updatedAt.toISOString(),
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit SEO Meta</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <SEOForm initialData={mappedSeoMeta} />
      </div>
    </div>
  )
} 