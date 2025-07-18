import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data for terms of service
    const termsData = {
      hero: {
        title: "Terms of Service",
        description: "The terms and conditions governing your use of MCSK's website and services.",
        image: "/images/legal/terms-hero.jpg"
      },
      lastUpdated: "May 15, 2024",
      sections: [
        {
          id: "introduction",
          title: "Introduction",
          content: "<p>These Terms of Service ('Terms') govern your access to and use of the Music Copyright Society of Kenya ('MCSK') website, services, and applications (collectively, the 'Services'). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not access or use our Services.</p><p>These Terms constitute a legally binding agreement between you and MCSK. Please read them carefully.</p>"
        },
        {
          id: "definitions",
          title: "Definitions",
          content: "<p>In these Terms, the following definitions apply:</p><ul><li><strong>'MCSK'</strong>, <strong>'we'</strong>, <strong>'us'</strong>, or <strong>'our'</strong> refers to the Music Copyright Society of Kenya.</li><li><strong>'You'</strong> or <strong>'your'</strong> refers to the individual or entity accessing or using our Services.</li><li><strong>'Content'</strong> refers to any information, text, graphics, photos, music, software, audio, video, works of authorship, or other materials that may be viewed on, accessed through, or contributed to our Services.</li><li><strong>'Member'</strong> refers to a person or entity that has registered with MCSK for the purpose of royalty collection and distribution.</li></ul>"
        },
        {
          id: "account-registration",
          title: "Account Registration and Membership",
          content: "<p>To access certain features of our Services, you may need to register for an account or become a member of MCSK. When you register, you agree to provide accurate, current, and complete information and to update this information to maintain its accuracy.</p><p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p><p>MCSK membership is subject to additional terms and conditions outlined in our Membership Agreement, which members must agree to separately.</p>"
        },
        {
          id: "user-conduct",
          title: "User Conduct",
          content: "<p>When using our Services, you agree to:</p><ul><li>Comply with all applicable laws and regulations</li><li>Respect the intellectual property rights of others</li><li>Provide truthful and accurate information</li><li>Use the Services in a manner that does not interfere with or disrupt their functionality</li></ul><p>You agree not to:</p><ul><li>Use the Services for any illegal purpose or in violation of any laws</li><li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li><li>Interfere with or disrupt the Services or servers or networks connected to the Services</li><li>Attempt to gain unauthorized access to any part of the Services</li><li>Use any robot, spider, scraper, or other automated means to access the Services</li><li>Collect or harvest any information about other users</li><li>Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li></ul>"
        },
        {
          id: "intellectual-property",
          title: "Intellectual Property Rights",
          content: "<p>The Services and their original content, features, and functionality are owned by MCSK and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p><p>You may not copy, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services, except as follows:</p><ul><li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li><li>You may store files that are automatically cached by your web browser for display enhancement purposes</li><li>You may print or download one copy of a reasonable number of pages of the website for your own personal, non-commercial use and not for further reproduction, publication, or distribution</li></ul><p>If you print, copy, modify, download, or otherwise use or provide any other person with access to any part of the Services in breach of the Terms, your right to use the Services will cease immediately and you must, at our option, return or destroy any copies of the materials you have made.</p>"
        },
        {
          id: "user-content",
          title: "User Content",
          content: "<p>Our Services may allow you to post, submit, publish, display, or transmit content. By providing any content on our Services, you grant us and our affiliates and service providers a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform, and display such content throughout the world in any media.</p><p>You represent and warrant that:</p><ul><li>You own or control all rights in and to the content you provide</li><li>The content is accurate and not misleading</li><li>The content does not violate these Terms or any applicable law or regulation</li><li>The content will not cause injury to any person or entity</li></ul><p>We have the right to remove any content that, in our judgment, violates these Terms or may be offensive, illegal, or violate the rights of any person or entity.</p>"
        },
        {
          id: "third-party-links",
          title: "Third-Party Links and Services",
          content: "<p>Our Services may contain links to third-party websites or services that are not owned or controlled by MCSK. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that MCSK shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.</p><p>We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.</p>"
        },
        {
          id: "termination",
          title: "Termination",
          content: "<p>We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p><p>If you wish to terminate your account, you may simply discontinue using the Services or contact us to request account deletion.</p><p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>"
        },
        {
          id: "disclaimer",
          title: "Disclaimer of Warranties",
          content: "<p>The Services are provided on an 'AS IS' and 'AS AVAILABLE' basis. MCSK and its suppliers and licensors hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose, and non-infringement. Neither MCSK nor its suppliers and licensors makes any warranty that the Services will be error-free or that access thereto will be continuous or uninterrupted.</p><p>You understand that you download from, or otherwise obtain content or services through, the Services at your own discretion and risk.</p>"
        },
        {
          id: "limitation-liability",
          title: "Limitation of Liability",
          content: "<p>In no event will MCSK, or its suppliers or licensors, be liable with respect to any subject matter of these Terms under any contract, negligence, strict liability or other legal or equitable theory for:</p><ul><li>Any special, incidental, or consequential damages</li><li>The cost of procurement of substitute products or services</li><li>For interruption of use or loss or corruption of data</li><li>For any amounts that exceed the fees paid by you to MCSK under these Terms during the twelve (12) month period prior to the cause of action</li></ul><p>MCSK shall have no liability for any failure or delay due to matters beyond their reasonable control.</p>"
        },
        {
          id: "indemnification",
          title: "Indemnification",
          content: "<p>You agree to indemnify and hold harmless MCSK, its contractors, and its licensors, and their respective directors, officers, employees, and agents from and against any and all claims and expenses, including attorneys' fees, arising out of your use of the Services, including but not limited to your violation of these Terms.</p>"
        },
        {
          id: "governing-law",
          title: "Governing Law",
          content: "<p>These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>"
        },
        {
          id: "changes",
          title: "Changes to Terms",
          content: "<p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p><p>By continuing to access or use our Services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Services.</p>"
        },
        {
          id: "contact",
          title: "Contact Us",
          content: "<p>If you have any questions about these Terms, please contact us at:</p><p>Music Copyright Society of Kenya<br>P.O. Box 14806-00800<br>Nairobi, Kenya<br>Email: legal@mcsk.or.ke<br>Phone: +254 20 XXX XXXX</p>"
        }
      ]
    };

    return NextResponse.json({ data: termsData }, { status: 200 });
  } catch (error) {
    console.error('Error in terms API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch terms of service data' },
      { status: 500 }
    );
  }
}
