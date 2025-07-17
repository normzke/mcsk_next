import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || undefined
    const memberId = searchParams.get('memberId') || undefined
    const licenseTypeId = searchParams.get('licenseTypeId') || undefined

    const where = {
      OR: search ? [
        { licenseNumber: { contains: search, mode: 'insensitive' } },
        { member: { name: { contains: search, mode: 'insensitive' } } },
        { member: { email: { contains: search, mode: 'insensitive' } } },
      ] : undefined,
      status: status as string | undefined,
      memberId: memberId,
      licenseTypeId: licenseTypeId,
      deletedAt: null,
    }

    const [licenses, total] = await Promise.all([
      prisma.license.findMany({
        where,
        include: {
          member: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          licenseType: {
            select: {
              id: true,
              title: true,
              category: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.license.count({ where }),
    ])

    return NextResponse.json({
      data: licenses,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[LICENSES_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const license = await prisma.license.create({
      data: {
        licenseTypeId: body.licenseTypeId,
        memberId: body.memberId,
        status: body.status,
        licenseNumber: body.licenseNumber,
        issuedAt: body.issuedAt ? new Date(body.issuedAt) : null,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        licenseType: {
          select: {
            id: true,
            title: true,
            category: true,
          },
        },
      },
    })

    return NextResponse.json(license)
  } catch (error) {
    console.error('[LICENSES_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 