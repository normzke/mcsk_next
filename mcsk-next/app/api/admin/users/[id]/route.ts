import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { hash, compare } from 'bcryptjs'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name, email, currentPassword, newPassword } = body

    if (!params.id) {
      return new NextResponse('User ID is required', { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    // Verify that the user is updating their own profile
    if (user.email !== session.user.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return new NextResponse('Current password is required', { status: 400 })
      }

      const isPasswordValid = await compare(currentPassword, user.password)
      if (!isPasswordValid) {
        return new NextResponse('Current password is incorrect', { status: 400 })
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        email,
        ...(newPassword && {
          password: await hash(newPassword, 12),
        }),
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('[USER_UPDATE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 