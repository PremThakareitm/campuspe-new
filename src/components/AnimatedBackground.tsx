
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Clean white background */}
      <div className="absolute inset-0 bg-white"></div>
      
      {/* Subtle light gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100/50"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/20 to-emerald-50/30"></div>
      
      {/* Very subtle floating elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-emerald-100/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-slate-100/25 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 left-1/6 w-80 h-80 bg-blue-50/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      
      {/* Subtle accent dots */}
      <div className="absolute top-1/6 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-sparkle opacity-40"></div>
      <div className="absolute top-2/3 left-1/6 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-sparkle opacity-40" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/3 right-1/6 w-2 h-2 bg-slate-400 rounded-full animate-sparkle opacity-40" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-1/4 left-2/3 w-2.5 h-2.5 bg-blue-500 rounded-full animate-sparkle opacity-40" style={{ animationDelay: '2.5s' }}></div>
      
      {/* Very subtle grid pattern */}
      <div className="absolute inset-0 opacity-2" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>
    </div>
  );
};

export default AnimatedBackground;
