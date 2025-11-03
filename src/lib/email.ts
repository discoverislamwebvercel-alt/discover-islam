'use server';

import nodemailer from 'nodemailer';

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'Info@discoverislam.co.uk',
      pass: process.env.EMAIL_PASS || 'uylp qtum ogdu xtpp',
    },
  });
};

// Generic form submission email function
export async function sendFormSubmissionEmail(
  formData: Record<string, unknown>,
  formType: string,
  recipientEmail: string = 'Info@discoverislam.co.uk'
) {
  try {
    const transporter = createTransporter();

    // Format form data for email
    const formatFormData = (data: Record<string, unknown>): string => {
      return Object.entries(data)
        .map(([key, value]) => {
          const formattedKey = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
          return `${formattedKey}: ${value || 'Not provided'}`;
        })
        .join('\n');
    };

    const emailContent = `
New ${formType} Form Submission

Form Details:
${formatFormData(formData)}

---
This email was sent from the Discover Islam website contact form.
    `.trim();

    const mailOptions = {
      from: process.env.EMAIL_USER || 'Info@discoverislam.co.uk',
      to: recipientEmail,
      subject: `New ${formType} Form Submission - Discover Islam`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #408360; border-bottom: 2px solid #408360; padding-bottom: 10px;">
            New ${formType} Form Submission
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Form Details:</h3>
            ${Object.entries(formData)
              .map(([key, value]) => {
                const formattedKey = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase())
                  .trim();
                return `
                  <div style="margin-bottom: 10px;">
                    <strong style="color: #408360;">${formattedKey}:</strong>
                    <span style="margin-left: 10px;">${value || 'Not provided'}</span>
                  </div>
                `;
              })
              .join('')}
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This email was sent from the Discover Islam website contact form.
          </p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Send confirmation email to user
export async function sendUserConfirmationEmail(
  userEmail: string,
  formType: string,
  formData: Record<string, unknown>
) {
  try {
    const transporter = createTransporter();

    // Format form data for user's reference
    const formatFormData = (data: Record<string, unknown>): string => {
      return Object.entries(data)
        .filter(([key]) => key !== 'email') // Don't show email in the data list
        .map(([key, value]) => {
          const formattedKey = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
          return `<p><strong>${formattedKey}:</strong> ${value}</p>`;
        })
        .join('');
    };

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #408360; text-align: center; margin-bottom: 30px;">
          Thank You for Your ${formType} Request
        </h1>

        <p style="font-size: 16px; line-height: 1.6; color: #333;">
          Dear Valued Supporter,
        </p>

        <p style="font-size: 16px; line-height: 1.6; color: #333;">
          Thank you for your interest in Discover Islam! We have successfully received your ${formType.toLowerCase()} request and will review it shortly.
        </p>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #408360; margin-top: 0;">Your Request Details:</h3>
          ${formatFormData(formData)}
        </div>

        <p style="font-size: 16px; line-height: 1.6; color: #333;">
          Our team will contact you within 2-3 business days to discuss your request further. If you have any urgent questions, please don't hesitate to contact us directly.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <p style="font-size: 14px; color: #666;">
            <strong>Contact Information:</strong><br>
            Email: info@discoverislam.org.uk<br>
            Phone: +44 (0) 123 456 7890
          </p>
        </div>

        <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">
          This is an automated confirmation email. Please do not reply to this email.
        </p>

        <div style="text-align: center; margin-top: 20px;">
          <p style="font-size: 12px; color: #999;">
            © ${new Date().getFullYear()} Discover Islam. All rights reserved.
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER || 'Info@discoverislam.co.uk',
      to: userEmail,
      subject: `Confirmation: ${formType} Request Received - Discover Islam`,
      html: emailContent,
      text: `Thank you for your ${formType.toLowerCase()} request. We have received your submission and will contact you within 2-3 business days.`,
    };

    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending user confirmation email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Specific form submission functions
export async function sendMosqueVisitFormEmail(
  formData: Record<string, unknown>
) {
  return sendFormSubmissionEmail(formData, 'Mosque Visit Booking');
}

export async function sendSchoolVisitFormEmail(
  formData: Record<string, unknown>
) {
  return sendFormSubmissionEmail(formData, 'School Visit Booking');
}

export async function sendExhibitionBookingFormEmail(
  formData: Record<string, unknown>
) {
  return sendFormSubmissionEmail(formData, 'Exhibition Booking');
}

export async function sendLiteratureRequestFormEmail(
  formData: Record<string, unknown>
) {
  return sendFormSubmissionEmail(formData, 'Literature Request');
}

export async function sendVolunteerFormEmail(
  formData: Record<string, unknown>
) {
  return sendFormSubmissionEmail(formData, 'Volunteer Application');
}

export async function sendFundraiseFormEmail(
  formData: Record<string, unknown>
) {
  return sendFormSubmissionEmail(formData, 'Fundraising Request');
}

export async function sendPartnershipFormEmail(
  formData: Record<string, unknown>
) {
  return sendFormSubmissionEmail(formData, 'Partnership Request');
}
