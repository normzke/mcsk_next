const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// SEO Keywords for MCSK website
const seoKeywords = {
  primary: [
    'music copyright society kenya',
    'MCSK',
    'music licensing kenya',
    'copyright protection kenya',
    'music royalties kenya',
    'musicians rights kenya',
    'music copyright law kenya',
    'performance rights kenya',
    'mechanical rights kenya',
    'sync licensing kenya'
  ],
  secondary: [
    'kenyan musicians',
    'music industry kenya',
    'copyright registration kenya',
    'music distribution kenya',
    'artist royalties kenya',
    'music publishing kenya',
    'digital music rights kenya',
    'music streaming kenya',
    'live performance rights kenya',
    'music licensing fees kenya'
  ],
  longTail: [
    'how to register music copyright in kenya',
    'music licensing fees in kenya 2024',
    'how to collect music royalties in kenya',
    'music copyright law kenya 2024',
    'best music licensing company kenya',
    'music rights protection services kenya',
    'kenyan music industry copyright protection',
    'music licensing for businesses kenya',
    'how to protect music copyright kenya',
    'music royalty collection services kenya'
  ]
}

async function updatePageSEO() {
  try {
    console.log('Updating page SEO metadata...')
    
    const pages = await prisma.page.findMany({
      where: { isActive: true, deletedAt: null }
    })
    
    for (const page of pages) {
      const seoDescription = `Learn about ${page.title.toLowerCase()} from MCSK, Kenya's leading music copyright society. Professional music licensing and rights protection services.`
      
      await prisma.page.update({
        where: { id: page.id },
        data: {
          metaDescription: seoDescription,
          updatedAt: new Date()
        }
      })
      
      console.log(`Updated SEO for: ${page.title}`)
    }
    
    console.log('SEO updates completed!')
  } catch (error) {
    console.error('Error updating SEO:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updatePageSEO()
