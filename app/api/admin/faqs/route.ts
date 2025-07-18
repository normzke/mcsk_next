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
        { question: { contains: search, mode: 'insensitive' } },
        { answer: { contains: search, mode: 'insensitive' } },
      ] : undefined,
      isActive: isActive || undefined,
      deletedAt: null,
    }

    const [faqs, total] = await Promise.all([
      prisma.faq.findMany({
        where,
        orderBy: { order: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.faq.count({ where }),
    ])

    return NextResponse.json({
      data: faqs,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[FAQS_GET]', error)
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

    const faq = await prisma.faq.create({
      data: {
        question: body.question,
        answer: body.answer,
        order: body.order || 0,
        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json(faq)
  } catch (error) {
    console.error('[FAQS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 