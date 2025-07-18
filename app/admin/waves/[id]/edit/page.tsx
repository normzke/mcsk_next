import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WaveForm } from '../../_components/wave-form'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Edit Wave | MCSK Admin',
  description: 'Edit MCSK wave details',
}

interface EditWavePageProps {
  params: {
    id: string
  }
}

export default async function EditWavePage({ params }: EditWavePageProps) {
  const wave = await prisma.wave.findUnique({
    where: {
      id: params.id,
    },
    include: {
      member: true,
    },
  })

  if (!wave) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Wave</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <WaveForm initialData={wave} />
      </div>
    </div>
  )
} 