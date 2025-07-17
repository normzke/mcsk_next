import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { licenseId: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const license = await prisma.license.findUnique({
      where: {
        id: params.licenseId,
      },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        licenseType: true,
      },
    })

    if (!license) {
      return new NextResponse('License not found', { status: 404 })
    }

    return NextResponse.json(license)
  } catch (error) {
    console.error('[LICENSE_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { licenseId: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const license = await prisma.license.update({
      where: {
        id: params.licenseId,
      },
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
    console.error('[LICENSE_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { licenseId: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const license = await prisma.license.update({
      where: {
        id: params.licenseId,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return NextResponse.json(license)
  } catch (error) {
    console.error('[LICENSE_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 