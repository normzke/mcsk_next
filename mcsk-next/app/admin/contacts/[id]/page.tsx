import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ContactView } from '../_components/contact-view'

export const metadata: Metadata = {
  title: 'View Message | MCSK Admin',
  description: 'View contact message details',
}

interface ContactPageProps {
  params: {
    id: string
  }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const contact = await prisma.contactMessage.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!contact) {
    notFound()
  }

  const mappedContact = {
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    subject: contact.subject ?? '',
    message: contact.message,
    isRead: contact.status !== 'unread',
    createdAt: contact.createdAt,
    updatedAt: contact.updatedAt,
    deletedAt: contact.deletedAt,
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">View Message</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <ContactView contact={mappedContact} />
      </div>
    </div>
  )
} 