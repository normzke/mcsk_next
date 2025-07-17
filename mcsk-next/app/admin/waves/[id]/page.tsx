import { Metadata } from "next"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"
import { prisma } from "@/lib/prisma"
import Image from "next/image"

export const metadata: Metadata = {
  title: "View Wave | MCSK Admin",
  description: "View wave details",
}

interface ViewWavePageProps {
  params: {
    id: string
  }
}

export default async function ViewWavePage({ params }: ViewWavePageProps) {
  const wave = await prisma.wave.findUnique({
    where: {
      id: params.id,
    },
    include: {
      member: true,
    },
  })

  if (!wave) {
    notFound()
  }

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{wave.title}</h2>
          <p className="text-muted-foreground">
            {wave.artist}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/admin/waves/${wave.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Wave
            </Button>
          </Link>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Wave
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Cover Art */}
        <Card>
          <CardHeader>
            <CardTitle>Cover Art</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square w-full max-w-[300px] mx-auto">
              <Image
                src={wave.coverArt}
                alt={wave.title}
                className="rounded-lg object-cover"
                fill
              />
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div>
                <p className="text-sm font-medium">Album</p>
                <p className="text-sm text-muted-foreground">
                  {wave.album || "Single"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Genre</p>
                <Badge variant="outline" className="mt-1">
                  {wave.genre}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Release Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(wave.releaseDate), "PPP")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">
                  {formatDuration(wave.duration)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge variant={wave.status ? "success" : "secondary"} className="mt-1">
                  {wave.status ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Featured</p>
                <Badge variant={wave.isFeatured ? "default" : "secondary"} className="mt-1">
                  {wave.isFeatured ? "Featured" : "Not Featured"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Member Information */}
        <Card>
          <CardHeader>
            <CardTitle>Member Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div>
                <p className="text-sm font-medium">Member</p>
                <p className="text-sm text-muted-foreground">
                  {wave.member.name}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">ISRC Code</p>
                <p className="text-sm text-muted-foreground">
                  {wave.isrcCode}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Copyright</p>
                <p className="text-sm text-muted-foreground">
                  {wave.copyrightInfo}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div>
                <p className="text-sm font-medium">Play Count</p>
                <p className="text-sm text-muted-foreground">
                  {wave.playCount.toLocaleString()} plays
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Created At</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(wave.createdAt), "PPP")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(wave.updatedAt), "PPP")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        {wave.description && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {wave.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Lyrics */}
        {wave.lyrics && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Lyrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {wave.lyrics}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 