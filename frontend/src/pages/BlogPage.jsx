import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const articles = [
  { title: 'Introducing New Audio Filters and Low-Latency Voice Upgrades', date: 'November 2, 2026', tag: 'Product', read: '4 min read', desc: 'Krisp noise suppression improvements and faster server handshakes worldwide.' },
  { title: 'How Game Developers are Building Integrated Discord Activities', date: 'October 28, 2026', tag: 'Engineering', read: '6 min read', desc: 'Dive into our SDK updates allowing embedded multiplayer HTML5 games directly in voice channels.' },
  { title: 'Community Spotlight: The Global Pixel Artists Collective', date: 'October 20, 2026', tag: 'Community', read: '5 min read', desc: 'Meet the moderators uniting over 300,000 digital painters and sprite animators.' }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#313338] text-[#F2F3F5] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[80px]">
        {/* Blog Hero */}
        <section className="bg-[linear-gradient(135deg,#1E1F22_0%,#313338_100%)] py-20 px-6 border-b border-[#3F4147]">
          <div className="max-w-[1100px] mx-auto">
            <span className="text-xs font-bold text-[#5865F2] uppercase tracking-wider block mb-2">The Discord Blog</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
              News, features, and stories
            </h1>
            <p className="text-sm sm:text-base text-[#949BA4] max-w-[600px]">
              The official publication on Discord updates, engineering deep dives, and community highlights.
            </p>
          </div>
        </section>

        {/* Articles List */}
        <section className="max-w-[1100px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art) => (
              <div key={art.title} className="bg-[#2B2D31] rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:-translate-y-1 transition-all shadow-md">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#949BA4] mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-white/10 text-white font-semibold">{art.tag}</span>
                    <span>{art.read}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug hover:text-[#5865F2] cursor-pointer">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#949BA4] leading-relaxed mb-6">{art.desc}</p>
                </div>
                <div className="text-[11px] text-[#949BA4] pt-3 border-t border-white/5">
                  Published {art.date}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

