import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import type { SeoMeta } from '@/types'

export const metadata: Metadata = {
  title: 'SEO Meta | MCSK Admin',
  description: 'Manage website SEO metadata',
}

export default async function SEOMetaPage() {
  let seoMetas: SeoMeta[] = []
  try {
    const dbSeoMetas = await prisma.seoMeta.findMany({
      orderBy: { path: 'asc' },
    })
    seoMetas = dbSeoMetas.map((seoMeta: any) => ({
      id: seoMeta.id,
      path: seoMeta.path || '',
      title: seoMeta.title || '',
      description: seoMeta.description || '',
      keywords: seoMeta.keywords || '',
      ogTitle: seoMeta.ogTitle || '',
      ogDescription: seoMeta.ogDescription || '',
      ogImage: seoMeta.ogImage || '',
      createdAt: seoMeta.createdAt ? seoMeta.createdAt.toISOString() : '',
      updatedAt: seoMeta.updatedAt ? seoMeta.updatedAt.toISOString() : '',
    }))
  } catch (error) {
    console.error("Error fetching SEO metadata:", error)
    seoMetas = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">SEO Meta</h2>
        <Button asChild>
          <Link href="/admin/seo/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={seoMetas}
        searchKey="path"
      />
    </div>
  )
} 