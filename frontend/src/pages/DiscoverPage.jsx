import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sampleCommunities = [
  { name: 'Genshin Impact Official', members: '1,200,000 Members', icon: '⚔️', desc: 'The official Discord for Genshin Impact travelers worldwide.' },
  { name: 'Minecraft Community Hub', members: '850,000 Members', icon: '⛏️', desc: 'Share builds, redstone contraptions, and find multiplayer servers.' },
  { name: 'Lo-Fi Chill & Study', members: '620,000 Members', icon: '🎧', desc: 'Chill beats to relax/study to. 24/7 radio and study lounges.' },
  { name: 'Web Developers Guild', members: '430,000 Members', icon: '💻', desc: 'React, Node, Python, and open-source discussions with peer code reviews.' },
  { name: 'Anime & Manga Fanbase', members: '780,000 Members', icon: '🌸', desc: 'Weekly watch-alongs, manga chapters, and anime discussions.' },
  { name: 'Indie Game Developers', members: '290,000 Members', icon: '🕹️', desc: 'Showcase your game dev progress, get feedback, and find playtesters.' }
];

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = sampleCommunities.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#313338] text-[#F2F3F5] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[80px]">
        {/* Discover Hero */}
        <section className="bg-[linear-gradient(135deg,#1E1F22_0%,#2B2D31_100%)] py-20 px-6 text-center border-b border-[#3F4147]">
          <div className="max-w-[700px] mx-auto">
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Find your community on Discord
            </h1>
            <p className="text-sm sm:text-base text-[#949BA4] mb-8">
              From gaming to music to learning, there's a place for you.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-[550px] mx-auto">
              <input
                type="text"
                placeholder="Explore Gaming, Music, Tech..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1E1F22] border border-[#3F4147] rounded-full py-3.5 px-6 text-sm text-white placeholder:text-[#949BA4] focus:outline-none focus:border-[#5865F2] shadow-inner"
              />
              <span className="absolute right-5 top-3.5 text-lg">🔍</span>
            </div>
          </div>
        </section>

        {/* Categories Bar */}
        <section className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="flex gap-3 overflow-x-auto pb-4 mb-8 text-xs font-semibold scrollbar-none">
            {['All', 'Gaming', 'Music', 'Education', 'Science & Tech', 'Entertainment', 'Student Hubs'].map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  i === 0 ? 'bg-[#5865F2] text-white' : 'bg-[#2B2D31] text-[#DBDEE1] hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.name}
                className="bg-[#2B2D31] p-6 rounded-xl border border-white/5 hover:border-[#5865F2]/50 hover:-translate-y-1 transition-all shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1E1F22] flex items-center justify-center text-2xl border border-white/5">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base leading-snug">{item.name}</h3>
                      <span className="text-[11px] text-[#23A55A] font-semibold">{item.members}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#949BA4] leading-relaxed mb-6">{item.desc}</p>
                </div>

                <button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">
                  Join Server
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

