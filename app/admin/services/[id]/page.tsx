import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft, Edit, Calendar, Settings } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'View Service | MCSK Admin',
  description: 'View MCSK service details',
}

interface ViewServicePageProps {
  params: {
    id: string
  }
}

export default async function ViewServicePage({ params }: ViewServicePageProps) {
  const service = await prisma.service.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!service) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">View Service</h2>
        </div>
        <Button asChild>
          <Link href={`/admin/services/${service.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service Icon */}
        <Card>
          <CardHeader>
            <CardTitle>Service Icon</CardTitle>
          </CardHeader>
          <CardContent>
            {service.icon ? (
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <Settings className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-medium">Service Icon</h3>
                  <p className="text-sm text-muted-foreground">{service.icon}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <Settings className="h-8 w-8 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">No Icon Set</h3>
                  <p className="text-sm text-muted-foreground">No icon configured for this service</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              {service.description && (
                <p className="text-muted-foreground mb-4">{service.description}</p>
              )}
              {service.description && (
                <div className="prose max-w-none">
                  <p>{service.description}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={service.isActive ? 'default' : 'secondary'}>
                  {service.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Order</span>
                <span className="text-sm text-muted-foreground">{service.order}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Created</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(service.createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(service.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 