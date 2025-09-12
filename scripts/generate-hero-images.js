const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Hero image specifications for each page with musical themes
const heroImageSpecs = {
  home: {
    title: 'MCSK Home Hero',
    description: 'A vibrant hero image featuring Kenyan musicians in a studio setting, with MCSK branding prominently displayed. The image should show diversity in music creation - from traditional instruments to modern digital equipment.',
    theme: 'Music Creation & Diversity',
    colors: ['#1a1464', '#3a2b8c', '#6366f1'],
    elements: ['Musicians', 'Instruments', 'Studio Equipment', 'MCSK Logo'],
    dimensions: '1920x1080',
    alt: 'Kenyan musicians working in a modern studio with MCSK branding'
  },
  about: {
    title: 'MCSK About Hero',
    description: 'A professional image showing MCSK headquarters or office environment with team members, representing the organization\'s commitment to protecting music rights. Include subtle musical elements in the background.',
    theme: 'Professional Organization & Trust',
    colors: ['#1a1464', '#ffffff', '#f8fafc'],
    elements: ['Office Environment', 'Team Members', 'Musical Notes', 'MCSK Building'],
    dimensions: '1920x1080',
    alt: 'MCSK team working in professional office environment with musical elements'
  },
  services: {
    title: 'MCSK Services Hero',
    description: 'A dynamic image showing various music licensing scenarios - from live performances to digital streaming, representing the comprehensive services MCSK offers to protect music rights.',
    theme: 'Comprehensive Music Services',
    colors: ['#1a1464', '#3a2b8c', '#8b5cf6'],
    elements: ['Live Performance', 'Digital Streaming', 'Licensing Documents', 'Music Rights'],
    dimensions: '1920x1080',
    alt: 'Various music licensing scenarios including live performances and digital streaming'
  },
  membership: {
    title: 'MCSK Membership Hero',
    description: 'An inspiring image showing diverse Kenyan musicians joining together, representing the community aspect of MCSK membership. Include traditional and modern musicians.',
    theme: 'Musician Community & Unity',
    colors: ['#1a1464', '#6366f1', '#a855f7'],
    elements: ['Diverse Musicians', 'Community', 'Membership Cards', 'Unity'],
    dimensions: '1920x1080',
    alt: 'Diverse Kenyan musicians joining together in community'
  },
  licensing: {
    title: 'MCSK Licensing Hero',
    description: 'A professional image showing business licensing scenarios - restaurants, hotels, events using music, with MCSK licensing documents and processes clearly represented.',
    theme: 'Business Music Licensing',
    colors: ['#1a1464', '#3a2b8c', '#6366f1'],
    elements: ['Business Settings', 'Licensing Documents', 'Music in Business', 'Professional Service'],
    dimensions: '1920x1080',
    alt: 'Business environments using licensed music with MCSK licensing process'
  },
  news: {
    title: 'MCSK News Hero',
    description: 'A dynamic image showing news and media elements with musical themes - newspapers, digital screens, and music industry updates, representing MCSK\'s role in music industry news.',
    theme: 'Music Industry News & Updates',
    colors: ['#1a1464', '#3a2b8c', '#6366f1'],
    elements: ['News Media', 'Digital Screens', 'Music Industry', 'Updates'],
    dimensions: '1920x1080',
    alt: 'Music industry news and updates with digital media elements'
  },
  events: {
    title: 'MCSK Events Hero',
    description: 'An energetic image showing music events, workshops, and conferences with MCSK branding. Include both live events and educational workshops.',
    theme: 'Music Events & Education',
    colors: ['#1a1464', '#3a2b8c', '#8b5cf6'],
    elements: ['Live Events', 'Workshops', 'Conferences', 'Education'],
    dimensions: '1920x1080',
    alt: 'Music events, workshops, and conferences with MCSK branding'
  },
  downloads: {
    title: 'MCSK Downloads Hero',
    description: 'A clean, organized image showing digital downloads, forms, and resources with musical themes. Include computers, documents, and digital interfaces.',
    theme: 'Digital Resources & Forms',
    colors: ['#1a1464', '#3a2b8c', '#6366f1'],
    elements: ['Digital Downloads', 'Forms', 'Resources', 'Technology'],
    dimensions: '1920x1080',
    alt: 'Digital downloads, forms, and resources with musical themes'
  },
  contact: {
    title: 'MCSK Contact Hero',
    description: 'A welcoming image showing communication and contact elements with musical themes - phones, emails, office environment, representing MCSK\'s accessibility.',
    theme: 'Communication & Accessibility',
    colors: ['#1a1464', '#3a2b8c', '#6366f1'],
    elements: ['Communication', 'Contact Methods', 'Office Environment', 'Accessibility'],
    dimensions: '1920x1080',
    alt: 'Communication and contact elements with musical themes'
  },
  careers: {
    title: 'MCSK Careers Hero',
    description: 'A professional image showing career opportunities in the music industry, with MCSK team members working in various roles, representing growth and opportunity.',
    theme: 'Career Opportunities & Growth',
    colors: ['#1a1464', '#3a2b8c', '#6366f1'],
    elements: ['Career Growth', 'Team Members', 'Opportunities', 'Professional Development'],
    dimensions: '1920x1080',
    alt: 'Career opportunities in music industry with MCSK team members'
  },
  gallery: {
    title: 'MCSK Gallery Hero',
    description: 'A vibrant collage-style image showing various MCSK events, performances, and activities, representing the rich visual history of the organization.',
    theme: 'Visual History & Events',
    colors: ['#1a1464', '#3a2b8c', '#8b5cf6'],
    elements: ['Event Photos', 'Performances', 'Activities', 'Visual History'],
    dimensions: '1920x1080',
    alt: 'Collage of MCSK events, performances, and activities'
  },
  faqs: {
    title: 'MCSK FAQs Hero',
    description: 'A helpful image showing question and answer elements with musical themes, representing MCSK\'s role in educating and supporting musicians.',
    theme: 'Education & Support',
    colors: ['#1a1464', '#3a2b8c', '#6366f1'],
    elements: ['Questions', 'Answers', 'Education', 'Support'],
    dimensions: '1920x1080',
    alt: 'Question and answer elements with musical themes'
  },
  privacy: {
    title: 'MCSK Privacy Hero',
    description: 'A secure, professional image showing privacy and data protection elements with subtle musical themes, representing MCSK\'s commitment to data security.',
    theme: 'Privacy & Security',
    colors: ['#1a1464', '#3a2b8c', '#6366f1'],
    elements: ['Privacy', 'Security', 'Data Protection', 'Trust'],
    dimensions: '1920x1080',
    alt: 'Privacy and data protection elements with musical themes'
  },
  terms: {
    title: 'MCSK Terms Hero',
    description: 'A professional image showing legal documents and terms with musical themes, representing MCSK\'s legal framework and compliance.',
    theme: 'Legal Framework & Compliance',
    colors: ['#1a1464', '#3a2b8c', '#6366f1'],
    elements: ['Legal Documents', 'Terms', 'Compliance', 'Framework'],
    dimensions: '1920x1080',
    alt: 'Legal documents and terms with musical themes'
  }
}

