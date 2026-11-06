import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const sampleServerChannels = {
  gaming: [
    { name: 'announcements', type: 'text', unread: false },
    { name: 'general-hangout', type: 'text', unread: false },
    { name: 'gaming-clips', type: 'text', unread: true },
    { name: 'Squad Room (3/5)', type: 'voice', count: '3/5' },
    { name: 'Lo-Fi Beats', type: 'voice', count: '' },
  ],
  music: [
    { name: 'welcome-info', type: 'text', unread: false },
    { name: 'track-feedback', type: 'text', unread: true },
    { name: 'sample-library', type: 'text', unread: false },
    { name: 'Live Studio Room', type: 'voice', count: '4/8' },
    { name: 'DJ Booth', type: 'voice', count: '' },
  ],
  tech: [
    { name: 'dev-chat', type: 'text', unread: false },
    { name: 'project-showcase', type: 'text', unread: false },
    { name: 'code-help', type: 'text', unread: true },
    { name: 'Pair Programming', type: 'voice', count: '2/4' },
    { name: 'Study Hall', type: 'voice', count: '' },
  ]
};

const initialMessages = {
  'general-hangout': [
    { user: 'Wumpus', avatarColor: 'from-[#5865F2] to-[#EB459E]', time: 'Today at 11:20 AM', text: 'Hey everyone! Anyone down for a couple of matches tonight? 🚀' },
    { user: 'Nelly', avatarColor: 'from-[#23A55A] to-[#5865F2]', time: 'Today at 11:22 AM', text: 'Count me in! Hopping into the voice channel right now 🎧' },
  ],
  'announcements': [
    { user: 'Clyde', avatarColor: 'from-[#5865F2] to-[#00AFF4]', time: 'Yesterday at 4:00 PM', text: '🎉 Welcome new members to the server! Read the rules and enjoy your stay.' }
  ],
  'gaming-clips': [
    { user: 'Dexter', avatarColor: 'from-[#F0B232] to-[#ED4245]', time: 'Today at 9:15 AM', text: 'Check out this clutch 1v4 round from last night! GG WP 🔥' }
  ]
};

