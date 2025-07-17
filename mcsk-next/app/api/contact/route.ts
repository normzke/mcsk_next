import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const contactData = {
      hero: {
        title: "Contact MCSK",
        description: "Get in touch with us for any inquiries or support",
        image: "/images/contact-hero.jpg"
      },
      offices: [
        {
          id: '1',
          name: "Head Office - Nairobi",
          address: "MCSK House, Musa Gitau Road\nOff Waiyaki Way, Westlands\nP.O. Box 14806-00800\nNairobi, Kenya",
          phone: "+254 20 2668752",
          email: "info@mcsk.or.ke",
          hours: "Monday - Friday: 8:00 AM - 5:00 PM",
          map: {
            lat: -1.2921,
            lng: 36.8219,
            zoom: 15
          }
        },
        {
          id: '2',
          name: "Coast Region Office - Mombasa",
          address: "Furaha Plaza, Ground Floor\nNkrumah Road\nP.O. Box 84837-80100\nMombasa, Kenya",
          phone: "+254 41 2229461",
          email: "mombasa@mcsk.or.ke",
          hours: "Monday - Friday: 8:00 AM - 5:00 PM",
          map: {
            lat: -4.0435,
            lng: 39.6682,
            zoom: 15
          }
        },
        {
          id: '3',
          name: "Western Region Office - Kisumu",
          address: "Mega Plaza, 2nd Floor\nOginga Odinga Street\nP.O. Box 1884-40100\nKisumu, Kenya",
          phone: "+254 57 2021988",
          email: "kisumu@mcsk.or.ke",
          hours: "Monday - Friday: 8:00 AM - 5:00 PM",
          map: {
            lat: -0.1022,
            lng: 34.7617,
            zoom: 15
          }
        }
      ],
      departments: [
        {
          id: '1',
          name: "Member Services",
          description: "For membership registration, updates, and general inquiries",
          email: "members@mcsk.or.ke",
          phone: "+254 20 2668753"
        },
        {
          id: '2',
          name: "Licensing",
          description: "For music usage licenses and royalty payments",
          email: "licensing@mcsk.or.ke",
          phone: "+254 20 2668754"
        },
        {
          id: '3',
          name: "Legal Affairs",
          description: "For copyright infringement and legal matters",
          email: "legal@mcsk.or.ke",
          phone: "+254 20 2668755"
        },
        {
          id: '4',
          name: "Media & Communications",
          description: "For press inquiries and media relations",
          email: "media@mcsk.or.ke",
          phone: "+254 20 2668756"
        }
      ],
      social_media: [
        {
          platform: "Facebook",
          url: "https://facebook.com/mcsk",
          icon: "facebook"
        },
        {
          platform: "Twitter",
          url: "https://twitter.com/mcsk",
          icon: "twitter"
        },
        {
          platform: "Instagram",
          url: "https://instagram.com/mcsk",
          icon: "instagram"
        },
        {
          platform: "LinkedIn",
          url: "https://linkedin.com/company/mcsk",
          icon: "linkedin"
        }
      ],
      faqs: [
        {
          question: "How do I become a member?",
          answer: "Visit our membership page to learn about the requirements and application process. You can also contact our Member Services department for assistance."
        },
        {
          question: "How do I get a music license?",
          answer: "Contact our Licensing department or visit our licensing page to learn about different types of licenses and how to apply."
        },
        {
          question: "How do I report copyright infringement?",
          answer: "Contact our Legal Affairs department with details of the infringement. You can also fill out our online copyright infringement form."
        }
      ]
    }

    return NextResponse.json({ data: contactData })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact data' },
      { status: 500 }
    )
  }
} 