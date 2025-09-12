import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      idNumber,
      dateOfBirth,
      address,
      city,
      country,
      membershipType,
      bio,
      bankName,
      bankAccount,
      mpesaNumber,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !idNumber || !dateOfBirth || !address || !city || !country || !membershipType) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingMember = await prisma.member.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    })

    if (existingMember) {
      return NextResponse.json(
        { error: 'A member with this email already exists' },
        { status: 400 }
      )
    }

    // Create new member
    const member = await prisma.member.create({
      data: {
        id: randomUUID(),
        name: `${firstName} ${lastName}`,
        email,
        phone,
        idNumber,
        dateOfBirth: new Date(dateOfBirth),
        address,
        city,
        country,
        membershipType,
        bio: bio || null,
        bankName: bankName || null,
        bankAccount: bankAccount || null,
        mpesaNumber: mpesaNumber || null,
        status: 'pending',
        createdAt: new Date(),
      },
    })

    // Get the appropriate payment package for the membership type
    const paymentPackage = await prisma.paymentPackage.findFirst({
      where: {
        name: {
          contains: membershipType,
        },
        isActive: true,
        deletedAt: null,
      },
    })

    // Create payment transaction if package exists
    let transaction = null
    if (paymentPackage) {
      transaction = await prisma.paymentTransaction.create({
        data: {
          id: randomUUID(),
          memberId: member.id,
          packageId: paymentPackage.id,
          amount: paymentPackage.amount,
          currency: paymentPackage.currency,
          status: 'pending',
          paymentMethod: 'mpesa',
          phoneNumber: phone,
          description: `Membership application fee for ${membershipType}`,
          createdAt: new Date(),
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: member.id,
      paymentRequired: !!paymentPackage,
      transactionId: transaction?.id,
      amount: paymentPackage?.amount,
      currency: paymentPackage?.currency,
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating membership application:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
} 