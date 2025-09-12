import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch downloads from database
    const dbDownloads = await prisma.download.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    // Transform the data to match the expected format
    const files = dbDownloads.map((download) => ({
      id: download.id,
      title: download.title,
      description: download.description || download.title,
      fileType: "PDF", // Default file type
      fileSize: "1.0 MB", // Default file size
      downloadUrl: download.file,
      category: "general",
      updatedDate: download.updatedAt.toISOString().split('T')[0]
    }));

    const downloadsData = {
      hero: {
        title: "Downloads",
        description: "Access forms, documents, and resources related to MCSK membership and licensing.",
        image: "/images/downloads/hero.jpg"
      },
      categories: [
        {
          id: "membership",
          title: "Membership Forms",
          description: "Forms required for MCSK membership application and renewal."
        },
        {
          id: "licensing",
          title: "Licensing Documents",
          description: "Forms and documents for various licensing applications."
        },
        {
          id: "reports",
          title: "Reports & Publications",
          description: "Annual reports, newsletters, and other MCSK publications."
        },
        {
          id: "guidelines",
          title: "Guidelines & Policies",
          description: "MCSK guidelines, policies, and procedural documents."
        }
      ],
      files
    };

    return NextResponse.json({ data: downloadsData }, { status: 200 });
  } catch (error) {
    console.error('Error in downloads API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch downloads data' },
      { status: 500 }
    );
  }
}
