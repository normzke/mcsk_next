import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedBoardMembers() {
  console.log('🌱 Seeding board members...')

  const boardMembers = [
    {
      id: 'board-member-1',
      name: 'John Doe',
      position: 'Chairman',
      bio: 'Experienced music industry professional with over 20 years in copyright management.',
      image: '/images/board/john-doe.jpg',
      order: 1,
      isActive: true,
      email: 'john.doe@mcsk.org',
      phone: '+254 700 123 456',
      linkedinUrl: 'https://linkedin.com/in/johndoe',
      twitterUrl: 'https://twitter.com/johndoe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'board-member-2',
      name: 'Jane Smith',
      position: 'Vice Chairperson',
      bio: 'Legal expert specializing in intellectual property rights and music licensing.',
      image: '/images/board/jane-smith.jpg',
      order: 2,
      isActive: true,
      email: 'jane.smith@mcsk.org',
      phone: '+254 700 234 567',
      linkedinUrl: 'https://linkedin.com/in/janesmith',
      twitterUrl: 'https://twitter.com/janesmith',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'board-member-3',
      name: 'Michael Johnson',
      position: 'Treasurer',
      bio: 'Financial expert with extensive experience in royalty distribution and financial management.',
      image: '/images/board/michael-johnson.jpg',
      order: 3,
      isActive: true,
      email: 'michael.johnson@mcsk.org',
      phone: '+254 700 345 678',
      linkedinUrl: 'https://linkedin.com/in/michaeljohnson',
      twitterUrl: 'https://twitter.com/michaeljohnson',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'board-member-4',
      name: 'Sarah Wilson',
      position: 'Secretary',
      bio: 'Music industry veteran with expertise in artist relations and member services.',
      image: '/images/board/sarah-wilson.jpg',
      order: 4,
      isActive: true,
      email: 'sarah.wilson@mcsk.org',
      phone: '+254 700 456 789',
      linkedinUrl: 'https://linkedin.com/in/sarahwilson',
      twitterUrl: 'https://twitter.com/sarahwilson',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  for (const boardMember of boardMembers) {
    try {
      await prisma.boardmember.upsert({
        where: { id: boardMember.id },
        update: boardMember,
        create: boardMember,
      })
    } catch (error) {
      console.error(`Error seeding board member ${boardMember.name}:`, error)
    }
  }

  console.log('✅ Board members seeded successfully!')
} 