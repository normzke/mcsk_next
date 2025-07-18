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

    const contactMessage = await prisma.contactMessage.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!contactMessage) {
      return new NextResponse('Contact message not found', { status: 404 })
    }

    // Mark as read when viewed
    if (contactMessage.status === 'unread') {
      await prisma.contactMessage.update({
        where: {
          id: params.id,
        },
        data: {
          status: 'read',
        },
      })
    }

    return NextResponse.json(contactMessage)
  } catch (error) {
    console.error('[CONTACT_GET]', error)
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

    const contactMessage = await prisma.contactMessage.update({
      where: {
        id: params.id,
      },
      data: {
        status: body.isRead ? 'read' : 'unread',
      },
    })

    return NextResponse.json(contactMessage)
  } catch (error) {
    console.error('[CONTACT_PATCH]', error)
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

    const contactMessage = await prisma.contactMessage.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return NextResponse.json(contactMessage)
  } catch (error) {
    console.error('[CONTACT_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 