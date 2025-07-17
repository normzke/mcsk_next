'use client'

import { Contact } from './columns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Trash2, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'

interface ContactViewProps {
  contact: Contact
}

export function ContactView({ contact }: ContactViewProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleRead = async () => {
    try {
      setIsLoading(true)
      await fetch(`/api/admin/contacts/${contact.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isRead: !contact.isRead,
        }),
      })
      router.refresh()
      toast({
        title: 'Success',
        description: `Message marked as ${contact.isRead ? 'unread' : 'read'}.`,
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await fetch(`/api/admin/contacts/${contact.id}`, {
        method: 'DELETE',
      })
      router.refresh()
      router.push('/admin/contacts')
      toast({
        title: 'Success',
        description: 'Message deleted successfully.',
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Message Details</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={contact.isRead ? 'secondary' : 'default'}>
            {contact.isRead ? 'Read' : 'Unread'}
          </Badge>
          <Button
            variant="outline"
            size="icon"
            onClick={handleToggleRead}
            disabled={isLoading}
          >
            {contact.isRead ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={handleDelete}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">From</h3>
            <p className="text-lg">{contact.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a
              href={`mailto:${contact.email}`}
              className="text-blue-600 hover:underline"
            >
              {contact.email}
            </a>
          </div>
          {contact.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a
                href={`tel:${contact.phone}`}
                className="text-blue-600 hover:underline"
              >
                {contact.phone}
              </a>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold">Subject</h3>
          <p className="text-lg">{contact.subject}</p>
        </div>

        <div>
          <h3 className="font-semibold">Message</h3>
          <p className="whitespace-pre-wrap">{contact.message}</p>
        </div>

        <div className="text-sm text-muted-foreground">
          Received {formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}
        </div>
      </CardContent>
    </Card>
  )
} 