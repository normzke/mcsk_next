import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
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
        date: new Date(body.date),
        location: body.location,
        image: body.image,
        category: body.category,
        venue: body.venue,
        startTime: body.startTime ? new Date(body.startTime) : null,
        endTime: body.endTime ? new Date(body.endTime) : null,
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
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const event = await prisma.event.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error('[EVENT_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 