import { Metadata } from 'next'
import { DataTable } from '@/components/admin/DataTable'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Announcements | MCSK Admin',
  description: 'Manage MCSK announcements',
}

export default async function AnnouncementsPage() {
  let announcements: any[] = []
  try {
    announcements = await prisma.announcement.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    })
  } catch (error) {
    console.error("Error fetching announcements:", error)
    announcements = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
        <Link href="/admin/announcements/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Announcement
          </Button>
        </Link>
      </div>

      <DataTable data={announcements} columns={columns} searchKey="title" />
    </div>
  )
} 