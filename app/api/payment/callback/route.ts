import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // M-Pesa callback structure
    const {
      Body: {
        stkCallback: {
          CheckoutRequestID,
          ResultCode,
          ResultDesc,
          CallbackMetadata,
        },
      },
    } = body

    // Find the transaction by checkout request ID
    const transaction = await prisma.paymentTransaction.findFirst({
      where: {
        mpesaCheckoutId: CheckoutRequestID,
        status: 'processing',
      },
      include: {
        member: true,
        package: true,
      },
    })

    if (!transaction) {
      console.error('Transaction not found for checkout request ID:', CheckoutRequestID)
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
    }

    if (ResultCode === '0') {
      // Payment successful
      const mpesaReceiptNumber = CallbackMetadata?.Item?.find(
        (item: any) => item.Name === 'MpesaReceiptNumber'
      )?.Value

      // Update transaction status
      await prisma.paymentTransaction.update({
        where: { id: transaction.id },
        data: {
          status: 'completed',
          mpesaReceiptNumber: mpesaReceiptNumber,
          completedAt: new Date(),
          updatedAt: new Date(),
        },
      })

      // Update member status to active
      if (transaction.memberId) {
        await prisma.member.update({
          where: { id: transaction.memberId },
          data: {
            status: 'active',
            joinDate: new Date(),
            updatedAt: new Date(),
          },
        })
      }

      // Send notification to member
      await sendMembershipNotification(transaction.member, 'success')

      console.log('Payment completed successfully for member:', transaction.memberId)
    } else {
      // Payment failed
      await prisma.paymentTransaction.update({
        where: { id: transaction.id },
        data: {
          status: 'failed',
          failureReason: ResultDesc,
          updatedAt: new Date(),
        },
      })

      // Send notification to member about failed payment
      await sendMembershipNotification(transaction.member, 'failed')

      console.log('Payment failed for member:', transaction.memberId, 'Reason:', ResultDesc)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error processing payment callback:', error)
    return NextResponse.json(
      { error: 'Failed to process payment callback' },
      { status: 500 }
    )
  }
}

async function sendMembershipNotification(member: any, status: 'success' | 'failed') {
  try {
    // Create notification record
    await prisma.notification.create({
      data: {
        id: crypto.randomUUID(),
        memberId: member.id,
        type: status === 'success' ? 'membership_approved' : 'payment_failed',
        title: status === 'success' 
          ? 'Welcome to MCSK!' 
          : 'Payment Failed',
        message: status === 'success'
          ? `Congratulations ${member.name}! Your MCSK membership has been approved. You can now access all member benefits.`
          : `Dear ${member.name}, your payment for MCSK membership has failed. Please try again or contact support.`,
        isRead: false,
        createdAt: new Date(),
      },
    })

    // In production, you would also send email/SMS notifications here
    console.log(`Notification sent to member ${member.id} for status: ${status}`)
  } catch (error) {
    console.error('Error sending notification:', error)
  }
} 