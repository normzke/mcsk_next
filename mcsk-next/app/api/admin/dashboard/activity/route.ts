import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Bypass authentication in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[DEV] Authentication bypassed for activity API')
    } else {
      // Check authentication in production
      const session = await auth()
      if (!session || session.user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }

    // Get recent activities from different sources
    const [recentMembers, recentNews, recentEvents, recentDownloads, recentWaves] = await Promise.all([
      prisma.user.findMany({
        where: { 
          role: 'member',
          deletedAt: null 
        },
        orderBy: { createdAt: 'desc' },
        take: 2,
        select: { 
          id: true,
          name: true,
          createdAt: true
        }
      }),
      prisma.news.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 2,
        select: { 
          id: true,
          title: true,
          createdAt: true
        }
      }),
      prisma.event.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 2,
        select: { 
          id: true,
          title: true,
          createdAt: true
        }
      }),
      prisma.download.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 2,
        select: { 
          id: true,
          title: true,
          createdAt: true
        }
      }),
      prisma.wave.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 2,
        select: { 
          id: true,
          title: true,
          createdAt: true
        }
      })
    ])

    // Format activities
    const activities = [
      ...recentMembers.map(member => ({
        id: member.id,
        type: 'member',
        action: 'registered',
        subject: member.name,
        timestamp: member.createdAt
      })),
      ...recentNews.map(news => ({
        id: news.id,
        type: 'news',
        action: 'published',
        subject: news.title,
        timestamp: news.createdAt
      })),
      ...recentEvents.map(event => ({
        id: event.id,
        type: 'event',
        action: 'scheduled',
        subject: event.title,
        timestamp: event.createdAt
      })),
      ...recentDownloads.map(download => ({
        id: download.id,
        type: 'download',
        action: 'uploaded',
        subject: download.title,
        timestamp: download.createdAt
      })),
      ...recentWaves.map(wave => ({
        id: wave.id,
        type: 'wave',
        action: 'added',
        subject: wave.title,
        timestamp: wave.createdAt
      }))
    ]

    // Sort by timestamp (most recent first)
    activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

    // Return only the most recent 6 activities
    return NextResponse.json({ data: activities.slice(0, 6) })
  } catch (error) {
    console.error('Error fetching activity data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activity data' },
      { status: 500 }
    )
  }
}
