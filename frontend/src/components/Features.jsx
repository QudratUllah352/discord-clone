import React from 'react';

export default function Features() {
  return (
    <div className="bg-white text-[#23272A]">
      {/* Feature Block 1: Servers */}
      <section className="py-24 px-6 border-b border-black/5" id="feature-servers">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] items-center gap-14">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] mb-6 tracking-tight text-[#23272A]">
              Create an invite-only place where you belong
            </h2>
            <p className="text-base sm:text-lg text-[#4F545C] leading-relaxed">
              Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.
            </p>
          </div>

          {/* Server Mockup */}
          <div className="bg-[#313338] rounded-xl shadow-2xl overflow-hidden border border-white/5 text-white">
            <div className="bg-[#1E1F22] px-4 py-2.5 flex items-center gap-2 border-b border-[#3F4147]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ED4245]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F0B232]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#23A55A]"></span>
              <span className="text-xs text-[#949BA4] ml-2 font-medium">Friends &amp; Communities</span>
            </div>

            <div className="grid grid-cols-[210px_1fr] min-h-[280px]">
              <div className="bg-[#2B2D31] p-4 border-r border-[#3F4147] flex flex-col gap-1 text-sm">
                <div className="font-bold text-white text-base pb-3 border-b border-[#3F4147] flex items-center justify-between">
                  <span>Gaming Hub</span>
                  <span className="text-xs">▾</span>
                </div>
                <div className="text-[11px] font-bold text-[#949BA4] uppercase mt-3">Welcome</div>
                <div className="px-2 py-1 text-[#949BA4] hover:text-white rounded"># rules-and-info</div>
                <div className="px-2 py-1 text-[#949BA4] hover:text-white rounded"># announcements</div>

                <div className="text-[11px] font-bold text-[#949BA4] uppercase mt-2">Topics</div>
                <div className="px-2 py-1 bg-white/10 text-white rounded font-medium"># general-chat</div>
                <div className="px-2 py-1 text-[#949BA4] hover:text-white rounded"># strategy-guides</div>

                <div className="text-[11px] font-bold text-[#949BA4] uppercase mt-2">Voice</div>
                <div className="px-2 py-1 text-[#23A55A] font-medium flex items-center gap-1.5">
                  <span>🔊</span>
                  <span>Main Lounge (4)</span>
                </div>
              </div>

              <div className="bg-[#313338] p-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center font-bold text-xs shrink-0">
                      DX
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white flex items-center gap-2">
                        Dexter <span className="text-[10px] text-[#949BA4] font-normal">10:45 AM</span>
                      </div>
                      <p className="text-xs text-[#DBDEE1] mt-0.5">Topic channels make finding discussions so clean and organized!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EB459E] flex items-center justify-center font-bold text-xs shrink-0">
                      SR
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white flex items-center gap-2">
                        Sarah <span className="text-[10px] text-[#949BA4] font-normal">10:47 AM</span>
                      </div>
                      <p className="text-xs text-[#DBDEE1] mt-0.5">Totally agree! Everything has its dedicated home. 🌟</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#2B2D31] text-xs text-[#949BA4] px-3.5 py-2 rounded">
                  Message #general-chat
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Block 2: Voice & Video (Flipped) */}
      <section className="py-24 px-6 bg-[#F6F6F7]" id="feature-voice">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] items-center gap-14">
          {/* Mockup Left */}
          <div className="bg-[#313338] rounded-xl shadow-2xl overflow-hidden border border-white/5 order-2 lg:order-1 text-white">
            <div className="bg-[#1E1F22] px-4 py-2.5 flex items-center gap-2 border-b border-[#3F4147]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ED4245]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F0B232]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#23A55A]"></span>
              <span className="text-xs text-[#949BA4] ml-2 font-medium">Voice Channel — Squad Room</span>
            </div>

            <div className="bg-[#2B2D31] p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#313338] p-5 rounded-lg flex flex-col items-center justify-center gap-2 border-2 border-[#23A55A] shadow-[0_0_12px_rgba(35,165,90,0.3)]">
                  <div className="w-14 h-14 rounded-full bg-[#5865F2] flex items-center justify-center text-xl">🎮</div>
                  <span className="text-xs font-semibold text-white">Alex (Speaking...)</span>
                </div>
                <div className="bg-[#313338] p-5 rounded-lg flex flex-col items-center justify-center gap-2 border-2 border-transparent">
                  <div className="w-14 h-14 rounded-full bg-[#EB459E] flex items-center justify-center text-xl">🎧</div>
                  <span className="text-xs font-semibold text-white">Chloe</span>
                </div>
                <div className="bg-[#313338] p-5 rounded-lg flex flex-col items-center justify-center gap-2 border-2 border-transparent">
                  <div className="w-14 h-14 rounded-full bg-[#23A55A] flex items-center justify-center text-xl">⚡</div>
                  <span className="text-xs font-semibold text-white">Marcus</span>
                </div>
                <div className="bg-[#313338] p-5 rounded-lg flex flex-col items-center justify-center gap-2 border-2 border-transparent">
                  <div className="w-14 h-14 rounded-full bg-[#F0B232] flex items-center justify-center text-xl">👾</div>
                  <span className="text-xs font-semibold text-white">Sophia</span>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-[#3F4147]">
                <div className="w-10 h-10 rounded-full bg-[#313338] flex items-center justify-center text-base cursor-pointer hover:bg-white/10">🎤</div>
                <div className="w-10 h-10 rounded-full bg-[#313338] flex items-center justify-center text-base cursor-pointer hover:bg-white/10">🎧</div>
                <div className="w-10 h-10 rounded-full bg-[#313338] flex items-center justify-center text-base cursor-pointer hover:bg-white/10">🖥️</div>
                <div className="w-10 h-10 rounded-full bg-[#ED4245] flex items-center justify-center text-base cursor-pointer hover:opacity-90">📞</div>
              </div>
            </div>
          </div>

          {/* Text Right */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] mb-6 tracking-tight text-[#23272A]">
              Where hanging out is easy
            </h2>
            <p className="text-base sm:text-lg text-[#4F545C] leading-relaxed">
              Grab a seat in a voice channel when you're free. Friends in your server can see you're around and instantly pop in to talk without having to call.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Block 3: Community & Moderation */}
      <section className="py-24 px-6 text-center" id="feature-community">
        <div className="max-w-[800px] mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] mb-5 tracking-tight text-[#23272A]">
            From a few to a fandom
          </h2>
          <p className="text-base sm:text-lg text-[#4F545C] leading-relaxed">
            Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-8 rounded-xl shadow-md border border-black/5 hover:-translate-y-1 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center text-2xl mb-4">
              🛡️
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#ED4245]/10 text-[#ED4245] mb-3">Role Security</span>
            <h3 className="text-xl font-bold text-[#23272A] mb-2">Custom Member Access</h3>
            <p className="text-sm text-[#4F545C] leading-relaxed">
              Organize members by granular permissions and customizable badges. Assign leadership and moderate spaces effortlessly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-black/5 hover:-translate-y-1 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center text-2xl mb-4">
              🤖
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#5865F2]/10 text-[#5865F2] mb-3">Moderation</span>
            <h3 className="text-xl font-bold text-[#23272A] mb-2">AutoMod &amp; Safe Spaces</h3>
            <p className="text-sm text-[#4F545C] leading-relaxed">
              Keep channels clean with proactive filtering, spam prevention rules, and quick action mod tools designed for busy servers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-black/5 hover:-translate-y-1 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center text-2xl mb-4">
              💎
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#EB459E]/10 text-[#EB459E] mb-3">VIP Perks</span>
            <h3 className="text-xl font-bold text-[#23272A] mb-2">Special Powers &amp; VIPs</h3>
            <p className="text-sm text-[#4F545C] leading-relaxed">
              Reward your most active contributors with exclusive private lounges, custom colors, streaming privileges, and special flair.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Block 4: Reliable Tech For Staying Close (Full Width Stream Showcase) */}
      <section className="py-24 px-6 bg-[#F6F6F7] border-t border-black/5" id="feature-reliable-tech">
        <div className="max-w-[1000px] mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase leading-[1.15] mb-5 tracking-tight text-[#23272A]">
            Reliable tech for staying close
          </h2>
          <p className="text-base sm:text-lg text-[#4F545C] leading-relaxed max-w-[800px] mx-auto">
            Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with Screen Share.
          </p>
        </div>

        {/* Video / Screen Share Showcase Mockup */}
        <div className="max-w-[1100px] mx-auto bg-[#1E1F22] rounded-2xl shadow-2xl overflow-hidden border border-white/10 text-white p-4 sm:p-6">
          {/* Main stream view */}
          <div className="relative aspect-video max-h-[460px] w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#2B2D31] to-[#1E1F22] flex flex-col items-center justify-center border border-white/5 shadow-inner">
            {/* Game Screen Simulation */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5865F2]/25 via-transparent to-transparent">
              <div className="text-6xl sm:text-7xl mb-3 animate-bounce">⚔️</div>
              <span className="text-sm sm:text-base font-bold text-white tracking-wide">Alex is streaming Elden Ring 60 FPS</span>
              <span className="text-xs text-[#23A55A] font-semibold mt-1 flex items-center gap-1.5 bg-[#23A55A]/20 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#23A55A] animate-ping"></span>
                LIVE • 1080p Crystal Clear
              </span>
            </div>

            {/* Floating Live Reactions */}
            <div className="absolute right-6 bottom-16 flex flex-col gap-2 pointer-events-none">
              <span className="animate-float-slow text-2xl">🔥</span>
              <span className="animate-float-reverse text-2xl">GG!</span>
              <span className="animate-float-slow text-2xl">❤️</span>
            </div>

            {/* Top Bar inside stream */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ED4245]"></span>
              <span>Squad Stream Session (5 Watching)</span>
            </div>
          </div>

          {/* Video Participants Grid below */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="bg-[#2B2D31] rounded-xl p-3 flex items-center gap-3 border-2 border-[#23A55A] shadow-[0_0_10px_rgba(35,165,90,0.3)]">
              <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center font-bold text-sm">
                AL
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate">Alex (Host)</span>
                <span className="text-[10px] text-[#23A55A]">Speaking...</span>
              </div>
            </div>

            <div className="bg-[#2B2D31] rounded-xl p-3 flex items-center gap-3 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-[#EB459E] flex items-center justify-center font-bold text-sm">
                CH
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate">Chloe</span>
                <span className="text-[10px] text-[#949BA4]">Webcam HD</span>
              </div>
            </div>

            <div className="bg-[#2B2D31] rounded-xl p-3 flex items-center gap-3 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-[#23A55A] flex items-center justify-center font-bold text-sm">
                MA
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate">Marcus</span>
                <span className="text-[10px] text-[#949BA4]">Listening</span>
              </div>
            </div>

            <div className="bg-[#2B2D31] rounded-xl p-3 flex items-center gap-3 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-[#F0B232] flex items-center justify-center font-bold text-sm">
                SO
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate">Sophia</span>
                <span className="text-[10px] text-[#949BA4]">Muted 🔇</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

