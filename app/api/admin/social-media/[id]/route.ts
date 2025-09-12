import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/custom-auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const socialMedia = await prisma.socialMedia.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!socialMedia) {
      return NextResponse.json({ error: 'Social media not found' }, { status: 404 })
    }

    return NextResponse.json(socialMedia)
  } catch (error) {
    console.error('Error fetching social media:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social media' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { platform, handle, url, isActive, order } = body

    // Validate required fields
    if (!platform || !handle || !url) {
      return NextResponse.json(
        { error: 'Platform, handle, and URL are required' },
        { status: 400 }
      )
    }

    // Check if platform already exists (excluding current record)
    const existingPlatform = await prisma.socialMedia.findFirst({
      where: {
        platform,
        id: { not: params.id },
        deletedAt: null,
      },
    })

    if (existingPlatform) {
      return NextResponse.json(
        { error: 'Platform already exists' },
        { status: 400 }
      )
    }

    const socialMedia = await prisma.socialMedia.update({
      where: {
        id: params.id,
      },
      data: {
        platform,
        handle,
        url,
        isActive: isActive ?? true,
        order: order ?? 0,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(socialMedia)
  } catch (error) {
    console.error('Error updating social media:', error)
    return NextResponse.json(
      { error: 'Failed to update social media handle' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Soft delete
    await prisma.socialMedia.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return NextResponse.json({ message: 'Social media handle deleted successfully' })
  } catch (error) {
    console.error('Error deleting social media:', error)
    return NextResponse.json(
      { error: 'Failed to delete social media handle' },
      { status: 500 }
    )
  }
} 