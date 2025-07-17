import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for privacy policy
    const privacyData = {
      hero: {
        title: "Privacy Policy",
        description: "Learn how MCSK collects, uses, and protects your personal information.",
        image: "/images/legal/privacy-hero.jpg"
      },
      lastUpdated: "May 15, 2024",
      sections: [
        {
          id: "introduction",
          title: "Introduction",
          content: "<p>The Music Copyright Society of Kenya (MCSK) is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you interact with our website, services, or otherwise engage with us.</p><p>By using our website or services, you consent to the data practices described in this policy. We may change this policy from time to time, so please check this page regularly to ensure you are aware of any updates.</p>"
        },
        {
          id: "information-collected",
          title: "Information We Collect",
          content: "<p>We may collect the following types of information:</p><h4>Personal Information</h4><ul><li>Name, address, email address, and phone number</li><li>Date of birth and national ID/passport details</li><li>Banking information for royalty payments</li><li>Tax information</li><li>Details about your musical works and performances</li><li>Photographs and biographical information</li></ul><h4>Non-Personal Information</h4><ul><li>Browser type and version</li><li>Operating system</li><li>IP address</li><li>Pages visited on our website</li><li>Time and date of your visit</li><li>Time spent on pages</li><li>Referring website addresses</li></ul>"
        },
        {
          id: "collection-methods",
          title: "How We Collect Information",
          content: "<p>We collect information through various methods, including:</p><ul><li>Membership application forms</li><li>Registration for events or services</li><li>Correspondence with our staff</li><li>Cookies and tracking technologies on our website</li><li>Third-party sources such as other collective management organizations</li><li>Public sources such as music databases and directories</li></ul>"
        },
        {
          id: "use-of-information",
          title: "How We Use Your Information",
          content: "<p>We may use your information for the following purposes:</p><ul><li>Processing your membership application</li><li>Collecting and distributing royalties</li><li>Providing customer service and support</li><li>Sending important notifications about your account or changes to our services</li><li>Sending newsletters and marketing communications (with your consent)</li><li>Conducting research and analysis to improve our services</li><li>Complying with legal obligations</li><li>Enforcing our terms of service and protecting our rights</li></ul>"
        },
        {
          id: "information-sharing",
          title: "Sharing Your Information",
          content: "<p>We may share your information with:</p><ul><li>Other collective management organizations worldwide (for royalty collection purposes)</li><li>Service providers who assist us in operating our website and services</li><li>Legal and regulatory authorities when required by law</li><li>Professional advisors such as lawyers, auditors, and accountants</li><li>Business partners for specific events or services (with your consent)</li></ul><p>We do not sell, rent, or lease your personal information to third parties for marketing purposes without your explicit consent.</p>"
        },
        {
          id: "data-security",
          title: "Data Security",
          content: "<p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, accidental loss, alteration, disclosure, or destruction. While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p><p>We retain your information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>"
        },
        {
          id: "your-rights",
          title: "Your Rights",
          content: "<p>Depending on your location, you may have the following rights regarding your personal information:</p><ul><li>Access to your personal information</li><li>Correction of inaccurate or incomplete information</li><li>Deletion of your personal information</li><li>Restriction of processing of your personal information</li><li>Data portability</li><li>Objection to processing of your personal information</li><li>Withdrawal of consent (where processing is based on consent)</li></ul><p>To exercise these rights, please contact us using the information provided in the 'Contact Us' section below.</p>"
        },
        {
          id: "cookies",
          title: "Cookies and Tracking Technologies",
          content: "<p>Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookies through your browser settings, but disabling cookies may limit your ability to use certain features of our website.</p><p>We use the following types of cookies:</p><ul><li><strong>Essential cookies:</strong> Necessary for the website to function properly</li><li><strong>Analytical/performance cookies:</strong> Help us understand how visitors interact with our website</li><li><strong>Functionality cookies:</strong> Allow the website to remember choices you make</li><li><strong>Targeting cookies:</strong> Record your visit to our website, the pages you visit, and the links you follow</li></ul>"
        },
        {
          id: "children-privacy",
          title: "Children's Privacy",
          content: "<p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take steps to delete such information.</p>"
        },
        {
          id: "international-transfers",
          title: "International Data Transfers",
          content: "<p>As a collective management organization with international affiliations, we may transfer your personal information to countries outside Kenya. When we do so, we ensure appropriate safeguards are in place to protect your information and comply with applicable data protection laws.</p>"
        },
        {
          id: "changes-to-policy",
          title: "Changes to This Privacy Policy",
          content: "<p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the revised policy on our website with the updated date. We encourage you to review this policy periodically.</p>"
        },
        {
          id: "contact-us",
          title: "Contact Us",
          content: "<p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p><p>Music Copyright Society of Kenya<br>P.O. Box 14806-00800<br>Nairobi, Kenya<br>Email: privacy@mcsk.or.ke<br>Phone: +254 20 XXX XXXX</p>"
        }
      ]
    };

    return NextResponse.json({ data: privacyData }, { status: 200 });
  } catch (error) {
    console.error('Error in privacy API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch privacy policy data' },
      { status: 500 }
    );
  }
}
