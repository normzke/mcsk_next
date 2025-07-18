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

    const seoMeta = await prisma.seoMeta.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!seoMeta) {
      return new NextResponse('SEO meta not found', { status: 404 })
    }

    return NextResponse.json(seoMeta)
  } catch (error) {
    console.error('[SEO_META_GET]', error)
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

    // Check if path already exists for another entry
    if (body.path) {
      const existing = await prisma.seoMeta.findFirst({
        where: {
          path: body.path,
          id: { not: params.id },
        },
      })

      if (existing) {
        return new NextResponse('Path already exists', { status: 400 })
      }
    }

    const seoMeta = await prisma.seoMeta.update({
      where: {
        id: params.id,
      },
      data: {
        path: body.path,
        title: body.title,
        description: body.description,
        keywords: body.keywords,
        ogImage: body.ogImage,
        ogTitle: body.ogTitle,
        ogDescription: body.ogDescription,
      },
    })

    return NextResponse.json(seoMeta)
  } catch (error) {
    console.error('[SEO_META_PATCH]', error)
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

    await prisma.seoMeta.delete({
      where: {
        id: params.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[SEO_META_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 