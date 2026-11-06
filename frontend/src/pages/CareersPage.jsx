import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const jobs = [
  { role: 'Senior Distributed Systems Engineer', dept: 'Infrastructure', location: 'San Francisco, CA or Remote' },
  { role: 'Staff Frontend Engineer — Web & Client', dept: 'Core App', location: 'Remote (US/Canada)' },
  { role: 'Product Designer — Voice & Video', dept: 'Design', location: 'San Francisco, CA' },
  { role: 'Engineering Manager — Anti-Abuse & AutoMod', dept: 'Trust & Safety', location: 'Remote (Global)' }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#313338] text-[#F2F3F5] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[80px]">
        {/* Careers Hero */}
        <section className="bg-[linear-gradient(135deg,#5865F2_0%,#EB459E_100%)] py-24 px-6 text-center text-white">
          <div className="max-w-[800px] mx-auto">
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-4">
              Work at Discord
            </h1>
            <p className="text-base sm:text-xl text-[#F2F3F5] max-w-[650px] mx-auto leading-relaxed opacity-95 mb-8">
              Build the future of human connection with a passionate, remote-friendly team empowering hundreds of millions of people.
            </p>
            <a href="#positions" className="inline-block bg-white text-[#23272A] hover:text-[#5865F2] px-8 py-3.5 rounded-full font-bold text-sm shadow-lg transition-all">
              View Open Roles
            </a>
          </div>
        </section>

        {/* Culture & Perks */}
        <section className="max-w-[1100px] mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-white mb-3">Why Join Discord?</h2>
            <p className="text-sm text-[#949BA4]">Our team is playful, focused, and deeply invested in human connection.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="bg-[#2B2D31] p-6 rounded-xl border border-white/5">
              <div className="text-3xl mb-3">🏡</div>
              <h3 className="font-bold text-white text-base mb-1">Flexible &amp; Remote</h3>
              <p className="text-xs text-[#949BA4] leading-relaxed">Work from home or from our San Francisco hubs with home office stipends.</p>
            </div>
            <div className="bg-[#2B2D31] p-6 rounded-xl border border-white/5">
              <div className="text-3xl mb-3">🧘</div>
              <h3 className="font-bold text-white text-base mb-1">Wellness &amp; Health</h3>
              <p className="text-xs text-[#949BA4] leading-relaxed">100% employer-covered health coverage, mental health days, and gym credits.</p>
            </div>
            <div className="bg-[#2B2D31] p-6 rounded-xl border border-white/5">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="font-bold text-white text-base mb-1">Play Time</h3>
              <p className="text-xs text-[#949BA4] leading-relaxed">Company gaming sessions, community game jams, and annual company retreats.</p>
            </div>
          </div>

          {/* Job Postings */}
          <div id="positions">
            <h3 className="text-2xl font-bold text-white mb-6">Open Positions</h3>
            <div className="flex flex-col gap-3">
              {jobs.map((job) => (
                <div key={job.role} className="bg-[#2B2D31] p-5 rounded-xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#5865F2] transition-colors">
                  <div>
                    <h4 className="font-bold text-white text-base mb-0.5">{job.role}</h4>
                    <span className="text-xs text-[#949BA4]">{job.dept} • {job.location}</span>
                  </div>
                  <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

