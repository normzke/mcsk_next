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

    const gallery = await prisma.gallery.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!gallery) {
      return new NextResponse('Gallery item not found', { status: 404 })
    }

    return NextResponse.json(gallery)
  } catch (error) {
    console.error('[GALLERY_GET]', error)
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

    const gallery = await prisma.gallery.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        type: body.type,
        order: body.order,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(gallery)
  } catch (error) {
    console.error('[GALLERY_PATCH]', error)
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

    const gallery = await prisma.gallery.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return NextResponse.json(gallery)
  } catch (error) {
    console.error('[GALLERY_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 