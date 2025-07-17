import { Metadata } from 'next'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Licenses | MCSK Admin',
  description: 'Manage MCSK licenses',
}

export default async function LicensesPage() {
  try {
    const licenses = await prisma.license.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        licenseType: {
          select: {
            id: true,
            title: true,
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    })

    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Licenses</h2>
          <Link href="/admin/licenses/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add License
            </Button>
          </Link>
        </div>

        <DataTable 
          data={licenses} 
          columns={columns} 
          searchKey="licenseNumber" 
          searchPlaceholder="Search by license number..."
        />
      </div>
    )
  } catch (error) {
    console.error('Error fetching licenses:', error)
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Licenses</h2>
          <Link href="/admin/licenses/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add License
            </Button>
          </Link>
        </div>
        <div className="rounded-md border bg-white p-8">
          <p className="text-red-500">Error loading licenses. Please try again later.</p>
        </div>
      </div>
    )
  }
} 