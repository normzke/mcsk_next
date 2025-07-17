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

    const where = {
      OR: search ? [
        { path: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { keywords: { contains: search, mode: 'insensitive' } },
      ] : undefined,
      deletedAt: null,
    }

    const [seoMetas, total] = await Promise.all([
      prisma.sEOMeta.findMany({
        where,
        orderBy: { path: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.sEOMeta.count({ where }),
    ])

    return NextResponse.json({
      data: seoMetas,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[SEO_META_GET]', error)
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

    // Check if path already exists
    const existing = await prisma.sEOMeta.findFirst({
      where: {
        path: body.path,
        deletedAt: null,
      },
    })

    if (existing) {
      return new NextResponse('Path already exists', { status: 400 })
    }

    const seoMeta = await prisma.sEOMeta.create({
      data: {
        path: body.path,
        title: body.title,
        description: body.description,
        keywords: body.keywords,
        ogImage: body.ogImage,
        ogTitle: body.ogTitle,
        ogDescription: body.ogDescription,
      },
    })

    return NextResponse.json(seoMeta)
  } catch (error) {
    console.error('[SEO_META_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 