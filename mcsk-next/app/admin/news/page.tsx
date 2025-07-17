import { Metadata } from 'next'
import { DataTable } from '@/components/admin/DataTable'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'News | MCSK Admin',
  description: 'Manage MCSK news articles',
}

export default async function NewsPage() {
  let news = []
  try {
    news = await prisma.news.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    })
  } catch (error) {
    console.error("Error fetching news articles:", error)
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