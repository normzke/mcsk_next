import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Edit, Calendar, User, Mail, Phone, Linkedin, Twitter } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'View Board Member | MCSK Admin',
  description: 'View MCSK board member details',
}

interface ViewBoardMemberPageProps {
  params: {
    id: string
  }
}

export default async function ViewBoardMemberPage({ params }: ViewBoardMemberPageProps) {
  const boardMember = await prisma.boardmember.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!boardMember) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/board-members">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Board Members
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">View Board Member</h2>
        </div>
        <Button asChild>
          <Link href={`/admin/board-members/${boardMember.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Image */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent>
            {boardMember.image ? (
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={boardMember.image}
                  alt={boardMember.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                <User className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle>Member Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{boardMember.name}</h3>
              <p className="text-lg text-muted-foreground mb-4">{boardMember.position}</p>
              {boardMember.bio && (
                <p className="text-muted-foreground">{boardMember.bio}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={boardMember.isActive ? 'default' : 'secondary'}>
                  {boardMember.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Order</span>
                <span className="text-sm text-muted-foreground">{boardMember.order}</span>
              </div>

              {boardMember.email && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email</span>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{boardMember.email}</span>
                  </div>
                </div>
              )}

              {boardMember.phone && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Phone</span>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{boardMember.phone}</span>
                  </div>
                </div>
              )}

              {boardMember.linkedinUrl && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">LinkedIn</span>
                  <Button size="sm" variant="outline" asChild>
                    <a href={boardMember.linkedinUrl} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" />
                      View Profile
                    </a>
                  </Button>
                </div>
              )}

              {boardMember.twitterUrl && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Twitter</span>
                  <Button size="sm" variant="outline" asChild>
                    <a href={boardMember.twitterUrl} target="_blank" rel="noopener noreferrer">
                      <Twitter className="mr-2 h-4 w-4" />
                      View Profile
                    </a>
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Created</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(boardMember.createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(boardMember.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 