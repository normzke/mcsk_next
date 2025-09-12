import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateMCSKNumber } from '@/lib/mcsk-number'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await auth()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { memberId, approvedBy } = body

    if (!memberId) {
      return NextResponse.json(
        { error: 'Member ID is required' },
        { status: 400 }
      )
    }

    // Find the member
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: {
        paymentTransactions: {
          where: {
            status: 'completed'
          }
        }
      }
    })

    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      )
    }

    if (member.status === 'active') {
      return NextResponse.json(
        { error: 'Member is already approved' },
        { status: 400 }
      )
    }

    // Check if payment is completed (optional - you can remove this check if not required)
    const hasCompletedPayment = member.paymentTransactions.length > 0

    // Generate MCSK number
    const membershipNumber = await generateMCSKNumber()

    // Update member status
    const updatedMember = await prisma.member.update({
      where: { id: memberId },
      data: {
        status: 'active',
        membershipNumber,
        approvedAt: new Date(),
        approvedBy: approvedBy || user?.user?.email || 'admin',
        updatedAt: new Date(),
      },
    })

    // Create notification for the member
    await prisma.notification.create({
      data: {
        id: crypto.randomUUID(),
        memberId: memberId,
        type: 'membership_approved',
        title: 'Welcome to MCSK!',
        message: `Congratulations ${member.name}! Your MCSK membership has been approved. Your membership number is ${membershipNumber}. You can now access all member benefits and services.`,
        isRead: false,
        createdAt: new Date(),
      },
    })

    // Send email notification (in production, implement actual email sending)
    console.log(`Membership approved for ${member.email} with number: ${membershipNumber}`)

    return NextResponse.json({
      success: true,
      message: 'Member approved successfully',
      membershipNumber,
      member: {
        id: updatedMember.id,
        name: updatedMember.name,
        email: updatedMember.email,
        membershipNumber: updatedMember.membershipNumber,
        status: updatedMember.status,
      }
    })

  } catch (error) {
    console.error('Error approving member:', error)
    return NextResponse.json(
      { error: 'Failed to approve member' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await auth()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'pending'

    // Get pending members
    const pendingMembers = await prisma.member.findMany({
      where: {
        status: status as 'pending' | 'active' | 'suspended',
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        membershipType: true,
        status: true,
        createdAt: true,
        membershipNumber: true,
        paymentTransactions: {
          where: {
            status: 'completed'
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      members: pendingMembers
    })

  } catch (error) {
    console.error('Error fetching pending members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pending members' },
      { status: 500 }
    )
  }
} 