import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Schema for license type updates
const licenseTypeUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  features: z.array(z.string()).or(z.record(z.any())).optional(),
  requirements: z.array(z.string()).or(z.record(z.any())).optional(),
  fees: z.array(z.object({
    name: z.string(),
    amount: z.number()
  })).or(z.record(z.any())).optional(),
  icon: z.string().optional(),
  duration: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional()
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const licenseType = await prisma.licenseType.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            licenses: true
          }
        }
      }
    });

    if (!licenseType) {
      return NextResponse.json(
        { error: 'License type not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(licenseType);
  } catch (error) {
    console.error('Error fetching license type:', error);
    return NextResponse.json(
      { error: 'Failed to fetch license type' },
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
    const validatedData = licenseTypeUpdateSchema.parse(body);

    const updatedLicenseType = await prisma.licenseType.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json(updatedLicenseType);
  } catch (error) {
    console.error('Error updating license type:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid license type data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update license type' },
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
    await prisma.licenseType.update({
      where: { id: params.id },
      data: { deletedAt: new Date() }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting license type:', error);
    return NextResponse.json(
      { error: 'Failed to delete license type' },
      { status: 500 }
    );
  }
} 