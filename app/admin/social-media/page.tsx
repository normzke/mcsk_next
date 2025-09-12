import { Metadata } from 'next'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Social Media - Admin Dashboard',
  description: 'Manage social media handles and posts',
}

async function getData() {
  try {
    const socialMedia = await prisma.socialMedia.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        order: 'asc',
      },
    })

    return socialMedia.map(item => ({
      id: item.id,
      platform: item.platform,
      handle: item.handle,
      url: item.url,
      isActive: item.isActive,
      order: item.order,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }))
  } catch (error) {
    console.error('Error fetching social media:', error)
    return []
  }
}

export default async function SocialMediaPage() {
  const data = await getData()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Social Media</h2>
          <p className="text-muted-foreground">
            Manage social media handles and posts
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/admin/social-media/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Social Handle
            </Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
} 