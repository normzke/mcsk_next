const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function populateGallery() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'images');
    const files = fs.readdirSync(uploadsDir);
    
    // Filter for image files that were copied from gallery
    const galleryImages = files.filter(file => 
      file.startsWith('IMG-') || file === 'hero.jpg'
    );
    
    console.log(`Found ${galleryImages.length} gallery images to add`);
    
    for (let i = 0; i < galleryImages.length; i++) {
      const filename = galleryImages[i];
      const imagePath = `/uploads/images/${filename}`;
      
      // Generate a title based on filename
      let title = 'MCSK Event';
      if (filename === 'hero.jpg') {
        title = 'MCSK Gallery Hero';
      } else if (filename.startsWith('IMG-')) {
        const number = filename.match(/IMG-(\d+)/)?.[1] || '';
        title = `MCSK Event ${number}`;
      }
      
      await prisma.gallery.create({
        data: {
          id: `gallery-${Date.now()}-${i}`,
          title: title,
          description: `Music Copyright Society of Kenya event photo - ${title}`,
          image: imagePath,
          order: i,
          isActive: true,
          updatedAt: new Date()
        }
      });
      
      console.log(`Added: ${title} - ${imagePath}`);
    }
    
    console.log('✅ Gallery populated successfully!');
  } catch (error) {
    console.error('❌ Error populating gallery:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateGallery(); 