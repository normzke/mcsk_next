import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Check if we're in a build environment
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      // Return empty data during build time
      const leadershipData = {
        hero: {
          title: "Our Leadership",
          description: "Meet the team leading MCSK in protecting and promoting the rights of music creators in Kenya.",
          image: "/images/leadership/hero.jpg"
        },
        boardMembers: [],
        executiveTeam: []
      };
      return NextResponse.json({ data: leadershipData }, { status: 200 });
    }

    // Fetch board members and management members from database
    const [boardMembers, managementMembers] = await Promise.all([
      prisma.boardmember.findMany({
        where: {
          deletedAt: null,
          isActive: true,
        },
        orderBy: {
          order: 'asc',
        },
      }),
      prisma.managementmember.findMany({
        where: {
          deletedAt: null,
          isActive: true,
        },
        orderBy: {
          order: 'asc',
        },
      }),
    ]);

    const leadershipData = {
      hero: {
        title: "Our Leadership",
        description: "Meet the team leading MCSK in protecting and promoting the rights of music creators in Kenya.",
        image: "/images/leadership/hero.jpg"
      },
      boardMembers: boardMembers.map((member) => ({
        id: member.id,
        name: member.name,
        position: member.position,
        image: member.image || "/images/leadership/default-board.jpg",
        bio: member.bio || "Board member of MCSK",
        expertise: ["Board Member", "Leadership"],
        contact: {
          email: member.email || '',
          linkedin: member.linkedinUrl || '',
          twitter: member.twitterUrl || '',
        }
      })),
      managementTeam: managementMembers.map((member) => ({
        id: member.id,
        name: member.name,
        position: member.position,
        image: member.profileImage || member.image || "/images/leadership/default-management.jpg",
        bio: member.bio || `${member.position} at MCSK`,
        expertise: [member.role, member.department].filter(Boolean),
        contact: {
          email: member.email || '',
          phone: member.phone || '',
        }
      }))
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
