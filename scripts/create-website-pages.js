const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const websitePages = [
  {
    title: 'About Us',
    slug: 'about',
    content: '<section class="py-16 bg-gradient-to-br from-[#1a1464] to-[#2c2580] text-white"><div class="container mx-auto px-4"><div class="text-center mb-12"><h1 class="text-4xl md:text-5xl font-bold mb-6">About MCSK</h1><p class="text-xl text-blue-100 max-w-2xl mx-auto">Protecting and promoting the rights of musicians in Kenya through innovation and excellence.</p></div></div></section>',
    isActive: true,
    order: 1
  },
  {
    title: 'Services',
    slug: 'services',
    content: '<section class="py-16 bg-gradient-to-br from-[#1a1464] to-[#2c2580] text-white"><div class="container mx-auto px-4"><div class="text-center mb-12"><h1 class="text-4xl md:text-5xl font-bold mb-6">Our Services</h1><p class="text-xl text-blue-100 max-w-2xl mx-auto">Comprehensive music rights management services for creators, users, and the industry.</p></div></div></section>',
    isActive: true,
    order: 2
  },
  {
    title: 'Membership',
    slug: 'membership',
    content: '<section class="py-16 bg-gradient-to-br from-[#1a1464] to-[#2c2580] text-white"><div class="container mx-auto px-4"><div class="text-center mb-12"><h1 class="text-4xl md:text-5xl font-bold mb-6">Join MCSK</h1><p class="text-xl text-blue-100 max-w-2xl mx-auto">Become a member and protect your musical rights while earning from your creativity.</p></div></div></section>',
    isActive: true,
    order: 3
  },
  {
    title: 'Licensing',
    slug: 'licensing',
    content: '<section class="py-16 bg-gradient-to-br from-[#1a1464] to-[#2c2580] text-white"><div class="container mx-auto px-4"><div class="text-center mb-12"><h1 class="text-4xl md:text-5xl font-bold mb-6">Music Licensing</h1><p class="text-xl text-blue-100 max-w-2xl mx-auto">Obtain the right licenses for using music in your business or organization.</p></div></div></section>',
    isActive: true,
    order: 4
  },
  {
    title: 'Contact',
    slug: 'contact',
    content: '<section class="py-16 bg-gradient-to-br from-[#1a1464] to-[#2c2580] text-white"><div class="container mx-auto px-4"><div class="text-center mb-12"><h1 class="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1><p class="text-xl text-blue-100 max-w-2xl mx-auto">Get in touch with us for any inquiries about music rights, licensing, or membership.</p></div></div></section>',
    isActive: true,
    order: 5
  },
  {
    title: 'Privacy Policy',
    slug: 'privacy',
    content: '<section class="py-16 bg-white"><div class="container mx-auto px-4"><div class="max-w-4xl mx-auto"><h1 class="text-4xl font-bold text-[#1a1464] mb-8">Privacy Policy</h1><p class="text-gray-700">Last updated: January 2025</p></div></div></section>',
    isActive: true,
    order: 6
  },
  {
    title: 'Terms of Service',
    slug: 'terms',
    content: '<section class="py-16 bg-white"><div class="container mx-auto px-4"><div class="max-w-4xl mx-auto"><h1 class="text-4xl font-bold text-[#1a1464] mb-8">Terms of Service</h1><p class="text-gray-700">Last updated: January 2025</p></div></div></section>',
    isActive: true,
    order: 7
  },
  {
    title: 'FAQs',
    slug: 'faqs',
    content: '<section class="py-16 bg-white"><div class="container mx-auto px-4"><div class="max-w-4xl mx-auto"><h1 class="text-4xl font-bold text-[#1a1464] mb-8 text-center">Frequently Asked Questions</h1></div></div></section>',
    isActive: true,
    order: 8
  }
]

async function createWebsitePages() {
  try {
    console.log("Creating website pages...")
    
    for (const page of websitePages) {
      const existingPage = await prisma.page.findFirst({
        where: { slug: page.slug }
      })
      
      if (existingPage) {
        console.log(`Updating existing page: ${page.title}`)
        await prisma.page.update({
          where: { id: existingPage.id },
          data: {
            title: page.title,
            content: page.content,
            slug: page.slug,
            isActive: page.isActive,
            
            updatedAt: new Date()
          }
        })
      } else {
        console.log(`Creating new page: ${page.title}`)
        await prisma.page.create({
          data: {
            id: crypto.randomUUID(),
            title: page.title,
            content: page.content,
            slug: page.slug,
            isActive: page.isActive,
            
            createdAt: new Date(),
            updatedAt: new Date()
          }
        })
      }
    }
    
    console.log("Website pages created successfully!")
  } catch (error) {
    console.error("Error creating website pages:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createWebsitePages()
