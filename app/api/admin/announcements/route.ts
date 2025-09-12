import { NextResponse } from 'next/server'
import { auth } from '@/lib/custom-auth'
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
    const { 
      title, 
      content, 
      description, 
      image, 
      isActive = true, 
      isPublished = true, 
      isFeatured = false, 
      type = 'info',
      buttonText,
      buttonUrl,
      attachment,
      publishAt = new Date(),
      expireAt
    } = body

    const announcement = await prisma.announcement.create({
      data: {
        id: crypto.randomUUID(),
        title,
        description: description || null,
        content,
        image: image || null,
        isActive,
        isPublished,
        isFeatured,
        type,
        buttonText: buttonText || null,
        buttonUrl: buttonUrl || null,
        attachment: attachment || null,
        publishAt: new Date(publishAt),
        expireAt: expireAt ? new Date(expireAt) : null,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(announcement)
  } catch (error) {
    console.error('[ANNOUNCEMENT_CREATE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 