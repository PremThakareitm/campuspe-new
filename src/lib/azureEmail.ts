// Azure Communication Services Email Functions
// src/lib/azureEmail.ts

interface EmailData {
  to: string;
  subject: string;
  htmlContent: string;
  plainTextContent: string;
}

// Send email using Azure Communication Services
export const sendAzureEmail = async (emailData: EmailData) => {
  const fromEmail = import.meta.env.VITE_AZURE_FROM_EMAIL || 'DoNotReply@campuspe.com';
  
  // Use the Azure Static Web Apps API endpoint
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: emailData.to,
      subject: emailData.subject,
      htmlContent: emailData.htmlContent,
      plainTextContent: emailData.plainTextContent
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Email API error: ${errorData.error || 'Unknown error'}`);
  }

  return await response.json();
};

// Template for user confirmation email
export const createUserConfirmationEmail = (email: string) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Welcome to CampusPE Waitlist</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .button { display: inline-block; background: linear-gradient(135deg, #2563eb, #059669); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">CampusPE</div>
                <h1>Welcome to the Waitlist! 🎉</h1>
            </div>
            <div class="content">
                <h2>Thank you for joining us!</h2>
                <p>Hi there!</p>
                <p>We're excited to have you on board for CampusPE - the future of college discovery and campus placements!</p>
                
                <h3>What's next?</h3>
                <ul>
                    <li>✨ You'll be among the first to know when we launch</li>
                    <li>🚀 Get early access to our AI-powered platform</li>
                    <li>📧 Receive exclusive updates about new features</li>
                    <li>🎯 Priority access to beta testing opportunities</li>
                </ul>
                
                <p>We're working hard to revolutionize how students discover colleges and secure placements. Stay tuned!</p>
                
                <a href="https://campuspe.com" class="button">Visit Our Website</a>
                
                <p>Questions? Reply to this email or contact us at <a href="mailto:contactus@campuspe.com">contactus@campuspe.com</a></p>
                
                <p>Best regards,<br>The CampusPE Team</p>
            </div>
            <div class="footer">
                <p>CampusPE - AI Powered Campus Assistant<br>
                Website: <a href="https://campuspe.com">campuspe.com</a></p>
                <p><small>You received this email because you signed up for the CampusPE waitlist.</small></p>
            </div>
        </div>
    </body>
    </html>
  `;

  const plainTextContent = `
    Welcome to CampusPE Waitlist!
    
    Thank you for joining us!
    
    We're excited to have you on board for CampusPE - the future of college discovery and campus placements!
    
    What's next?
    - You'll be among the first to know when we launch
    - Get early access to our AI-powered platform  
    - Receive exclusive updates about new features
    - Priority access to beta testing opportunities
    
    We're working hard to revolutionize how students discover colleges and secure placements. Stay tuned!
    
    Questions? Contact us at contactus@campuspe.com
    
    Best regards,
    The CampusPE Team
    
    Website: https://campuspe.com
  `;

  return {
    to: email,
    subject: 'Welcome to CampusPE Waitlist! 🎉',
    htmlContent,
    plainTextContent
  };
};

// Template for admin notification email
export const createAdminNotificationEmail = (userEmail: string) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Waitlist Signup</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .alert { background: #059669; color: white; padding: 20px; border-radius: 6px; text-align: center; }
            .details { background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0; }
            .highlight { background: #fef3c7; padding: 2px 6px; border-radius: 4px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="alert">
                <h1>🎉 New Waitlist Signup!</h1>
            </div>
            <div class="details">
                <h2>Signup Details:</h2>
                <p><strong>Email:</strong> <span class="highlight">${userEmail}</span></p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Source:</strong> CampusPE Website</p>
                <p><strong>Status:</strong> Confirmation email sent to user</p>
            </div>
            <p><strong>Action Required:</strong> User has been added to the waitlist and sent a confirmation email.</p>
            <p>Please update your waitlist tracking records.</p>
        </div>
    </body>
    </html>
  `;

  const plainTextContent = `
    New CampusPE Waitlist Signup!
    
    Signup Details:
    Email: ${userEmail}
    Date: ${new Date().toLocaleString()}
    Source: CampusPE Website
    Status: Confirmation email sent to user
    
    Action Required: User has been added to the waitlist and sent a confirmation email.
    Please update your waitlist tracking records.
  `;

  return {
    to: 'contactus@campuspe.com',
    subject: '🎉 New Waitlist Signup - CampusPE',
    htmlContent,
    plainTextContent
  };
};
