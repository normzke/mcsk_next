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
        { name: { contains: search, mode: 'insensitive' } },
        { position: { contains: search, mode: 'insensitive' } },
      ] : undefined,
      isActive: isActive || undefined,
      deletedAt: null,
    }

    const [boardMembers, total] = await Promise.all([
      prisma.managementMember.findMany({
        where: {
          ...where,
          role: 'board_member',
        },
        orderBy: { order: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.managementMember.count({
        where: {
          ...where,
          role: 'board_member',
        },
      }),
    ])

    return NextResponse.json({
      data: boardMembers,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[BOARD_MEMBERS_GET]', error)
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

    const boardMember = await prisma.managementMember.create({
      data: {
        name: body.name,
        firstName: body.firstName || '',
        lastName: body.lastName || '',
        email: body.email || `${body.name.toLowerCase().replace(/\s+/g, '.')}@mcsk.or.ke`,
        position: body.position,
        image: body.image,
        bio: body.bio,
        order: body.order || 0,
        isActive: body.isActive ?? true,
        role: 'board_member',
        department: 'board',
        status: 'active',
        profileImage: body.image,
      },
    })

    return NextResponse.json(boardMember)
  } catch (error) {
    console.error('[BOARD_MEMBERS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 