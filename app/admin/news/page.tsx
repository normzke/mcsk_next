import { Metadata } from 'next'
import { DataTable } from '@/components/admin/DataTable'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import type { News } from '@/types'

export const metadata: Metadata = {
  title: 'News | MCSK Admin',
  description: 'Manage MCSK news articles',
}

export default async function NewsPage() {
  let news: News[] = []
  try {
    const dbNews = await prisma.news.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    // Map Prisma News items to the News interface from types/index.ts
    news = dbNews.map((item: any) => ({
      id: item.id,
      title: item.title || '',
      excerpt: item.excerpt || '',
      image: item.image || '',
      slug: item.slug || '',
      content: item.content || '',
      category: item.category || '',
      isActive: item.isActive ?? true,
      createdAt: item.createdAt ? item.createdAt.toISOString() : '',
      updatedAt: item.updatedAt ? item.updatedAt.toISOString() : '',
      deletedAt: item.deletedAt ? item.deletedAt.toISOString() : null,
      // Optional fields
      is_active: item.is_active,
      is_featured: item.is_featured,
      published_at: item.published_at ? (item.published_at instanceof Date ? item.published_at.toISOString() : item.published_at) : undefined,
      tags: Array.isArray(item.tags) ? item.tags : undefined
    }))
  } catch (error) {
    console.error("Error fetching news:", error)
    news = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">News</h2>
        <Link href="/admin/news/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add News
          </Button>
        </Link>
      </div>

      <DataTable data={news} columns={columns} searchKey="title" />
    </div>
  )
} 