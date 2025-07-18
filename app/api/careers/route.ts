import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for careers
    const careersData = {
      hero: {
        title: "Careers at MCSK",
        description: "Join our team and help protect the rights of music creators in Kenya.",
        image: "/images/careers/hero.jpg"
      },
      introduction: {
        title: "Work With Us",
        content: "<p>At the Music Copyright Society of Kenya (MCSK), we are dedicated to protecting the rights of music creators and ensuring they receive fair compensation for their work. Our team is made up of passionate individuals who are committed to making a difference in the Kenyan music industry.</p><p>We offer a dynamic and inclusive work environment where innovation, creativity, and collaboration are valued. Join us in our mission to support and empower musicians across Kenya.</p>"
      },
      benefits: {
        title: "Why Work With Us",
        items: [
          {
            title: "Meaningful Work",
            description: "Make a real difference in the lives of musicians and the music industry in Kenya.",
            icon: "heart"
          },
          {
            title: "Professional Growth",
            description: "Opportunities for training, development, and career advancement.",
            icon: "trending-up"
          },
          {
            title: "Inclusive Culture",
            description: "A diverse and supportive work environment that values all perspectives.",
            icon: "users"
          },
          {
            title: "Competitive Benefits",
            description: "Comprehensive benefits package including health insurance and retirement plans.",
            icon: "shield"
          },
          {
            title: "Work-Life Balance",
            description: "Flexible work arrangements to help you maintain a healthy balance.",
            icon: "clock"
          }
        ]
      },
      openPositions: [
        {
          title: "Licensing Officer",
          department: "Licensing",
          location: "Nairobi",
          type: "Full-time",
          description: "<p>We are seeking a Licensing Officer to join our team and help manage music licensing for businesses and events. The ideal candidate will have excellent communication skills, attention to detail, and a passion for music rights.</p>",
          responsibilities: [
            "Process licensing applications from businesses and events",
            "Conduct field visits to ensure compliance with licensing requirements",
            "Educate businesses about music licensing requirements",
            "Maintain accurate records of licensed establishments",
            "Prepare reports on licensing activities and revenue"
          ],
          qualifications: [
            "Bachelor's degree in Business Administration, Law, or related field",
            "1-3 years of experience in sales, customer service, or related field",
            "Knowledge of copyright law and music licensing (preferred)",
            "Excellent communication and negotiation skills",
            "Strong organizational and time management abilities",
            "Proficiency in Microsoft Office and database management"
          ],
          applicationDeadline: "June 30, 2024",
          applicationLink: "/careers/apply/licensing-officer"
        },
        {
          title: "Membership Services Coordinator",
          department: "Membership",
          location: "Nairobi",
          type: "Full-time",
          description: "<p>We are looking for a Membership Services Coordinator to support our members and handle membership-related inquiries and applications. The ideal candidate will be detail-oriented, organized, and have excellent customer service skills.</p>",
          responsibilities: [
            "Process new membership applications and renewals",
            "Respond to member inquiries and provide support",
            "Maintain accurate member records in the database",
            "Assist with member education and outreach programs",
            "Prepare reports on membership activities and growth"
          ],
          qualifications: [
            "Bachelor's degree in Business Administration, Communications, or related field",
            "1-3 years of experience in customer service or related field",
            "Knowledge of the music industry (preferred)",
            "Excellent communication and interpersonal skills",
            "Strong organizational and problem-solving abilities",
            "Proficiency in Microsoft Office and database management"
          ],
          applicationDeadline: "July 15, 2024",
          applicationLink: "/careers/apply/membership-coordinator"
        },
        {
          title: "Digital Rights Specialist",
          department: "Rights Management",
          location: "Nairobi",
          type: "Full-time",
          description: "<p>We are seeking a Digital Rights Specialist to help manage and monitor the use of music on digital platforms. The ideal candidate will have a strong understanding of digital music distribution, streaming platforms, and copyright in the digital space.</p>",
          responsibilities: [
            "Monitor digital platforms for use of members' music",
            "Process digital rights claims and ensure proper attribution",
            "Liaise with digital service providers regarding licensing and royalties",
            "Stay updated on digital music trends and technologies",
            "Prepare reports on digital usage and royalty collection"
          ],
          qualifications: [
            "Bachelor's degree in Music Business, Digital Media, or related field",
            "2-4 years of experience in digital rights management or related field",
            "Knowledge of digital music platforms and distribution channels",
            "Understanding of copyright law and music licensing",
            "Strong analytical and technical skills",
            "Experience with digital content monitoring tools (preferred)"
          ],
          applicationDeadline: "July 31, 2024",
          applicationLink: "/careers/apply/digital-rights-specialist"
        }
      ],
      applicationProcess: {
        title: "Application Process",
        steps: [
          {
            title: "Submit Application",
            description: "Complete the online application form and upload your resume and cover letter."
          },
          {
            title: "Initial Screening",
            description: "Our HR team will review your application and assess your qualifications."
          },
          {
            title: "First Interview",
            description: "Selected candidates will be invited for an initial interview (in-person or virtual)."
          },
          {
            title: "Assessment",
            description: "Depending on the position, you may be asked to complete a skills assessment or case study."
          },
          {
            title: "Final Interview",
            description: "Successful candidates will be invited for a final interview with the department head."
          },
          {
            title: "Job Offer",
            description: "If selected, you will receive a job offer outlining the terms of employment."
          }
        ]
      },
      internships: {
        title: "Internship Program",
        description: "<p>MCSK offers internship opportunities for students and recent graduates interested in music rights management, copyright law, and the music industry. Our internships provide hands-on experience and mentorship from industry professionals.</p><p>Internships are available in various departments, including Licensing, Membership Services, Legal, and Communications. Most internships run for 3-6 months and may be paid or unpaid depending on the position.</p>",
        currentOpenings: "We are currently accepting applications for our Fall 2024 internship program. Please send your resume and cover letter to internships@mcsk.or.ke with the subject line 'Internship Application - [Department of Interest]'."
      },
      contact: {
        title: "Contact HR",
        description: "If you have any questions about our current openings or the application process, please contact our HR department.",
        email: "careers@mcsk.or.ke",
        phone: "+254 20 XXX XXXX"
      }
    };

    return NextResponse.json({ data: careersData }, { status: 200 });
  } catch (error) {
    console.error('Error in careers API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch careers data' },
      { status: 500 }
    );
  }
}
