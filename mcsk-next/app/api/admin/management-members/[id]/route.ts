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

    return NextResponse.json(managementMember)
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

    const managementMember = await prisma.managementMember.update({
      where: {
        id: params.managementMemberId,
      },
      data: {
        name: body.name,
        position: body.position,
        image: body.image,
        bio: body.bio,
        order: body.order,
        isActive: body.isActive,
      },
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