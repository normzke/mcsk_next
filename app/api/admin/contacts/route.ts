import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

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
    const isRead = searchParams.get('isRead') === 'true'

    const where = {
      OR: search ? [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
      ] : undefined,
      isRead: isRead || undefined,
      deletedAt: null,
    }

    const [contacts, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contactMessage.count({ where }),
    ])

    return NextResponse.json({
      data: contacts,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[CONTACTS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 