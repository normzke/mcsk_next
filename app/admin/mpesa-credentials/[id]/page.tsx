import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Shield, CreditCard } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'M-Pesa Credentials Details - Admin Dashboard',
  description: 'View M-Pesa credentials details',
}

interface MpesaCredentialsPageProps {
  params: {
    id: string
  }
}

async function getMpesaCredentials(id: string) {
  const mpesaCredentials = await prisma.mpesaCredentials.findUnique({
    where: { id },
  })

  if (!mpesaCredentials) {
    notFound()
  }

  return mpesaCredentials
}

export default async function MpesaCredentialsPage({ params }: MpesaCredentialsPageProps) {
  const mpesaCredentials = await getMpesaCredentials(params.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Link href="/admin/mpesa-credentials">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">M-Pesa Credentials Details</h2>
          <p className="text-muted-foreground">View M-Pesa API credentials information</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-yellow-600" />
          <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
        </div>
        <p className="text-sm text-yellow-700 mt-1">
          These credentials are used for M-Pesa payment processing. Ensure they are kept secure and not shared publicly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Environment</h3>
            <Badge variant={mpesaCredentials.environment === 'production' ? 'default' : 'secondary'}>
              {mpesaCredentials.environment}
            </Badge>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Business Name</h3>
            <p className="text-lg">{mpesaCredentials.businessName}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Shortcode</h3>
            <p className="text-lg font-mono">{mpesaCredentials.shortcode}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Consumer Key</h3>
            <p className="text-lg font-mono text-gray-600">••••••••••••••••</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Status</h3>
            {mpesaCredentials.isActive ? (
              <Badge className="text-sm">Active</Badge>
            ) : (
              <Badge variant="secondary" className="text-sm">Inactive</Badge>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Consumer Secret</h3>
            <p className="text-lg font-mono text-gray-600">••••••••••••••••</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Passkey</h3>
            <p className="text-lg font-mono text-gray-600">••••••••••••••••</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Created</h3>
            <p className="text-lg">{mpesaCredentials.createdAt.toLocaleDateString()}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Last Updated</h3>
            <p className="text-lg">{mpesaCredentials.updatedAt.toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Link href="/admin/mpesa-credentials">
          <Button variant="outline">Back to List</Button>
        </Link>
        <Link href={`/admin/mpesa-credentials/${mpesaCredentials.id}/edit`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </Link>
      </div>
    </div>
  )
} 