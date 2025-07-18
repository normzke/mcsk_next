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
    const group = searchParams.get('group') || undefined

    const where = {
      OR: search ? [
        { key: { contains: search, mode: 'insensitive' } },
        { value: { contains: search, mode: 'insensitive' } },
      ] : undefined,
      group: group || undefined,
    }

    const [settings, total] = await Promise.all([
      prisma.setting.findMany({
        where,
        orderBy: [
          { group: 'asc' },
        ],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.setting.count({ where }),
    ])

    return NextResponse.json({
      data: settings,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[SETTINGS_GET]', error)
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

    const setting = await prisma.setting.create({
      data: {
        key: body.key,
        value: body.value,
        type: body.type,
        group: body.group,
      },
    })

    return NextResponse.json(setting)
  } catch (error) {
    console.error('[SETTINGS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 