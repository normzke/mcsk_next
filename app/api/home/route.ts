import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

import { getActiveAnnouncements, getActiveNews, getActivePartners } from '@/lib/db-utils';

export async function GET() {
  try {
    // Fetch data from database with caching
    const [heroSlides, announcements, latestNews, partners] = await Promise.all([
      prisma.heroSlide.findMany({
        where: {
          deletedAt: null,
          isActive: true,
        },
        orderBy: {
          order: 'asc'
        },
        take: 5
      }),
      getActiveAnnouncements(),
      getActiveNews(),
      getActivePartners()
    ]);

    const homeData = {
      hero_slides: heroSlides.map((slide) => ({
        id: slide.id,
        title: slide.title,
        description: slide.description || slide.subtitle || '',
        image: slide.image || '/images/hero/default.jpg',
        cta: {
          text: slide.buttonText || 'Learn More',
          url: slide.buttonLink || '/about'
        }
      })),
      announcements: announcements.map((announcement) => ({
        id: announcement.id,
        title: announcement.title,
        content: announcement.content || '',
        date: announcement.publishAt ? announcement.publishAt.toISOString().split('T')[0] : announcement.createdAt.toISOString().split('T')[0]
      })),
      latest_news: latestNews.map((article) => ({
        id: article.id,
        title: article.title,
        excerpt: (article.content || '').substring(0, 100) + '...',
        image: article.image || '/images/news/default.jpg',
        date: article.createdAt.toISOString().split('T')[0],
        slug: article.slug
      })),
      partners: partners.map((partner) => ({
        id: partner.id,
        name: partner.name,
        logo: partner.logo || '/images/partners/default.png',
        url: partner.website || '#'
      }))
    }

    return NextResponse.json({ data: homeData })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch home data' },
      { status: 500 }
    )
  }
} 