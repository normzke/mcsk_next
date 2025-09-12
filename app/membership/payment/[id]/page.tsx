import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PaymentForm from './components/payment-form'

export const metadata: Metadata = {
  title: 'Payment - MCSK Membership',
  description: 'Complete your MCSK membership payment',
}

interface PaymentPageProps {
  params: {
    id: string
  }
}

async function getApplicationData(id: string) {
  try {
    const member = await prisma.member.findUnique({
      where: { id },
      include: {
        paymentTransactions: {
          where: {
            status: 'pending',
          },
          include: {
            package: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    })

    if (!member) {
      return null
    }

    return member
  } catch (error) {
    console.error('Error fetching application data:', error)
    return null
  }
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const application = await getApplicationData(params.id)

  if (!application) {
    notFound()
  }

  const pendingTransaction = application.paymentTransactions[0]

  if (!pendingTransaction) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Your Payment
            </h1>
            <p className="text-gray-600">
              Please complete your payment to finalize your MCSK membership application
            </p>
          </div>

          <PaymentForm 
            member={application}
            transaction={pendingTransaction}
          />
        </div>
      </div>
    </div>
  )
} 