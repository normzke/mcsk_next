import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedMembershipBenefits() {
  const benefits = [
    {
      id: 'rights-protection',
      title: 'Rights Protection',
      description: 'Comprehensive protection of your music rights and intellectual property across all platforms.',
      icon: 'shield',
      order: 1,
      isActive: true
    },
    {
      id: 'royalty-collection',
      title: 'Royalty Collection',
      description: 'Efficient collection and distribution of royalties from various music usage sources.',
      icon: 'money',
      order: 2,
      isActive: true
    },
    {
      id: 'legal-support',
      title: 'Legal Support',
      description: 'Access to legal assistance and representation for music-related disputes.',
      icon: 'scale',
      order: 3,
      isActive: true
    },
    {
      id: 'professional-development',
      title: 'Professional Development',
      description: 'Workshops, training, and resources to enhance your music career.',
      icon: 'graduation',
      order: 4,
      isActive: true
    },
    {
      id: 'international-network',
      title: 'International Network',
      description: 'Connection to global music societies and opportunities worldwide.',
      icon: 'globe',
      order: 5,
      isActive: true
    },
    {
      id: 'digital-tools',
      title: 'Digital Tools',
      description: 'Access to modern digital tools for music management and monitoring.',
      icon: 'computer',
      order: 6,
      isActive: true
    }
  ]

  const result = await Promise.all(
    benefits.map(benefit =>
      prisma.membershipBenefit.upsert({
        where: { id: benefit.id },
        update: benefit,
        create: benefit
      })
    )
  )

  return result
} 