import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DownloadPage() {
  const [osName, setOsName] = useState('Windows');

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) setOsName('Mac');
    else if (userAgent.includes('linux')) setOsName('Linux');
  }, []);

  return (
    <div className="min-h-screen bg-[#313338] text-[#F2F3F5] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[80px]">
        {/* Download Hero */}
        <section className="bg-[linear-gradient(135deg,#5865F2_0%,#404eed_50%,#2B2D31_100%)] py-20 px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6">
              Get Discord for any device
            </h1>
            <p className="text-base sm:text-lg text-[#F2F3F5] opacity-95 max-w-[650px] mx-auto mb-8 leading-relaxed">
              An unforgettable journey awaits. Hang out with your friends on our desktop app, mobile apps, or directly in your web browser.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <a
                href="#download-installer"
                className="flex items-center gap-2 bg-white text-[#23272A] hover:text-[#5865F2] hover:-translate-y-0.5 px-8 py-4 rounded-full font-bold text-base shadow-lg transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
                </svg>
                <span>Download for {osName}</span>
              </a>
            </div>
            <p className="text-xs text-white/70">{osName} 64-bit • Free official installer</p>
          </div>
        </section>

        {/* Platforms Matrix */}
        <section className="py-20 px-6 bg-white text-[#23272A]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Platforms &amp; Operating Systems</h2>
              <p className="text-[#4F545C] text-base">Stay connected effortlessly across all your favorite devices.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* iOS */}
              <div className="bg-[#F6F6F7] p-8 rounded-xl flex flex-col justify-between items-center text-center hover:shadow-lg transition-shadow border border-black/5">
                <div>
                  <div className="text-4xl mb-4">🍎</div>
                  <h3 className="text-xl font-bold mb-2">iOS</h3>
                  <p className="text-xs text-[#4F545C] mb-6">Available on the App Store for iPhone &amp; iPad.</p>
                </div>
                <button className="w-full bg-[#1E1F22] hover:bg-black text-white text-xs font-semibold py-3 rounded-full transition-colors">
                  Download on App Store
                </button>
              </div>

              {/* Android */}
              <div className="bg-[#F6F6F7] p-8 rounded-xl flex flex-col justify-between items-center text-center hover:shadow-lg transition-shadow border border-black/5">
                <div>
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-xl font-bold mb-2">Android</h3>
                  <p className="text-xs text-[#4F545C] mb-6">Available on Google Play for phones and tablets.</p>
                </div>
                <button className="w-full bg-[#1E1F22] hover:bg-black text-white text-xs font-semibold py-3 rounded-full transition-colors">
                  Download on Google Play
                </button>
              </div>

              {/* Mac */}
              <div className="bg-[#F6F6F7] p-8 rounded-xl flex flex-col justify-between items-center text-center hover:shadow-lg transition-shadow border border-black/5">
                <div>
                  <div className="text-4xl mb-4">🍏</div>
                  <h3 className="text-xl font-bold mb-2">macOS</h3>
                  <p className="text-xs text-[#4F545C] mb-6">Compatible with macOS 10.15+ (Apple Silicon &amp; Intel).</p>
                </div>
                <button className="w-full bg-[#1E1F22] hover:bg-black text-white text-xs font-semibold py-3 rounded-full transition-colors">
                  Download .dmg
                </button>
              </div>

              {/* Linux */}
              <div className="bg-[#F6F6F7] p-8 rounded-xl flex flex-col justify-between items-center text-center hover:shadow-lg transition-shadow border border-black/5">
                <div>
                  <div className="text-4xl mb-4">🐧</div>
                  <h3 className="text-xl font-bold mb-2">Linux</h3>
                  <p className="text-xs text-[#4F545C] mb-6">Ready for Debian/Ubuntu (.deb) and tarball packages.</p>
                </div>
                <button className="w-full bg-[#1E1F22] hover:bg-black text-white text-xs font-semibold py-3 rounded-full transition-colors">
                  Download .deb
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Experimental Builds */}
        <section className="py-16 px-6 bg-[#2B2D31] text-center border-t border-[#3F4147]">
          <div className="max-w-[700px] mx-auto">
            <h2 className="text-2xl font-bold mb-3">Feeling Experimental?</h2>
            <p className="text-sm text-[#949BA4] mb-8 leading-relaxed">
              Try our Public Test Build (PTB) or Canary release to test cutting-edge features before they roll out to everyone.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all">
                Download Public Test Build
              </button>
              <button className="bg-white hover:bg-gray-100 text-[#23272A] text-sm font-semibold px-6 py-3 rounded-full transition-all">
                Download Canary
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

