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

    const mpesaCredentials = await prisma.mpesaCredentials.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!mpesaCredentials) {
      return new NextResponse('M-Pesa credentials not found', { status: 404 })
    }

    return NextResponse.json(mpesaCredentials)
  } catch (error) {
    console.error('[MPESA_CREDENTIALS_GET]', error)
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
    const { environment, consumerKey, consumerSecret, passkey, shortcode, businessName, isActive } = body

    // Check if credentials already exist for this environment (excluding current record)
    const existingCredentials = await prisma.mpesaCredentials.findFirst({
      where: {
        environment,
        id: {
          not: params.id,
        },
      },
    })

    if (existingCredentials) {
      return new NextResponse('Credentials already exist for this environment', { status: 400 })
    }

    const mpesaCredentials = await prisma.mpesaCredentials.update({
      where: {
        id: params.id,
      },
      data: {
        environment,
        consumerKey,
        consumerSecret,
        passkey,
        shortcode,
        businessName,
        isActive: isActive ?? true,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(mpesaCredentials)
  } catch (error) {
    console.error('[MPESA_CREDENTIALS_PUT]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[MPESA_CREDENTIALS_DELETE] Starting deletion for ID:', params.id)
    
    const session = await getSession()
    if (!session || session.user.role !== 'admin') {
      console.log('[MPESA_CREDENTIALS_DELETE] Unauthorized access attempt')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    console.log('[MPESA_CREDENTIALS_DELETE] User authorized, proceeding with deletion')

    // Check if the credentials exist first
    const existingCredentials = await prisma.mpesaCredentials.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingCredentials) {
      console.log('[MPESA_CREDENTIALS_DELETE] M-Pesa credentials not found:', params.id)
      return new NextResponse('M-Pesa credentials not found', { status: 404 })
    }

    console.log('[MPESA_CREDENTIALS_DELETE] Credentials found, performing soft delete')

    const mpesaCredentials = await prisma.mpesaCredentials.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    console.log('[MPESA_CREDENTIALS_DELETE] Soft delete successful:', mpesaCredentials.id)
    return NextResponse.json(mpesaCredentials)
  } catch (error) {
    console.error('[MPESA_CREDENTIALS_DELETE] Error:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 