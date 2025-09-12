import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedPaymentPackages() {
  console.log('💰 Seeding payment packages...')

  const paymentPackages = [
    {
      name: 'Composer Membership',
      description: 'Full membership for composers and authors with complete rights protection and royalty collection services.',
      amount: 5000.00,
      currency: 'KES',
      duration: 'Annual',
      isActive: true,
      order: 1,
    },
    {
      name: 'Publisher Membership',
      description: 'Comprehensive membership for music publishers with catalog management and international collection services.',
      amount: 7500.00,
      currency: 'KES',
      duration: 'Annual',
      isActive: true,
      order: 2,
    },
    {
      name: 'Successor Membership',
      description: 'Specialized membership for rights inheritors with estate planning and legacy protection services.',
      amount: 3000.00,
      currency: 'KES',
      duration: 'Annual',
      isActive: true,
      order: 3,
    },
    {
      name: 'Lifetime Composer',
      description: 'One-time payment for lifetime composer membership with all benefits included.',
      amount: 50000.00,
      currency: 'KES',
      duration: 'Lifetime',
      isActive: true,
      order: 4,
    },
    {
      name: 'Student Membership',
      description: 'Discounted membership for music students with basic rights protection services.',
      amount: 2000.00,
      currency: 'KES',
      duration: 'Annual',
      isActive: true,
      order: 5,
    },
  ]

  const createdPackages = []

  for (const pkg of paymentPackages) {
    // Check if package already exists
    const existing = await prisma.paymentPackage.findFirst({
      where: {
        name: pkg.name,
        duration: pkg.duration,
      },
    })

    if (existing) {
      // Update existing package
      const updated = await prisma.paymentPackage.update({
        where: { id: existing.id },
        data: {
          description: pkg.description,
          amount: pkg.amount,
          currency: pkg.currency,
          isActive: pkg.isActive,
          order: pkg.order,
          updatedAt: new Date(),
        },
      })
      createdPackages.push(updated)
    } else {
      // Create new package
      const created = await prisma.paymentPackage.create({
        data: {
          name: pkg.name,
          description: pkg.description,
          amount: pkg.amount,
          currency: pkg.currency,
          duration: pkg.duration,
          isActive: pkg.isActive,
          order: pkg.order,
        },
      })
      createdPackages.push(created)
    }
  }

  console.log(`✅ Created ${createdPackages.length} payment packages`)
  return createdPackages
} 