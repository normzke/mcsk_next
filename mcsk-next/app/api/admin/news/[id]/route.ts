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

    const news = await prisma.news.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!news) {
      return new NextResponse('News not found', { status: 404 })
    }

    return NextResponse.json(news)
  } catch (error) {
    console.error('[NEWS_GET]', error)
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

    const news = await prisma.news.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        content: body.content,
        image: body.image,
        slug: body.slug,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(news)
  } catch (error) {
    console.error('[NEWS_PATCH]', error)
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

    const news = await prisma.news.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return NextResponse.json(news)
  } catch (error) {
    console.error('[NEWS_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 