import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch FAQs from database
    const dbFaqs = await prisma.faq.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    // Transform the data to match the expected format
    const faqs = dbFaqs.map((faq) => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      category: "general" // Default category
    }));

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
      faqs
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
