import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // Mock data for membership benefits
    const membershipBenefitsData = {
      hero: {
        title: "Membership Benefits",
        description: "Discover the advantages of becoming an MCSK member and how we support music creators.",
        image: "/images/membership/benefits-hero.jpg"
      },
      introduction: {
        title: "Why Join MCSK?",
        content: "<p>The Music Copyright Society of Kenya (MCSK) is dedicated to protecting the rights of music creators and ensuring they receive fair compensation for their work. Our membership offers numerous benefits designed to support your career, protect your rights, and maximize your earnings from your creative works.</p>"
      },
      benefits: [
        {
          id: "royalties",
          title: "Royalty Collection & Distribution",
          description: "We collect royalties from various music users and distribute them to our members on a regular basis. This includes royalties from radio, TV, streaming platforms, public performances, and more.",
          icon: "dollar-sign",
          order: 1,
          isActive: true,
          details: [
            "Quarterly royalty distributions",
            "Transparent collection and distribution processes",
            "International royalty collection through reciprocal agreements",
            "Detailed statements showing royalty sources"
          ]
        },
        {
          id: "legal",
          title: "Legal Protection & Representation",
          description: "We provide legal support to protect your copyright and represent your interests in legal matters related to your music rights.",
          icon: "shield",
          order: 2,
          isActive: true,
          details: [
            "Copyright enforcement against unauthorized use",
            "Legal advice on music rights issues",
            "Representation in copyright disputes",
            "Advocacy for favorable copyright legislation"
          ]
        },
        {
          id: "licensing",
          title: "Licensing Services",
          description: "We handle the licensing of your music to various users, saving you time and ensuring proper compensation for the use of your works.",
          icon: "file-text",
          order: 3,
          isActive: true,
          details: [
            "Business licensing for shops, restaurants, hotels, etc.",
            "Event licensing for concerts, festivals, and other events",
            "Broadcasting licensing for radio and TV stations",
            "Digital platform licensing for websites and apps"
          ]
        },
        {
          id: "health",
          title: "Healthcare & Welfare Support",
          description: "We offer healthcare benefits and welfare support to help members during times of need and ensure their well-being.",
          icon: "heart",
          order: 4,
          isActive: true,
          details: [
            "Medical insurance coverage",
            "Emergency medical assistance",
            "Bereavement support",
            "Retirement planning assistance"
          ]
        },
        {
          id: "education",
          title: "Education & Training",
          description: "We provide educational resources and training opportunities to help members develop their skills and knowledge of the music industry.",
          icon: "book",
          order: 5,
          isActive: true,
          details: [
            "Workshops on music rights and royalties",
            "Seminars on music business and career development",
            "Training on digital music distribution",
            "Resources on copyright law and protection"
          ]
        },
        {
          id: "networking",
          title: "Networking & Collaboration",
          description: "We create opportunities for members to connect with other musicians, producers, and industry professionals for collaboration and growth.",
          icon: "users",
          order: 6,
          isActive: true,
          details: [
            "Member networking events",
            "Collaboration opportunities with other members",
            "Industry connections and partnerships",
            "Access to MCSK community forums"
          ]
        },
        {
          id: "international",
          title: "International Representation",
          description: "Through our reciprocal agreements with similar societies worldwide, we ensure your music rights are protected and you receive royalties from international use.",
          icon: "globe",
          order: 7,
          isActive: true,
          details: [
            "Representation in over 100 countries",
            "Collection of international royalties",
            "Protection against unauthorized use globally",
            "Access to international music markets"
          ]
        },
        {
          id: "financial",
          title: "Financial Services",
          description: "We offer financial services and support to help members manage their royalty income and plan for the future.",
          icon: "credit-card",
          order: 8,
          isActive: true,
          details: [
            "Advances against future royalties",
            "Financial planning advice",
            "Tax guidance for music income",
            "Partnerships with financial institutions"
          ]
        }
      ],
      testimonials: [
        {
          name: "John Katana",
          role: "Musician & Producer",
          quote: "Being an MCSK member has transformed my career. I now receive regular royalties from my music played across Kenya and internationally.",
          image: "/images/membership/testimonial1.jpg"
        },
        {
          name: "Mary Wanjiku",
          role: "Singer-Songwriter",
          quote: "The legal support from MCSK has been invaluable. They helped me recover royalties from unauthorized use of my songs and continue to protect my rights.",
          image: "/images/membership/testimonial2.jpg"
        },
        {
          name: "David Ochieng",
          role: "Composer",
          quote: "The healthcare benefits have been a lifesaver for me and my family. It's one less thing to worry about as I focus on my music career.",
          image: "/images/membership/testimonial3.jpg"
        }
      ]
    };

    return NextResponse.json({ data: membershipBenefitsData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching membership benefits:', error)
    return NextResponse.json(
      { error: 'Failed to fetch membership benefits' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Simple mock implementation for POST
    return NextResponse.json({ 
      message: 'Membership benefit created successfully', 
      data: body 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating membership benefit:', error)
    return NextResponse.json(
      { error: 'Failed to create membership benefit' },
      { status: 500 }
    )
  }
} 