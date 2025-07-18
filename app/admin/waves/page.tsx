import { Metadata } from 'next'
import { DataTable } from '@/components/ui/data-table'
import { columns, Wave } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Waves | MCSK Admin',
  description: 'Manage MCSK waves',
}

export default async function WavesPage() {
  let waves: Wave[] = []
  try {
    waves = await prisma.wave.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        member: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    })
  } catch (error) {
    console.error("Error fetching waves:", error)
    waves = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Waves</h2>
        <Link href="/admin/waves/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Wave
          </Button>
        </Link>
      </div>

      <DataTable 
        columns={columns} 
        data={waves} 
        searchKey="title"
        filters={[
          {
            key: 'genre',
            label: 'Genre',
            options: [
              { label: 'Pop', value: 'pop' },
              { label: 'Rock', value: 'rock' },
              { label: 'Hip Hop', value: 'hip_hop' },
              { label: 'R&B', value: 'r&b' },
              { label: 'Jazz', value: 'jazz' },
              { label: 'Classical', value: 'classical' },
              { label: 'Gospel', value: 'gospel' },
              { label: 'Reggae', value: 'reggae' },
              { label: 'World', value: 'world' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Active', value: 'true' },
              { label: 'Inactive', value: 'false' },
            ],
          },
          {
            key: 'isFeatured',
            label: 'Featured',
            options: [
              { label: 'Featured', value: 'true' },
              { label: 'Not Featured', value: 'false' },
            ],
          },
        ]}
      />
    </div>
  )
} 