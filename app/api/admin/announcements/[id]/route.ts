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

    const announcement = await prisma.announcement.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!announcement) {
      return new NextResponse('Announcement not found', { status: 404 })
    }

    return NextResponse.json(announcement)
  } catch (error) {
    console.error('[ANNOUNCEMENT_GET]', error)
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
    const { title, content, image, isActive } = body

    const announcement = await prisma.announcement.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        content,
        image,
        isActive,
      },
    })

    return NextResponse.json(announcement)
  } catch (error) {
    console.error('[ANNOUNCEMENT_UPDATE]', error)
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

    await prisma.announcement.delete({
      where: {
        id: params.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[ANNOUNCEMENT_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 