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

    const download = await prisma.download.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!download) {
      return new NextResponse('Download not found', { status: 404 })
    }

    return NextResponse.json(download)
  } catch (error) {
    console.error('[DOWNLOAD_GET]', error)
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

    const download = await prisma.download.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        description: body.description,
        file: body.file,
        order: body.order,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(download)
  } catch (error) {
    console.error('[DOWNLOAD_PATCH]', error)
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

    const download = await prisma.download.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return NextResponse.json(download)
  } catch (error) {
    console.error('[DOWNLOAD_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 