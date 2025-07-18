import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const newsData = {
      featured: {
        id: '1',
        title: 'MCSK Partners with Global Rights Organizations',
        content: `
          <p>The Music Copyright Society of Kenya (MCSK) has signed landmark agreements with several international rights organizations, expanding opportunities for Kenyan musicians globally. These partnerships will facilitate easier collection of royalties from international platforms and performances.</p>
          <p>The agreements include reciprocal arrangements for:</p>
          <ul>
            <li>Digital platform royalties</li>
            <li>International performance rights</li>
            <li>Mechanical rights for global distribution</li>
          </ul>
          <p>This development marks a significant step forward in protecting Kenyan music rights internationally.</p>
        `,
        excerpt: 'New international partnerships expand opportunities for Kenyan musicians.',
        image: '/images/news/partnership.jpg',
        date: '2024-02-20',
        slug: 'mcsk-global-partnerships',
        author: 'MCSK Communications Team',
        category: 'Partnerships'
      },
      articles: [
        {
          id: '2',
          title: 'Music Industry Workshop Series',
          content: `
            <p>MCSK announces a series of free workshops for members focusing on music business and copyright education. The workshops will cover essential topics including:</p>
            <ul>
              <li>Understanding music copyright</li>
              <li>Digital distribution rights</li>
              <li>Royalty collection processes</li>
              <li>Music business management</li>
            </ul>
          `,
          excerpt: 'Free workshops for members on music business and copyright.',
          image: '/images/news/workshop.jpg',
          date: '2024-02-15',
          slug: 'music-industry-workshops',
          author: 'MCSK Events Team',
          category: 'Education'
        },
        {
          id: '3',
          title: 'Copyright Law Updates',
          content: `
            <p>Recent changes to Kenyan copyright law will significantly impact musicians and rights holders. Key changes include:</p>
            <ul>
              <li>Enhanced digital rights protection</li>
              <li>Stronger enforcement mechanisms</li>
              <li>Updated royalty calculation methods</li>
            </ul>
          `,
          excerpt: 'Important changes to Kenyan copyright law affecting musicians.',
          image: '/images/news/copyright.jpg',
          date: '2024-02-10',
          slug: 'copyright-law-updates',
          author: 'MCSK Legal Team',
          category: 'Legal'
        },
        {
          id: '4',
          title: 'New Board Members Appointed',
          content: `
            <p>MCSK welcomes three new board members, bringing diverse expertise in:</p>
            <ul>
              <li>Digital technology</li>
              <li>Legal affairs</li>
              <li>Music industry management</li>
            </ul>
            <p>These appointments strengthen MCSK's governance and strategic direction.</p>
          `,
          excerpt: 'MCSK welcomes new board members to strengthen governance.',
          image: '/images/news/board.jpg',
          date: '2024-02-05',
          slug: 'new-board-members',
          author: 'MCSK Board Secretary',
          category: 'Governance'
        }
      ],
      categories: [
        { id: '1', name: 'Partnerships', count: 5 },
        { id: '2', name: 'Education', count: 8 },
        { id: '3', name: 'Legal', count: 6 },
        { id: '4', name: 'Governance', count: 4 },
        { id: '5', name: 'Events', count: 7 }
      ]
    }

    return NextResponse.json({ data: newsData })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news data' },
      { status: 500 }
    )
  }
} 