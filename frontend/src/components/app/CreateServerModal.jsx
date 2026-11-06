import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const TEMPLATES = [
  { id: 'gaming', title: 'Gaming', icon: '🎮', desc: 'Hang out with your squad' },
  { id: 'school', title: 'School Club', icon: '🎓', desc: 'Connect classmates and study' },
  { id: 'study', title: 'Study Group', icon: '📚', desc: 'Collaborate and review together' },
  { id: 'friends', title: 'Friends', icon: '💬', desc: 'Chat and chill with your circle' },
  { id: 'creators', title: 'Artists & Creators', icon: '🎨', desc: 'Share your work and gather feedback' },
  { id: 'community', title: 'Local Community', icon: '🏘️', desc: 'Meet up and discuss local events' },
];

const PRESET_ICONS = ['🎮', '🚀', '⚡', '🔥', '💻', '🎧', '👾', '🌟', '🛡️', '☕', '🍕', '🐱'];
const PRESET_COLORS = ['#5865F2', '#57F287', '#FEE75C', '#EB459E', '#ED4245', '#00AFF4'];

export default function CreateServerModal() {
  const { createServerOpen, setCreateServerOpen, addServer, currentUser } = useApp();
  const [step, setStep] = useState(1); // 1: Choose Template, 2: Club vs Friends, 3: Details
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [serverName, setServerName] = useState(`${currentUser.displayName}'s server`);
  const [selectedIcon, setSelectedIcon] = useState('🎮');
  const [selectedColor, setSelectedColor] = useState('#5865F2');

  if (!createServerOpen) return null;

  const handleClose = () => {
    setCreateServerOpen(false);
    setStep(1);
    setSelectedTemplate(null);
    setServerName(`${currentUser.displayName}'s server`);
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    if (template) {
      setSelectedIcon(template.icon);
      setServerName(`${currentUser.displayName}'s ${template.title}`);
    } else {
      setSelectedIcon('⚡');
      setServerName(`${currentUser.displayName}'s server`);
    }
    setStep(2);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!serverName.trim()) return;
    addServer({
      name: serverName.trim(),
      icon: selectedIcon,
      color: selectedColor,
    });
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-[440px] bg-[#313338] text-[#F2F3F5] rounded-lg shadow-2xl overflow-hidden flex flex-col border border-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Step 1: Template Selection */}
        {step === 1 && (
          <div className="flex flex-col">
            <div className="p-6 pb-2 text-center relative">
              <button 
                onClick={handleClose} 
                className="absolute top-4 right-4 text-[#949BA4] hover:text-white transition-colors"
                title="Close"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
              <h2 className="text-2xl font-black text-white mb-2">Create Your Server</h2>
              <p className="text-[14px] text-[#949BA4] leading-snug">
                Your server is where you and your friends hang out. Make yours and start talking.
              </p>
            </div>

            <div className="p-6 pt-3 flex flex-col gap-2 overflow-y-auto max-h-[360px] scrollbar-thin">
              {/* Create My Own */}
              <button
                onClick={() => handleSelectTemplate(null)}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-white/10 hover:bg-[#383A40] transition-colors group text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-xl shrink-0">
                    ✨
                  </span>
                  <div>
                    <h4 className="text-[15px] font-bold text-white group-hover:text-white">Create My Own</h4>
                  </div>
                </div>
                <svg className="w-5 h-5 text-[#949BA4] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </button>

              <div className="text-[12px] font-bold text-[#949BA4] uppercase tracking-wider px-1 pt-3 pb-1">
                Start from a template
              </div>

              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-white/10 hover:bg-[#383A40] transition-colors group text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#2B2D31] flex items-center justify-center text-xl shrink-0 group-hover:bg-[#5865F2] transition-colors">
                      {tmpl.icon}
                    </span>
                    <div>
                      <h4 className="text-[15px] font-bold text-white leading-tight">{tmpl.title}</h4>
                      <p className="text-[12px] text-[#949BA4]">{tmpl.desc}</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-[#949BA4] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Bottom Bar: Join a Server */}
            <div className="bg-[#2B2D31] p-4 text-center border-t border-black/20">
              <p className="text-[13px] text-[#949BA4]">
                Have an invite already?{' '}
                <button 
                  onClick={handleClose}
                  className="text-[#00AFF4] hover:underline font-semibold"
                >
                  Join a Server
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Tell us more */}
        {step === 2 && (
          <div className="flex flex-col">
            <div className="p-6 text-center relative">
              <button 
                onClick={handleClose} 
                className="absolute top-4 right-4 text-[#949BA4] hover:text-white transition-colors"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
              <h2 className="text-2xl font-black text-white mb-2">Tell Us More About Your Server</h2>
              <p className="text-[14px] text-[#949BA4] leading-snug">
                In order to help you with your setup, is your new server for just a few friends or a larger community?
              </p>
            </div>

            <div className="px-6 pb-6 flex flex-col gap-3">
              <button
                onClick={() => setStep(3)}
                className="w-full flex items-center justify-between p-3.5 rounded-lg border border-white/10 hover:bg-[#383A40] transition-colors group text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#5865F2]/20 text-[#5865F2] flex items-center justify-center text-xl shrink-0">
                    👥
                  </span>
                  <span className="text-[15px] font-bold text-white">For me and my friends</span>
                </div>
                <svg className="w-5 h-5 text-[#949BA4] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </button>

              <button
                onClick={() => setStep(3)}
                className="w-full flex items-center justify-between p-3.5 rounded-lg border border-white/10 hover:bg-[#383A40] transition-colors group text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#23A55A]/20 text-[#23A55A] flex items-center justify-center text-xl shrink-0">
                    🌍
                  </span>
                  <span className="text-[15px] font-bold text-white">For a club or community</span>
                </div>
                <svg className="w-5 h-5 text-[#949BA4] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </button>

              <p className="text-center text-[12px] text-[#949BA4] mt-2">
                Not sure? You can{' '}
                <button onClick={() => setStep(3)} className="text-[#00AFF4] hover:underline font-semibold">
                  skip this question
                </button>{' '}
                for now.
              </p>
            </div>

            <div className="bg-[#2B2D31] px-6 py-4 flex items-center justify-between border-t border-black/20">
              <button
                onClick={() => setStep(1)}
                className="text-[14px] font-semibold text-white hover:underline"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Customize Server Details */}
        {step === 3 && (
          <form onSubmit={handleCreate} className="flex flex-col">
            <div className="p-6 text-center relative">
              <button 
                type="button"
                onClick={handleClose} 
                className="absolute top-4 right-4 text-[#949BA4] hover:text-white transition-colors"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
              <h2 className="text-2xl font-black text-white mb-2">Customize Your Server</h2>
              <p className="text-[14px] text-[#949BA4] leading-snug">
                Give your new server a personality with a name and an icon. You can always change it later.
              </p>
            </div>

            <div className="px-6 pb-6 flex flex-col gap-4">
              {/* Icon & Color Selector */}
              <div className="flex flex-col items-center justify-center gap-3">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-xl border-2 border-white/20 transition-all cursor-pointer relative group"
                  style={{ backgroundColor: selectedColor }}
                >
                  {selectedIcon}
                  <span className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-bold text-white uppercase">
                    Pick
                  </span>
                </div>

                {/* Emoji presets */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[320px]">
                  {PRESET_ICONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedIcon(emoji)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-transform ${
                        selectedIcon === emoji ? 'scale-125 bg-white/20' : 'hover:scale-110 hover:bg-white/10'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                {/* Color presets */}
                <div className="flex items-center gap-2 mt-1">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`w-5 h-5 rounded-full transition-all ${
                        selectedColor === c ? 'ring-2 ring-white scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Server Name input */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#B5BAC1] mb-2">
                  Server Name <span className="text-[#ED4245]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  maxLength={50}
                  className="w-full bg-[#1E1F22] text-white text-[15px] px-3 py-2.5 rounded border border-black/40 focus:border-[#5865F2] outline-none transition-colors"
                  placeholder="My awesome server"
                />
                <p className="text-[11px] text-[#949BA4] mt-1.5 leading-snug">
                  By creating a server, you agree to Discord's Community Guidelines.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-[#2B2D31] px-6 py-4 flex items-center justify-between border-t border-black/20">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-[14px] font-semibold text-white hover:underline"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!serverName.trim()}
                className="bg-[#5865F2] hover:bg-[#4752C4] disabled:opacity-50 text-white font-semibold px-6 py-2 rounded text-[14px] transition-colors"
              >
                Create
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
