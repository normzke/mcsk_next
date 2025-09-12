const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const sampleSocialPosts = [
  {
    platform: 'twitter',
    content: 'Exciting news! MCSK has partnered with @WIPO to enhance copyright protection for Kenyan musicians. This collaboration will help our members receive fair compensation for their creative work globally. #MusicRights #Copyright',
    author: 'MCSK Kenya',
    authorImage: '/images/MCSK Logo.png',
    date: new Date('2025-05-28T10:30:00Z'),
    likes: 124,
    comments: 32,
    shares: 56,
    url: 'https://x.com/TheMCSK',
    isActive: true
  },
  {
    platform: 'facebook',
    content: 'Join us for our upcoming workshop series on "Understanding Music Rights in the Digital Age" happening next month in Nairobi, Mombasa, and Kisumu. Free for all MCSK members!',
    image: '/images/news/workshop.jpg',
    author: 'Music Copyright Society of Kenya',
    authorImage: '/images/MCSK Logo.png',
    date: new Date('2025-05-25T14:15:00Z'),
    likes: 287,
    comments: 45,
    shares: 78,
    url: 'https://facebook.com/musiccopyrightsociety',
    isActive: true
  },
  {
    platform: 'instagram',
    content: 'Congratulations to all the winners at last night\'s Kenyan Music Awards! MCSK is proud to support our talented musicians. #KenyanMusic #MusicAwards',
    image: '/images/news/partnership.jpg',
    author: 'mcsk_kenya',
    authorImage: '/images/MCSK Logo.png',
    date: new Date('2025-05-22T20:45:00Z'),
    likes: 563,
    comments: 89,
    shares: 34,
    url: 'https://instagram.com/mcsk_kenya',
    isActive: true
  }
]

async function createSampleSocialPosts() {
  try {
    console.log('Creating sample social media posts...')
    
    for (const post of sampleSocialPosts) {
      const existingPost = await prisma.socialPost.findFirst({
        where: { 
          content: post.content,
          platform: post.platform
        }
      })
      
      if (existingPost) {
        console.log(`Updating existing post: ${post.platform}`)
        await prisma.socialPost.update({
          where: { id: existingPost.id },
          data: {
            content: post.content,
            image: post.image,
            author: post.author,
            authorImage: post.authorImage,
            date: post.date,
            likes: post.likes,
            comments: post.comments,
            shares: post.shares,
            url: post.url,
            isActive: post.isActive,
            updatedAt: new Date()
          }
        })
      } else {
        console.log(`Creating new post: ${post.platform}`)
        await prisma.socialPost.create({
          data: {
            id: crypto.randomUUID(),
            platform: post.platform,
            content: post.content,
            image: post.image,
            author: post.author,
            authorImage: post.authorImage,
            date: post.date,
            likes: post.likes,
            comments: post.comments,
            shares: post.shares,
            url: post.url,
            isActive: post.isActive,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        })
      }
    }
    
    console.log('Sample social media posts created successfully!')
  } catch (error) {
    console.error('Error creating sample social posts:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createSampleSocialPosts()
