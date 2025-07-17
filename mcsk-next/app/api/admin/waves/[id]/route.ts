import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const wave = await prisma.wave.findUnique({
      where: {
        id: params.id,
      },
      include: {
        member: true,
      },
    })

    if (!wave) {
      return new NextResponse('Wave not found', { status: 404 })
    }

    return NextResponse.json(wave)
  } catch (error) {
    console.error('[WAVE_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const wave = await prisma.wave.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        artist: body.artist,
        album: body.album,
        genre: body.genre,
        releaseDate: new Date(body.releaseDate),
        duration: body.duration,
        coverArt: body.coverArt,
        audioFile: body.audioFile,
        status: body.status,
        isFeatured: body.isFeatured,
        memberId: body.memberId,
        isrcCode: body.isrcCode,
        lyrics: body.lyrics,
        description: body.description,
        copyrightInfo: body.copyrightInfo,
      },
    })

    return NextResponse.json(wave)
  } catch (error) {
    console.error('[WAVE_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const wave = await prisma.wave.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return NextResponse.json(wave)
  } catch (error) {
    console.error('[WAVE_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 