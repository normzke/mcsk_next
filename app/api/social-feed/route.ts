import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get active social media handles from database
    const socialMediaHandles = await prisma.socialMedia.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      orderBy: {
        order: 'asc',
      },
    });

    // Get recent social posts from database
    const socialPosts = await prisma.socialPost.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      orderBy: {
        date: 'desc',
      },
      take: 9, // Increased to 9 posts for better feed
    });

    // If we have real posts in database, use them
    if (socialPosts.length > 0) {
      const posts = socialPosts.map(post => ({
        id: post.id,
        platform: post.platform as 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'youtube',
        content: post.content,
        image: post.image,
        author: post.author,
        authorImage: post.authorImage,
        date: post.date.toISOString(),
        likes: post.likes,
        comments: post.comments,
        shares: post.shares,
        url: post.url,
      }));

      return NextResponse.json({ posts });
    }

    // Fallback to mock data if no real posts exist
    // This ensures the social feed always works
    const posts = [
      {
        id: '1',
        platform: 'twitter',
        content: 'Exciting news! MCSK has partnered with @WIPO to enhance copyright protection for Kenyan musicians. This collaboration will help our members receive fair compensation for their creative work globally. #MusicRights #Copyright',
        author: 'MCSK Kenya',
        authorImage: '/images/MCSK Logo.png',
        date: '2025-05-28T10:30:00Z',
        likes: 124,
        comments: 32,
        shares: 56,
        url: socialMediaHandles.find(h => h.platform === 'twitter')?.url || 'https://x.com/TheMCSK'
      },
      {
        id: '2',
        platform: 'facebook',
        content: 'Join us for our upcoming workshop series on "Understanding Music Rights in the Digital Age" happening next month in Nairobi, Mombasa, and Kisumu. Free for all MCSK members!',
        image: '/images/news/workshop.jpg',
        author: 'Music Copyright Society of Kenya',
        authorImage: '/images/MCSK Logo.png',
        date: '2025-05-25T14:15:00Z',
        likes: 287,
        comments: 45,
        shares: 78,
        url: socialMediaHandles.find(h => h.platform === 'facebook')?.url || 'https://facebook.com/musiccopyrightsociety'
      },
      {
        id: '3',
        platform: 'instagram',
        content: 'Congratulations to all the winners at last night\'s Kenyan Music Awards! MCSK is proud to support our talented musicians. #KenyanMusic #MusicAwards',
        image: '/images/news/partnership.jpg',
        author: 'mcsk_kenya',
        authorImage: '/images/MCSK Logo.png',
        date: '2025-05-22T20:45:00Z',
        likes: 563,
        comments: 89,
        shares: 34,
        url: socialMediaHandles.find(h => h.platform === 'instagram')?.url || 'https://instagram.com/mcsk_kenya'
      },
      {
        id: '4',
        platform: 'linkedin',
        content: 'MCSK is proud to announce our new partnership with international music rights organizations. This collaboration will expand opportunities for Kenyan musicians globally.',
        author: 'Music Copyright Society of Kenya',
        authorImage: '/images/MCSK Logo.png',
        date: '2025-05-20T09:15:00Z',
        likes: 156,
        comments: 23,
        shares: 45,
        url: socialMediaHandles.find(h => h.platform === 'linkedin')?.url || 'https://linkedin.com/company/music-copyright-society-of-kenya'
      },
      {
        id: '5',
        platform: 'youtube',
        content: 'New video: "Understanding Music Copyright in Kenya" - A comprehensive guide for musicians and music industry professionals.',
        image: '/images/news/copyright-guide.jpg',
        author: 'MCSK Kenya',
        authorImage: '/images/MCSK Logo.png',
        date: '2025-05-18T16:30:00Z',
        likes: 234,
        comments: 67,
        shares: 89,
        url: socialMediaHandles.find(h => h.platform === 'youtube')?.url || 'https://youtube.com/@MCSKKenya'
      }
    ];

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching social feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social feed' },
      { status: 500 }
    );
  }
}
