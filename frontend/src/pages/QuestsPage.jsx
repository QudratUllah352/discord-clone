import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sampleQuests = [
  { game: 'Valorant', task: 'Stream 15 mins to friends', reward: 'Special Gun Buddy & Banner', exp: 'Ends in 4 days', icon: '🎯' },
  { game: 'World of Warcraft', task: 'Play for 30 minutes in Discord', reward: 'Fiery Pet Companion', exp: 'Ends in 6 days', icon: '🐉' },
  { game: 'Honkai: Star Rail', task: 'Stream gameplay to 1+ viewer', reward: '120 Stellar Jades', exp: 'Ends in 2 days', icon: '⭐' }
];

export default function QuestsPage() {
  return (
    <div className="min-h-screen bg-[#313338] text-[#F2F3F5] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[80px]">
        {/* Quests Hero */}
        <section className="bg-[linear-gradient(135deg,#5865F2_0%,#313338_100%)] py-20 px-6 text-center">
          <div className="max-w-[760px] mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white mb-4">
              Gaming Rewards
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Discord Quests
            </h1>
            <p className="text-sm sm:text-base text-[#DBDEE1] max-w-[600px] mx-auto mb-8 leading-relaxed">
              Play and stream games you love with friends on Discord to earn exclusive in-game items, avatar decorations, and collectibles.
            </p>
          </div>
        </section>

        {/* Active Quests */}
        <section className="max-w-[1100px] mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-white mb-8">Active Quests Available Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleQuests.map((q) => (
              <div key={q.game} className="bg-[#2B2D31] rounded-2xl p-6 border border-white/5 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="text-4xl mb-4">{q.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{q.game}</h3>
                  <p className="text-xs text-[#949BA4] mb-4">{q.task}</p>
                  <div className="bg-[#1E1F22] p-3 rounded-lg border border-white/5 mb-4">
                    <span className="text-[10px] text-[#5865F2] uppercase font-bold tracking-wider block">Reward</span>
                    <span className="text-xs font-semibold text-white">{q.reward}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-[#949BA4] pt-2 border-t border-white/5">
                  <span>{q.exp}</span>
                  <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-1.5 rounded-full font-semibold transition-colors">
                    Start Quest
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="mt-20 p-8 rounded-2xl bg-[#2B2D31] border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6 text-center">How Discord Quests Work</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#5865F2] text-white font-bold flex items-center justify-center mx-auto mb-3">1</div>
                <h4 className="font-semibold text-white text-sm mb-1">Accept the Quest</h4>
                <p className="text-xs text-[#949BA4]">Opt in directly from your User Settings or quest banner.</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-[#5865F2] text-white font-bold flex items-center justify-center mx-auto mb-3">2</div>
                <h4 className="font-semibold text-white text-sm mb-1">Play &amp; Stream</h4>
                <p className="text-xs text-[#949BA4]">Stream your game to friends in any Discord voice channel.</p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-full bg-[#5865F2] text-white font-bold flex items-center justify-center mx-auto mb-3">3</div>
                <h4 className="font-semibold text-white text-sm mb-1">Claim Loot</h4>
                <p className="text-xs text-[#949BA4]">Redeem your code in-game or unlock custom Discord profile items.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

