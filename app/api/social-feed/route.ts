import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real implementation, this would fetch the latest post from each platform
    // using their respective APIs (Twitter/X API, Facebook Graph API, Instagram API)
    
    // Mock data for social media feed - one post per platform
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
        url: 'https://twitter.com/MCSKenya'
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
        url: 'https://facebook.com/MCSKenya'
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
        url: 'https://instagram.com/mcsk_kenya'
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
