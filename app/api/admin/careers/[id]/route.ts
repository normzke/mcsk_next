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

    const career = await prisma.career.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!career) {
      return new NextResponse('Career not found', { status: 404 })
    }

    return NextResponse.json(career)
  } catch (error) {
    console.error('[CAREER_GET]', error)
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

    const career = await prisma.career.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        description: body.description,
        requirements: body.requirements,
        responsibilities: body.responsibilities,
        type: body.type,
        location: body.location,
        experience: body.experience,
        salary: body.salary,
        deadline: body.deadline,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(career)
  } catch (error) {
    console.error('[CAREER_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[CAREER_DELETE] Starting deletion for ID:', params.id)
    
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      console.log('[CAREER_DELETE] Unauthorized access attempt')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    console.log('[CAREER_DELETE] User authorized, proceeding with deletion')

    // Check if the career exists first
    const existingCareer = await prisma.career.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingCareer) {
      console.log('[CAREER_DELETE] Career not found:', params.id)
      return new NextResponse('Career not found', { status: 404 })
    }

    console.log('[CAREER_DELETE] Career found, performing soft delete')

    const career = await prisma.career.update({
      where: {
        id: params.id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    console.log('[CAREER_DELETE] Soft delete successful:', career.id)
    return NextResponse.json(career)
  } catch (error) {
    console.error('[CAREER_DELETE] Error:', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 