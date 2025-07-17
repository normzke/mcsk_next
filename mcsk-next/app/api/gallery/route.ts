import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for gallery
    const galleryData = {
      hero: {
        title: "MCSK Gallery",
        description: "Browse photos and videos from our events, performances, and activities.",
        image: "/images/gallery/hero.jpg"
      },
      categories: ["Events", "Performances", "Workshops"],
      tags: ["Music", "Artists", "Copyright", "Royalties", "Licensing"],
      items: [
        {
          id: "1",
          title: "Annual General Meeting 2024",
          date: "2024-03-15",
          location: "Kenyatta International Convention Centre, Nairobi",
          description: "Members gathered for the annual general meeting to discuss achievements and future plans.",
          images: [
            "/images/gallery/agm1.jpg",
            "/images/gallery/agm2.jpg",
            "/images/gallery/agm3.jpg"
          ],
          category: "Events",
          tags: ["Meeting", "Members"]
        },
        {
          id: "2",
          title: "Music Rights Workshop",
          date: "2024-02-20",
          location: "Sarova Stanley Hotel, Nairobi",
          description: "Workshop for musicians on understanding and protecting their copyright.",
          images: [
            "/images/gallery/workshop1.jpg",
            "/images/gallery/workshop2.jpg"
          ],
          category: "Workshops",
          tags: ["Education", "Copyright"]
        },
        {
          id: "3",
          title: "MCSK Music Festival",
          date: "2024-01-25",
          location: "Uhuru Gardens, Nairobi",
          description: "Annual music festival showcasing Kenya's top musical talent.",
          images: [
            "/images/gallery/festival1.jpg",
            "/images/gallery/festival2.jpg",
            "/images/gallery/festival3.jpg",
            "/images/gallery/festival4.jpg"
          ],
          category: "Performances",
          tags: ["Music", "Festival", "Artists"]
        }
      ],
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
