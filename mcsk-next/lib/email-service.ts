import emailjs from '@emailjs/browser';
import { templates, EmailTemplate } from './email-templates';

// Initialize EmailJS with your user ID
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID!);

export const TEMPLATE_IDS = {
  CONTACT: "contact_form",
  MEMBERSHIP: "membership_form",
  EVENT_REGISTRATION: "event_registration",
  JOB_APPLICATION: "job_application",
  LICENSE_APPLICATION: "license_application",
  ROYALTY_DISTRIBUTION: "royalty_distribution",
  MCSK_WAVE_UPLOAD: "mcsk_wave_upload"
};

interface SendEmailOptions {
  templateId: string;
  templateParams: any;
  to?: string;
  attachments?: File[];
}

export const sendEmail = async ({ templateId, templateParams, to, attachments }: SendEmailOptions) => {
  try {
    // Get the appropriate email template
    let emailTemplate: EmailTemplate;
    switch (templateId) {
      case TEMPLATE_IDS.EVENT_REGISTRATION:
        emailTemplate = templates.eventRegistration(templateParams);
        break;
      case TEMPLATE_IDS.JOB_APPLICATION:
        emailTemplate = templates.jobApplication(templateParams);
        break;
      case TEMPLATE_IDS.MEMBERSHIP:
        emailTemplate = templates.membershipApproval(templateParams);
        break;
      case TEMPLATE_IDS.LICENSE_APPLICATION:
        emailTemplate = templates.licenseApplication(templateParams);
        break;
      case TEMPLATE_IDS.ROYALTY_DISTRIBUTION:
        emailTemplate = templates.royaltyDistribution(templateParams);
        break;
      case TEMPLATE_IDS.MCSK_WAVE_UPLOAD:
        emailTemplate = templates.mcskWaveUpload(templateParams);
        break;
      default:
        throw new Error('Invalid template ID');
    }

    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // EmailJS service ID
      templateId,
      {
        to_email: to || process.env.NEXT_PUBLIC_DEFAULT_EMAIL || "info@mcsk.org",
        subject: emailTemplate.subject,
        message: emailTemplate.body,
        ...templateParams,
        attachments
      }
    );

    // Log email sending for monitoring
    console.log(`Email sent successfully: ${templateId} to ${to}`);

    return { 
      success: true, 
      response,
      messageId: response.status // EmailJS response status as message ID
    };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { 
      success: false, 
      error,
      messageId: null
    };
  }
};

// Helper function to format email parameters
export const formatEmailParams = (type: string, data: any) => {
  switch (type) {
    case 'event':
      return {
        name: data.name,
        eventTitle: data.title,
        eventDate: new Date(data.date).toLocaleDateString(),
        eventTime: new Date(data.date).toLocaleTimeString(),
        eventLocation: data.location
      };
    case 'job':
      return {
        name: data.name,
        position: data.position,
        referenceNumber: `JOB-${Date.now().toString(36).toUpperCase()}`
      };
    case 'membership':
      return {
        name: data.name,
        status: data.status,
        memberId: data.memberId,
        category: data.category
      };
    case 'license':
      return {
        name: data.name,
        status: data.status,
        licenseType: data.type,
        referenceNumber: data.referenceNumber,
        validity: data.validity
      };
    case 'royalty':
      return {
        name: data.name,
        period: data.period,
        amount: data.amount.toLocaleString(),
        paymentMethod: data.paymentMethod
      };
    case 'upload':
      return {
        name: data.name,
        trackTitle: data.title,
        genre: data.genre,
        uploadDate: new Date().toLocaleDateString()
      };
    default:
      return data;
  }
};