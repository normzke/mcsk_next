import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedMembershipCategories() {
  const categories = [
    {
      id: 'composer-author',
      title: 'Composer/Author',
      description: 'For music composers, songwriters, and authors of musical works.',
      features: [
        'Full voting rights',
        'Higher royalty share',
        'Work registration priority',
        'Access to all member benefits',
        'Eligible for board positions'
      ],
      requirements: [
        'Original musical works',
        'Proof of authorship',
        'Valid identification',
        'Registration fee payment'
      ],
      order: 1,
      isActive: true
    },
    {
      id: 'publisher',
      title: 'Publisher',
      description: 'For music publishing companies and organizations.',
      features: [
        'Publishing rights management',
        'Catalog administration',
        'International collection',
        'Publishing tools access',
        'Business support services'
      ],
      requirements: [
        'Business registration',
        'Publishing catalog',
        'Rights agreements',
        'Financial documents'
      ],
      order: 2,
      isActive: true
    },
    {
      id: 'successor',
      title: 'Successor',
      description: 'For heirs and estates of deceased members.',
      features: [
        'Rights inheritance management',
        'Estate planning support',
        'Continued royalty collection',
        'Legacy protection',
        'Historical catalog access'
      ],
      requirements: [
        'Proof of succession',
        'Legal documentation',
        'Estate papers',
        'Original member details'
      ],
      order: 3,
      isActive: true
    }
  ]

  const result = await Promise.all(
    categories.map(category =>
      prisma.setting.upsert({
        where: { key: `membership_category_${category.id}` },
        update: {
          key: `membership_category_${category.id}`,
          value: JSON.stringify(category),
          type: 'json',
          group: 'membership'
        },
        create: {
          key: `membership_category_${category.id}`,
          value: JSON.stringify(category),
          type: 'json',
          group: 'membership'
        }
      })
    )
  )

  return result
} 