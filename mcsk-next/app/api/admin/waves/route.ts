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
    const status = searchParams.get('status') === 'true'
    const isFeatured = searchParams.get('isFeatured') === 'true'
    const genre = searchParams.get('genre') || undefined
    const memberId = searchParams.get('memberId') || undefined

    const where = {
      OR: search ? [
        { title: { contains: search, mode: 'insensitive' } },
        { artist: { contains: search, mode: 'insensitive' } },
        { album: { contains: search, mode: 'insensitive' } },
        { genre: { contains: search, mode: 'insensitive' } },
      ] : undefined,
      status: status || undefined,
      isFeatured: isFeatured || undefined,
      genre: genre || undefined,
      memberId: memberId || undefined,
      deletedAt: null,
    }

    const [waves, total] = await Promise.all([
      prisma.wave.findMany({
        where,
        include: {
          member: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.wave.count({ where }),
    ])

    return NextResponse.json({
      data: waves,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[WAVES_GET]', error)
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

    const wave = await prisma.wave.create({
      data: {
        title: body.title,
        artist: body.artist,
        album: body.album,
        genre: body.genre,
        releaseDate: new Date(body.releaseDate),
        duration: body.duration,
        coverArt: body.coverArt,
        audioFile: body.audioFile,
        status: body.status ?? true,
        isFeatured: body.isFeatured ?? false,
        playCount: 0,
        memberId: body.memberId,
        isrcCode: body.isrcCode,
        lyrics: body.lyrics,
        description: body.description,
        copyrightInfo: body.copyrightInfo,
      },
    })

    return NextResponse.json(wave)
  } catch (error) {
    console.error('[WAVES_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 