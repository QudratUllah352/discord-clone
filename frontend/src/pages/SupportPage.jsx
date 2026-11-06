import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#313338] text-[#F2F3F5] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[80px]">
        {/* Support Hero */}
        <section className="bg-[linear-gradient(135deg,#5865F2_0%,#1E1F22_100%)] py-20 px-6 text-center">
          <div className="max-w-[700px] mx-auto">
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">
              Help Center
            </h1>
            <p className="text-sm sm:text-base text-[#DBDEE1] mb-8">
              What can we help you with today?
            </p>

            <div className="relative max-w-[500px] mx-auto">
              <input
                type="text"
                placeholder="Search articles, guides, billing questions..."
                className="w-full bg-[#1E1F22] border border-[#3F4147] rounded-full py-3.5 px-6 text-sm text-white placeholder:text-[#949BA4] focus:outline-none focus:border-[#5865F2]"
              />
              <span className="absolute right-5 top-3.5 text-lg">🔍</span>
            </div>
          </div>
        </section>

        {/* Support Topics */}
        <section className="max-w-[1100px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Account Settings', desc: 'Manage password, 2FA, email verification, and privacy.', icon: '⚙️' },
              { title: 'Billing & Subscriptions', desc: 'Nitro invoices, payment methods, and refund requests.', icon: '💳' },
              { title: 'Server Management', desc: 'Role permissions, channels, webhooks, and audit logs.', icon: '🏰' },
              { title: 'Voice & Video Troubleshoot', desc: 'Mic setup, echo cancellation, and screen share lag.', icon: '🎧' },
              { title: 'Trust & Safety Inquiries', desc: 'Report bad actors, harassment, and review appeals.', icon: '🛡️' },
              { title: 'Developer Portal', desc: 'Bot tokens, OAuth2 setup, and Discord API docs.', icon: '🤖' },
            ].map((topic) => (
              <div key={topic.title} className="bg-[#2B2D31] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-all cursor-pointer">
                <div className="text-3xl mb-3">{topic.icon}</div>
                <h3 className="font-bold text-white text-base mb-1.5">{topic.title}</h3>
                <p className="text-xs text-[#949BA4] leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-[#949BA4] mb-4">Still can't find what you need?</p>
            <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors">
              Submit a Request Ticket
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

