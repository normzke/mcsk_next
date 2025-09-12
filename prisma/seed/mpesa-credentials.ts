import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedMpesaCredentials() {
  console.log('💳 Seeding M-Pesa credentials...')

  const mpesaCredentials = [
    {
      environment: 'sandbox',
      consumerKey: 'your_sandbox_consumer_key',
      consumerSecret: 'your_sandbox_consumer_secret',
      passkey: 'your_sandbox_passkey',
      shortcode: '174379',
      businessName: 'MCSK Kenya - Sandbox',
      isActive: true,
    },
    {
      environment: 'production',
      consumerKey: 'your_production_consumer_key',
      consumerSecret: 'your_production_consumer_secret',
      passkey: 'your_production_passkey',
      shortcode: 'your_production_shortcode',
      businessName: 'MCSK Kenya',
      isActive: false, // Disabled by default for security
    },
  ]

  const createdCredentials = []

  for (const cred of mpesaCredentials) {
    const created = await prisma.mpesaCredentials.upsert({
      where: { environment: cred.environment },
      update: {
        consumerKey: cred.consumerKey,
        consumerSecret: cred.consumerSecret,
        passkey: cred.passkey,
        shortcode: cred.shortcode,
        businessName: cred.businessName,
        isActive: cred.isActive,
        updatedAt: new Date(),
      },
      create: {
        environment: cred.environment,
        consumerKey: cred.consumerKey,
        consumerSecret: cred.consumerSecret,
        passkey: cred.passkey,
        shortcode: cred.shortcode,
        businessName: cred.businessName,
        isActive: cred.isActive,
      },
    })
    createdCredentials.push(created)
  }

  console.log(`✅ Created ${createdCredentials.length} M-Pesa credential sets`)
  return createdCredentials
} 