import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Fetch services from database
    const dbServices = await prisma.service.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    // Transform the data to match the expected format
    const services = dbServices.map((service) => ({
      id: service.id,
      title: service.title,
      description: service.description,
      short_description: service.description.substring(0, 100) + '...',
      icon: 'fa-music', // Default icon
      image: service.icon || '/images/services/default.jpg',
      features: [
        'Professional service',
        'Expert support',
        'Quality assurance',
        'Member benefits'
      ]
    }));

    return NextResponse.json({ data: services })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
} 