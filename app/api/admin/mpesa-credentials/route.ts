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

    const mpesaCredentials = await prisma.mpesaCredentials.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        environment: 'asc',
      },
    })

    return NextResponse.json(mpesaCredentials)
  } catch (error) {
    console.error('[MPESA_CREDENTIALS_GET]', error)
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
    const { environment, consumerKey, consumerSecret, passkey, shortcode, businessName, isActive } = body

    // Check if credentials already exist for this environment
    const existingCredentials = await prisma.mpesaCredentials.findUnique({
      where: {
        environment,
      },
    })

    if (existingCredentials) {
      return new NextResponse('Credentials already exist for this environment', { status: 400 })
    }

    const mpesaCredentials = await prisma.mpesaCredentials.create({
      data: {
        id: randomUUID(),
        environment,
        consumerKey,
        consumerSecret,
        passkey,
        shortcode,
        businessName,
        isActive: isActive ?? true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(mpesaCredentials, { status: 201 })
  } catch (error) {
    console.error('[MPESA_CREDENTIALS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 