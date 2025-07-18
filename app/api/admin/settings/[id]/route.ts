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

    const setting = await prisma.setting.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!setting) {
      return new NextResponse('Setting not found', { status: 404 })
    }

    return NextResponse.json(setting)
  } catch (error) {
    console.error('[SETTING_GET]', error)
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

    const setting = await prisma.setting.update({
      where: {
        id: params.id,
      },
      data: {
        key: body.key,
        value: body.value,
        type: body.type,
        group: body.group,
      },
    })

    return NextResponse.json(setting)
  } catch (error) {
    console.error('[SETTING_PATCH]', error)
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

    await prisma.setting.delete({
      where: {
        id: params.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[SETTING_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 