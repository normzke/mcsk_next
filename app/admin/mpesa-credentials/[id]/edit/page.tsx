import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import MpesaCredentialsForm from '../../_components/mpesa-credentials-form'

export const metadata: Metadata = {
  title: 'Edit M-Pesa Credentials - Admin Dashboard',
  description: 'Edit M-Pesa API credentials',
}

interface EditMpesaCredentialsPageProps {
  params: {
    id: string
  }
}

async function getMpesaCredentials(id: string) {
  const mpesaCredentials = await prisma.mpesaCredentials.findUnique({
    where: { id },
  })

  if (!mpesaCredentials) {
    notFound()
  }

  return mpesaCredentials
}

export default async function EditMpesaCredentialsPage({ params }: EditMpesaCredentialsPageProps) {
  const mpesaCredentials = await getMpesaCredentials(params.id)

  return <MpesaCredentialsForm initialData={mpesaCredentials} />
} 