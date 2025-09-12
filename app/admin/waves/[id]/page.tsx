import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Edit, Calendar, Music, Play, Star } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'View Wave | MCSK Admin',
  description: 'View MCSK wave details',
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/waves">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Waves
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">View Wave</h2>
        </div>
        <Button asChild>
          <Link href={`/admin/waves/${wave.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Wave Image */}
        {wave.coverArt && (
          <Card>
            <CardHeader>
              <CardTitle>Wave Cover Art</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={wave.coverArt}
                  alt={wave.title}
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
            <CardTitle>Wave Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{wave.title}</h3>
              <p className="text-muted-foreground mb-4">by {wave.artist}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={wave.status ? 'default' : 'secondary'}>
                  {wave.status ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Featured</span>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <Badge variant={wave.isFeatured ? 'default' : 'secondary'}>
                    {wave.isFeatured ? 'Featured' : 'Not Featured'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Album</span>
                <span className="text-sm text-muted-foreground">{wave.album || '-'}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Genre</span>
                <span className="text-sm text-muted-foreground">{wave.genre}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Duration</span>
                <div className="flex items-center space-x-2">
                  <Music className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDuration(wave.duration)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Release Date</span>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDate(wave.releaseDate)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Play Count</span>
                <div className="flex items-center space-x-2">
                  <Play className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{wave.playCount}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Created</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(wave.createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(wave.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 