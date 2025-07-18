import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedLicenseTypes() {
  const licenseTypes = [
    {
      id: 'radio-broadcasting',
      title: 'Radio Broadcasting',
      description: 'License for radio stations to broadcast music',
      category: 'broadcasting',
      features: [
        'Unlimited music playback',
        'Live performance rights',
        'Recording permission',
        'Public performance rights'
      ],
      requirements: [
        'Broadcasting license',
        'Station details',
        'Coverage area',
        'Technical specifications'
      ],
      fees: [
        {
          amount: 50000.00,
          currency: 'KES',
          period: 'Annual'
        }
      ],
      icon: 'radio',
      duration: 'Annual',
      order: 1,
      isActive: true
    },
    {
      id: 'tv-broadcasting',
      title: 'Television Broadcasting',
      description: 'License for TV stations to broadcast music',
      category: 'broadcasting',
      features: [
        'Music in programs',
        'Theme song usage',
        'Background music',
        'Live performance coverage'
      ],
      requirements: [
        'Broadcasting license',
        'Station profile',
        'Coverage details',
        'Programming schedule'
      ],
      fees: [
        {
          amount: 75000.00,
          currency: 'KES',
          period: 'Annual'
        }
      ],
      icon: 'tv',
      duration: 'Annual',
      order: 2,
      isActive: true
    },
    {
      id: 'hotels-restaurants',
      title: 'Hotels & Restaurants',
      description: 'License for playing music in hospitality venues',
      category: 'hospitality',
      features: [
        'Background music',
        'Live performance space',
        'Multiple room coverage',
        'Event usage'
      ],
      requirements: [
        'Business license',
        'Venue capacity',
        'Operating hours',
        'Sound system details'
      ],
      fees: [
        {
          amount: 25000.00,
          currency: 'KES',
          period: 'Annual'
        }
      ],
      icon: 'hotel',
      duration: 'Annual',
      order: 3,
      isActive: true
    },
    {
      id: 'retail-stores',
      title: 'Retail Stores',
      description: 'License for playing music in retail environments',
      category: 'retail',
      features: [
        'Background music',
        'Promotional usage',
        'Multiple speakers',
        'Seasonal music'
      ],
      requirements: [
        'Business registration',
        'Store size',
        'Operating hours',
        'Sound system info'
      ],
      fees: [
        {
          amount: 15000.00,
          currency: 'KES',
          period: 'Annual'
        }
      ],
      icon: 'store',
      duration: 'Annual',
      order: 4,
      isActive: true
    },
    {
      id: 'digital-streaming',
      title: 'Digital Streaming',
      description: 'License for digital music streaming platforms',
      category: 'digital',
      features: [
        'Online streaming',
        'Download rights',
        'User sharing',
        'Platform integration'
      ],
      requirements: [
        'Platform details',
        'Technical specs',
        'User base info',
        'Distribution model'
      ],
      fees: [
        {
          amount: 100000.00,
          currency: 'KES',
          period: 'Annual'
        }
      ],
      icon: 'stream',
      duration: 'Annual',
      order: 5,
      isActive: true
    },
    {
      id: 'live-events',
      title: 'Live Events',
      description: 'License for live music performances and concerts',
      category: 'events',
      features: [
        'Live performance rights',
        'Recording permission',
        'Promotional usage',
        'Rehearsal coverage'
      ],
      requirements: [
        'Event details',
        'Venue information',
        'Artist lineup',
        'Expected attendance'
      ],
      fees: [
        {
          amount: 35000.00,
          currency: 'KES',
          period: 'Per Event'
        }
      ],
      icon: 'event',
      duration: 'Per Event',
      order: 6,
      isActive: true
    },
    {
      id: 'corporate-events',
      title: 'Corporate Events',
      description: 'License for music at corporate functions and events',
      category: 'events',
      features: [
        'Event music rights',
        'Recording permission',
        'Internal distribution',
        'Multiple room coverage'
      ],
      requirements: [
        'Company details',
        'Event type',
        'Venue information',
        'Attendance numbers'
      ],
      fees: [
        {
          amount: 30000.00,
          currency: 'KES',
          period: 'Per Event'
        }
      ],
      icon: 'business',
      duration: 'Per Event',
      order: 7,
      isActive: true
    }
  ]

  const result = await Promise.all(
    licenseTypes.map(licenseType =>
      prisma.licenseType.upsert({
        where: { id: licenseType.id },
        update: licenseType,
        create: licenseType
      })
    )
  )

  return result
} 