import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const boardMember = await prisma.managementMember.findFirst({
      where: {
        id: params.id,
        role: 'board_member',
      },
    })

    if (!boardMember) {
      return new NextResponse('Board member not found', { status: 404 })
    }

    return NextResponse.json(boardMember)
  } catch (error) {
    console.error('[BOARD_MEMBER_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const boardMember = await prisma.managementMember.update({
      where: {
        id: params.id,
      },
      data: {
        name: body.name,
        position: body.position,
        image: body.image,
        bio: body.bio,
        order: body.order,
        isActive: body.isActive,
        role: 'board_member',
      },
    })

    return NextResponse.json(boardMember)
  } catch (error) {
    console.error('[BOARD_MEMBER_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const boardMember = await prisma.managementMember.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return NextResponse.json(boardMember)
  } catch (error) {
    console.error('[BOARD_MEMBER_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 