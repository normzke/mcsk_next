import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './_components/columns'
import type { Contact } from '@/types'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Messages | MCSK Admin',
  description: 'Manage contact messages from website visitors',
}

export default async function ContactsPage() {
  let contacts: Contact[] = []
  try {
    const results = await prisma.contactMessage.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    contacts = results.map((contact: any) => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      subject: contact.subject ?? '',
      message: contact.message,
      isRead: contact.status !== 'unread',
      createdAt: contact.createdAt ? new Date(contact.createdAt).toISOString() : '',
      updatedAt: contact.updatedAt ? new Date(contact.updatedAt).toISOString() : '',
      deletedAt: contact.deletedAt ? new Date(contact.deletedAt).toISOString() : null,
    }))
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    contacts = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Contact Messages</h2>
      </div>

      <DataTable
        columns={columns}
        data={contacts}
        searchKey="name"
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'New', value: 'new' },
              { label: 'Read', value: 'read' },
              { label: 'Replied', value: 'replied' },
            ],
          },
        ]}
      />
    </div>
  )
} 