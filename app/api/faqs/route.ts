import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for FAQs
    const faqsData = {
      hero: {
        title: "Frequently Asked Questions",
        description: "Find answers to common questions about MCSK membership, licensing, and royalties.",
        image: "/images/faqs/hero.jpg"
      },
      categories: [
        {
          id: "membership",
          title: "Membership",
          description: "Questions about joining MCSK and membership benefits."
        },
        {
          id: "licensing",
          title: "Licensing",
          description: "Questions about obtaining music licenses for businesses and events."
        },
        {
          id: "royalties",
          title: "Royalties",
          description: "Questions about royalty collection and distribution."
        },
        {
          id: "copyright",
          title: "Copyright",
          description: "Questions about music copyright protection in Kenya."
        },
        {
          id: "general",
          title: "General",
          description: "General questions about MCSK and our services."
        }
      ],
      faqs: [
        {
          id: "1",
          question: "How do I become a member of MCSK?",
          answer: "<p>To become a member of MCSK, you need to:</p><ol><li>Complete the membership application form (available on our Downloads page)</li><li>Submit proof of your musical works (recordings, compositions, etc.)</li><li>Provide identification documents (ID/passport, KRA PIN)</li><li>Pay the membership fee</li><li>Submit all documents to our office or through our online portal</li></ol><p>Once your application is processed and approved, you will receive your membership certificate and number.</p>",
          category: "membership"
        },
        {
          id: "2",
          question: "What are the benefits of MCSK membership?",
          answer: "<p>MCSK membership offers numerous benefits, including:</p><ul><li>Collection and distribution of royalties from various music usage</li><li>Legal protection of your copyright</li><li>Representation in international copyright forums</li><li>Access to healthcare and welfare programs</li><li>Networking opportunities with other musicians</li><li>Training and capacity building workshops</li><li>Financial support through advances against future royalties</li></ul>",
          category: "membership"
        },
        {
          id: "3",
          question: "How much does MCSK membership cost?",
          answer: "<p>The current MCSK membership fee is KES 2,500 for individual members and KES 5,000 for corporate members (publishing companies). This is a one-time registration fee. Annual subscription fees may apply depending on your membership category.</p>",
          category: "membership"
        },
        {
          id: "4",
          question: "Why do businesses need a music license?",
          answer: "<p>Businesses that play music in public areas are legally required to have a music license. This is because public performance of music is a right protected by copyright law. The license ensures that composers, songwriters, and publishers receive fair compensation for the use of their work. Playing music without a license may result in legal action and penalties.</p>",
          category: "licensing"
        },
        {
          id: "5",
          question: "How is the licensing fee calculated?",
          answer: "<p>Licensing fees are calculated based on several factors, including:</p><ul><li>Type of business or event</li><li>Size of the venue (square footage)</li><li>Capacity (number of people)</li><li>Hours of operation</li><li>Type of music use (background, live performance, DJ, etc.)</li><li>Location of the business</li><li>Admission fees (for events)</li></ul><p>Our licensing team can provide a specific quote based on your business details.</p>",
          category: "licensing"
        },
        {
          id: "6",
          question: "How often are royalties distributed?",
          answer: "<p>MCSK distributes royalties to members quarterly (four times a year). The distribution schedule is typically as follows:</p><ul><li>Quarter 1: March/April</li><li>Quarter 2: June/July</li><li>Quarter 3: September/October</li><li>Quarter 4: December/January</li></ul><p>Members are notified via SMS, email, and announcements on our website when distributions are ready.</p>",
          category: "royalties"
        },
        {
          id: "7",
          question: "How are royalties calculated?",
          answer: "<p>Royalties are calculated based on several factors:</p><ul><li>Music usage data collected from radio, TV, and other platforms</li><li>Logs from licensed venues and events</li><li>Digital streaming and download reports</li><li>Market surveys and sampling</li></ul><p>The collected revenue is allocated according to our Distribution Rules, which consider factors such as frequency of play, duration, time of day, and platform reach. The specific calculation methods are outlined in our Royalty Distribution Policy, available on our Downloads page.</p>",
          category: "royalties"
        },
        {
          id: "8",
          question: "What is the difference between copyright and a trademark?",
          answer: "<p>Copyright and trademark protect different aspects of intellectual property:</p><ul><li><strong>Copyright</strong> protects original creative works such as songs, lyrics, musical compositions, and recordings. It grants the creator exclusive rights to reproduce, distribute, perform, and adapt their work. Copyright is automatic upon creation of the work.</li><li><strong>Trademark</strong> protects brand names, logos, slogans, and other identifiers that distinguish one brand from another. Trademarks are primarily used to protect commercial identity and require registration for full protection.</li></ul><p>In music, the songs and recordings are protected by copyright, while the artist or band name and logo might be protected by trademark.</p>",
          category: "copyright"
        },
        {
          id: "9",
          question: "How long does copyright protection last in Kenya?",
          answer: "<p>In Kenya, copyright protection for musical works lasts for the lifetime of the author plus 50 years after their death. For sound recordings, the protection lasts for 50 years from the date of publication. These terms are in accordance with the Copyright Act of Kenya and international copyright conventions to which Kenya is a signatory.</p>",
          category: "copyright"
        },
        {
          id: "10",
          question: "What is the difference between MCSK, PRISK, and KAMP?",
          answer: "<p>These are different Collective Management Organizations (CMOs) in Kenya, each representing different rights holders:</p><ul><li><strong>MCSK (Music Copyright Society of Kenya)</strong> represents composers, authors, and publishers of musical works. It collects royalties for the composition and lyrics of songs.</li><li><strong>PRISK (Performers Rights Society of Kenya)</strong> represents performers such as singers, musicians, actors, and dancers. It collects royalties for the performance aspect of recorded music.</li><li><strong>KAMP (Kenya Association of Music Producers)</strong> represents record producers and record labels. It collects royalties for the sound recording itself.</li></ul><p>Together, these organizations ensure that all rights holders in the music value chain receive their fair share of royalties.</p>",
          category: "general"
        },
        {
          id: "11",
          question: "How can I report unauthorized use of my music?",
          answer: "<p>If you discover unauthorized use of your music, you can:</p><ol><li>Contact MCSK's Enforcement Department at enforcement@mcsk.or.ke or call our office</li><li>Provide details of the infringement (where, when, how)</li><li>Submit evidence if available (recordings, screenshots, etc.)</li><li>Fill out an infringement complaint form (available on request)</li></ol><p>Our legal team will investigate the matter and take appropriate action, which may include issuing cease and desist notices, negotiating licensing agreements, or pursuing legal action if necessary.</p>",
          category: "copyright"
        },
        {
          id: "12",
          question: "Does MCSK offer international protection for my music?",
          answer: "<p>Yes, MCSK has reciprocal agreements with similar societies worldwide through our affiliation with international organizations such as CISAC (International Confederation of Societies of Authors and Composers). This means your music is protected and can earn royalties in countries where MCSK has agreements, even if you're not physically present in those countries. When your music is used internationally, the local society collects the royalties and transfers them to MCSK for distribution to you.</p>",
          category: "general"
        }
      ]
    };

    return NextResponse.json({ data: faqsData }, { status: 200 });
  } catch (error) {
    console.error('Error in FAQs API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs data' },
      { status: 500 }
    );
  }
}
