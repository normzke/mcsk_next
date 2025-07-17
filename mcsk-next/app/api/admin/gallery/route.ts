import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const isActive = searchParams.get('isActive') === 'true'
    const type = searchParams.get('type') || undefined

    const where = {
      OR: search ? [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ] : undefined,
      type: type || undefined,
      isActive: isActive || undefined,
      deletedAt: null,
    }

    const [gallery, total] = await Promise.all([
      prisma.gallery.findMany({
        where,
        orderBy: { order: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.gallery.count({ where }),
    ])

    return NextResponse.json({
      data: gallery,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[GALLERY_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const gallery = await prisma.gallery.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        type: body.type || 'image',
        order: body.order || 0,
        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json(gallery)
  } catch (error) {
    console.error('[GALLERY_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 