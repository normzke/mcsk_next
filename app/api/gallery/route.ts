import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch gallery items from database
    const dbGalleryItems = await prisma.gallery.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    // Transform the data to match the expected format
    const items = dbGalleryItems.map((item) => ({
      id: item.id,
      title: item.title,
      date: item.createdAt.toISOString().split('T')[0],
      location: 'MCSK Events',
      description: item.description || item.title,
      images: [item.image],
      category: item.type === 'video' ? 'Videos' : 'Photos',
      tags: ['MCSK', 'Music', 'Events']
    }));

    const galleryData = {
      hero: {
        title: "MCSK Gallery",
        description: "Browse photos and videos from our events, performances, and activities.",
        image: "/images/gallery/hero.jpg"
      },
      categories: ["Events", "Performances", "Workshops"],
      tags: ["Music", "Artists", "Copyright", "Royalties", "Licensing"],
      items,
      social_media: {
        title: "Follow Us",
        description: "Stay connected with MCSK on social media for the latest updates and photos.",
        links: [
          { platform: "Instagram", url: "https://instagram.com/mcsk" },
          { platform: "Facebook", url: "https://facebook.com/mcsk" },
          { platform: "Twitter", url: "https://twitter.com/mcsk" }
        ]
      }
    };

    return NextResponse.json({ data: galleryData }, { status: 200 });
  } catch (error) {
    console.error('Error in gallery API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery data' },
      { status: 500 }
    );
  }
}
