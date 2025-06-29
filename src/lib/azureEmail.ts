// Azure Communication Services Email Functions
// src/lib/azureEmail.ts

interface EmailData {
  to: string;
  subject: string;
  htmlContent: string;
  plainTextContent: string;
}

// Send email using Azure Communication Services with FormSubmit fallback
export const sendAzureEmail = async (emailData: EmailData) => {
  const fromEmail = import.meta.env.VITE_AZURE_FROM_EMAIL || 'DoNotReply@campuspe.com';
  
  try {
    // Try Azure Communication Services first
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

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Azure API error: ${response.status}`);
    }
  } catch (error) {
    // Fallback to FormSubmit
    return await sendFormSubmitEmail(emailData);
  }
};

// FormSubmit fallback function
const sendFormSubmitEmail = async (emailData: EmailData) => {
  const formData = new FormData();
  formData.append('email', emailData.to);
  formData.append('_subject', emailData.subject);
  formData.append('_template', 'box');
  formData.append('_captcha', 'false');
  formData.append('_next', window.location.href);
  
  // Convert HTML to plain text for FormSubmit
  const plainText = emailData.plainTextContent || emailData.htmlContent.replace(/<[^>]*>/g, '');
  formData.append('message', plainText);
  formData.append('_replyto', 'contactus@campuspe.com');

  const response = await fetch('https://formsubmit.co/' + emailData.to, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('FormSubmit fallback also failed');
  }

  return { success: true, method: 'formsubmit' };
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
            body { 
                font-family: 'Inter', Arial, sans-serif; 
                line-height: 1.6; 
                color: #334155; 
                margin: 0; 
                padding: 0; 
                background-color: #f8fafc;
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                padding: 20px; 
                background-color: #ffffff;
                border-radius: 16px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            .header { 
                background: linear-gradient(135deg, #0270DF 0%, #00AB9D 50%, #0D4091 100%); 
                color: white; 
                padding: 40px 30px; 
                text-align: center; 
                border-radius: 16px 16px 0 0; 
                margin: -20px -20px 0 -20px;
            }
            .content { 
                background: #ffffff; 
                padding: 40px 30px; 
                border-radius: 0 0 16px 16px; 
            }
            .logo { 
                font-size: 28px; 
                font-weight: 800; 
                margin-bottom: 12px; 
                letter-spacing: -0.5px;
            }
            .header h1 {
                font-size: 32px;
                font-weight: 700;
                margin: 0;
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .button { 
                display: inline-block !important; 
                background: linear-gradient(135deg, #064BB3 0%, #0270DF 50%, #00AB9D 100%) !important; 
                color: #ffffff !important; 
                padding: 16px 32px !important; 
                text-decoration: none !important; 
                border-radius: 12px !important; 
                margin: 24px 0 !important; 
                font-weight: 600 !important;
                font-size: 16px !important;
                text-align: center !important;
                border: none !important;
                box-shadow: 0 4px 12px rgba(6, 75, 179, 0.3) !important;
                transition: all 0.2s ease !important;
            }
            .button:hover {
                box-shadow: 0 6px 16px rgba(6, 75, 179, 0.4) !important;
                transform: translateY(-1px) !important;
            }
            .content h2 {
                color: #064BB3;
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 20px;
            }
            .content h3 {
                color: #0270DF;
                font-size: 20px;
                font-weight: 600;
                margin: 24px 0 16px 0;
            }
            .content ul {
                padding-left: 0;
                list-style: none;
            }
            .content li {
                padding: 8px 0;
                padding-left: 24px;
                position: relative;
            }
            .content li:before {
                content: '✨';
                position: absolute;
                left: 0;
                top: 8px;
            }
            .footer { 
                text-align: center; 
                margin-top: 40px; 
                color: #64748b; 
                font-size: 14px; 
                border-top: 1px solid #e2e8f0;
                padding-top: 24px;
            }
            .footer a {
                color: #0270DF;
                text-decoration: none;
            }
            .footer a:hover {
                text-decoration: underline;
            }
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
                <p>We're excited to have you on board for <strong>CampusPE</strong> - the future of college discovery and campus placements!</p>
                
                <h3>What's next?</h3>
                <ul>
                    <li>You'll be among the first to know when we launch</li>
                    <li>Get early access to our AI-powered platform</li>
                    <li>Receive exclusive updates about new features</li>
                    <li>Priority access to beta testing opportunities</li>
                </ul>
                
                <p>We're working hard to revolutionize how students discover colleges and secure placements. Stay tuned!</p>
                
                <div style="text-align: center; margin: 32px 0;">
                    <a href="https://campuspe.com" class="button" style="display: inline-block !important; background: linear-gradient(135deg, #064BB3 0%, #0270DF 50%, #00AB9D 100%) !important; color: #ffffff !important; padding: 16px 32px !important; text-decoration: none !important; border-radius: 12px !important; font-weight: 600 !important; font-size: 16px !important;">Visit Our Website</a>
                </div>
                
                <p>Questions? Reply to this email or contact us at <a href="mailto:contactus@campuspe.com" style="color: #0270DF;">contactus@campuspe.com</a></p>
                
                <p><strong>Best regards,</strong><br>The CampusPE Team</p>
            </div>
            <div class="footer">
                <p><strong>CampusPE</strong> - AI Powered Campus Assistant<br>
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
