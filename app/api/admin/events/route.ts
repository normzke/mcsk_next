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
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ] : undefined,
      isActive: isActive || undefined,
      deletedAt: null,
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { date: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.event.count({ where }),
    ])

    return NextResponse.json({
      data: events,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[EVENTS_GET]', error)
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

    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        date: new Date(body.date),
        location: body.location,
        image: body.image,
        category: body.category,
        venue: body.venue,
        startTime: body.startTime ? new Date(body.startTime) : null,
        endTime: body.endTime ? new Date(body.endTime) : null,
        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error('[EVENTS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 