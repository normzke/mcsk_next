import { Metadata } from 'next'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { prisma } from '@/lib/prisma'
import type { License } from '@/types'

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

    const formattedLicenses = licenses.map((license: any) => ({
      ...license,
      licenseNumber: license.licenseNumber || '',
      status: license.status as 'pending' | 'approved' | 'rejected',
      issuedAt: license.issuedAt instanceof Date ? license.issuedAt.toISOString() : license.issuedAt,
      expiresAt: license.expiresAt instanceof Date ? license.expiresAt.toISOString() : license.expiresAt,
      createdAt: license.createdAt instanceof Date ? license.createdAt.toISOString() : license.createdAt,
      updatedAt: license.updatedAt instanceof Date ? license.updatedAt.toISOString() : license.updatedAt,
      deletedAt: license.deletedAt ? (license.deletedAt instanceof Date ? license.deletedAt.toISOString() : license.deletedAt) : null,
    }))

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
          data={formattedLicenses} 
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