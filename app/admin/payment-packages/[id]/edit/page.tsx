import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PaymentPackageForm from '../../_components/payment-package-form'

export const metadata: Metadata = {
  title: 'Edit Payment Package - Admin Dashboard',
  description: 'Edit payment package',
}

interface EditPaymentPackagePageProps {
  params: {
    id: string
  }
}

async function getPaymentPackage(id: string) {
  const paymentPackage = await prisma.paymentPackage.findUnique({
    where: { id },
  })

  if (!paymentPackage) {
    notFound()
  }

  // Convert Decimal to string for the form
  return {
    ...paymentPackage,
    amount: paymentPackage.amount.toString(),
  }
}

export default async function EditPaymentPackagePage({ params }: EditPaymentPackagePageProps) {
  const paymentPackage = await getPaymentPackage(params.id)

  return <PaymentPackageForm initialData={paymentPackage} />
} 