
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center justify-center mb-8 animate-fade-in">
      <div className="bg-slate-50 backdrop-blur-lg rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-slate-300/60 transition-all duration-300">
        <div className="text-5xl md:text-6xl font-bold text-slate-800 font-inter tracking-tight">
          Campus<span className="text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text">Pe</span>
        </div>
        <div className="text-slate-600 text-center text-base mt-2 font-medium tracking-wide">
          AI-Powered Education
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-slate-400 to-emerald-500 rounded-full mt-3 opacity-70"></div>
      </div>
    </div>
  );
};

export default Logo;
