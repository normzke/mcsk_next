import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { seedHeroSlides } from './seed/hero-slides'
import { seedMembershipBenefits } from './seed/membership-benefits'
import { seedMembershipCategories } from './seed/membership-categories'
import { seedLicenseTypes } from './seed/license-types'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const adminPassword = await hash('password', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@mcsk.co.ke' },
    update: {
      password: adminPassword,
      role: 'admin',
    },
    create: {
      name: 'Admin User',
      email: 'admin@mcsk.co.ke',
      password: adminPassword,
      role: 'admin',
    },
  })

  console.log('✅ Admin user created:', adminUser.email)

  // Seed all data
  const membershipBenefits = await seedMembershipBenefits()
  const membershipCategories = await seedMembershipCategories()
  const licenseTypes = await seedLicenseTypes()
  const heroSlides = await seedHeroSlides()

  // Create settings
  const settings = await Promise.all([
    prisma.setting.upsert({
      where: { key: 'site_name' },
      update: {},
      create: {
        key: 'site_name',
        value: 'MCSK - Music Copyright Society of Kenya',
        type: 'text',
        group: 'general',
      },
    }),
    prisma.setting.upsert({
      where: { key: 'contact_email' },
      update: {},
      create: {
        key: 'contact_email',
        value: 'info@mcsk.co.ke',
        type: 'text',
        group: 'contact',
      },
    }),
  ])

  // Create SEO meta
  const seoMeta = await Promise.all([
    prisma.seoMeta.upsert({
      where: { path: '/' },
      update: {},
      create: {
        path: '/',
        title: 'MCSK - Music Copyright Society of Kenya',
        description: 'Protecting the rights of musicians in Kenya',
        keywords: 'music, copyright, kenya, mcsk, royalties',
        ogTitle: 'MCSK - Music Copyright Society of Kenya',
        ogDescription: 'Protecting the rights of musicians in Kenya',
      },
    }),
    prisma.seoMeta.upsert({
      where: { path: '/about' },
      update: {},
      create: {
        path: '/about',
        title: 'About MCSK - Music Copyright Society of Kenya',
        description: 'Learn about MCSK and our mission to protect musicians',
        keywords: 'about mcsk, music copyright kenya, music protection',
        ogTitle: 'About MCSK',
        ogDescription: 'Learn about MCSK and our mission to protect musicians',
      },
    }),
  ])

  console.log('✅ Database seeding completed successfully')
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 