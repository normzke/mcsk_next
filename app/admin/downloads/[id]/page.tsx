import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft, Edit, Download, Calendar, FileText } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'View Download | MCSK Admin',
  description: 'View MCSK download details',
}

interface ViewDownloadPageProps {
  params: {
    id: string
  }
}

export default async function ViewDownloadPage({ params }: ViewDownloadPageProps) {
  const download = await prisma.download.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!download) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/downloads">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Downloads
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">View Download</h2>
        </div>
        <Button asChild>
          <Link href={`/admin/downloads/${download.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* File Preview */}
        <Card>
          <CardHeader>
            <CardTitle>File Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <FileText className="h-8 w-8 text-blue-500" />
              <div className="flex-1">
                <h3 className="font-medium">Download File</h3>
                <p className="text-sm text-muted-foreground">
                  {download.file ? download.file.split('/').pop() : 'No file uploaded'}
                </p>
              </div>
              {download.file && (
                <Button size="sm" asChild>
                  <a href={download.file} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle>Download Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{download.title}</h3>
              {download.description && (
                <p className="text-muted-foreground">{download.description}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={download.isActive ? 'default' : 'secondary'}>
                  {download.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Order</span>
                <span className="text-sm text-muted-foreground">{download.order}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Downloads Count</span>
                <span className="text-sm text-muted-foreground">{download.downloads || 0}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Created</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(download.createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(download.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 