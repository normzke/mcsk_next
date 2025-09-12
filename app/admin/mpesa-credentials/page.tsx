import { Metadata } from 'next'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'M-Pesa Credentials - Admin Dashboard',
  description: 'Manage M-Pesa payment credentials',
}

async function getData() {
  try {
    const credentials = await prisma.mpesaCredentials.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        environment: 'asc',
      },
    })

    return credentials.map(cred => ({
      id: cred.id,
      environment: cred.environment,
      businessName: cred.businessName,
      shortcode: cred.shortcode,
      isActive: cred.isActive,
      createdAt: cred.createdAt,
      updatedAt: cred.updatedAt,
    }))
  } catch (error) {
    console.error('Error fetching M-Pesa credentials:', error)
    return []
  }
}

export default async function MpesaCredentialsPage() {
  const data = await getData()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">M-Pesa Credentials</h2>
          <p className="text-muted-foreground">
            Manage M-Pesa payment gateway credentials for sandbox and production environments
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/admin/mpesa-credentials/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Credentials
            </Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
} 