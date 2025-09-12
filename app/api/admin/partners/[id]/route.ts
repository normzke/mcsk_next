import { NextResponse } from 'next/server'
import { auth } from '@/lib/custom-auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const partner = await prisma.partner.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!partner) {
      return new NextResponse('Partner not found', { status: 404 })
    }

    return NextResponse.json(partner)
  } catch (error) {
    console.error('[PARTNER_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const partner = await prisma.partner.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        description: body.description,
        logo: body.logo,
        website: body.website,
        order: body.order,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(partner)
  } catch (error) {
    console.error('[PARTNER_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[PARTNER_DELETE] Starting deletion for ID:', params.id)
    
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      console.log('[PARTNER_DELETE] Unauthorized access attempt')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    console.log('[PARTNER_DELETE] User authorized, proceeding with deletion')

    // Check if the partner exists first
    const existingPartner = await prisma.partner.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingPartner) {
      console.log('[PARTNER_DELETE] Partner not found:', params.id)
      return new NextResponse('Partner not found', { status: 404 })
    }

    console.log('[PARTNER_DELETE] Partner found, performing soft delete')

    const partner = await prisma.partner.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    console.log('[PARTNER_DELETE] Soft delete successful:', partner.id)
    return NextResponse.json(partner)
  } catch (error) {
    console.error('[PARTNER_DELETE] Error:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 