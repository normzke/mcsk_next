import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const copyrightData = {
      hero: {
        title: "Copyright Law in Kenya",
        description: "Understanding music copyright protection and rights management",
        image: "/images/copyright-hero.jpg"
      },
      overview: {
        title: "Overview of Music Copyright",
        content: `
          <p>Copyright law in Kenya protects original musical works, giving creators exclusive rights to:</p>
          <ul>
            <li>Reproduce the work</li>
            <li>Distribute copies</li>
            <li>Perform the work publicly</li>
            <li>Create derivative works</li>
          </ul>
          <p>These rights are protected under the Copyright Act of Kenya and international treaties.</p>
        `,
        keyPoints: [
          "Automatic protection upon creation in tangible form",
          "Exclusive rights to control use and distribution",
          "Protection under the Copyright Act of Kenya (Cap. 130)",
          "Duration: life of the author plus 50 years"
        ]
      },
      sections: [
        {
          id: '1',
          title: "Protected Rights",
          content: `
            <h3>Musical Works Protection</h3>
            <p>Copyright protection covers:</p>
            <ul>
              <li>Musical compositions</li>
              <li>Lyrics</li>
              <li>Sound recordings</li>
              <li>Arrangements</li>
            </ul>
            <p>Protection is automatic upon creation of the work.</p>
          `
        },
        {
          id: '2',
          title: "Duration of Protection",
          content: `
            <h3>Copyright Terms</h3>
            <p>Copyright protection lasts for:</p>
            <ul>
              <li>Life of the author plus 50 years</li>
              <li>50 years from publication for sound recordings</li>
              <li>50 years for works of corporate authorship</li>
            </ul>
          `
        },
        {
          id: '3',
          title: "Licensing & Royalties",
          content: `
            <h3>Music Licensing</h3>
            <p>Different types of licenses include:</p>
            <ul>
              <li>Performance rights</li>
              <li>Mechanical rights</li>
              <li>Synchronization rights</li>
              <li>Digital distribution rights</li>
            </ul>
          `
        }
      ],
      faq: [
        {
          question: "What works are protected by copyright?",
          answer: "Copyright protects original musical compositions, lyrics, sound recordings, and arrangements. Protection is automatic upon creation of the work in a tangible form."
        },
        {
          question: "How long does copyright protection last?",
          answer: "In Kenya, copyright protection lasts for the life of the author plus 50 years after their death. For sound recordings, protection lasts 50 years from the date of publication."
        },
        {
          question: "What rights do copyright owners have?",
          answer: "Copyright owners have exclusive rights to reproduce, distribute, perform, and create derivative works from their musical creations. They can also license these rights to others."
        },
        {
          question: "How can I protect my music copyright?",
          answer: "While copyright protection is automatic, it's recommended to register your works with MCSK and maintain proper documentation of your creations. Using the copyright symbol © is also advisable."
        }
      ],
      resources: [
        {
          title: "Copyright Registration Guide",
          description: "Step-by-step guide to registering your musical works",
          link: "/resources/copyright-registration"
        },
        {
          title: "Licensing Guidelines",
          description: "Understanding different types of music licenses",
          link: "/resources/licensing-guide"
        },
        {
          title: "Rights Management",
          description: "Best practices for managing your music rights",
          link: "/resources/rights-management"
        }
      ]
    }

    return NextResponse.json({ data: copyrightData })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch copyright law data' },
      { status: 500 }
    )
  }
} 