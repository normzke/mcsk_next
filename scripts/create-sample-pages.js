const { PrismaClient } = require('@prisma/client')
const { randomUUID } = require('crypto')

const prisma = new PrismaClient()

async function createSamplePages() {
  try {
    console.log('Creating sample pages...')

    const samplePages = [
      {
        id: randomUUID(),
        title: 'About Us',
        slug: 'about',
        content: `
          <h1>About MCSK</h1>
          <p>The Music Copyright Society of Kenya (MCSK) is a collective management organization that protects the rights of music creators and publishers in Kenya.</p>
          <p>Our mission is to ensure that music creators receive fair compensation for the use of their works while promoting the development of the music industry in Kenya.</p>
          <h2>Our Vision</h2>
          <p>To be the leading collective management organization in Africa, promoting creativity and protecting the rights of music creators.</p>
          <h2>Our Mission</h2>
          <p>To protect and promote the interests of musicians in Kenya through effective copyright management.</p>
        `,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        title: 'Services',
        slug: 'services',
        content: `
          <h1>Our Services</h1>
          <p>MCSK provides comprehensive copyright management services to music creators and users.</p>
          <h2>For Music Creators</h2>
          <ul>
            <li>Copyright registration and protection</li>
            <li>Royalty collection and distribution</li>
            <li>Licensing administration</li>
            <li>Legal support and advocacy</li>
          </ul>
          <h2>For Music Users</h2>
          <ul>
            <li>Music licensing services</li>
            <li>Performance rights licensing</li>
            <li>Broadcasting rights</li>
            <li>Digital rights management</li>
          </ul>
        `,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        title: 'Membership',
        slug: 'membership',
        content: `
          <h1>Become a Member</h1>
          <p>Join MCSK and protect your musical works while earning royalties from their use.</p>
          <h2>Benefits of Membership</h2>
          <ul>
            <li>Professional copyright protection</li>
            <li>Regular royalty payments</li>
            <li>Access to industry networks</li>
            <li>Legal support and representation</li>
            <li>Educational and training opportunities</li>
          </ul>
          <h2>How to Join</h2>
          <p>Complete our membership application form and submit the required documentation.</p>
        `,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        title: 'Contact Us',
        slug: 'contact',
        content: `
          <h1>Contact MCSK</h1>
          <p>Get in touch with us for any inquiries about our services.</p>
          <h2>Office Location</h2>
          <p>Sports Road, Westlands<br>
          P.O. BOX 14806-00800<br>
          Nairobi, Kenya</p>
          <h2>Contact Information</h2>
          <p>Phone: +254 733 400204 / 0204400200<br>
          Email: info@mcsk.org</p>
          <h2>Office Hours</h2>
          <p>Monday - Friday: 8:00 AM - 5:00 PM<br>
          Saturday: 9:00 AM - 1:00 PM</p>
        `,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        title: 'Privacy Policy',
        slug: 'privacy',
        content: `
          <h1>Privacy Policy</h1>
          <p>This privacy policy describes how MCSK collects, uses, and protects your personal information.</p>
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you register for membership or contact us.</p>
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to provide our services, process payments, and communicate with you.</p>
          <h2>Information Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.</p>
        `,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    for (const page of samplePages) {
      const existingPage = await prisma.page.findFirst({
        where: { slug: page.slug }
      })

      if (!existingPage) {
        await prisma.page.create({
          data: page
        })
        console.log(`Created page: ${page.title}`)
      } else {
        console.log(`Page already exists: ${page.title}`)
      }
    }

    console.log('Sample pages creation completed!')
  } catch (error) {
    console.error('Error creating sample pages:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createSamplePages() 