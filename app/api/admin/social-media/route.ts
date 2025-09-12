import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/custom-auth'
import { randomUUID } from 'crypto'

export async function GET() {
  try {
    const session = await getSession()
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const socialMedia = await prisma.socialMedia.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        order: 'asc',
      },
    })

    return NextResponse.json(socialMedia)
  } catch (error) {
    console.error('Error fetching social media:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social media' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    // Check if platform already exists
    const existingPlatform = await prisma.socialMedia.findFirst({
      where: {
        platform,
        deletedAt: null,
      },
    })

    if (existingPlatform) {
      return NextResponse.json(
        { error: 'Platform already exists' },
        { status: 400 }
      )
    }

    const socialMedia = await prisma.socialMedia.create({
      data: {
        id: randomUUID(),
        platform,
        handle,
        url,
        isActive: isActive ?? true,
        order: order ?? 0,
        createdAt: new Date(),
      },
    })

    return NextResponse.json(socialMedia, { status: 201 })
  } catch (error) {
    console.error('Error creating social media:', error)
    return NextResponse.json(
      { error: 'Failed to create social media handle' },
      { status: 500 }
    )
  }
} 