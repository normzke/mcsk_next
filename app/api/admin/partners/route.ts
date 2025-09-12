import { NextResponse } from 'next/server'
import { auth } from '@/lib/custom-auth'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

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
        { name: { contains: search, mode: 'insensitive' } },
        { website: { contains: search, mode: 'insensitive' } },
      ] : undefined,
      isActive: isActive || undefined,
      deletedAt: null,
    }

    const [partners, total] = await Promise.all([
      prisma.partner.findMany({
        where,
        orderBy: { order: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.partner.count({ where }),
    ])

    return NextResponse.json({
      data: partners,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[PARTNERS_GET]', error)
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

    const partner = await prisma.partner.create({
      data: {
        id: randomUUID(),
        name: body.name,
        description: body.description,
        logo: body.logo,
        website: body.website,
        order: body.order || 0,
        isActive: body.isActive ?? true,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(partner)
  } catch (error) {
    console.error('[PARTNERS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 