import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-[#313338] text-[#F2F3F5] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[80px]">
        {/* Safety Hero */}
        <section className="bg-[linear-gradient(135deg,#23A55A_0%,#313338_100%)] py-20 px-6 text-center">
          <div className="max-w-[760px] mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white mb-4">
              Trust &amp; Safety Hub
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Building a safer Discord together
            </h1>
            <p className="text-sm sm:text-base text-[#DBDEE1] max-w-[620px] mx-auto mb-8 leading-relaxed">
              We design tools, write policies, and build automated systems so everyone can find belonging without compromising safety.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="max-w-[1100px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#2B2D31] p-8 rounded-2xl border border-white/5">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-lg font-bold text-white mb-2">Community Guidelines</h3>
              <p className="text-xs text-[#949BA4] leading-relaxed mb-4">
                Clear rules prohibiting harassment, hate speech, spam, and unlawful behavior.
              </p>
              <a href="#guidelines" className="text-xs text-[#00AFF4] hover:underline font-semibold">Read Guidelines →</a>
            </div>

            <div className="bg-[#2B2D31] p-8 rounded-2xl border border-white/5">
              <div className="text-3xl mb-4">👨‍👩‍👧</div>
              <h3 className="text-lg font-bold text-white mb-2">Family Center</h3>
              <p className="text-xs text-[#949BA4] leading-relaxed mb-4">
                Parental controls and weekly activity summaries to keep young people safe online.
              </p>
              <a href="#family" className="text-xs text-[#00AFF4] hover:underline font-semibold">Explore Family Center →</a>
            </div>

            <div className="bg-[#2B2D31] p-8 rounded-2xl border border-white/5">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-bold text-white mb-2">Transparency Reports</h3>
              <p className="text-xs text-[#949BA4] leading-relaxed mb-4">
                Quarterly disclosures detailing our enforcement actions, appeals, and data privacy.
              </p>
              <a href="#reports" className="text-xs text-[#00AFF4] hover:underline font-semibold">View Reports →</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

