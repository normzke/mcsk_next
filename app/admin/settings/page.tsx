import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './_components/columns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import type { Setting } from '@/types'

export const metadata: Metadata = {
  title: 'Settings | MCSK Admin',
  description: 'Manage website settings',
}

export default async function SettingsPage() {
  let settings: Setting[] = []
  try {
    const dbSettings = await prisma.setting.findMany({
      orderBy: {
        key: 'asc',
      },
    })
    settings = dbSettings.map((setting: any) => ({
      id: setting.id,
      key: setting.key || '',
      value: setting.value || '',
      type: setting.type || 'text',
      group: setting.group || 'general',
      createdAt: setting.createdAt.toISOString(),
      updatedAt: setting.updatedAt.toISOString(),
    }))
  } catch (error) {
    console.error("Error fetching settings:", error)
    settings = []
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <Button asChild>
          <Link href="/admin/settings/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={settings}
        searchKey="key"
        filters={[
          {
            key: 'group',
            label: 'Group',
            options: [
              { label: 'General', value: 'general' },
              { label: 'Contact', value: 'contact' },
              { label: 'Social Media', value: 'social' },
              { label: 'SEO', value: 'seo' },
              { label: 'Analytics', value: 'analytics' },
            ],
          },
          {
            key: 'type',
            label: 'Type',
            options: [
              { label: 'Text', value: 'text' },
              { label: 'Textarea', value: 'textarea' },
              { label: 'Rich Text', value: 'richtext' },
              { label: 'Number', value: 'number' },
              { label: 'Boolean', value: 'boolean' },
              { label: 'Image', value: 'image' },
              { label: 'File', value: 'file' },
            ],
          },
        ]}
      />
    </div>
  )
} 