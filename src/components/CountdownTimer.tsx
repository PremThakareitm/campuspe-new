
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const targetDate = new Date('2025-07-10T00:00:00');
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        return {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center group">
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-7 border border-slate-300 shadow-lg shadow-slate-200/50 min-w-[80px] sm:min-w-[90px] md:min-w-[110px] group-hover:scale-105 transition-all duration-500 hover:border-blue-400 hover:shadow-blue-200/30">
        <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-br from-slate-700 to-slate-800 bg-clip-text font-mono transition-all duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <div className="text-slate-600 text-xs sm:text-sm md:text-base font-semibold mt-3 capitalize tracking-wide">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-center items-center">
      <TimeUnit value={timeLeft.days} label="days" />
      <TimeUnit value={timeLeft.hours} label="hours" />
      <TimeUnit value={timeLeft.minutes} label="minutes" />
      <TimeUnit value={timeLeft.seconds} label="seconds" />
    </div>
  );
};

export default CountdownTimer;
