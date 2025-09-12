import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch partners from database
    const dbPartners = await prisma.partner.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    // Transform the data to match the expected format
    const partners = dbPartners.map((partner) => ({
      id: partner.id,
      name: partner.name,
      logo: partner.logo || '/images/partners/default.png',
      url: partner.website || '#',
      description: `${partner.name} - Partner of MCSK`
    }));

    return NextResponse.json({ partners });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}
