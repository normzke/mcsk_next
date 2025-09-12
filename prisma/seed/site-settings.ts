import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedSiteSettings() {
  console.log('🌱 Seeding site settings...')

  const defaultSettings = [
    {
      key: 'headerLogo',
      value: '/images/MCSK Logo.png',
      type: 'text',
      group: 'site'
    },
    {
      key: 'footerLogo',
      value: '/images/mcsk-logo-white.svg',
      type: 'text',
      group: 'site'
    },
    {
      key: 'siteName',
      value: 'MCSK',
      type: 'text',
      group: 'site'
    },
    {
      key: 'siteDescription',
      value: 'Protecting and promoting music rights in Kenya',
      type: 'text',
      group: 'site'
    },
    {
      key: 'contactEmail',
      value: 'music@mcsk.org',
      type: 'text',
      group: 'site'
    },
    {
      key: 'contactPhone',
      value: '+254 733 400204/ 0204400200',
      type: 'text',
      group: 'site'
    },
    {
      key: 'contactAddress',
      value: 'Sports Road, Westlands • P.O. BOX 14806-00800 • Nairobi, Kenya',
      type: 'text',
      group: 'site'
    }
  ]

  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting
    })
  }

  console.log('✅ Site settings seeded successfully')
} 