import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { sendAzureEmail, createUserConfirmationEmail, createAdminNotificationEmail } from '@/lib/azureEmail';

// Send WhatsApp notification using WhatsApp Business Cloud API
const sendWhatsAppNotification = async (email: string) => {
  const accessToken = import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID;
  
  // Skip if not configured
  if (!accessToken || !phoneNumberId) {
    console.log('WhatsApp notification skipped - not configured');
    return;
  }
  
  const recipientNumber = '916362606464'; // Your number with country code (91 for India)
  const webhookUrl = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`;
  
  const messageData = {
    messaging_product: 'whatsapp',
    to: recipientNumber,
    type: 'text',
    text: {
      body: `🎉 *New CampusPE Waitlist Signup*\n\n📧 Email: ${email}\n📅 Date: ${new Date().toLocaleString()}\n🌐 Source: campuspe.com\n\nUser has been sent confirmation email.`
    }
  };
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(messageData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`WhatsApp API error: ${JSON.stringify(errorData)}`);
    }
    
    console.log('WhatsApp notification sent successfully');
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    // Don't fail the submission if WhatsApp fails
  }
};

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      // Store submission in localStorage as a backup
      console.log(`Waitlist submission for: ${email}`);
      const submissions = JSON.parse(localStorage.getItem('waitlistSubmissions') || '[]');
      submissions.push({
        email: email,
        timestamp: new Date().toString()
      });
      localStorage.setItem('waitlistSubmissions', JSON.stringify(submissions));
      
      // Execute all three notifications simultaneously
      const userEmailData = createUserConfirmationEmail(email);
      const adminEmailData = createAdminNotificationEmail(email);
      
      await Promise.all([
        sendAzureEmail(userEmailData),
        sendAzureEmail(adminEmailData),
        sendWhatsAppNotification(email)
      ]);

      // Show success toast
      toast({
        title: "You're on the waitlist! 🎉",
        description: "We've sent a confirmation email to your inbox. You'll be notified when CampusPE launches.",
      });
      
      setEmail('');
    } catch (error) {
      console.error('Error submitting email:', error);
      
      // Store failed submission for retry
      try {
        const failedSubmissions = JSON.parse(localStorage.getItem('failedWaitlistSubmissions') || '[]');
        failedSubmissions.push({ email, timestamp: new Date().toString() });
        localStorage.setItem('failedWaitlistSubmissions', JSON.stringify(failedSubmissions));
      } catch (e) {
        console.error('Error storing failed submission:', e);
      }
      
      toast({
        title: "Something went wrong",
        description: "We couldn't add you to the waitlist. Please try again or email us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-slate-50 backdrop-blur-lg border-slate-300 text-slate-800 placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-200 rounded-xl px-5 py-4 text-base shadow-lg shadow-slate-200/30 hover:bg-slate-100/80 transition-all duration-300 h-14"
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-300/30 hover:shadow-blue-400/40 whitespace-nowrap border-0 disabled:opacity-70 h-14"
        >
          {isSubmitting ? 'Joining...' : 'Join Waitlist'}
        </Button>
      </form>
      <p className="text-slate-600 text-sm text-center mt-4 font-medium">
        Join <span className="text-emerald-600 font-semibold">thousands</span> of students waiting for the future of education.
      </p>
      <p className="text-slate-500 text-xs text-center mt-2">
        Having trouble? Email us directly at{' '}
        <a 
          href={`mailto:contactus@campuspe.com?subject=CampusPe%20Waitlist%20Signup&body=Please%20add%20me%20to%20the%20waitlist.%20My%20email%20is:%20`}
          className="text-emerald-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          contactus@campuspe.com
        </a>
      </p>
    </div>
  );
};

export default WaitlistForm;
