import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CtaBanner() {
  const [osName, setOsName] = useState('Windows');

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) setOsName('Mac');
    else if (userAgent.includes('linux')) setOsName('Linux');
  }, []);

  return (
    <section className="relative py-24 px-6 bg-[linear-gradient(135deg,#404eed_0%,#5865F2_60%,#7289DA_100%)] text-white text-center overflow-hidden" id="download">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Floating Sparkles & Star Art */}
      <div className="absolute left-1/4 top-10 pointer-events-none text-white/30 text-3xl animate-float-slow">
        ✨
      </div>
      <div className="absolute right-1/4 bottom-12 pointer-events-none text-white/30 text-2xl animate-float-reverse">
        ⭐
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto flex flex-col items-center">
        {/* Floating Stars SVG */}
        <div className="mb-4 flex items-center gap-2 text-white/80">
          <svg className="w-8 h-8 fill-current animate-pulse" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.2-6.3-4.6-6.3 4.6 2.3-7.2-6-4.6h7.6z"/>
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest text-white/90">Your place to belong</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight">
          Ready to start your journey?
        </h2>
        <p className="text-base sm:text-lg text-[#F2F3F5] opacity-95 max-w-[600px] mb-10 leading-relaxed">
          Hang out with your friends, play games together, and build a community that lasts. Download Discord for your device or join via browser.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5 w-full">
          <Link
            to="/download"
            className="flex items-center gap-2.5 bg-white text-[#23272A] hover:text-[#5865F2] hover:-translate-y-0.5 px-8 py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
            </svg>
            <span>Download for {osName}</span>
          </Link>

          <Link
            to="/login"
            className="bg-[#1E1F22] hover:bg-[#111214] text-white hover:-translate-y-0.5 px-8 py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Open Discord in your browser
          </Link>
        </div>
      </div>
    </section>
  );
}

