import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft, Edit, Calendar, MapPin, Briefcase, Clock, DollarSign } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'View Career | MCSK Admin',
  description: 'View MCSK career details',
}

interface ViewCareerPageProps {
  params: {
    id: string
  }
}

export default async function ViewCareerPage({ params }: ViewCareerPageProps) {
  const career = await prisma.career.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!career) {
    notFound()
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-emerald-100 text-emerald-800'
      case 'part-time':
        return 'bg-blue-100 text-blue-800'
      case 'contract':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const isExpired = career.deadline ? new Date(career.deadline) < new Date() : false

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/careers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">View Career</h2>
        </div>
        <Button asChild>
          <Link href={`/admin/careers/${career.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Career Info */}
        <Card>
          <CardHeader>
            <CardTitle>Career Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <Briefcase className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-medium">Job Position</h3>
                <p className="text-sm text-muted-foreground">Employment opportunity</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle>Career Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{career.title}</h3>
              {career.description && (
                <p className="text-muted-foreground mb-4">{career.description}</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={career.isActive ? 'default' : 'secondary'}>
                  {career.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Type</span>
                <Badge className={`${getTypeColor(career.type || 'full-time')} capitalize`} variant="secondary">
                  {career.type || 'full-time'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Location</span>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground capitalize">{career.location || '-'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Experience</span>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{career.experience || '-'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Deadline</span>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className={`text-sm ${isExpired ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {career.deadline ? formatDate(career.deadline) : 'No deadline'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Created</span>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDate(career.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(career.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requirements and Responsibilities */}
      {(career.requirements || career.responsibilities) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {career.requirements && (
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: career.requirements }} />
                </div>
              </CardContent>
            </Card>
          )}

          {career.responsibilities && (
            <Card>
              <CardHeader>
                <CardTitle>Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: career.responsibilities }} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
} 