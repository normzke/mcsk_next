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

    const faq = await prisma.faq.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!faq) {
      return new NextResponse('FAQ not found', { status: 404 })
    }

    return NextResponse.json(faq)
  } catch (error) {
    console.error('[FAQ_GET]', error)
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

    const faq = await prisma.faq.update({
      where: {
        id: params.id,
      },
      data: {
        question: body.question,
        answer: body.answer,
        order: body.order,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(faq)
  } catch (error) {
    console.error('[FAQ_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[FAQ_DELETE] Starting deletion for ID:', params.id)
    
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      console.log('[FAQ_DELETE] Unauthorized access attempt')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    console.log('[FAQ_DELETE] User authorized, proceeding with deletion')

    // Check if the FAQ exists first
    const existingFaq = await prisma.faq.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingFaq) {
      console.log('[FAQ_DELETE] FAQ not found:', params.id)
      return new NextResponse('FAQ not found', { status: 404 })
    }

    console.log('[FAQ_DELETE] FAQ found, performing soft delete')

    const faq = await prisma.faq.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    console.log('[FAQ_DELETE] Soft delete successful:', faq.id)
    return NextResponse.json(faq)
  } catch (error) {
    console.error('[FAQ_DELETE] Error:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 