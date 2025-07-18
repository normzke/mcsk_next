import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for leadership
    const leadershipData = {
      hero: {
        title: "Our Leadership",
        description: "Meet the team leading MCSK in protecting and promoting the rights of music creators in Kenya.",
        image: "/images/leadership/hero.jpg"
      },
      chairman: {
        name: "Dr. Ezekiel Mutua",
        title: "Chairman",
        image: "/images/leadership/chairman.jpg",
        bio: "Dr. Ezekiel Mutua is a seasoned administrator with extensive experience in media and communications. He has been instrumental in advocating for the rights of content creators and ensuring fair compensation for their work. As Chairman of MCSK, he leads the Board in setting strategic direction and ensuring good governance of the organization.",
        quote: "Our mission is to ensure that every musician in Kenya receives fair compensation for their creative work and intellectual property.",
        social: {
          twitter: "https://twitter.com/ezekielmutua",
          linkedin: "https://linkedin.com/in/ezekielmutua"
        }
      },
      boardMembers: [
        {
          id: "1",
          name: "Dr. Ezekiel Mutua",
          title: "Chairman",
          image: "/images/leadership/chairman.jpg",
          bio: "Dr. Ezekiel Mutua is a seasoned administrator with extensive experience in media and communications. He has been instrumental in advocating for the rights of content creators and ensuring fair compensation for their work. As Chairman of MCSK, he leads the Board in setting strategic direction and ensuring good governance of the organization.",
          quote: "Our mission is to ensure that every musician in Kenya receives fair compensation for their creative work and intellectual property.",
          social: {
            twitter: "https://twitter.com/ezekielmutua",
            linkedin: "https://linkedin.com/in/ezekielmutua"
          }
        },
        {
          id: "2",
          name: "Jane Wambui",
          title: "Vice Chairperson",
          image: "/images/leadership/vice-chair.jpg",
          bio: "Jane Wambui brings over 15 years of experience in the music industry as both a performer and advocate for artists' rights. Her deep understanding of the challenges facing musicians in Kenya has been invaluable in shaping MCSK's policies and programs.",
          quote: "We must create an environment where Kenyan musicians can thrive and be recognized globally for their talent and creativity.",
          social: {
            twitter: "https://twitter.com/janewambui",
            linkedin: "https://linkedin.com/in/janewambui"
          }
        },
        {
          id: "3",
          name: "John Katana",
          title: "Board Member",
          image: "/images/leadership/board-member1.jpg",
          bio: "John Katana is a renowned musician and producer with decades of experience in the Kenyan music scene. His insights into music production and distribution have helped MCSK adapt to the changing landscape of digital music consumption.",
          quote: "Digital platforms have transformed how music is consumed. We must ensure our systems protect artists in this new era.",
          social: {
            twitter: "https://twitter.com/johnkatana",
            instagram: "https://instagram.com/johnkatana"
          }
        },
        {
          id: "4",
          name: "Mary Atieno",
          title: "Board Member",
          image: "/images/leadership/board-member2.jpg",
          bio: "Mary Atieno is a legal expert specializing in intellectual property rights. Her expertise has been crucial in strengthening MCSK's legal framework and ensuring compliance with international copyright standards.",
          quote: "Strong legal protection for intellectual property is the foundation of a thriving creative economy.",
          social: {
            linkedin: "https://linkedin.com/in/maryatieno",
            email: "mary.atieno@mcsk.or.ke"
          }
        },
        {
          id: "5",
          name: "David Ochieng",
          title: "Board Member",
          image: "/images/leadership/board-member3.jpg",
          bio: "David Ochieng brings financial expertise to the MCSK board, with a background in accounting and financial management. He oversees the organization's financial strategies and ensures transparency in royalty distribution.",
          quote: "Transparent and efficient financial management is essential for maintaining the trust of our members.",
          social: {
            linkedin: "https://linkedin.com/in/davidochieng",
            email: "david.ochieng@mcsk.or.ke"
          }
        }
      ],
      executiveTeam: [
        {
          id: "1",
          name: "Milcah Kulati",
          title: "Chief Executive Officer",
          image: "/images/leadership/ceo.jpg",
          bio: "Milcah Kulati leads the executive team at MCSK, overseeing the day-to-day operations and implementation of the Board's strategic vision. With a background in arts management and policy development, she has spearheaded several initiatives to modernize MCSK's systems and improve service delivery to members.",
          quote: "Our goal is to build a world-class collective management organization that serves the needs of all Kenyan musicians.",
          social: {
            twitter: "https://twitter.com/milcahkulati",
            linkedin: "https://linkedin.com/in/milcahkulati",
            email: "ceo@mcsk.or.ke"
          }
        },
        {
          id: "2",
          name: "James Njoroge",
          title: "Chief Operations Officer",
          image: "/images/leadership/coo.jpg",
          bio: "James Njoroge oversees MCSK's operational functions, including licensing, membership services, and distribution. His focus on efficiency and member satisfaction has led to significant improvements in MCSK's service delivery.",
          social: {
            linkedin: "https://linkedin.com/in/jamesnjoroge",
            email: "operations@mcsk.or.ke"
          }
        },
        {
          id: "3",
          name: "Sarah Kimani",
          title: "Chief Financial Officer",
          image: "/images/leadership/cfo.jpg",
          bio: "Sarah Kimani manages MCSK's financial operations, ensuring proper accounting, budgeting, and financial reporting. Her commitment to transparency has strengthened MCSK's financial governance.",
          social: {
            linkedin: "https://linkedin.com/in/sarahkimani",
            email: "finance@mcsk.or.ke"
          }
        },
        {
          id: "4",
          name: "Peter Mwangi",
          title: "Head of Legal Affairs",
          image: "/images/leadership/legal-head.jpg",
          bio: "Peter Mwangi leads MCSK's legal department, handling copyright enforcement, legal compliance, and dispute resolution. His expertise in intellectual property law has been vital in protecting members' rights.",
          social: {
            linkedin: "https://linkedin.com/in/petermwangi",
            email: "legal@mcsk.or.ke"
          }
        }
      ]
    };

    return NextResponse.json({ data: leadershipData }, { status: 200 });
  } catch (error) {
    console.error('Error in leadership API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leadership data' },
      { status: 500 }
    );
  }
}
