import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NitroPage() {
  return (
    <div className="min-h-screen bg-[#1E1F22] text-[#F2F3F5] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[80px]">
        {/* Nitro Hero */}
        <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#EB459E]/40 via-[#5865F2]/20 to-[#1E1F22] py-24 px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/10 text-[#EB459E] mb-6 backdrop-blur-sm border border-white/10">
              ⚡ Supercharge your Discord
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
              Unleash more fun with Nitro
            </h1>
            <p className="text-base sm:text-lg text-[#DBDEE1] max-w-[650px] mx-auto mb-10 leading-relaxed">
              Upgrade your emoji, enjoy bigger file uploads, stand out in your favorite servers, and so much more.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-[1000px] mx-auto px-6 -mt-8 mb-24 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {/* Nitro Basic */}
          <div className="bg-[#2B2D31] rounded-2xl p-8 border border-white/10 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">Nitro Basic</h3>
                <span className="text-xs font-semibold px-3 py-1 bg-white/10 rounded-full text-[#949BA4]">Popular</span>
              </div>
              <div className="text-3xl font-extrabold text-white mb-6">
                $2.99 <span className="text-sm font-normal text-[#949BA4]">/ month</span>
              </div>
              <ul className="space-y-3.5 text-sm text-[#DBDEE1] mb-8">
                <li className="flex items-center gap-2">✓ 50MB file sharing</li>
                <li className="flex items-center gap-2">✓ Custom emoji and stickers anywhere</li>
                <li className="flex items-center gap-2">✓ Special Nitro badge on your profile</li>
                <li className="flex items-center gap-2">✓ Custom video backgrounds</li>
              </ul>
            </div>
            <button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3.5 rounded-full transition-all">
              Subscribe to Basic
            </button>
          </div>

          {/* Nitro Full */}
          <div className="bg-gradient-to-b from-[#2B2D31] to-[#313338] rounded-2xl p-8 border-2 border-[#EB459E] flex flex-col justify-between shadow-2xl relative">
            <div className="absolute -top-3.5 right-6 bg-[#EB459E] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Best Value
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">Nitro</h3>
              </div>
              <div className="text-3xl font-extrabold text-white mb-6">
                $9.99 <span className="text-sm font-normal text-[#949BA4]">/ month</span>
              </div>
              <ul className="space-y-3.5 text-sm text-[#DBDEE1] mb-8">
                <li className="flex items-center gap-2 font-medium text-white">✓ <strong>500MB</strong> file sharing</li>
                <li className="flex items-center gap-2 font-medium text-white">✓ HD streaming up to <strong>4K 60fps</strong></li>
                <li className="flex items-center gap-2 font-medium text-white">✓ <strong>2 Server Boosts</strong> + 30% off extra boosts</li>
                <li className="flex items-center gap-2">✓ Custom profiles, banners &amp; animated avatars</li>
                <li className="flex items-center gap-2">✓ Join up to <strong>200 servers</strong></li>
              </ul>
            </div>
            <button className="w-full bg-gradient-to-r from-[#5865F2] to-[#EB459E] hover:opacity-90 text-white font-bold py-3.5 rounded-full shadow-lg transition-all">
              Subscribe to Nitro
            </button>
          </div>
        </section>

        {/* Perks Grid */}
        <section className="py-20 px-6 bg-[#2B2D31] border-t border-[#3F4147]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Popular Nitro Perks</h2>
              <p className="text-sm text-[#949BA4]">Level up your entire Discord presence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1E1F22] p-6 rounded-xl border border-white/5">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="text-lg font-bold text-white mb-1.5">Custom Profiles</h3>
                <p className="text-xs text-[#949BA4] leading-relaxed">Use a different avatar, banner, and theme per server.</p>
              </div>

              <div className="bg-[#1E1F22] p-6 rounded-xl border border-white/5">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-lg font-bold text-white mb-1.5">2 Server Boosts</h3>
                <p className="text-xs text-[#949BA4] leading-relaxed">Upgrade your favorite communities with custom slots and sound quality.</p>
              </div>

              <div className="bg-[#1E1F22] p-6 rounded-xl border border-white/5">
                <div className="text-3xl mb-3">📹</div>
                <h3 className="text-lg font-bold text-white mb-1.5">4K 60FPS Streaming</h3>
                <p className="text-xs text-[#949BA4] leading-relaxed">Broadcast gaming sessions in ultra high definition clarity.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

