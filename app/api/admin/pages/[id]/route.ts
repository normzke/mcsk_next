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

    const page = await prisma.page.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!page) {
      return new NextResponse('Page not found', { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('[PAGE_GET]', error)
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

    const page = await prisma.page.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        metaDescription: body.metaDescription,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error('[PAGE_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[PAGE_DELETE] Starting deletion for ID:', params.id)
    
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      console.log('[PAGE_DELETE] Unauthorized access attempt')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    console.log('[PAGE_DELETE] User authorized, proceeding with deletion')

    // Check if the page exists first
    const existingPage = await prisma.page.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingPage) {
      console.log('[PAGE_DELETE] Page not found:', params.id)
      return new NextResponse('Page not found', { status: 404 })
    }

    console.log('[PAGE_DELETE] Page found, performing soft delete')

    const page = await prisma.page.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    console.log('[PAGE_DELETE] Soft delete successful:', page.id)
    return NextResponse.json(page)
  } catch (error) {
    console.error('[PAGE_DELETE] Error:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 