// Generate hero image specifications
function generateHeroImageSpecs() {
  console.log('Hero Image Specifications for MCSK Website:')
  console.log('==========================================\n')
  
  Object.entries(heroImageSpecs).forEach(([page, spec]) => {
    console.log(`${spec.title}`)
    console.log(`Page: ${page}`)
    console.log(`Theme: ${spec.theme}`)
    console.log(`Description: ${spec.description}`)
    console.log(`Colors: ${spec.colors.join(', ')}`)
    console.log(`Elements: ${spec.elements.join(', ')}`)
    console.log(`Dimensions: ${spec.dimensions}`)
    console.log(`Alt Text: ${spec.alt}`)
    console.log('---\n')
  })
}

// Update database pages with hero image information
async function updatePageHeroImages() {
  try {
    console.log('Updating page hero image information...')
    
    const pages = await prisma.page.findMany({
      where: { isActive: true, deletedAt: null }
    })
    
    for (const page of pages) {
      const pageKey = page.slug.toLowerCase()
      const heroSpec = heroImageSpecs[pageKey]
      
      if (heroSpec) {
        // Update page with hero image metadata
        await prisma.page.update({
          where: { id: page.id },
          data: {
            metaDescription: `${heroSpec.description} ${page.metaDescription || ''}`,
            updatedAt: new Date()
          }
        })
        
        console.log(`Updated hero info for: ${page.title}`)
      }
    }
    
    console.log('Hero image updates completed!')
  } catch (error) {
    console.error('Error updating hero images:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Generate image creation prompts for AI tools
function generateImagePrompts() {
  console.log('\nAI Image Generation Prompts:')
  console.log('=============================\n')
  
  Object.entries(heroImageSpecs).forEach(([page, spec]) => {
    console.log(`${spec.title}:`)
    console.log(`Prompt: "Professional hero image for ${spec.title.toLowerCase()}. ${spec.description} Use colors: ${spec.colors.join(', ')}. Include elements: ${spec.elements.join(', ')}. Style: modern, professional, high-quality photography. Dimensions: ${spec.dimensions}."`)
    console.log('---\n')
  })
}

// Run all functions
async function main() {
  generateHeroImageSpecs()
  await updatePageHeroImages()
  generateImagePrompts()
}

main() 