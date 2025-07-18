import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const homeData = {
      hero_slides: [
        {
          id: '1',
          title: 'Protecting Music Rights',
          description: 'MCSK is dedicated to protecting and promoting the rights of music creators in Kenya.',
          image: '/images/hero/slide1.jpg',
          cta: { text: 'Learn More', url: '/about' }
        },
        {
          id: '2',
          title: 'Join MCSK Today',
          description: 'Become a member and ensure your music rights are protected.',
          image: '/images/hero/slide2.jpg',
          cta: { text: 'Join Now', url: '/membership' }
        },
        {
          id: '3',
          title: 'Music Licensing Made Easy',
          description: 'Get the right license for your business needs.',
          image: '/images/hero/slide3.jpg',
          cta: { text: 'Get Licensed', url: '/licensing' }
        }
      ],
      announcements: [
        {
          id: '1',
          title: 'Annual General Meeting 2024',
          content: 'The MCSK AGM will be held on March 15th, 2024. All members are invited to attend.',
          date: '2024-03-15'
        },
        {
          id: '2',
          title: 'New Digital Licensing Platform',
          content: 'MCSK launches new online platform for easy music licensing.',
          date: '2024-02-01'
        },
        {
          id: '3',
          title: 'Royalty Distribution Update',
          content: 'Q1 2024 royalty distribution schedule announced.',
          date: '2024-01-15'
        }
      ],
      latest_news: [
        {
          id: '1',
          title: 'MCSK Partners with Global Rights Organizations',
          excerpt: 'New international partnerships expand opportunities for Kenyan musicians.',
          image: '/images/news/partnership.jpg',
          date: '2024-02-20',
          slug: 'mcsk-global-partnerships'
        },
        {
          id: '2',
          title: 'Music Industry Workshop Series',
          excerpt: 'Free workshops for members on music business and copyright.',
          image: '/images/news/workshop.jpg',
          date: '2024-02-15',
          slug: 'music-industry-workshops'
        },
        {
          id: '3',
          title: 'Copyright Law Updates',
          excerpt: 'Important changes to Kenyan copyright law affecting musicians.',
          image: '/images/news/copyright.jpg',
          date: '2024-02-10',
          slug: 'copyright-law-updates'
        },
        {
          id: '4',
          title: 'New Board Members Appointed',
          excerpt: 'MCSK welcomes new board members to strengthen governance.',
          image: '/images/news/board.jpg',
          date: '2024-02-05',
          slug: 'new-board-members'
        }
      ],
      partners: [
        {
          id: '1',
          name: 'CISAC',
          logo: '/images/partners/cisac.png',
          url: 'https://www.cisac.org'
        },
        {
          id: '2',
          name: 'KECOBO',
          logo: '/images/partners/kecobo.png',
          url: 'https://www.copyright.go.ke'
        },
        {
          id: '3',
          name: 'Ministry of Culture',
          logo: '/images/partners/culture.png',
          url: 'https://www.culture.go.ke'
        }
      ]
    }

    return NextResponse.json({ data: homeData })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch home data' },
      { status: 500 }
    )
  }
} 