
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Logo from '@/components/Logo';
import WaitlistForm from '@/components/WaitlistForm';
import SocialFooter from '@/components/SocialFooter';

const Index = () => {
  return (
    <div className="min-h-screen relative font-inter overflow-hidden bg-white">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-16">
          <div className="text-center max-w-5xl mx-auto w-full">
            <div className="mb-8">
              <Logo />
            </div>
            
            <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-800 mb-6 leading-tight tracking-tight">
                CampusPe is <br />
                <span className="bg-gradient-to-r from-blue-600 via-slate-700 to-emerald-600 bg-clip-text text-transparent">
                  Launching Soon
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-700 font-semibold mb-4 leading-relaxed max-w-4xl mx-auto">
                The future of college discovery and campus placements.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Powered by <span className="text-emerald-600 font-semibold">AI</span> to connect students, colleges, and companies smarter than ever.
              </p>
            </div>


            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <WaitlistForm />
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <SocialFooter />
        </div>
      </div>
    </div>
  );
};

export default Index;
