import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Schema for membership benefit updates
const membershipBenefitUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  icon: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional()
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const benefit = await prisma.membershipBenefit.findUnique({
      where: { id: params.id }
    });

    if (!benefit) {
      return NextResponse.json(
        { error: 'Membership benefit not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(benefit);
  } catch (error) {
    console.error('Error fetching membership benefit:', error);
    return NextResponse.json(
      { error: 'Failed to fetch membership benefit' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = membershipBenefitUpdateSchema.parse(body);

    const updatedBenefit = await prisma.membershipBenefit.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json(updatedBenefit);
  } catch (error) {
    console.error('Error updating membership benefit:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid membership benefit data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update membership benefit' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Using soft delete by updating deletedAt
    await prisma.membershipBenefit.update({
      where: { id: params.id },
      data: { deletedAt: new Date() }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting membership benefit:', error);
    return NextResponse.json(
      { error: 'Failed to delete membership benefit' },
      { status: 500 }
    );
  }
} 