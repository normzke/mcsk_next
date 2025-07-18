import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function seedHeroSlides() {
  const slides = await Promise.all([
    prisma.heroSlide.upsert({
      where: { id: 'slide-1' },
      update: {},
      create: {
        id: 'slide-1',
        title: 'Protecting Musicians Rights',
        subtitle: 'Your Music, Your Rights',
        description: 'MCSK is dedicated to protecting and promoting the rights of musicians in Kenya',
        image: '/images/hero/slide-1.jpg',
        buttonText: 'Learn More',
        buttonLink: '/about',
        order: 1,
        isActive: true,
      },
    }),
    prisma.heroSlide.upsert({
      where: { id: 'slide-2' },
      update: {},
      create: {
        id: 'slide-2',
        title: 'Get Licensed',
        subtitle: 'Music Licensing Made Easy',
        description: 'Get your music license today and play music legally in your business',
        image: '/images/hero/slide-2.jpg',
        buttonText: 'Get License',
        buttonLink: '/licensing',
        order: 2,
        isActive: true,
      },
    }),
    prisma.heroSlide.upsert({
      where: { id: 'slide-3' },
      update: {},
      create: {
        id: 'slide-3',
        title: 'Join MCSK',
        subtitle: 'Become a Member',
        description: 'Join MCSK today and start earning royalties from your music',
        image: '/images/hero/slide-3.jpg',
        buttonText: 'Join Now',
        buttonLink: '/membership',
        order: 3,
        isActive: true,
      },
    }),
  ])

  return slides
} 