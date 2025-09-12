import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      transactionId,
      phoneNumber,
      amount,
      description,
      memberId,
      packageId
    } = body

    // Validate required fields
    if (!transactionId || !phoneNumber || !amount || !description) {
      return NextResponse.json(
        { error: 'Missing required payment fields' },
        { status: 400 }
      )
    }

    // Get M-Pesa credentials
    const mpesaCredentials = await prisma.mpesaCredentials.findFirst({
      where: {
        isActive: true,
        deletedAt: null,
      },
    })

    if (!mpesaCredentials) {
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      )
    }

    // Simulate M-Pesa STK Push (in production, this would integrate with actual M-Pesa API)
    const paymentRequest = {
      BusinessShortCode: mpesaCredentials.shortcode,
      Password: mpesaCredentials.passkey,
      Timestamp: new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3),
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: mpesaCredentials.shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback`,
      AccountReference: transactionId,
      TransactionDesc: description,
    }

    // Update transaction status to processing
    await prisma.paymentTransaction.update({
      where: { id: transactionId },
      data: {
        status: 'processing',
        updatedAt: new Date(),
      },
    })

    // In production, this would make actual API call to M-Pesa
    // For now, we'll simulate a successful payment request
    const simulatedResponse = {
      success: true,
      checkoutRequestID: randomUUID(),
      merchantRequestID: randomUUID(),
      responseCode: '0',
      responseDescription: 'Success. Request accepted for processing',
      customerMessage: 'Success. Request accepted for processing',
    }

    // Update transaction with checkout request ID
    await prisma.paymentTransaction.update({
      where: { id: transactionId },
      data: {
        mpesaRequestId: simulatedResponse.merchantRequestID,
        mpesaCheckoutId: simulatedResponse.checkoutRequestID,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Payment request initiated successfully',
      checkoutRequestID: simulatedResponse.checkoutRequestID,
      customerMessage: simulatedResponse.customerMessage,
    })

  } catch (error) {
    console.error('Error processing payment:', error)
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    )
  }
} 