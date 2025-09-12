import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft, Edit, Calendar, HelpCircle } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'View FAQ | MCSK Admin',
  description: 'View MCSK FAQ details',
}

interface ViewFaqPageProps {
  params: {
    id: string
  }
}

export default async function ViewFaqPage({ params }: ViewFaqPageProps) {
  const faq = await prisma.faq.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!faq) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/faqs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to FAQs
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">View FAQ</h2>
        </div>
        <Button asChild>
          <Link href={`/admin/faqs/${faq.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FAQ Icon */}
        <Card>
          <CardHeader>
            <CardTitle>FAQ Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <HelpCircle className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-medium">FAQ Item</h3>
                <p className="text-sm text-muted-foreground">Question and Answer</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle>FAQ Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Question</h3>
              <p className="text-muted-foreground mb-4">{faq.question}</p>
              
              <h3 className="text-lg font-semibold mb-2">Answer</h3>
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={faq.isActive ? 'default' : 'secondary'}>
                  {faq.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Order</span>
                <span className="text-sm text-muted-foreground">{faq.order}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Created</span>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDate(faq.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(faq.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 