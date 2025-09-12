import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Edit, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'View Announcement | MCSK Admin',
  description: 'View MCSK announcement details',
}

interface ViewAnnouncementPageProps {
  params: {
    id: string
  }
}

export default async function ViewAnnouncementPage({ params }: ViewAnnouncementPageProps) {
  const announcement = await prisma.announcement.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!announcement) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/announcements">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Announcements
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">View Announcement</h2>
        </div>
        <Button asChild>
          <Link href={`/admin/announcements/${announcement.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Announcement Image */}
        {announcement.image && (
          <Card>
            <CardHeader>
              <CardTitle>Announcement Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={announcement.image}
                  alt={announcement.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle>Announcement Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{announcement.title}</h3>
              {announcement.description && (
                <p className="text-muted-foreground mb-4">{announcement.description}</p>
              )}
              {announcement.content && (
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={announcement.isActive ? 'default' : 'secondary'}>
                  {announcement.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Created</span>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDate(announcement.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(announcement.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 