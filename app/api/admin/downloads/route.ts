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
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ] : undefined,
      isActive: isActive || undefined,
      deletedAt: null,
    }

    // Add timeout to database queries
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database query timeout')), 10000)
    )

    const [downloads, total] = await Promise.race([
      Promise.all([
        prisma.download.findMany({
          where,
          orderBy: { order: 'asc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.download.count({ where }),
      ]),
      timeoutPromise
    ]) as [any[], number]

    return NextResponse.json({
      data: downloads,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[DOWNLOADS_GET]', error)
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
    console.log('[DOWNLOADS_POST] Received data:', {
      title: body.title,
      description: body.description,
      fileLength: body.file ? body.file.length : 0,
      filePreview: body.file ? body.file.substring(0, 100) + '...' : 'null',
      order: body.order,
      isActive: body.isActive
    })

    const download = await prisma.download.create({
      data: {
        id: randomUUID(),
        title: body.title,
        description: body.description,
        file: body.file,
        order: body.order || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(download)
  } catch (error) {
    console.error('[DOWNLOADS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 