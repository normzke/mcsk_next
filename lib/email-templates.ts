export interface EmailTemplate {
  subject: string;
  body: string;
}

interface TemplateParams {
  [key: string]: string;
}

export const templates = {
  eventRegistration: (params: TemplateParams): EmailTemplate => ({
    subject: 'Event Registration Confirmation - MCSK',
    body: `
      Dear ${params.name},

      Thank you for registering for ${params.eventTitle}!

      Event Details:
      Date: ${params.eventDate}
      Time: ${params.eventTime}
      Location: ${params.eventLocation}

      Please keep this email for your records. If you need to make any changes to your registration, please contact us at events@mcsk.org.

      Best regards,
      MCSK Events Team
    `
  }),

  jobApplication: (params: TemplateParams): EmailTemplate => ({
    subject: 'Job Application Received - MCSK',
    body: `
      Dear ${params.name},

      Thank you for applying for the position of ${params.position} at MCSK.

      We have received your application and our HR team will review it shortly. If your qualifications match our requirements, we will contact you to schedule an interview.

      Application Details:
      Position: ${params.position}
      Reference Number: ${params.referenceNumber}

      Best regards,
      MCSK HR Team
    `
  }),

  membershipApproval: (params: TemplateParams): EmailTemplate => ({
    subject: 'MCSK Membership Application Update',
    body: `
      Dear ${params.name},

      We are pleased to inform you that your membership application has been ${params.status}.

      Membership Details:
      Member ID: ${params.memberId}
      Category: ${params.category}

      ${params.status === 'approved' 
        ? 'You can now access your member portal using your registered email address.' 
        : 'Our team will contact you with further information about your application.'}

      Best regards,
      MCSK Membership Team
    `
  }),

  licenseApplication: (params: TemplateParams): EmailTemplate => ({
    subject: 'MCSK License Application Update',
    body: `
      Dear ${params.name},

      Your license application for ${params.licenseType} has been ${params.status}.

      License Details:
      Reference Number: ${params.referenceNumber}
      Type: ${params.licenseType}
      Validity: ${params.validity}

      ${params.status === 'approved'
        ? 'Your license certificate is attached to this email. Please display it at your premises.'
        : 'Our licensing team will contact you with further information about your application.'}

      Best regards,
      MCSK Licensing Team
    `
  }),

  royaltyDistribution: (params: TemplateParams): EmailTemplate => ({
    subject: 'MCSK Royalty Distribution Notice',
    body: `
      Dear ${params.name},

      We are pleased to inform you about your recent royalty distribution.

      Distribution Details:
      Period: ${params.period}
      Amount: KES ${params.amount}
      Payment Method: ${params.paymentMethod}

      You can view the detailed breakdown in your member portal.

      Best regards,
      MCSK Royalties Team
    `
  }),

  mcskWaveUpload: (params: TemplateParams): EmailTemplate => ({
    subject: 'Music Upload Confirmation - MCSK Wave',
    body: `
      Dear ${params.name},

      Your music has been successfully uploaded to MCSK Wave.

      Track Details:
      Title: ${params.trackTitle}
      Genre: ${params.genre}
      Upload Date: ${params.uploadDate}

      Your music will be reviewed by our team and made available on the platform within 24-48 hours.

      Best regards,
      MCSK Wave Team
    `
  })
} 