import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // Mock data for license types
    const licenseTypesData = {
      categories: [
        "Business",
        "Event",
        "Digital",
        "Broadcasting"
      ],
      licenseTypes: [
        {
          id: "business",
          title: "Business License",
          description: "For shops, restaurants, hotels, and other commercial establishments.",
          category: "Business",
          features: [
            "Legal use of music in your business premises",
            "Access to a vast catalog of local and international music",
            "Protection from copyright infringement claims",
            "Support for Kenyan musicians and creators"
          ],
          requirements: [
            "Business registration certificate",
            "Tax compliance certificate",
            "Proof of business premises"
          ],
          fees: [
            {
              name: "Small Business",
              amount: 15000,
              description: "For businesses with up to 50 square meters"
            },
            {
              name: "Medium Business",
              amount: 35000,
              description: "For businesses with 51-200 square meters"
            },
            {
              name: "Large Business",
              amount: 75000,
              description: "For businesses with over 200 square meters"
            }
          ],
          icon: "store",
          duration: "Annual",
          order: 1,
          isActive: true,
          applicationProcess: [
            "Complete the business license application form",
            "Submit required documentation",
            "Pay the applicable fee",
            "Receive your license certificate"
          ],
          contactPerson: {
            name: "Jane Muthoni",
            email: "business.licensing@mcsk.or.ke",
            phone: "+254 20 XXX XXX"
          }
        },
        {
          id: "event",
          title: "Event License",
          description: "For concerts, festivals, weddings, and other one-time or recurring events.",
          category: "Event",
          features: [
            "Legal use of music at your event",
            "Coverage for live performances and recorded music",
            "Protection from copyright infringement claims",
            "Support for Kenyan musicians and creators"
          ],
          requirements: [
            "Event permit (if applicable)",
            "Venue confirmation",
            "Event program or schedule"
          ],
          fees: [
            {
              name: "Small Event",
              amount: 10000,
              description: "For events with up to 100 attendees"
            },
            {
              name: "Medium Event",
              amount: 25000,
              description: "For events with 101-500 attendees"
            },
            {
              name: "Large Event",
              amount: 50000,
              description: "For events with over 500 attendees"
            }
          ],
          icon: "calendar",
          duration: "Per Event",
          order: 2,
          isActive: true,
          applicationProcess: [
            "Complete the event license application form",
            "Submit event details and expected attendance",
            "Pay the applicable fee",
            "Receive your event license certificate"
          ],
          contactPerson: {
            name: "John Kamau",
            email: "event.licensing@mcsk.or.ke",
            phone: "+254 20 XXX XXX"
          }
        },
        {
          id: "digital",
          title: "Digital License",
          description: "For websites, apps, and other digital platforms that use music.",
          category: "Digital",
          features: [
            "Legal use of music on your digital platform",
            "Access to a vast catalog of local and international music",
            "Protection from copyright infringement claims",
            "Support for Kenyan musicians and creators"
          ],
          requirements: [
            "Platform registration details",
            "Traffic or user statistics",
            "Business registration certificate"
          ],
          fees: [
            {
              name: "Small Platform",
              amount: 30000,
              description: "For platforms with up to 10,000 monthly users"
            },
            {
              name: "Medium Platform",
              amount: 75000,
              description: "For platforms with 10,001-100,000 monthly users"
            },
            {
              name: "Large Platform",
              amount: 150000,
              description: "For platforms with over 100,000 monthly users"
            }
          ],
          icon: "globe",
          duration: "Annual",
          order: 3,
          isActive: true,
          applicationProcess: [
            "Complete the digital license application form",
            "Submit platform details and expected usage",
            "Pay the applicable fee",
            "Receive your digital license certificate"
          ],
          contactPerson: {
            name: "David Ochieng",
            email: "digital.licensing@mcsk.or.ke",
            phone: "+254 20 XXX XXX"
          }
        },
        {
          id: "broadcasting",
          title: "Broadcasting License",
          description: "For radio stations, TV channels, and other broadcasting media.",
          category: "Broadcasting",
          features: [
            "Legal use of music in your broadcasts",
            "Access to a vast catalog of local and international music",
            "Protection from copyright infringement claims",
            "Support for Kenyan musicians and creators"
          ],
          requirements: [
            "Broadcasting license from Communications Authority",
            "Company registration documents",
            "Programming schedule"
          ],
          fees: [
            {
              name: "Community Radio/TV",
              amount: 50000,
              description: "For non-profit community broadcasters"
            },
            {
              name: "Regional Broadcaster",
              amount: 150000,
              description: "For broadcasters with regional coverage"
            },
            {
              name: "National Broadcaster",
              amount: 300000,
              description: "For broadcasters with national coverage"
            }
          ],
          icon: "radio",
          duration: "Annual",
          order: 4,
          isActive: true,
          applicationProcess: [
            "Complete the broadcasting license application form",
            "Submit required documentation",
            "Pay the applicable fee",
            "Receive your license certificate"
          ],
          contactPerson: {
            name: "Sarah Wanjiku",
            email: "broadcasting.licensing@mcsk.or.ke",
            phone: "+254 20 XXX XXX"
          }
        }
      ]
    };

    return NextResponse.json({ data: licenseTypesData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching license types:', error)
    return NextResponse.json(
      { error: 'Failed to fetch license types' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Simple mock implementation for POST
    return NextResponse.json({ 
      message: 'License type created successfully', 
      data: body 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating license type:', error)
    return NextResponse.json(
      { error: 'Failed to create license type' },
      { status: 500 }
    )
  }
} 