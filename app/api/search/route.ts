import { NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    if (!query) {
      return NextResponse.json({ 
        data: { results: [] } 
      }, { status: 200 });
    }

    // Mock search results based on the query
    const searchResults = {
      query,
      totalResults: 15,
      categories: {
        pages: 5,
        news: 4,
        events: 3,
        downloads: 2,
        members: 1
      },
      results: [
        {
          id: "1",
          title: "Music Licensing for Businesses",
          excerpt: "Learn about the different types of music licenses available for businesses in Kenya.",
          url: "/licensing",
          type: "page",
          relevance: 0.95
        },
        {
          id: "2",
          title: "Annual General Meeting 2024",
          excerpt: "Join us for the MCSK Annual General Meeting where we will discuss achievements, challenges, and plans for the coming year.",
          url: "/events/agm-2024",
          type: "event",
          date: "2024-07-15T09:00:00.000Z",
          relevance: 0.92
        },
        {
          id: "3",
          title: "MCSK Partners with Global Rights Organizations",
          excerpt: "New international partnerships expand opportunities for Kenyan musicians.",
          url: "/news/mcsk-global-partnerships",
          type: "news",
          date: "2024-02-20T00:00:00.000Z",
          relevance: 0.89
        },
        {
          id: "4",
          title: "Membership Application Form",
          excerpt: "Form for new MCSK membership applications.",
          url: "/downloads/membership_application_form.pdf",
          type: "download",
          fileType: "PDF",
          fileSize: "1.2 MB",
          relevance: 0.87
        },
        {
          id: "5",
          title: "Copyright Law in Kenya",
          excerpt: "Overview of music copyright law in Kenya and how it protects creators.",
          url: "/copyright-law",
          type: "page",
          relevance: 0.85
        },
        {
          id: "6",
          title: "Music Rights Workshop",
          excerpt: "A comprehensive workshop on music rights, royalties, and copyright protection for musicians and producers.",
          url: "/events/rights-workshop-2024",
          type: "event",
          date: "2024-06-20T10:00:00.000Z",
          relevance: 0.83
        },
        {
          id: "7",
          title: "MCSK Announces New Royalty Distribution System",
          excerpt: "Improved system ensures faster and more accurate royalty payments to members.",
          url: "/news/new-royalty-distribution-system",
          type: "news",
          date: "2024-03-10T00:00:00.000Z",
          relevance: 0.81
        },
        {
          id: "8",
          title: "Frequently Asked Questions",
          excerpt: "Find answers to common questions about MCSK membership, licensing, and royalties.",
          url: "/faqs",
          type: "page",
          relevance: 0.79
        },
        {
          id: "9",
          title: "Digital Music Distribution Webinar",
          excerpt: "Learn about digital music distribution platforms, streaming royalties, and how to maximize your online presence.",
          url: "/events/digital-distribution-webinar",
          type: "event",
          date: "2024-06-10T14:00:00.000Z",
          relevance: 0.77
        },
        {
          id: "10",
          title: "Royalty Distribution Policy",
          excerpt: "MCSK policy on royalty calculation and distribution.",
          url: "/downloads/royalty_distribution_policy.pdf",
          type: "download",
          fileType: "PDF",
          fileSize: "2.1 MB",
          relevance: 0.75
        }
      ],
      suggestedSearches: [
        "licensing",
        "membership",
        "royalties",
        "copyright",
        "events"
      ]
    };

    return NextResponse.json({ data: searchResults }, { status: 200 });
  } catch (error) {
    console.error('Error performing search:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}
