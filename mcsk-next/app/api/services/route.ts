import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const services = [
      {
        id: '1',
        title: 'Music Licensing',
        description: 'We provide comprehensive music licensing services for various uses including commercial, broadcasting, and public performance.',
        short_description: 'Get the right license for your music usage needs.',
        icon: 'fa-music',
        image: '/images/services/licensing.jpg',
        features: [
          'Commercial use licenses',
          'Broadcasting rights',
          'Public performance permits',
          'Digital platform licensing'
        ]
      },
      {
        id: '2',
        title: 'Royalty Collection',
        description: 'Efficient collection and distribution of royalties to rights holders from various music usage sources.',
        short_description: 'Ensuring fair compensation for music creators.',
        icon: 'fa-dollar-sign',
        image: '/images/services/royalties.jpg',
        features: [
          'Automated tracking systems',
          'Regular payment schedules',
          'Transparent reporting',
          'International collection'
        ]
      },
      {
        id: '3',
        title: 'Member Registration',
        description: 'Simple and straightforward membership registration process for music creators and rights holders.',
        short_description: 'Join our community of music creators.',
        icon: 'fa-user-plus',
        image: '/images/services/membership.jpg',
        features: [
          'Online registration',
          'Document verification',
          'Member support',
          'Access to resources'
        ]
      },
      {
        id: '4',
        title: 'Rights Management',
        description: 'Comprehensive management of music rights including documentation, monitoring, and protection.',
        short_description: 'Protecting your musical works.',
        icon: 'fa-shield-alt',
        image: '/images/services/rights.jpg',
        features: [
          'Copyright registration',
          'Usage monitoring',
          'Infringement protection',
          'Rights documentation'
        ]
      }
    ]

    return NextResponse.json({ data: services })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
} 