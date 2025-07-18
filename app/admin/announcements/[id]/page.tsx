import { Metadata } from "next"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"
import type { Announcement } from '@/types'
import Image from "next/image"

export const metadata: Metadata = {
  title: "View Announcement - MCSK Admin",
  description: "View announcement details",
}

async function getAnnouncement(id: string): Promise<Announcement | null> {
  // TODO: Implement API call
  return null
}

const typeVariants: Record<string, "default" | "warning" | "success" | "destructive"> = {
  info: "default",
  warning: "warning",
  success: "success",
  danger: "destructive",
}

export default async function ViewAnnouncementPage({
  params,
}: {
  params: { id: string }
}) {
  const announcement = await getAnnouncement(params.id)

  if (!announcement) {
    notFound()
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{announcement.title}</h2>
          <p className="text-muted-foreground">
            View announcement details and content
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/admin/announcements/${announcement.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Announcement
            </Button>
          </Link>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Announcement
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Announcement Information */}
        <Card>
          <CardHeader>
            <CardTitle>Announcement Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div>
                <p className="text-sm font-medium">Title</p>
                <p className="text-sm text-muted-foreground">{announcement.title}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Type</p>
                <Badge
                  variant={typeVariants[announcement.type] || "default"}
                  className="mt-1"
                >
                  {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <div className="flex gap-2 mt-1">
                  <Badge
                    variant={announcement.isPublished ? "success" : "secondary"}
                  >
                    {announcement.isPublished ? "Published" : "Draft"}
                  </Badge>
                  {announcement.isFeatured && (
                    <Badge variant="outline">Featured</Badge>
                  )}
                </div>
              </div>
              {(announcement.buttonText || announcement.buttonUrl) && (
                <div>
                  <p className="text-sm font-medium">Call to Action</p>
                  <p className="text-sm text-muted-foreground">
                    {announcement.buttonText} - <a href={announcement.buttonUrl || "#"} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{announcement.buttonUrl}</a>
                  </p>
                </div>
              )}
              {announcement.attachment && (
                <div>
                  <p className="text-sm font-medium">Attachment</p>
                  <p className="text-sm text-muted-foreground">
                    <a href={announcement.attachment} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      Download Attachment
                    </a>
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Date Information */}
        <Card>
          <CardHeader>
            <CardTitle>Date Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div>
                <p className="text-sm font-medium">Publish Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(announcement.publishAt), "PPP")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Expiry Date</p>
                <p className="text-sm text-muted-foreground">
                  {announcement.expireAt
                    ? format(new Date(announcement.expireAt), "PPP")
                    : "No expiry date"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Created At</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(announcement.createdAt), "PPP")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(announcement.updatedAt), "PPP")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            {announcement.image && (
              <div className="relative w-full h-[300px] mb-6 rounded-lg overflow-hidden">
                <Image
                  src={announcement.image}
                  alt={announcement.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: announcement.content }} />
          </CardContent>
        </Card>
      </div>
    </>
  )
} 