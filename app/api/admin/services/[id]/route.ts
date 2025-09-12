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

    const service = await prisma.service.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!service) {
      return new NextResponse('Service not found', { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    console.error('[SERVICE_GET]', error)
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

    const service = await prisma.service.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon,
        order: body.order,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error('[SERVICE_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[SERVICE_DELETE] Starting deletion for ID:', params.id)
    
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      console.log('[SERVICE_DELETE] Unauthorized access attempt')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    console.log('[SERVICE_DELETE] User authorized, proceeding with deletion')

    // Check if the service exists first
    const existingService = await prisma.service.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingService) {
      console.log('[SERVICE_DELETE] Service not found:', params.id)
      return new NextResponse('Service not found', { status: 404 })
    }

    console.log('[SERVICE_DELETE] Service found, performing soft delete')

    const service = await prisma.service.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    console.log('[SERVICE_DELETE] Soft delete successful:', service.id)
    return NextResponse.json(service)
  } catch (error) {
    console.error('[SERVICE_DELETE] Error:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 