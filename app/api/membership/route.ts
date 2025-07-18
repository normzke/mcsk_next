import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const membershipData = {
      benefits: [
        {
          id: '1',
          title: 'Royalty Collection',
          description: 'Regular collection and distribution of royalties from various music usage sources.',
          icon: 'fa-dollar-sign'
        },
        {
          id: '2',
          title: 'Legal Protection',
          description: 'Access to legal support for copyright protection and dispute resolution.',
          icon: 'fa-shield-alt'
        },
        {
          id: '3',
          title: 'Digital Monitoring',
          description: 'Advanced tracking of music usage across digital platforms.',
          icon: 'fa-chart-line'
        },
        {
          id: '4',
          title: 'International Network',
          description: 'Access to global collection networks through reciprocal agreements.',
          icon: 'fa-globe'
        },
        {
          id: '5',
          title: 'Professional Development',
          description: 'Access to workshops, training, and industry events.',
          icon: 'fa-graduation-cap'
        },
        {
          id: '6',
          title: 'Healthcare Support',
          description: 'Access to medical insurance and healthcare benefits.',
          icon: 'fa-heart'
        }
      ],
      categories: [
        {
          id: '1',
          title: 'Composer Membership',
          description: 'For music composers and songwriters who create original musical works.',
          features: [
            'Full royalty collection rights',
            'Voting rights in MCSK affairs',
            'Access to all member benefits',
            'International representation'
          ],
          requirements: [
            'Proof of original compositions',
            'Valid identification',
            'Two existing member referrals',
            'Registration fee payment'
          ],
          fee: 'KES 5,000',
          duration: 'Lifetime membership'
        },
        {
          id: '2',
          title: 'Publisher Membership',
          description: 'For music publishing companies and organizations.',
          features: [
            'Publisher royalty rights',
            'Multiple writer representation',
            'Enhanced reporting tools',
            'Business support services'
          ],
          requirements: [
            'Business registration documents',
            'Publishing agreements',
            'Tax compliance certificate',
            'Registration fee payment'
          ],
          fee: 'KES 10,000',
          duration: 'Annual renewal required'
        },
        {
          id: '3',
          title: 'Successor Membership',
          description: 'For legal heirs and estates of deceased members.',
          features: [
            'Continued royalty collection',
            'Estate management support',
            'Legal documentation assistance',
            'Historical earnings access'
          ],
          requirements: [
            'Death certificate',
            'Proof of succession',
            'Legal heir documentation',
            'Processing fee payment'
          ],
          fee: 'KES 2,500',
          duration: 'Based on succession terms'
        }
      ],
      process: {
        title: 'How to Join',
        steps: [
          {
            title: 'Check Eligibility',
            description: 'Review membership requirements and choose appropriate category.'
          },
          {
            title: 'Prepare Documents',
            description: 'Gather all required documentation for your membership type.'
          },
          {
            title: 'Submit Application',
            description: 'Complete the online application form and upload documents.'
          },
          {
            title: 'Pay Fees',
            description: 'Process the registration fee payment.'
          },
          {
            title: 'Verification',
            description: 'Wait for document verification and application review.'
          },
          {
            title: 'Approval',
            description: 'Receive membership approval and welcome package.'
          }
        ]
      }
    }

    return NextResponse.json({ data: membershipData })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch membership data' },
      { status: 500 }
    )
  }
} 