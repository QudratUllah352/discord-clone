import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  {
    label: 'Download',
    path: '/download',
  },
  {
    label: 'Nitro',
    path: '/nitro',
  },
  {
    label: 'Discover',
    path: '/discover',
    subLinks: [
      { label: 'Gaming Communities', path: '/discover', desc: 'Lobbies, clans & tournaments', icon: '🎮' },
      { label: 'Music & Producers', path: '/discover', desc: 'Lo-Fi, beats & community radio', icon: '🎧' },
      { label: 'Tech & Science', path: '/discover', desc: 'Coding, dev help & study halls', icon: '💻' },
      { label: 'Student Hubs', path: '/discover', desc: 'Connect with verified classmates', icon: '🎓' },
    ]
  },
  {
    label: 'Quests',
    path: '/quests',
    subLinks: [
      { label: 'Active Quests', path: '/quests', desc: 'Play games & earn loot', icon: '🎯' },
      { label: 'How It Works', path: '/quests', desc: 'Streaming & claiming rewards', icon: '📖' },
    ]
  },
  {
    label: 'Safety',
    path: '/safety',
    subLinks: [
      { label: 'Safety Center', path: '/safety', desc: 'Policies & security controls', icon: '🛡️' },
      { label: 'Community Guidelines', path: '/safety', desc: 'Rules for safe spaces', icon: '📜' },
      { label: 'Family Center', path: '/safety', desc: 'Parental controls & alerts', icon: '👨‍👩‍👧' },
      { label: 'Transparency', path: '/safety', desc: 'Enforcement & privacy audits', icon: '📊' },
    ]
  },
  {
    label: 'Support',
    path: '/support',
    subLinks: [
      { label: 'Help Center', path: '/support', desc: 'FAQs, guides & troubleshooters', icon: '❓' },
      { label: 'Billing & Nitro', path: '/support', desc: 'Manage payment & invoices', icon: '💳' },
      { label: 'Submit a Request', path: '/support', desc: 'Contact support agents', icon: '✉️' },
    ]
  },
  {
    label: 'Blog',
    path: '/blog',
    subLinks: [
      { label: 'All Articles', path: '/blog', desc: 'Latest news & announcements', icon: '📰' },
      { label: 'Product News', path: '/blog', desc: 'New feature drops & updates', icon: '✨' },
      { label: 'Engineering', path: '/blog', desc: 'Architecture & scaling insights', icon: '⚡' },
    ]
  },
  {
    label: 'Careers',
    path: '/careers',
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const toggleMobileAccordion = (label) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <header className={`fixed top-0 left-0 w-full h-[80px] z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-[#23272A]/90 backdrop-blur-md shadow-md border-b border-white/5'
        : isHome
          ? 'bg-transparent'
          : 'bg-[linear-gradient(135deg,#5865F2_0%,#7289DA_50%,#EB459E_100%)] shadow-md border-b border-white/10'
    }`}>
      <div className="max-w-[1260px] h-full mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Real Discord Clyde Logo & Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 text-white font-black text-[22px] tracking-tight group shrink-0" aria-label="Discord Homepage">
          <svg className="w-[36px] h-[27px] fill-current transition-transform duration-150 group-hover:scale-105" viewBox="0 0 127.14 96.36">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
          </svg>
          <span className="font-extrabold tracking-tight">Discord</span>
        </Link>

        {/* Real Discord Center Navigation Bar Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            const hasSubLinks = item.subLinks && item.subLinks.length > 0;

            return (
              <div
                key={item.label}
                className="relative group py-7"
              >
                {/* Main Nav Link */}
                <Link
                  to={item.path}
                  className={`flex items-center gap-1.5 text-[16px] font-semibold tracking-normal transition-all duration-150 ${
                    isActive
                      ? 'text-[#FFFFFF] underline underline-offset-[8px] decoration-2'
                      : 'text-[#FFFFFF] hover:underline hover:underline-offset-[8px] decoration-2 hover:opacity-95'
                  }`}
                >
                  <span>{item.label}</span>
                  {hasSubLinks && (
                    <svg
                      className="w-3.5 h-3.5 fill-current opacity-70 transition-transform duration-200 group-hover:rotate-180"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  )}
                </Link>

                {/* Real Discord Sublinks Dropdown Mega-Panel */}
                {hasSubLinks && (
                  <div className="absolute top-[68px] left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
                    <div className="w-[280px] bg-[#2B2D31] border border-[#383A40] rounded-2xl p-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-100">
                      <div className="flex flex-col gap-1">
                        {item.subLinks.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            className="group/item flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#35373C] transition-all text-left"
                          >
                            {/* Icon Box */}
                            <div className="w-8 h-8 rounded-lg bg-[#1E1F22] border border-white/5 flex items-center justify-center text-sm shrink-0 group-hover/item:bg-[#5865F2] group-hover/item:text-white transition-all">
                              {sub.icon}
                            </div>

                            {/* Label & Description */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-[13px] font-bold text-white group-hover/item:text-[#5865F2] transition-colors truncate">
                                  {sub.label}
                                </span>
                                <span className="text-xs text-[#5865F2] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all">
                                  →
                                </span>
                              </div>
                              <p className="text-[11px] text-[#949BA4] leading-snug mt-0.5">
                                {sub.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Real Discord Login Button (White Pill with Dark Text) */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/login"
            className="bg-white text-[#23272A] hover:text-[#5865F2] hover:shadow-lg text-[14px] font-semibold px-4 py-2 rounded-full transition-all duration-150 hover:-translate-y-0.5 shadow-sm"
          >
            Login
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex flex-col gap-1.5 p-2 text-white cursor-pointer"
            aria-label="Toggle navigation"
          >
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Real Discord Mobile Drawer Menu */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="w-[85%] max-w-[340px] h-full bg-[#2B2D31] text-[#F2F3F5] p-6 flex flex-col shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#3F4147]">
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <svg className="w-7 h-5 fill-current" viewBox="0 0 127.14 96.36">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
                </svg>
                <span>Discord</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-2xl text-[#949BA4] hover:text-white"
                aria-label="Close menu"
              >
                &times;
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-1 mt-6">
              {navLinks.map((item) => {
                const hasSub = item.subLinks && item.subLinks.length > 0;
                const isExpanded = mobileExpanded[item.label];

                return (
                  <div key={item.label} className="border-b border-[#3F4147]/50 pb-1">
                    <div className="flex items-center justify-between py-2">
                      <Link
                        to={item.path}
                        onClick={() => setDrawerOpen(false)}
                        className="text-[16px] font-semibold text-white hover:text-[#5865F2] transition-colors"
                      >
                        {item.label}
                      </Link>
                      {hasSub && (
                        <button
                          onClick={() => toggleMobileAccordion(item.label)}
                          className="p-1.5 text-xs text-[#949BA4] hover:text-white"
                          aria-label="Toggle sub-menu"
                        >
                          <svg
                            className={`w-3.5 h-3.5 fill-current transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            viewBox="0 0 24 24"
                          >
                            <path d="M7 10l5 5 5-5z" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Mobile Sub-links Accordion */}
                    {hasSub && isExpanded && (
                      <div className="pl-3 py-1 flex flex-col gap-1 border-l-2 border-[#5865F2] ml-1 mb-2">
                        {item.subLinks.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            onClick={() => setDrawerOpen(false)}
                            className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#35373C] transition-colors"
                          >
                            <span className="text-base">{sub.icon}</span>
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-white">{sub.label}</span>
                              <span className="text-[10px] text-[#949BA4]">{sub.desc}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile Drawer Bottom CTA */}
            <div className="mt-auto pt-6 border-t border-[#3F4147]">
              <Link
                to="/login"
                onClick={() => setDrawerOpen(false)}
                className="w-full block text-center bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 rounded-full font-semibold text-[15px] transition-colors"
              >
                Open Discord
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
