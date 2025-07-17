import { NextResponse } from 'next/server';

export async function GET() {
  const aboutData = {
    hero: {
      title: "About MCSK",
      description: "Protecting and promoting music rights in Kenya since 1983.",
      image: "/images/about-hero.jpg"
    },
    mission: {
      title: "Our Mission & Values",
      description: "We are dedicated to protecting and promoting the rights of music creators through effective collective management.",
      values: [
        {
          title: "Integrity",
          description: "We maintain the highest standards of professional ethics and transparency.",
          icon: "fa-balance-scale"
        },
        {
          title: "Innovation",
          description: "We embrace technology and new solutions to serve our members better.",
          icon: "fa-lightbulb"
        },
        {
          title: "Excellence",
          description: "We strive for excellence in all our operations and services.",
          icon: "fa-star"
        },
        {
          title: "Accountability",
          description: "We are accountable to our members and stakeholders.",
          icon: "fa-check-circle"
        }
      ]
    },
    history: {
      title: "Our Journey",
      description: "From our humble beginnings to becoming Kenya's premier music rights organization.",
      timeline: [
        {
          year: "1983",
          title: "Foundation",
          description: "MCSK was established to protect the rights of music composers and publishers."
        },
        {
          year: "1994",
          title: "International Recognition",
          description: "First international reciprocal agreement signed with global rights organizations."
        },
        {
          year: "2008",
          title: "Digital Transformation",
          description: "Introduction of digital licensing system for modern music distribution."
        },
        {
          year: "2020",
          title: "Modern Era",
          description: "Launch of modernized royalty distribution platform using blockchain technology."
        }
      ]
    },
    team: {
      title: "Our Leadership",
      description: "Meet the dedicated team leading MCSK into the future of music rights management.",
      members: [
        {
          name: "Dr. Ezekiel Mutua",
          position: "Chief Executive Officer",
          image: "/images/team/ceo.jpg",
          bio: "Leading MCSK's transformation into a modern rights management organization."
        },
        {
          name: "Mwenda Njoka",
          position: "Board Chairman",
          image: "/images/team/chairman.jpg",
          bio: "Guiding MCSK's strategic direction with over 20 years of industry experience."
        },
        {
          name: "Sarah Wambui",
          position: "Operations Director",
          image: "/images/team/operations.jpg",
          bio: "Ensuring efficient and transparent royalty collection and distribution."
        },
        {
          name: "John Kimani",
          position: "Technology Director",
          image: "/images/team/tech.jpg",
          bio: "Driving digital innovation in music rights management."
        }
      ]
    },
    impact: {
      title: "Our Impact",
      description: "Making a difference in the lives of musicians and the music industry.",
      stats: [
        {
          number: "20,000+",
          label: "Registered Members",
          icon: "fa-users"
        },
        {
          number: "KES 500M+",
          label: "Annual Royalties Distributed",
          icon: "fa-money-bill-wave"
        },
        {
          number: "5,000+",
          label: "Licensed Businesses",
          icon: "fa-building"
        },
        {
          number: "100+",
          label: "Global Partners",
          icon: "fa-globe"
        }
      ]
    },
    partners: {
      title: "Our Partners",
      description: "Working together with leading organizations to protect music rights globally.",
      list: [
        {
          name: "CISAC",
          logo: "/images/partners/cisac.png",
          description: "International Confederation of Societies of Authors and Composers"
        },
        {
          name: "KECOBO",
          logo: "/images/partners/kecobo.png",
          description: "Kenya Copyright Board"
        },
        {
          name: "WIPO",
          logo: "/images/partners/wipo.png",
          description: "World Intellectual Property Organization"
        },
        {
          name: "Ministry of Culture",
          logo: "/images/partners/culture.png",
          description: "Ministry of Sports, Culture and Heritage"
        }
      ]
    }
  };

  return NextResponse.json(aboutData);
} 