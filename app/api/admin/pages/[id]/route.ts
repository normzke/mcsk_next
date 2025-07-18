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

    const page = await prisma.page.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!page) {
      return new NextResponse('Page not found', { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('[PAGE_GET]', error)
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

    const page = await prisma.page.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        content: body.content,
        slug: body.slug,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error('[PAGE_PATCH]', error)
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

    const page = await prisma.page.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error('[PAGE_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 