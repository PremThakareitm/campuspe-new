import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Simple form submission function 
const sendEmail = async (email: string) => {
  // Get email recipient from environment variable
  const recipient = import.meta.env.VITE_WAITLIST_RECIPIENT_EMAIL || 'premthakare96680@gmail.com';
  
  // Create a FormData object for our request
  const data = new URLSearchParams();
  data.append('email', email);
  data.append('message', `New waitlist signup for CampusPe: ${email}`);
  data.append('subject', 'New CampusPe Waitlist Signup');
  data.append('recipient', recipient);
  
  // Submit to a reliable form handling service
  const response = await fetch('https://formsubmit.co/ajax/' + recipient, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: data
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit form');
  }
  
  return await response.json();
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
      
      // Send the email using our reliable form submission service
      const result = await sendEmail(email);
      console.log('Form submission result:', result);
      
      if (!result.success) {
        throw new Error('Form submission failed');
      }

      // Show success toast
      toast({
        title: "You're on the waitlist! 🎉",
        description: "We'll notify you as soon as CampusPe launches.",
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
        description: "We couldn't add you to the waitlist. Please try again.",
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
          href={`mailto:premthakare96680@gmail.com?subject=CampusPe%20Waitlist%20Signup&body=Please%20add%20me%20to%20the%20waitlist.%20My%20email%20is:%20`}
          className="text-emerald-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          premthakare96680@gmail.com
        </a>
      </p>
    </div>
  );
};

export default WaitlistForm;
