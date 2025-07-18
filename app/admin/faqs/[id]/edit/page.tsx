import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FAQForm } from '../../_components/faq-form'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Edit FAQ | MCSK Admin',
  description: 'Edit MCSK FAQ details',
}

interface EditFAQPageProps {
  params: {
    id: string
  }
}

export default async function EditFAQPage({ params }: EditFAQPageProps) {
  const faq = await prisma.faq.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!faq) {
    notFound()
  }

  const mappedFAQ = {
    id: faq.id,
    question: faq.question ?? '',
    answer: faq.answer ?? '',
    order: faq.order ?? 0,
    isActive: faq.isActive ?? true,
    createdAt: faq.createdAt.toISOString(),
    updatedAt: faq.updatedAt.toISOString(),
    deletedAt: faq.deletedAt?.toISOString() ?? null,
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit FAQ</h2>
      </div>

      <div className="rounded-md border bg-white p-8">
        <FAQForm initialData={mappedFAQ} />
      </div>
    </div>
  )
} 