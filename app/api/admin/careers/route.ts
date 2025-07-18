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
    const isActive = searchParams.get('isActive') === 'true'

    const where = {
      OR: search ? [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ] : undefined,
      isActive: isActive || undefined,
      deletedAt: null,
    }

    const [careers, total] = await Promise.all([
      prisma.career.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.career.count({ where }),
    ])

    return NextResponse.json({
      data: careers,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('[CAREERS_GET]', error)
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

    // Ensure JSON fields are properly formatted
    const requirements = typeof body.requirements === 'string' 
      ? JSON.parse(body.requirements) 
      : body.requirements;
      
    const responsibilities = typeof body.responsibilities === 'string' 
      ? JSON.parse(body.responsibilities) 
      : body.responsibilities;
      
    const benefits = typeof body.benefits === 'string' 
      ? JSON.parse(body.benefits) 
      : body.benefits;

    const career = await prisma.career.create({
      data: {
        title: body.title,
        department: body.department,
        location: body.location,
        type: body.type,
        experience: body.experience,
        description: body.description,
        responsibilities: responsibilities,
        requirements: requirements,
        benefits: benefits,
        deadline: body.deadline ? new Date(body.deadline) : null,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    })

    return NextResponse.json(career)
  } catch (error) {
    console.error('[CAREER_CREATE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}