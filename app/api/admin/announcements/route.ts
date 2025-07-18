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
      ] : undefined,
      isActive: isActive || undefined,
      deletedAt: null,
    }

    const [announcements, total] = await Promise.all([
      prisma.announcement.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.announcement.count({ where }),
    ])

    return NextResponse.json({
      data: announcements,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[ANNOUNCEMENTS_GET]', error)
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
    const { title, content, image, isActive } = body

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        image,
        isActive: isActive ?? true,
      },
    })

    return NextResponse.json(announcement)
  } catch (error) {
    console.error('[ANNOUNCEMENT_CREATE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 