import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/custom-auth'
import { randomUUID } from 'crypto'

export async function GET() {
  try {
    const session = await getSession()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const paymentPackages = await prisma.paymentPackage.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        order: 'asc',
      },
    })

    return NextResponse.json(paymentPackages)
  } catch (error) {
    console.error('[PAYMENT_PACKAGES_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { name, description, amount, currency, duration, order, isActive } = body

    const paymentPackage = await prisma.paymentPackage.create({
      data: {
        id: randomUUID(),
        name,
        description,
        amount,
        currency,
        duration,
        order: order || 0,
        isActive: isActive ?? true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(paymentPackage, { status: 201 })
  } catch (error) {
    console.error('[PAYMENT_PACKAGES_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 