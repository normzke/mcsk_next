import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const licenseTypes = await prisma.licenseType.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json({ data: licenseTypes })
  } catch (error) {
    console.error('Error fetching license types from API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch license types' },
      { status: 500 }
    )
  }
} 