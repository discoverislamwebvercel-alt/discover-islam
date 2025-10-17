# Email Setup Guide

This guide explains how to set up email functionality for the Discover Islam website forms.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Email Configuration
ADMIN_EMAIL=faizanmehmood3165@gmail.com

# Email Service Configuration (using Nodemailer with Gmail)
EMAIL_USER=faizanmehmood3165@gmail.com
EMAIL_PASS=your_app_password_here

# SMTP Configuration (alternative to Gmail service)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

## Gmail Setup

To use Gmail for sending emails, you need to:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in the `EMAIL_PASS` environment variable

## Forms with Email Functionality

The following forms now send emails to `faizanmehmood3165@gmail.com`:

1. **Mosque Visit Form** - School visit booking requests
2. **School Visit Form** - In-school presentation requests
3. **Exhibition Booking Form** - Islamic exhibition booking requests
4. **Literature Request Form** - Free literature requests
5. **Volunteer Form** - Volunteer applications
6. **Fundraise Form** - Fundraising requests
7. **Partnership Form** - Partnership requests

## Email Content

Each form submission sends:

- **Subject**: "New [Form Type] Form Submission - Discover Islam"
- **Content**: Formatted form data with field labels and values
- **Recipient**: faizanmehmood3165@gmail.com
- **Format**: Both plain text and HTML versions

## Testing

To test the email functionality:

1. Set up the environment variables
2. Start the development server: `npm run dev`
3. Fill out any form on the website
4. Submit the form
5. You'll see a loading toast, then either:
   - **Success toast** (green) with confirmation message
   - **Error toast** (red) if something went wrong
6. Check the specified email address for the form submission

## Toast Notifications

The app now uses modern toast notifications instead of browser alerts:

- **Loading Toast**: Shows while the form is being submitted
- **Success Toast**: Green toast with success message and checkmark icon
- **Error Toast**: Red toast with error message and X icon
- **Auto-dismiss**: Toasts automatically disappear after 4-5 seconds
- **Positioned**: Top-right corner of the screen
- **Styled**: Matches the Discover Islam brand colors

## Troubleshooting

- **Authentication Error**: Make sure you're using an App Password, not your regular Gmail password
- **Connection Error**: Check your internet connection and Gmail settings
- **Form Not Sending**: Check the browser console for error messages
- **Email Not Received**: Check spam folder and verify the email address is correct

## Security Notes

- Never commit the `.env.local` file to version control
- Use App Passwords instead of regular passwords
- Consider using a dedicated email service for production
