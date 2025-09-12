import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft, Edit, Calendar, FileText } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'View Page | MCSK Admin',
  description: 'View MCSK page details',
}

interface ViewPagePageProps {
  params: {
    id: string
  }
}

export default async function ViewPagePage({ params }: ViewPagePageProps) {
  const page = await prisma.page.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!page) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/pages">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Pages
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">View Page</h2>
        </div>
        <Button asChild>
          <Link href={`/admin/pages/${page.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Page Info */}
        <Card>
          <CardHeader>
            <CardTitle>Page Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-medium">Static Page</h3>
                <p className="text-sm text-muted-foreground">Content and metadata</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle>Page Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{page.title}</h3>
              {page.metaDescription && (
                <p className="text-muted-foreground mb-4">{page.metaDescription}</p>
              )}
              {page.content && (
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: page.content }} />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={page.isActive ? 'default' : 'secondary'}>
                  {page.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Slug</span>
                <span className="text-sm text-muted-foreground">{page.slug}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Created</span>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDate(page.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(page.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 