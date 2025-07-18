import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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
    const isActive = searchParams.get('isActive') === 'true'

    const where = {
      OR: search ? [
        { name: { contains: search, mode: 'insensitive' } },
        { position: { contains: search, mode: 'insensitive' } },
      ] : undefined,
      isActive: isActive || undefined,
      deletedAt: null,
    }

    const [managementMembers, total] = await Promise.all([
      prisma.managementMember.findMany({
        where,
        orderBy: { order: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.managementMember.count({ where }),
    ])

    return NextResponse.json({
      data: managementMembers,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[MANAGEMENT_MEMBERS_GET]', error)
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

    // Validate role and department to ensure they match the expected enum values
    const validRoles = ['board_member', 'executive', 'director', 'manager'] as const;
    const validDepartments = ['board', 'finance', 'licensing', 'distribution', 'legal', 'operations', 'it', 'hr'] as const;
    const validStatuses = ['active', 'inactive', 'on_leave'] as const;
    
    const role = validRoles.includes(body.role as any) ? body.role : 'manager';
    const department = validDepartments.includes(body.department as any) ? body.department : 'operations';
    const status = validStatuses.includes(body.status as any) ? body.status : 'active';
    
    // Prepare the data with all required fields
    const managementMemberData = {
      name: body.name,
      firstName: body.firstName || '',
      lastName: body.lastName || '',
      email: body.email || '',
      position: body.position || '',
      role: role as 'board_member' | 'executive' | 'director' | 'manager',
      department: department as 'board' | 'finance' | 'licensing' | 'distribution' | 'legal' | 'operations' | 'it' | 'hr',
      profileImage: body.profileImage || '',
      image: body.image || '',
      bio: body.bio || '',
      order: body.order || 0,
      isActive: body.isActive ?? true,
      status: status as 'active' | 'inactive' | 'on_leave',
      phone: body.phone || '',
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      linkedinUrl: body.linkedinUrl || '',
      twitterUrl: body.twitterUrl || '',
    }

    const managementMember = await prisma.managementMember.create({
      data: managementMemberData,
    })

    return NextResponse.json(managementMember)
  } catch (error) {
    console.error('[MANAGEMENT_MEMBERS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 