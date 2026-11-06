import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';

export default function LandingPage() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('discord_cookie_consent');
    if (!accepted) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleDismissCookie = () => {
    localStorage.setItem('discord_cookie_consent', 'true');
    setShowCookieBanner(false);
  };

  return (
    <div className="min-h-screen bg-[#313338] text-[#F2F3F5] flex flex-col relative">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <CtaBanner />
      </main>
      <Footer />

      {/* Discord Regional Cookie Consent Banner */}
      {showCookieBanner && (
        <aside 
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-[420px] bg-[#1E1F22]/95 backdrop-blur-md border border-[#383A40] text-white p-4 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">🍪</span>
            <div className="flex-1 text-xs text-[#DBDEE1] leading-relaxed">
              We use cookies and similar technologies to improve Discord's services, personalize content, and enhance your user experience.
            </div>
            <button
              type="button"
              onClick={handleDismissCookie}
              className="text-[#949BA4] hover:text-white text-lg leading-none p-1 cursor-pointer"
              aria-label="Dismiss banner"
            >
              &times;
            </button>
          </div>
          <div className="flex items-center justify-end gap-3 mt-3">
            <button
              type="button"
              onClick={handleDismissCookie}
              className="text-xs text-[#949BA4] hover:text-white underline cursor-pointer"
            >
              Preferences
            </button>
            <button
              type="button"
              onClick={handleDismissCookie}
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}

