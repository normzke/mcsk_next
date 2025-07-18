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

    const where = {
      OR: search ? [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ] : undefined,
      isActive: isActive || undefined,
      deletedAt: null,
    }

    const [pages, total] = await Promise.all([
      prisma.page.findMany({
        where,
        orderBy: { createdAt: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.page.count({ where }),
    ])

    return NextResponse.json({
      data: pages,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[PAGES_GET]', error)
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

    const page = await prisma.page.create({
      data: {
        title: body.title,
        content: body.content,
        slug: body.slug,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error('[PAGES_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 