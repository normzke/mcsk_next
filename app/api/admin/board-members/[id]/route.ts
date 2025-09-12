import { NextResponse } from 'next/server'
import { auth } from '@/lib/custom-auth'
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

    const boardMember = await prisma.boardmember.findFirst({
      where: {
        id: params.id,
        deletedAt: null,
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

    const boardMember = await prisma.boardmember.update({
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
        email: body.email,
        linkedinUrl: body.linkedinUrl,
        phone: body.phone,
        twitterUrl: body.twitterUrl,
        updatedAt: new Date(),
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

    // First check if the board member exists
    const existingBoardMember = await prisma.boardmember.findFirst({
      where: {
        id: params.id,
        deletedAt: null,
      },
    })

    if (!existingBoardMember) {
      return new NextResponse('Board member not found', { status: 404 })
    }

    const boardMember = await prisma.boardmember.update({
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