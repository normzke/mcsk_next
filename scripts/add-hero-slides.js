const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addHeroSlides() {
  try {
    // Copy additional hero images to the hero directory
    const { execSync } = require('child_process');
    
    // Copy high-quality musical images to hero directory
    execSync('cp "public/images/hero/pexels-asim-razan-32997.jpeg" "public/images/hero/slide-4.jpg"');
    execSync('cp "public/images/hero/pexels-didsss-1653090.jpeg" "public/images/hero/slide-5.jpg"');
    execSync('cp "public/images/hero/pexels-umkreisel-app-956981.jpeg" "public/images/hero/slide-6.jpg"');
    
    console.log('✅ Copied additional hero images');

    // Add new hero slides
    const newSlides = [
      {
        id: 'slide-4',
        title: 'Professional Music Production',
        subtitle: 'State-of-the-art recording studios',
        description: 'Experience world-class music production facilities and professional recording services',
        image: '/images/hero/slide-4.jpg',
        buttonText: 'Learn More',
        buttonLink: '/services',
        order: 3,
        isActive: true,
        updatedAt: new Date()
      },
      {
        id: 'slide-5',
        title: 'Live Music Performances',
        subtitle: 'Captivating concert experiences',
        description: 'Witness amazing live performances and musical events across Kenya',
        image: '/images/hero/slide-5.jpg',
        buttonText: 'View Events',
        buttonLink: '/events',
        order: 4,
        isActive: true,
        updatedAt: new Date()
      },
      {
        id: 'slide-6',
        title: 'Music Industry Excellence',
        subtitle: 'Supporting Kenyan musicians',
        description: 'Empowering artists and protecting their creative rights through comprehensive services',
        image: '/images/hero/slide-6.jpg',
        buttonText: 'Join MCSK',
        buttonLink: '/membership/apply',
        order: 5,
        isActive: true,
        updatedAt: new Date()
      }
    ];

    for (const slide of newSlides) {
      await prisma.heroSlide.create({
        data: slide
      });
      console.log(`✅ Added hero slide: ${slide.title}`);
    }

    console.log('✅ Hero slides added successfully!');
  } catch (error) {
    console.error('❌ Error adding hero slides:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addHeroSlides(); 