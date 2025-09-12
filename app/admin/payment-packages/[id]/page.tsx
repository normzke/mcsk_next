import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, DollarSign } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Payment Package Details - Admin Dashboard',
  description: 'View payment package details',
}

interface PaymentPackagePageProps {
  params: {
    id: string
  }
}

async function getPaymentPackage(id: string) {
  const paymentPackage = await prisma.paymentPackage.findUnique({
    where: { id },
  })

  if (!paymentPackage) {
    notFound()
  }

  return paymentPackage
}

export default async function PaymentPackagePage({ params }: PaymentPackagePageProps) {
  const paymentPackage = await getPaymentPackage(params.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Link href="/admin/payment-packages">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payment Package Details</h2>
          <p className="text-muted-foreground">View payment package information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Package Name</h3>
            <p className="text-lg">{paymentPackage.name}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Amount</h3>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-lg font-semibold">
                {paymentPackage.amount.toString()} {paymentPackage.currency}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Duration</h3>
            <p className="text-lg">{paymentPackage.duration}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-lg whitespace-pre-wrap">{paymentPackage.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Status</h3>
            {paymentPackage.isActive ? (
              <Badge className="text-sm">Active</Badge>
            ) : (
              <Badge variant="secondary" className="text-sm">Inactive</Badge>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Display Order</h3>
            <p className="text-lg">{paymentPackage.order}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Created</h3>
            <p className="text-lg">{paymentPackage.createdAt.toLocaleDateString()}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Last Updated</h3>
            <p className="text-lg">{paymentPackage.updatedAt.toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Link href="/admin/payment-packages">
          <Button variant="outline">Back to List</Button>
        </Link>
        <Link href={`/admin/payment-packages/${paymentPackage.id}/edit`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </Link>
      </div>
    </div>
  )
} 