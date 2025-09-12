import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Edit, ExternalLink, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'View Partner | MCSK Admin',
  description: 'View MCSK partner details',
}

interface ViewPartnerPageProps {
  params: {
    id: string
  }
}

export default async function ViewPartnerPage({ params }: ViewPartnerPageProps) {
  const partner = await prisma.partner.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!partner) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/partners">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Partners
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">View Partner</h2>
        </div>
        <Button asChild>
          <Link href={`/admin/partners/${partner.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logo Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Partner Logo</CardTitle>
          </CardHeader>
          <CardContent>
            {partner.logo ? (
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No logo uploaded</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle>Partner Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>
              {partner.description && (
                <p className="text-muted-foreground">{partner.description}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={partner.isActive ? 'default' : 'secondary'}>
                  {partner.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Order</span>
                <span className="text-sm text-muted-foreground">{partner.order}</span>
              </div>

              {partner.website && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Website</span>
                  <Button size="sm" variant="outline" asChild>
                    <a href={partner.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Created</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(partner.createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(partner.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 