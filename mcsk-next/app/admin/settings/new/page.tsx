import { Metadata } from 'next'
import { SettingForm } from '../_components/setting-form'

export const metadata: Metadata = {
  title: 'New Setting | MCSK Admin',
  description: 'Create a new website setting',
}

export default function NewSettingPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New Setting</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <SettingForm />
      </div>
    </div>
  )
} 