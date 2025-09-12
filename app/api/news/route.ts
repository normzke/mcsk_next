import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {
      deletedAt: null,
      isActive: true,
    };

    // Get total count for pagination
    const total = await prisma.news.count({ where });
    
    // Fetch news articles from database with pagination
    const newsArticles = await prisma.news.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Transform the data to match the expected format
    const data = newsArticles.map((article) => ({
      id: article.id,
      title: article.title,
      content: article.content,
      excerpt: article.content ? article.content.substring(0, 150) + '...' : '',
      image: article.image || '/images/news/default.jpg',
      date: article.createdAt.toISOString(),
      slug: article.slug,
    }));

    // Calculate pagination metadata
    const hasMore = skip + data.length < total;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasMore,
      },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch news data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const revalidate = 60; // Revalidate every 60 seconds