import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/custom-auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const paymentPackage = await prisma.paymentPackage.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!paymentPackage) {
      return new NextResponse('Payment package not found', { status: 404 })
    }

    return NextResponse.json(paymentPackage)
  } catch (error) {
    console.error('[PAYMENT_PACKAGE_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { name, description, amount, currency, duration, order, isActive } = body

    const paymentPackage = await prisma.paymentPackage.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        description,
        amount,
        currency,
        duration,
        order: order || 0,
        isActive: isActive ?? true,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(paymentPackage)
  } catch (error) {
    console.error('[PAYMENT_PACKAGE_PUT]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[PAYMENT_PACKAGE_DELETE] Starting deletion for ID:', params.id)
    
    const session = await getSession()
    if (!session || session.user.role !== 'admin') {
      console.log('[PAYMENT_PACKAGE_DELETE] Unauthorized access attempt')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    console.log('[PAYMENT_PACKAGE_DELETE] User authorized, proceeding with deletion')

    // Check if the payment package exists first
    const existingPackage = await prisma.paymentPackage.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingPackage) {
      console.log('[PAYMENT_PACKAGE_DELETE] Payment package not found:', params.id)
      return new NextResponse('Payment package not found', { status: 404 })
    }

    console.log('[PAYMENT_PACKAGE_DELETE] Payment package found, performing soft delete')

    const paymentPackage = await prisma.paymentPackage.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    console.log('[PAYMENT_PACKAGE_DELETE] Soft delete successful:', paymentPackage.id)
    return NextResponse.json(paymentPackage)
  } catch (error) {
    console.error('[PAYMENT_PACKAGE_DELETE] Error:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 