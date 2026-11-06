import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const languages = [
  'English, US',
  'Español',
  'Français',
  'Deutsch',
  'Italiano',
  'Português do Brasil',
  '日本語',
  '한국어'
];

export default function Footer() {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English, US');

  return (
    <footer className="bg-[#23272A] text-[#F2F3F5] pt-20 pb-12 px-6 relative z-10" id="footer">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)] gap-10 pb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-1">
            <h3 className="text-3xl font-black text-[#5865F2] uppercase leading-[1.05]">
              GROUP CHAT<br />THAT'S ALL<br />FUN &amp; GAMES
            </h3>

            {/* Language Selector Dropdown */}
            <div className="relative w-fit">
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 text-sm text-white border border-white/20 rounded-md px-3 py-2 cursor-pointer hover:border-white/50 transition-colors"
                aria-label="Select language"
              >
                <span>🌐</span>
                <span>{selectedLang}</span>
                <span className={`text-xs transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>

              {langOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-[#2B2D31] border border-[#383A40] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="text-[10px] uppercase font-bold text-[#949BA4] px-3 py-1">Select Language</div>
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                        selectedLang === lang
                          ? 'bg-[#5865F2] text-white font-semibold'
                          : 'text-[#DBDEE1] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span>{lang}</span>
                      {selectedLang === lang && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 text-white/80">
              <a href="https://twitter.com/discord" target="_blank" rel="noreferrer" className="hover:text-white hover:-translate-y-0.5 transition-all" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com/discord" target="_blank" rel="noreferrer" className="hover:text-white hover:-translate-y-0.5 transition-all" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://facebook.com/discord" target="_blank" rel="noreferrer" className="hover:text-white hover:-translate-y-0.5 transition-all" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://youtube.com/discord" target="_blank" rel="noreferrer" className="hover:text-white hover:-translate-y-0.5 transition-all" aria-label="YouTube">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <h4 className="text-sm font-semibold text-[#5865F2] mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm text-[#F2F3F5]">
              <li><Link to="/download" className="hover:underline">Download</Link></li>
              <li><Link to="/nitro" className="hover:underline">Nitro</Link></li>
              <li><Link to="/discover" className="hover:underline">Discover Communities</Link></li>
              <li><Link to="/quests" className="hover:underline">Quests &amp; Gaming</Link></li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-sm font-semibold text-[#5865F2] mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-[#F2F3F5]">
              <li><Link to="/careers" className="hover:underline">Jobs &amp; Careers</Link></li>
              <li><Link to="/blog" className="hover:underline">The Discord Blog</Link></li>
              <li><a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:underline">Official Newsroom</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-sm font-semibold text-[#5865F2] mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm text-[#F2F3F5]">
              <li><Link to="/support" className="hover:underline">Support &amp; Help</Link></li>
              <li><Link to="/safety" className="hover:underline">Safety Center</Link></li>
              <li><Link to="/download" className="hover:underline">Mobile &amp; PC Clients</Link></li>
            </ul>
          </div>

          {/* Column 4: Policies */}
          <div>
            <h4 className="text-sm font-semibold text-[#5865F2] mb-4">Policies</h4>
            <ul className="space-y-2.5 text-sm text-[#F2F3F5]">
              <li><Link to="/safety" className="hover:underline">Community Guidelines</Link></li>
              <li><Link to="/safety" className="hover:underline">Terms &amp; Privacy</Link></li>
              <li><button type="button" onClick={() => alert('Cookie preferences are saved.')} className="hover:underline text-left">Cookie Settings</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-6 fill-white" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
            </svg>
            <span className="font-extrabold text-white text-lg">Discord</span>
            <span className="text-xs text-[#949BA4] ml-3">&copy; 2026 Discord Inc. All rights reserved.</span>
          </div>

          <Link
            to="/login"
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-semibold px-5 py-2 rounded-full transition-all"
          >
            Open Discord
          </Link>
        </div>
      </div>
    </footer>
  );
}

