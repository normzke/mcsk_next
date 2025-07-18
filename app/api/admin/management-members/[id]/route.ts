import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { managementMemberId: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const managementMember = await prisma.managementMember.findUnique({
      where: {
        id: params.managementMemberId,
      },
    })

    if (!managementMember) {
      return new NextResponse('Management member not found', { status: 404 })
    }
    
    // Cast to the correct types
    const typedMember = {
      ...managementMember,
      role: managementMember.role as 'board_member' | 'executive' | 'director' | 'manager',
      department: managementMember.department as 'board' | 'finance' | 'licensing' | 'distribution' | 'legal' | 'operations' | 'it' | 'hr',
      status: managementMember.status as 'active' | 'inactive' | 'on_leave'
    }

    return NextResponse.json(typedMember)
  } catch (error) {
    console.error('[MANAGEMENT_MEMBER_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { managementMemberId: string } }
) {
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
    
    // Only include fields in the update if they are provided in the request
    const updateData: any = {};
    
    if (body.name !== undefined) updateData.name = body.name;
    if (body.firstName !== undefined) updateData.firstName = body.firstName;
    if (body.lastName !== undefined) updateData.lastName = body.lastName;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.position !== undefined) updateData.position = body.position;
    if (body.profileImage !== undefined) updateData.profileImage = body.profileImage;
    if (body.bio !== undefined) updateData.bio = body.bio;
    if (body.order !== undefined) updateData.order = body.order;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.linkedinUrl !== undefined) updateData.linkedinUrl = body.linkedinUrl;
    if (body.twitterUrl !== undefined) updateData.twitterUrl = body.twitterUrl;
    
    // Handle date fields properly
    if (body.startDate !== undefined) {
      updateData.startDate = body.startDate ? new Date(body.startDate) : null;
    }
    if (body.endDate !== undefined) {
      updateData.endDate = body.endDate ? new Date(body.endDate) : null;
    }
    
    // Validate and cast enum fields
    if (body.role !== undefined) {
      updateData.role = validRoles.includes(body.role) 
        ? body.role as 'board_member' | 'executive' | 'director' | 'manager'
        : 'manager';
    }
    
    if (body.department !== undefined) {
      updateData.department = validDepartments.includes(body.department)
        ? body.department as 'board' | 'finance' | 'licensing' | 'distribution' | 'legal' | 'operations' | 'it' | 'hr'
        : 'operations';
    }
    
    if (body.status !== undefined) {
      updateData.status = validStatuses.includes(body.status)
        ? body.status as 'active' | 'inactive' | 'on_leave'
        : 'active';
    }

    const managementMember = await prisma.managementMember.update({
      where: {
        id: params.managementMemberId,
      },
      data: updateData,
    })

    return NextResponse.json(managementMember)
  } catch (error) {
    console.error('[MANAGEMENT_MEMBER_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { managementMemberId: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const managementMember = await prisma.managementMember.update({
      where: {
        id: params.managementMemberId,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return NextResponse.json(managementMember)
  } catch (error) {
    console.error('[MANAGEMENT_MEMBER_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 