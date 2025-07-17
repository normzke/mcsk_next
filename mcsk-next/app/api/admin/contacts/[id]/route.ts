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

    const contact = await prisma.contact.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!contact) {
      return new NextResponse('Contact message not found', { status: 404 })
    }

    // Mark as read when viewed
    if (!contact.isRead) {
      await prisma.contact.update({
        where: {
          id: params.id,
        },
        data: {
          isRead: true,
        },
      })
    }

    return NextResponse.json(contact)
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

    const contact = await prisma.contact.update({
      where: {
        id: params.id,
      },
      data: {
        isRead: body.isRead,
      },
    })

    return NextResponse.json(contact)
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

    const contact = await prisma.contact.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('[CONTACT_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 