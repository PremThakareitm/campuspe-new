
import React from 'react';
import { Linkedin, Instagram, Twitter } from 'lucide-react';

const SocialFooter = () => {
  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/campupe-official/', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-emerald-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-slate-700' },
  ];

  return (
    <footer className="w-full p-6 md:p-8">
      <div className="flex flex-col items-center gap-5">
        <div className="flex gap-8">
          {socialLinks.map(({ icon: Icon, href, label, color }) => (
            <a
              key={label}
              href={href}
              className={`text-slate-500 ${color} transition-all duration-300 hover:scale-125 hover:drop-shadow-lg p-2 rounded-full hover:bg-slate-100/80`}
              aria-label={label}
            >
              <Icon size={26} />
            </a>
          ))}
        </div>
        <p className="text-slate-600 text-sm font-medium tracking-wide text-center">
          Made with <span className="text-red-500 animate-pulse">❤️</span> by the <span className="text-blue-600 font-semibold">CampusPe Team</span>
        </p>
      </div>
    </footer>
  );
};

export default SocialFooter;