export default function Hero() {
  const [osName, setOsName] = useState('Windows');
  const [activeServer, setActiveServer] = useState('gaming');
  const [activeChannel, setActiveChannel] = useState('general-hangout');
  const [messages, setMessages] = useState(initialMessages);
  const [inputVal, setInputVal] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) setOsName('Mac');
    else if (userAgent.includes('linux')) setOsName('Linux');
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = {
      user: 'You',
      avatarColor: 'from-[#5865F2] to-[#23A55A]',
      time: 'Just now',
      text: inputVal
    };

    setMessages((prev) => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg]
    }));
    setInputVal('');

    // Simulated reply after 700ms
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [activeChannel]: [
          ...(prev[activeChannel] || []),
          {
            user: 'Wumpus',
            avatarColor: 'from-[#5865F2] to-[#EB459E]',
            time: 'Just now',
            text: 'Awesome! See you in the lobby! 🎉'
          }
        ]
      }));
    }, 700);
  };

  const currentChannels = sampleServerChannels[activeServer] || sampleServerChannels.gaming;
  const currentChat = messages[activeChannel] || [
    { user: 'Discord Bot', avatarColor: 'from-[#5865F2] to-[#383A40]', time: 'Now', text: `Welcome to #${activeChannel}! Start the conversation.` }
  ];

  return (
    <section className="relative min-h-screen bg-[linear-gradient(135deg,#5865F2_0%,#7289DA_50%,#EB459E_100%)] text-white pt-[110px] pb-16 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.18)_0%,rgba(26,32,129,0.35)_70%,transparent_100%)] pointer-events-none" />

      {/* Floating Background Discord Art & Cloud SVGs */}
      {/* Left side decorative art */}
      <div className="hidden xl:block absolute left-8 top-32 pointer-events-none z-10 animate-float-slow opacity-90">
        <div className="relative bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#23A55A] flex items-center justify-center text-xl">
            🎮
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-white">Squad voice call</div>
            <div className="text-[10px] text-white/80">4 friends online</div>
          </div>
        </div>
        {/* Cloud vector */}
        <svg className="w-36 h-20 fill-white/15 mt-4 ml-6" viewBox="0 0 100 60">
          <path d="M20,40 Q10,40 10,30 Q10,20 25,20 Q30,10 45,15 Q60,10 65,25 Q80,25 80,35 Q80,45 65,45 Z" />
        </svg>
      </div>

      {/* Right side decorative art */}
      <div className="hidden xl:block absolute right-8 top-36 pointer-events-none z-10 animate-float-reverse opacity-90">
        <div className="relative bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EB459E] flex items-center justify-center text-xl">
            🎧
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-white">Streaming 1080p 60fps</div>
            <div className="text-[10px] text-white/80">Screen Share Active</div>
          </div>
        </div>
        {/* Star & sparkles */}
        <div className="flex gap-2 justify-end mt-4 mr-6 text-white/40 text-2xl">
          <span>✨</span>
          <span>⭐</span>
        </div>
      </div>

      <div className="relative z-10 max-w-[880px] mx-auto flex flex-col items-center">
        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] mb-6 drop-shadow-md">
          GROUP CHAT THAT'S ALL FUN &amp; GAMES
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#F2F3F5] font-normal leading-relaxed max-w-[740px] mb-9 opacity-95">
          Discord is great for playing games and chilling with friends, or even building a worldwide community. Customize your own space to talk, play, and hang out in.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-5 w-full mb-14">
          <Link
            to="/download"
            className="flex items-center gap-2.5 bg-white text-[#23272A] hover:text-[#5865F2] hover:-translate-y-0.5 px-8 py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
            </svg>
            <span>Download for {osName}</span>
          </Link>

          <Link
            to="/login"
            className="bg-[#1E1F22] hover:bg-[#111214] text-white hover:-translate-y-0.5 px-8 py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Open Discord in your browser
          </Link>
        </div>

        {/* 3D UI App Window Showcase (Interactive Preview) */}
        <div className="w-full max-w-[960px] perspective-[1200px] text-left">
          <div className="bg-[#313338] rounded-xl shadow-2xl overflow-hidden border border-white/10 transform rotate-x-1 hover:rotate-x-0 transition-transform duration-300">
            {/* Window titlebar */}
            <div className="bg-[#1E1F22] px-4 py-2.5 flex items-center justify-between border-b border-[#3F4147]">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ED4245]"></span>
                <span className="w-3 h-3 rounded-full bg-[#F0B232]"></span>
                <span className="w-3 h-3 rounded-full bg-[#23A55A]"></span>
              </div>
              <span className="text-xs font-semibold text-[#949BA4]">Discord — #{activeChannel} (Interactive Preview)</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  title={isMuted ? "Unmute" : "Mute"}
                  className={`text-xs p-1 rounded hover:bg-white/10 ${isMuted ? 'text-[#ED4245]' : 'text-[#949BA4]'}`}
                >
                  {isMuted ? '🔇' : '🎙️'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeafened(!isDeafened)}
                  title={isDeafened ? "Undeafen" : "Deafen"}
                  className={`text-xs p-1 rounded hover:bg-white/10 ${isDeafened ? 'text-[#ED4245]' : 'text-[#949BA4]'}`}
                >
                  {isDeafened ? '🔕' : '🎧'}
                </button>
              </div>
            </div>

            {/* In-app panels */}
            <div className="grid grid-cols-[60px_1fr] md:grid-cols-[64px_200px_1fr] lg:grid-cols-[68px_210px_1fr_190px] min-h-[380px]">
              {/* Server sidebar */}
              <div className="bg-[#1E1F22] py-3 flex flex-col items-center gap-3 border-r border-[#3F4147]">
                <button
                  type="button"
                  onClick={() => { setActiveServer('gaming'); setActiveChannel('general-hangout'); }}
                  className={`relative w-11 h-11 flex items-center justify-center font-bold text-lg shadow-md transition-all ${
                    activeServer === 'gaming'
                      ? 'rounded-2xl bg-[#5865F2] text-white'
                      : 'rounded-full bg-[#2B2D31] text-white/70 hover:rounded-2xl hover:bg-[#5865F2] hover:text-white'
                  }`}
                  title="Gaming Server"
                >
                  {activeServer === 'gaming' && (
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-7 bg-white rounded-r-full"></span>
                  )}
                  🎮
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveServer('music'); setActiveChannel('welcome-info'); }}
                  className={`relative w-11 h-11 flex items-center justify-center font-bold text-lg transition-all ${
                    activeServer === 'music'
                      ? 'rounded-2xl bg-[#5865F2] text-white'
                      : 'rounded-full bg-[#2B2D31] text-white/70 hover:rounded-2xl hover:bg-[#5865F2] hover:text-white'
                  }`}
                  title="Music Server"
                >
                  {activeServer === 'music' && (
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-7 bg-white rounded-r-full"></span>
                  )}
                  🎵
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveServer('tech'); setActiveChannel('dev-chat'); }}
                  className={`relative w-11 h-11 flex items-center justify-center font-bold text-lg transition-all ${
                    activeServer === 'tech'
                      ? 'rounded-2xl bg-[#5865F2] text-white'
                      : 'rounded-full bg-[#2B2D31] text-white/70 hover:rounded-2xl hover:bg-[#5865F2] hover:text-white'
                  }`}
                  title="Tech Server"
                >
                  {activeServer === 'tech' && (
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-7 bg-white rounded-r-full"></span>
                  )}
                  ⚡
                </button>
              </div>

              {/* Channels column */}
              <div className="hidden md:flex flex-col bg-[#2B2D31] p-3 gap-1 border-r border-[#3F4147] text-sm">
                <div className="text-[11px] font-bold text-[#949BA4] uppercase tracking-wider px-2 py-1">Text Channels</div>
                {currentChannels.filter(c => c.type === 'text').map((ch) => (
                  <button
                    key={ch.name}
                    type="button"
                    onClick={() => setActiveChannel(ch.name)}
                    className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between cursor-pointer transition-colors ${
                      activeChannel === ch.name
                        ? 'bg-white/10 text-white font-medium'
                        : 'text-[#949BA4] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span># {ch.name}</span>
                    {ch.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#5865F2]"></span>}
                  </button>
                ))}

                <div className="text-[11px] font-bold text-[#949BA4] uppercase tracking-wider px-2 py-1 mt-3">Voice Channels</div>
                {currentChannels.filter(c => c.type === 'voice').map((ch) => (
                  <div
                    key={ch.name}
                    className="px-2.5 py-1.5 rounded text-[#23A55A] font-medium flex items-center justify-between hover:bg-white/5 cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>🔊</span>
                      <span className="text-xs">{ch.name}</span>
                    </div>
                    {ch.count && <span className="text-[10px] text-[#949BA4]">{ch.count}</span>}
                  </div>
                ))}
              </div>

              {/* Chat messages & Interactive input */}
              <div className="bg-[#313338] p-5 flex flex-col justify-between">
                <div className="flex flex-col gap-4 max-h-[220px] overflow-y-auto pr-1">
                  {currentChat.map((msg, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${msg.avatarColor} flex items-center justify-center font-bold text-xs shrink-0`}>
                        {msg.user.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{msg.user}</span>
                          <span className="text-[11px] text-[#949BA4]">{msg.time}</span>
                        </div>
                        <p className="text-sm text-[#DBDEE1] mt-0.5">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="bg-[#2B2D31] rounded-lg px-3 py-2 flex items-center gap-2 mt-4">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder={`Message #${activeChannel} (Press Enter to send)`}
                    className="flex-1 bg-transparent border-none text-xs text-white placeholder:text-[#949BA4] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="text-xs bg-[#5865F2] hover:bg-[#4752C4] text-white px-2.5 py-1 rounded font-semibold transition-colors shrink-0"
                  >
                    Send
                  </button>
                </form>
              </div>

              {/* Members column */}
              <div className="hidden lg:flex flex-col bg-[#2B2D31] p-3 gap-2 text-xs">
                <div className="font-bold text-[#949BA4] uppercase tracking-wider px-2 py-1">Online — 3</div>
                <div className="flex items-center gap-2 px-2 py-1 text-[#DBDEE1]">
                  <div className="relative w-7 h-7 rounded-full bg-[#5865F2] flex items-center justify-center text-[10px] font-bold">
                    WP
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#23A55A] border-2 border-[#2B2D31]"></span>
                  </div>
                  <span>Wumpus</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 text-[#DBDEE1]">
                  <div className="relative w-7 h-7 rounded-full bg-[#EB459E] flex items-center justify-center text-[10px] font-bold">
                    NE
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#23A55A] border-2 border-[#2B2D31]"></span>
                  </div>
                  <span>Nelly</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 text-[#DBDEE1]">
                  <div className="relative w-7 h-7 rounded-full bg-[#23A55A] flex items-center justify-center text-[10px] font-bold">
                    CL
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#23A55A] border-2 border-[#2B2D31]"></span>
                  </div>
                  <span>Clyde</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


