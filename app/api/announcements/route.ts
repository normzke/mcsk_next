import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      where: {
        deletedAt: null,
        isPublished: true,
        OR: [
          { expireAt: null },
          { expireAt: { gte: new Date() } }
        ]
      },
      orderBy: {
        publishAt: 'desc',
      },
      take: 10, // Limit to 10 most recent announcements
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        type: true,
        buttonText: true,
        buttonUrl: true,
        attachment: true,
        publishAt: true,
        expireAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ 
      success: true,
      data: announcements,
    });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch announcements',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const revalidate = 60; // Revalidate every 60 seconds
