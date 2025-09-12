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

    const event = await prisma.event.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!event) {
      return new NextResponse('Event not found', { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('[EVENT_GET]', error)
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

    const event = await prisma.event.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        date: body.date,
        startTime: body.startTime,
        endTime: body.endTime,
        venue: body.venue,
        location: body.location,
        category: body.category,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error('[EVENT_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[EVENT_DELETE] Starting deletion for ID:', params.id)
    
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      console.log('[EVENT_DELETE] Unauthorized access attempt')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    console.log('[EVENT_DELETE] User authorized, proceeding with deletion')

    // Check if the event exists first
    const existingEvent = await prisma.event.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingEvent) {
      console.log('[EVENT_DELETE] Event not found:', params.id)
      return new NextResponse('Event not found', { status: 404 })
    }

    console.log('[EVENT_DELETE] Event found, performing soft delete')

    const event = await prisma.event.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    console.log('[EVENT_DELETE] Soft delete successful:', event.id)
    return NextResponse.json(event)
  } catch (error) {
    console.error('[EVENT_DELETE] Error:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 