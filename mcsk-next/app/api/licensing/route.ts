import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for licensing
    const licensingData = {
      hero: {
        title: "Music Licensing",
        description: "Obtain the right license for your business or event to legally use music.",
        image: "/images/licensing/hero.jpg"
      },
      intro: {
        title: "Why License Music?",
        content: "<p>Music licensing is a legal requirement for businesses and events that play or perform music publicly. By obtaining a license from MCSK, you ensure that music creators receive fair compensation for the use of their works.</p><p>Failure to obtain proper licensing may result in legal consequences, including fines and penalties.</p>"
      },
      licenseTypes: [
        {
          id: "business",
          title: "Business License",
          description: "For shops, restaurants, hotels, and other commercial establishments.",
          features: [
            "Legal use of music in your business premises",
            "Access to a vast catalog of local and international music",
            "Protection from copyright infringement claims",
            "Support for Kenyan musicians and creators"
          ],
          pricing: {
            structure: "Based on business size and type",
            ranges: [
              "Small businesses: KES 10,000 - 25,000 per year",
              "Medium businesses: KES 25,000 - 75,000 per year",
              "Large businesses: KES 75,000+ per year"
            ]
          },
          applicationProcess: [
            "Complete the business license application form",
            "Submit required documentation",
            "Pay the applicable fee",
            "Receive your license certificate"
          ],
          requiredDocuments: [
            "Business registration certificate",
            "Tax compliance certificate",
            "Proof of business premises"
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
          features: [
            "Legal use of music at your event",
            "Coverage for live performances and recorded music",
            "Protection from copyright infringement claims",
            "Support for Kenyan musicians and creators"
          ],
          pricing: {
            structure: "Based on event size and type",
            ranges: [
              "Small events (up to 100 attendees): KES 5,000 - 15,000",
              "Medium events (101-500 attendees): KES 15,000 - 50,000",
              "Large events (501+ attendees): KES 50,000+"
            ]
          },
          applicationProcess: [
            "Complete the event license application form",
            "Submit event details and expected attendance",
            "Pay the applicable fee",
            "Receive your event license certificate"
          ],
          requiredDocuments: [
            "Event permit (if applicable)",
            "Venue confirmation",
            "Event program or schedule"
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
          features: [
            "Legal use of music on your digital platform",
            "Access to a vast catalog of local and international music",
            "Protection from copyright infringement claims",
            "Support for Kenyan musicians and creators"
          ],
          pricing: {
            structure: "Based on platform reach and usage",
            ranges: [
              "Small platforms: KES 20,000 - 50,000 per year",
              "Medium platforms: KES 50,000 - 150,000 per year",
              "Large platforms: KES 150,000+ per year"
            ]
          },
          applicationProcess: [
            "Complete the digital license application form",
            "Submit platform details and expected usage",
            "Pay the applicable fee",
            "Receive your digital license certificate"
          ],
          requiredDocuments: [
            "Platform registration details",
            "Traffic or user statistics",
            "Business registration certificate"
          ],
          contactPerson: {
            name: "David Ochieng",
            email: "digital.licensing@mcsk.or.ke",
            phone: "+254 20 XXX XXX"
          }
        }
      ],
      process: {
        title: "Licensing Process",
        steps: [
          {
            title: "Determine License Type",
            description: "Identify which license type is appropriate for your business or event."
          },
          {
            title: "Submit Application",
            description: "Complete and submit the application form with all required documentation."
          },
          {
            title: "Fee Assessment",
            description: "MCSK will assess your application and determine the applicable fee."
          },
          {
            title: "Payment",
            description: "Pay the licensing fee through the provided payment methods."
          },
          {
            title: "License Issuance",
            description: "Receive your license certificate and display it at your business or event."
          }
        ]
      },
      faqs: [
        {
          question: "How long does it take to process a license application?",
          answer: "Standard applications are processed within 5-7 business days. Expedited processing is available for an additional fee."
        },
        {
          question: "Can I get a refund if my event is canceled?",
          answer: "Refunds may be issued for canceled events if the request is made at least 14 days before the event date. A processing fee will apply."
        },
        {
          question: "Do I need a license for a private party?",
          answer: "Private events held in non-commercial venues with no admission fee generally do not require a license. However, if the event is held in a commercial venue or has an admission fee, a license may be required."
        },
        {
          question: "How is the licensing fee calculated?",
          answer: "Licensing fees are calculated based on factors such as venue capacity, admission fees, business size, and music usage. Contact our licensing team for a specific quote."
        },
        {
          question: "Can I use any music once I have a license?",
          answer: "An MCSK license covers the use of music in our repertoire, which includes most local and international music. Some special performances or uses may require additional permissions."
        }
      ]
    };

    return NextResponse.json({ data: licensingData }, { status: 200 });
  } catch (error) {
    console.error('Error in licensing API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch licensing data' },
      { status: 500 }
    );
  }
}
