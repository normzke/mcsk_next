import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for downloads
    const downloadsData = {
      hero: {
        title: "Downloads",
        description: "Access forms, documents, and resources related to MCSK membership and licensing.",
        image: "/images/downloads/hero.jpg"
      },
      categories: [
        {
          id: "membership",
          title: "Membership Forms",
          description: "Forms required for MCSK membership application and renewal."
        },
        {
          id: "licensing",
          title: "Licensing Documents",
          description: "Forms and documents for various licensing applications."
        },
        {
          id: "reports",
          title: "Reports & Publications",
          description: "Annual reports, newsletters, and other MCSK publications."
        },
        {
          id: "guidelines",
          title: "Guidelines & Policies",
          description: "MCSK guidelines, policies, and procedural documents."
        }
      ],
      files: [
        {
          id: "1",
          title: "Membership Application Form",
          description: "Form for new MCSK membership applications.",
          fileType: "PDF",
          fileSize: "1.2 MB",
          downloadUrl: "/downloads/membership_application_form.pdf",
          category: "membership",
          updatedDate: "2024-01-15"
        },
        {
          id: "2",
          title: "Membership Renewal Form",
          description: "Form for renewing existing MCSK membership.",
          fileType: "PDF",
          fileSize: "1.0 MB",
          downloadUrl: "/downloads/membership_renewal_form.pdf",
          category: "membership",
          updatedDate: "2024-01-15"
        },
        {
          id: "3",
          title: "Business License Application",
          description: "Application form for business music licensing.",
          fileType: "PDF",
          fileSize: "1.5 MB",
          downloadUrl: "/downloads/business_license_application.pdf",
          category: "licensing",
          updatedDate: "2024-02-10"
        },
        {
          id: "4",
          title: "Event License Application",
          description: "Application form for event music licensing.",
          fileType: "PDF",
          fileSize: "1.3 MB",
          downloadUrl: "/downloads/event_license_application.pdf",
          category: "licensing",
          updatedDate: "2024-02-10"
        },
        {
          id: "5",
          title: "Digital Platform License Application",
          description: "Application form for digital platform music licensing.",
          fileType: "PDF",
          fileSize: "1.4 MB",
          downloadUrl: "/downloads/digital_license_application.pdf",
          category: "licensing",
          updatedDate: "2024-02-10"
        },
        {
          id: "6",
          title: "Annual Report 2023",
          description: "MCSK Annual Report for the year 2023.",
          fileType: "PDF",
          fileSize: "5.2 MB",
          downloadUrl: "/downloads/annual_report_2023.pdf",
          category: "reports",
          updatedDate: "2024-03-20"
        },
        {
          id: "7",
          title: "Quarterly Newsletter Q1 2024",
          description: "MCSK Quarterly Newsletter for Q1 2024.",
          fileType: "PDF",
          fileSize: "3.8 MB",
          downloadUrl: "/downloads/newsletter_q1_2024.pdf",
          category: "reports",
          updatedDate: "2024-04-05"
        },
        {
          id: "8",
          title: "Royalty Distribution Policy",
          description: "MCSK policy on royalty calculation and distribution.",
          fileType: "PDF",
          fileSize: "2.1 MB",
          downloadUrl: "/downloads/royalty_distribution_policy.pdf",
          category: "guidelines",
          updatedDate: "2023-11-30"
        },
        {
          id: "9",
          title: "Code of Conduct",
          description: "MCSK Code of Conduct for members and staff.",
          fileType: "PDF",
          fileSize: "1.8 MB",
          downloadUrl: "/downloads/code_of_conduct.pdf",
          category: "guidelines",
          updatedDate: "2023-10-15"
        },
        {
          id: "10",
          title: "Dispute Resolution Procedure",
          description: "Procedure for resolving disputes related to MCSK services.",
          fileType: "PDF",
          fileSize: "1.6 MB",
          downloadUrl: "/downloads/dispute_resolution_procedure.pdf",
          category: "guidelines",
          updatedDate: "2023-09-22"
        }
      ]
    };

    return NextResponse.json({ data: downloadsData }, { status: 200 });
  } catch (error) {
    console.error('Error in downloads API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch downloads data' },
      { status: 500 }
    );
  }
}
