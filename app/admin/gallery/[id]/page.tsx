import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Edit, Calendar, User } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'View Gallery Item | MCSK Admin',
  description: 'View MCSK gallery item details',
}

interface ViewGalleryPageProps {
  params: {
    id: string
  }
}

export default async function ViewGalleryPage({ params }: ViewGalleryPageProps) {
  const gallery = await prisma.gallery.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!gallery) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/gallery">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">View Gallery Item</h2>
        </div>
        <Button asChild>
          <Link href={`/admin/gallery/${gallery.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Media Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {gallery.type === 'image' && gallery.image ? (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={gallery.image}
                  alt={gallery.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Video Content</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{gallery.title}</h3>
              {gallery.description && (
                <p className="text-muted-foreground">{gallery.description}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Type</span>
                <Badge variant="outline">
                  {gallery.type.charAt(0).toUpperCase() + gallery.type.slice(1)}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={gallery.isActive ? 'default' : 'secondary'}>
                  {gallery.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Order</span>
                <span className="text-sm text-muted-foreground">{gallery.order}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Created</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(gallery.createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(gallery.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 