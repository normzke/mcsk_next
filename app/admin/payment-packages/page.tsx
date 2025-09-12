import { Metadata } from 'next'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Payment Packages - Admin Dashboard',
  description: 'Manage payment packages and pricing',
}

async function getData() {
  try {
    const packages = await prisma.paymentPackage.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        order: 'asc',
      },
    })

    return packages.map(pkg => ({
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      amount: pkg.amount.toString(),
      currency: pkg.currency,
      duration: pkg.duration,
      isActive: pkg.isActive,
      order: pkg.order,
      createdAt: pkg.createdAt,
      updatedAt: pkg.updatedAt,
    }))
  } catch (error) {
    console.error('Error fetching payment packages:', error)
    return []
  }
}

export default async function PaymentPackagesPage() {
  const data = await getData()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payment Packages</h2>
          <p className="text-muted-foreground">
            Manage payment packages and pricing for membership types
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/admin/payment-packages/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Package
            </Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
} 