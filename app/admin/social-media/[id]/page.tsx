import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ExternalLink, Edit } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Social Media Details - Admin Dashboard',
  description: 'View social media handle details',
}

interface SocialMediaPageProps {
  params: {
    id: string
  }
}

async function getSocialMedia(id: string) {
  const socialMedia = await prisma.socialMedia.findUnique({
    where: { id },
  })

  if (!socialMedia) {
    notFound()
  }

  return socialMedia
}

export default async function SocialMediaPage({ params }: SocialMediaPageProps) {
  const socialMedia = await getSocialMedia(params.id)

  const platformColors = {
    twitter: 'bg-blue-400',
    facebook: 'bg-blue-600',
    instagram: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
    linkedin: 'bg-blue-700',
    youtube: 'bg-red-600',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Link href="/admin/social-media">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Social Media Details</h2>
          <p className="text-muted-foreground">View social media handle information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Platform</h3>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full ${platformColors[socialMedia.platform as keyof typeof platformColors] || 'bg-gray-500'} flex items-center justify-center mr-2`}>
                <span className="text-white text-xs font-bold">
                  {socialMedia.platform.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="capitalize text-lg">{socialMedia.platform}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Handle</h3>
            <p className="font-mono text-lg">{socialMedia.handle}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">URL</h3>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{socialMedia.url}</span>
              <Button variant="ghost" size="sm" asChild>
                <a href={socialMedia.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Status</h3>
            {socialMedia.isActive ? (
              <Badge className="text-sm">Active</Badge>
            ) : (
              <Badge variant="secondary" className="text-sm">Inactive</Badge>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Display Order</h3>
            <p className="text-lg">{socialMedia.order}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Created</h3>
            <p className="text-lg">{socialMedia.createdAt.toLocaleDateString()}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Last Updated</h3>
            <p className="text-lg">{socialMedia.updatedAt.toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Link href="/admin/social-media">
          <Button variant="outline">Back to List</Button>
        </Link>
        <Link href={`/admin/social-media/${socialMedia.id}/edit`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </Link>
      </div>
    </div>
  )
} 