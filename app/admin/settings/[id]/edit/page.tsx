import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SettingForm } from '../../_components/setting-form'
import type { Setting } from '@/types'

export const metadata: Metadata = {
  title: 'Edit Setting | MCSK Admin',
  description: 'Edit website setting details',
}

interface EditSettingPageProps {
  params: {
    id: string
  }
}

export default async function EditSettingPage({ params }: EditSettingPageProps) {
  const setting = await prisma.setting.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!setting) {
    notFound()
  }

  const mappedSetting: Setting = {
    id: setting.id,
    key: setting.key || '',
    value: setting.value || '',
    type: setting.type || 'text',
    group: setting.group || 'general',
    createdAt: setting.createdAt.toISOString(),
    updatedAt: setting.updatedAt.toISOString(),
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Setting</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <SettingForm initialData={mappedSetting} />
      </div>
    </div>
  )
} 