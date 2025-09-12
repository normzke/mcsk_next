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

    const announcement = await prisma.announcement.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!announcement) {
      return new NextResponse('Announcement not found', { status: 404 })
    }

    return NextResponse.json(announcement)
  } catch (error) {
    console.error('[ANNOUNCEMENT_GET]', error)
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

    const announcement = await prisma.announcement.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        image: body.image,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(announcement)
  } catch (error) {
    console.error('[ANNOUNCEMENT_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[ANNOUNCEMENT_DELETE] Starting deletion for ID:', params.id)
    
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      console.log('[ANNOUNCEMENT_DELETE] Unauthorized access attempt')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    console.log('[ANNOUNCEMENT_DELETE] User authorized, proceeding with deletion')

    // Check if the announcement exists first
    const existingAnnouncement = await prisma.announcement.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingAnnouncement) {
      console.log('[ANNOUNCEMENT_DELETE] Announcement not found:', params.id)
      return new NextResponse('Announcement not found', { status: 404 })
    }

    console.log('[ANNOUNCEMENT_DELETE] Announcement found, performing soft delete')

    const announcement = await prisma.announcement.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    console.log('[ANNOUNCEMENT_DELETE] Soft delete successful:', announcement.id)
    return NextResponse.json(announcement)
  } catch (error) {
    console.error('[ANNOUNCEMENT_DELETE] Error:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 