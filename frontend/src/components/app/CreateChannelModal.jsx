import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function CreateChannelModal() {
  const { createChannelState, closeCreateChannel, addChannel, activeServer } = useApp();
  const [channelType, setChannelType] = useState('text'); // 'text' | 'voice'
  const [channelName, setChannelName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  if (!createChannelState.isOpen) return null;

  const handleClose = () => {
    closeCreateChannel();
    setChannelName('');
    setChannelType('text');
    setIsPrivate(false);
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    if (channelType === 'text') {
      // Discord formats text channel names to lowercase with hyphens
      setChannelName(val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, ''));
    } else {
      setChannelName(val);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!channelName.trim()) return;

    addChannel({
      serverId: createChannelState.serverId || activeServer?.id,
      categoryId: createChannelState.categoryId,
      name: channelName.trim(),
      type: channelType,
      isPrivate,
    });

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-[460px] bg-[#313338] text-[#F2F3F5] rounded-lg shadow-2xl overflow-hidden flex flex-col border border-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 pb-4 flex items-center justify-between border-b border-black/20">
          <div>
            <h3 className="text-[20px] font-bold text-white leading-tight">Create Channel</h3>
            <p className="text-[12px] text-[#949BA4] mt-0.5">
              in {activeServer?.name || 'Server'}
            </p>
          </div>
          <button 
            onClick={handleClose}
            className="text-[#949BA4] hover:text-white transition-colors"
            title="Close"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-5 flex flex-col gap-4">
            {/* Channel Type */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-[#B5BAC1] mb-2">
                Channel Type
              </label>

              <div className="flex flex-col gap-2">
                {/* Text Channel Option */}
                <div
                  onClick={() => setChannelType('text')}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    channelType === 'text' ? 'bg-[#383A40] border border-[#5865F2]' : 'bg-[#2B2D31] hover:bg-[#35373C] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-[#949BA4]">#</span>
                    <div>
                      <h4 className="text-[15px] font-semibold text-white leading-tight">Text</h4>
                      <p className="text-[12px] text-[#949BA4]">Post messages, images, memes, opinions, and puns</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="channelType"
                    checked={channelType === 'text'}
                    onChange={() => setChannelType('text')}
                    className="w-4 h-4 accent-[#5865F2]"
                  />
                </div>

                {/* Voice Channel Option */}
                <div
                  onClick={() => setChannelType('voice')}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    channelType === 'voice' ? 'bg-[#383A40] border border-[#5865F2]' : 'bg-[#2B2D31] hover:bg-[#35373C] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-[#949BA4]">🔊</span>
                    <div>
                      <h4 className="text-[15px] font-semibold text-white leading-tight">Voice</h4>
                      <p className="text-[12px] text-[#949BA4]">Hang out together with voice, video, and screen share</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="channelType"
                    checked={channelType === 'voice'}
                    onChange={() => setChannelType('voice')}
                    className="w-4 h-4 accent-[#5865F2]"
                  />
                </div>
              </div>
            </div>

            {/* Channel Name */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-[#B5BAC1] mb-2">
                Channel Name <span className="text-[#ED4245]">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[#949BA4] font-bold select-none">
                  {channelType === 'text' ? '#' : '🔊'}
                </span>
                <input
                  type="text"
                  required
                  autoFocus
                  value={channelName}
                  onChange={handleNameChange}
                  placeholder={channelType === 'text' ? 'new-channel' : 'General Voice'}
                  maxLength={100}
                  className="w-full bg-[#1E1F22] text-white text-[15px] pl-8 pr-3 py-2.5 rounded border border-black/40 focus:border-[#5865F2] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Private Channel Toggle */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-[#949BA4]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
                <div>
                  <h4 className="text-[14px] font-semibold text-white">Private Channel</h4>
                  <p className="text-[12px] text-[#949BA4]">Only selected members and roles will be able to view this channel</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#4E5058] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865F2]"></div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-[#2B2D31] px-5 py-4 flex items-center justify-end gap-3 border-t border-black/20">
            <button
              type="button"
              onClick={handleClose}
              className="text-[14px] font-medium text-white hover:underline px-3 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!channelName.trim()}
              className="bg-[#5865F2] hover:bg-[#4752C4] disabled:opacity-50 text-white font-semibold px-5 py-2 rounded text-[14px] transition-colors shadow-md"
            >
              Create Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
