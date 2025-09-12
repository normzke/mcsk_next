import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedSocialMedia() {
  console.log('🌐 Seeding social media handles...')

  const socialMediaHandles = [
    {
      platform: 'twitter',
      handle: '@MCSKenya',
      url: 'https://twitter.com/MCSKenya',
      isActive: true,
      order: 1,
    },
    {
      platform: 'facebook',
      handle: 'MCSK Kenya',
      url: 'https://facebook.com/MCSKenya',
      isActive: true,
      order: 2,
    },
    {
      platform: 'instagram',
      handle: 'mcsk_kenya',
      url: 'https://instagram.com/mcsk_kenya',
      isActive: true,
      order: 3,
    },
    {
      platform: 'linkedin',
      handle: 'music-copyright-society-of-kenya',
      url: 'https://linkedin.com/company/music-copyright-society-of-kenya',
      isActive: true,
      order: 4,
    },
    {
      platform: 'youtube',
      handle: 'MCSK Kenya',
      url: 'https://youtube.com/@MCSKKenya',
      isActive: true,
      order: 5,
    },
  ]

  const createdHandles = []

  for (const handle of socialMediaHandles) {
    const created = await prisma.socialMedia.upsert({
      where: { platform: handle.platform },
      update: {
        handle: handle.handle,
        url: handle.url,
        isActive: handle.isActive,
        order: handle.order,
        updatedAt: new Date(),
      },
      create: {
        platform: handle.platform,
        handle: handle.handle,
        url: handle.url,
        isActive: handle.isActive,
        order: handle.order,
      },
    })
    createdHandles.push(created)
  }

  console.log(`✅ Created ${createdHandles.length} social media handles`)
  return createdHandles
} 