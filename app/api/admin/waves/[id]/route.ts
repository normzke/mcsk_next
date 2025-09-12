import { NextResponse } from 'next/server'
import { auth } from '@/lib/custom-auth'
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
        duration: body.duration,
        releaseDate: body.releaseDate,
        playCount: body.playCount,
        status: body.status,
        isFeatured: body.isFeatured,
        audioUrl: body.audioUrl,
        coverArt: body.coverArt,
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
    console.log('[WAVE_DELETE] Starting deletion for ID:', params.id)
    
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      console.log('[WAVE_DELETE] Unauthorized access attempt')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    console.log('[WAVE_DELETE] User authorized, proceeding with deletion')

    // Check if the wave exists first
    const existingWave = await prisma.wave.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingWave) {
      console.log('[WAVE_DELETE] Wave not found:', params.id)
      return new NextResponse('Wave not found', { status: 404 })
    }

    console.log('[WAVE_DELETE] Wave found, performing soft delete')

    const wave = await prisma.wave.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    console.log('[WAVE_DELETE] Soft delete successful:', wave.id)
    return NextResponse.json(wave)
  } catch (error) {
    console.error('[WAVE_DELETE] Error:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 