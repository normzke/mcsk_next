import { Metadata } from 'next'
import { WaveForm } from '../_components/wave-form'

export const metadata: Metadata = {
  title: 'New Wave | MCSK Admin',
  description: 'Create a new MCSK wave',
}

export default function NewWavePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">New Wave</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <WaveForm />
      </div>
    </div>
  )
} 