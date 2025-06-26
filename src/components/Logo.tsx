
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center justify-center mb-8 animate-fade-in">
      <div className="bg-white backdrop-blur-lg rounded-lg p-6">
        <div className="text-center">
          <div className="flex justify-center">
            <img 
              src="/logo.svg" 
              alt="CampusPe Logo" 
              className="h-10 md:h-12 w-auto mb-2"
            />
          </div>
          <p className="text-gray-600 text-sm md:text-base mt-3 font-medium">
            Connecting Students, Institutions & Companies
          </p>
          <div className="w-full h-1 bg-gradient-to-r from-[#0066cc] to-[#23aaa2] rounded-full mt-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
