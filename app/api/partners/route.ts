import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for partners
    const partners = [
      {
        id: '1',
        name: 'CISAC',
        logo: '/images/partners/cisac.png',
        url: 'https://www.cisac.org',
        description: 'International Confederation of Societies of Authors and Composers'
      },
      {
        id: '2',
        name: 'KECOBO',
        logo: '/images/partners/kecobo.png',
        url: 'https://www.copyright.go.ke',
        description: 'Kenya Copyright Board'
      },
      {
        id: '3',
        name: 'WIPO',
        logo: '/images/partners/wipo.svg',
        url: 'https://www.wipo.int',
        description: 'World Intellectual Property Organization'
      },
      {
        id: '4',
        name: 'ARIPO',
        logo: '/images/partners/aripo.svg',
        url: 'https://www.aripo.org',
        description: 'African Regional Intellectual Property Organization'
      },
      {
        id: '5',
        name: 'Ministry of Culture',
        logo: '/images/partners/ministry.svg',
        url: 'https://www.culture.go.ke',
        description: 'Ministry of Sports, Culture and Heritage'
      },
      {
        id: '6',
        name: 'KAMP',
        logo: '/images/partners/kamp.svg',
        url: 'https://www.kamp.or.ke',
        description: 'Kenya Association of Music Producers'
      }
    ];

    return NextResponse.json({ partners });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}
