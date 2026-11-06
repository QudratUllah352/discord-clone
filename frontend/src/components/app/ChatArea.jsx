import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from './AppShared';

/* ══════════════════════════════════════════════════════════════
   ICON LIBRARY
══════════════════════════════════════════════════════════════ */
const Icon = {
  Hash: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M10.459 2.994l-.459 2.006H6v2h3.541l-.637 2.783H5v2h3.445l-.639 2.794A1 1 0 0 0 8.782 16H9v.011l.004-.011h2.015l.636-2.783H14l-.636 2.783A1 1 0 0 0 14.34 17.2a.985.985 0 0 0 .22.025.998.998 0 0 0 .976-.8l.682-2.983L18 13.472V11.4l-1.323.058.638-2.791L19 8.609V6.537l-1.941.085L17.517 5A1 1 0 0 0 16.541 4a.985.985 0 0 0-.219.025.999.999 0 0 0-.757 1.198L15.918 7h-2.459l.459-2.006A1 1 0 0 0 12.941 3.8a.985.985 0 0 0-.22-.025.998.998 0 0 0-.976.8l-.462 2.019H8.823l.459-2.006A1 1 0 0 0 8.306 2.8h-.001a.985.985 0 0 0-.219.025.999.999 0 0 0-.757 1.198L7.671 6H8zm1.996 4.248h2.459l-.637 2.791-2.46-.108.638-2.683z" />
    </svg>
  ),
  Friends: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
  Bell: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  ),
  Pin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
    </svg>
  ),
  Members: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
  Search: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  ),
  Inbox: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v5H7zm4-3h2v8h-2zm4 6h2v2h-2z" />
    </svg>
  ),
  Help: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </svg>
  ),
  Emoji: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
    </svg>
  ),
  Gift: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 6h-2.18c.07-.23.18-.45.18-.71C18 3.47 16.53 2 14.79 2c-.95 0-1.78.41-2.37 1.05L12 3.5l-.42-.45C10.99 2.41 10.16 2 9.21 2 7.47 2 6 3.47 6 5.29c0 .26.11.48.18.71H4c-1.11 0-2 .9-2 2v12c0 1.11.9 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM14.79 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-5.58 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM20 20H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76V8h2v.76L15.38 12 17 10.83 14.92 8H20v7z" />
    </svg>
  ),
  GIF: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.5 9H13v6h-1.5zM9 9H6C5.2 9 4 9.4 4 11v2c0 1.6 1.2 2 2 2h3v-4H7.5v1.5h1v1H6c-.3 0-.5-.3-.5-1v-2c0-.7.2-1 .5-1h3V9zm12 0h-5v6h1.5v-2.5h2V11h-2v-1h3V9h.5z" />
    </svg>
  ),
  Plus: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 11H13V5h-2v6H5v2h6v6h2v-6h6v-2z" />
    </svg>
  ),
  Sticker: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.95 10.99c-.08.11-.18.21-.29.3l-7.37 7.37C13.37 19.59 12.19 20 11 20c-.34 0-.68-.04-1-.11V21c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-2c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1v-1c0-.55.45-1 1-1h1v-1c0-.55.45-1 1-1h2.59l3.7-3.7c.1-.1.21-.19.3-.27C17.5 5.3 18.74 5 20 5c1.1 0 2 .9 2 2 0 1.5-.69 2.84-1.78 3.74L21 11l.95-.01zM7 20h2v-1H7v1z" />
    </svg>
  ),
  Reply: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
    </svg>
  ),
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  ),
  MoreHoriz: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  ),
  AddReact: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 10h-2v3H8v2h3v3h2v-3h3v-2h-3v-3zm-1-8C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
    </svg>
  ),
  VideoCall: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
    </svg>
  ),
  Call: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  ),
  AddFriend: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  ),
  Grid: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
    </svg>
  ),
  Chat: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
    </svg>
  ),
  Voice: ({ size = 20, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zm7 8c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07C7.61 17.44 5 14.53 5 11H7a5 5 0 0 0 10 0h2z" />
    </svg>
  ),
  Camera: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
    </svg>
  ),
  ScreenShare: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
    </svg>
  ),
  MicOff: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z" />
    </svg>
  ),
  HeadphonesOff: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.21 10.37C5.07 10.9 5 11.44 5 12v4c0 .55.45 1 1 1h1V11H6c0-1.03.26-2 .72-2.84L5.21 10.37zm10.08-5.6C13.86 3.85 12.98 3.5 12 3.5c-1.77 0-3.29.95-4.11 2.36L6.47 4.44C7.59 2.95 9.18 2 10.99 2c1.26 0 2.42.44 3.33 1.17l-.94.93-.09.67zm4.5 2.68L18 6.14C17 4.9 15.56 4 14 3.6V5.1c1.08.37 2.01 1.08 2.69 1.99l1.1-1.64zm-6.79.55V3.5h-2V8h1c.55 0 1 .45 1 1v2h1.17l-1.17-3zM21 11h-1v5h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1zm-5 5H8.83L7 14.17V11H5v5c0 .55.45 1 1 1h9.83L18 14.83v-3.66L16 11v5z" />
    </svg>
  ),
  PhoneHangup: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.996.996 0 0 1 0-1.41C3.36 8.54 7.46 6.75 12 6.75s8.64 1.79 11.71 4.92c.39.39.39 1.02 0 1.41l-2.48 2.48c-.18.18-.43.29-.71.29s-.52-.11-.7-.28c-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" />
    </svg>
  ),
};

/* ══════════════════════════════════════════════════════════════
   TOOLBAR ICON BUTTON
══════════════════════════════════════════════════════════════ */
function ToolBtn({ title, active = false, onClick, children }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <button
        onClick={onClick}
        className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
          active
            ? 'text-white bg-[#404249]'
            : 'text-[#949BA4] hover:text-[#DBDEE1] hover:bg-[#35373C]'
        }`}
      >
        {children}
      </button>
      {show && title && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-[#111214] text-white text-xs font-semibold px-2.5 py-1.5 rounded-md shadow-xl whitespace-nowrap">
            {title}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CHANNEL HEADER
══════════════════════════════════════════════════════════════ */
function ChannelHeader({ channel, memberPanelOpen, toggleMembers }) {
  const { channelViewMode, setChannelViewMode, voiceState, connectVoice, activeServer } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const isVoice = channel.type === 'voice';
  const isVoiceConnectedHere = isVoice && voiceState.isConnected && voiceState.channelId === channel.id;

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <div className="shrink-0 h-12 flex items-center px-4 gap-2 shadow-[0_1px_0_rgba(4,4,5,0.2),0_1.5px_0_rgba(6,6,7,0.05),0_2px_0_rgba(4,4,5,0.05)] bg-[#313338] z-10">
      {/* Channel icon & name */}
      <div className="flex items-center gap-1.5 mr-2">
        {isVoice ? (
          <Icon.Voice size={22} color={isVoiceConnectedHere ? '#23A55A' : '#949BA4'} />
        ) : (
          <Icon.Hash size={22} color="#949BA4" />
        )}
        <span className="font-bold text-white text-[15px] leading-5">{channel.name}</span>
      </div>

      {/* Voice View Mode Switcher (Voice Grid vs Text Chat) */}
      {isVoice && (
        <div className="flex items-center bg-[#2B2D31] rounded-md p-0.5 border border-white/5 mr-2">
          <button
            onClick={() => setChannelViewMode('voice')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[12px] font-semibold transition-colors cursor-pointer ${
              channelViewMode === 'voice' ? 'bg-[#404249] text-white shadow-sm' : 'text-[#949BA4] hover:text-white'
            }`}
            title="Voice Grid View"
          >
            <Icon.Grid size={14} />
            <span>Voice Grid</span>
          </button>
          <button
            onClick={() => setChannelViewMode('chat')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[12px] font-semibold transition-colors cursor-pointer ${
              channelViewMode === 'chat' ? 'bg-[#404249] text-white shadow-sm' : 'text-[#949BA4] hover:text-white'
            }`}
            title="Text Chat View"
          >
            <Icon.Chat size={14} />
            <span>Text Chat</span>
          </button>
        </div>
      )}

      {/* Connect button if viewing a voice channel but not connected yet */}
      {isVoice && !isVoiceConnectedHere && (
        <button
          onClick={() => connectVoice(channel, activeServer?.id)}
          className="flex items-center gap-1.5 bg-[#23A55A] hover:bg-[#1a9850] text-white text-[12px] font-bold px-3 py-1 rounded-md transition-colors shadow-sm ml-1 cursor-pointer"
        >
          <Icon.Voice size={14} color="white" />
          <span>Join Voice</span>
        </button>
      )}

      {/* Topic divider */}
      {channel.topic && !isVoice && (
        <>
          <div className="w-px h-5 bg-[#35373C]" />
          <span className="text-[14px] text-[#949BA4] truncate max-w-[300px]">{channel.topic}</span>
        </>
      )}

      {/* Right toolbar */}
      <div className="ml-auto flex items-center gap-0.5">
        <ToolBtn title="Threads">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5.43 21L7 14H2l9.57-11H15l-1.57 7H19L5.43 21z" />
          </svg>
        </ToolBtn>
        <ToolBtn title="Notification Settings">
          <Icon.Bell />
        </ToolBtn>
        <ToolBtn title="Pinned Messages">
          <Icon.Pin />
        </ToolBtn>
        <ToolBtn title="Member List" active={memberPanelOpen} onClick={toggleMembers}>
          <Icon.Members />
        </ToolBtn>

        {/* Search */}
        <div className="relative ml-1 flex items-center">
          {searchOpen ? (
            <input
              ref={searchRef}
              autoFocus
              placeholder="Search"
              onBlur={() => setSearchOpen(false)}
              className="bg-[#1E1F22] text-[13px] text-white pl-2.5 pr-7 py-1 rounded-[4px] outline-none w-48 placeholder-[#4E5058] h-[26px]"
            />
          ) : (
            <button
              className="bg-[#1E1F22] text-[13px] text-[#4E5058] hover:text-[#949BA4] pl-2.5 pr-2 py-1 rounded-[4px] h-[26px] flex items-center gap-1.5 w-36 transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <span className="flex-1 text-left">Search</span>
              <Icon.Search size={14} />
            </button>
          )}
        </div>

        <ToolBtn title="Inbox">
          <Icon.Inbox />
        </ToolBtn>
        <ToolBtn title="Help">
          <Icon.Help />
        </ToolBtn>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DM HEADER
══════════════════════════════════════════════════════════════ */
function DmHeader({ dm }) {
  return (
    <div className="shrink-0 h-12 flex items-center px-4 gap-2 shadow-[0_1px_0_rgba(4,4,5,0.2)] bg-[#313338] z-10">
      <Avatar name={dm.user.name} color={dm.user.color} size={24} status={dm.user.status} />
      <span className="font-bold text-white text-[15px]">{dm.user.name}</span>
      <div className="ml-auto flex items-center gap-0.5">
        <ToolBtn title="Start Voice Call"><Icon.Call /></ToolBtn>
        <ToolBtn title="Start Video Call"><Icon.VideoCall /></ToolBtn>
        <ToolBtn title="Add Friends to DM"><Icon.AddFriend /></ToolBtn>
        <ToolBtn title="Pinned Messages"><Icon.Pin /></ToolBtn>
        <ToolBtn title="Member Profile"><Icon.Members /></ToolBtn>
        <div className="relative ml-1">
          <input
            placeholder="Search"
            className="bg-[#1E1F22] text-[13px] text-white px-2.5 py-1 rounded-[4px] outline-none w-36 placeholder-[#4E5058] h-[26px]"
          />
        </div>
        <ToolBtn title="Inbox"><Icon.Inbox /></ToolBtn>
        <ToolBtn title="Help"><Icon.Help /></ToolBtn>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MESSAGE HOVER ACTIONS
══════════════════════════════════════════════════════════════ */
function MessageActions({ visible }) {
  if (!visible) return null;
  const quickEmojis = ['👍', '❤️', '😂', '🔥', '😮'];
  return (
    <div className="absolute -top-4 right-4 z-20 flex items-center bg-[#2B2D31] border border-[#232428] rounded-md shadow-xl overflow-hidden">
      {quickEmojis.map((e) => (
        <button
          key={e}
          className="w-8 h-8 flex items-center justify-center hover:bg-[#404249] text-[15px] transition-colors"
        >
          {e}
        </button>
      ))}
      <div className="w-px h-5 bg-[#35373C] mx-0.5" />
      <button className="w-8 h-8 flex items-center justify-center hover:bg-[#404249] text-[#949BA4] hover:text-white transition-colors" title="Add Reaction">
        <Icon.AddReact />
      </button>
      <button className="w-8 h-8 flex items-center justify-center hover:bg-[#404249] text-[#949BA4] hover:text-white transition-colors" title="Reply">
        <Icon.Reply />
      </button>
      <button className="w-8 h-8 flex items-center justify-center hover:bg-[#404249] text-[#949BA4] hover:text-white transition-colors" title="Edit Message">
        <Icon.Edit />
      </button>
      <button className="w-8 h-8 flex items-center justify-center hover:bg-[#404249] text-[#949BA4] hover:text-white transition-colors" title="More">
        <Icon.MoreHoriz />
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MESSAGE ITEM
══════════════════════════════════════════════════════════════ */
function Message({ msg, showHeader, prevMsg }) {
  const [hovered, setHovered] = useState(false);

  // Group messages within 7 minutes
  const isCompact = !showHeader;

  return (
    <div
      className={`relative group flex gap-4 px-4 py-0.5 hover:bg-[#2E3035] transition-colors ${
        showHeader ? 'mt-[17px]' : ''
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <MessageActions visible={hovered} />

      {/* Avatar column */}
      <div className="w-10 shrink-0 mt-0.5">
        {showHeader ? (
          <Avatar name={msg.author} color={msg.color} size={40} />
        ) : (
          <span
            className="text-[11px] text-[#4E5058] leading-[1.375rem] select-none invisible group-hover:visible block text-right"
          >
            {msg.timestamp}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {showHeader && (
          <div className="flex items-baseline gap-2 flex-wrap mb-[2px]">
            <span
              className="text-[15px] font-semibold leading-[1.375rem] hover:underline cursor-pointer"
              style={{ color: msg.color || '#FFFFFF' }}
            >
              {msg.author}
            </span>
            {msg.isBot && (
              <span className="text-[9px] font-bold bg-[#5865F2] text-white px-[5px] py-[1px] rounded tracking-wider uppercase">
                APP
              </span>
            )}
            <span className="text-[11px] text-[#4E5058] leading-[1.375rem] font-medium">
              {/* Full date-like format */}
              {new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}
              {' '}{msg.timestamp}
            </span>
          </div>
        )}
        <p className="text-[15px] leading-[1.375rem] text-[#DBDEE1] break-words whitespace-pre-wrap">
          {msg.content}
        </p>
        {/* Reactions */}
        {msg.reactions && (
          <div className="flex flex-wrap gap-1 mt-1">
            {msg.reactions.map((r, i) => (
              <button
                key={i}
                className="flex items-center gap-1 bg-[#2B2D31] hover:bg-[#404249] border border-[#5865F2]/30 rounded-md px-2 py-0.5 text-sm transition-colors"
              >
                <span>{r.emoji}</span>
                <span className="text-[12px] font-medium text-[#949BA4]">{r.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DATE DIVIDER
══════════════════════════════════════════════════════════════ */
function DateDivider({ label = 'Today' }) {
  return (
    <div className="flex items-center gap-4 mx-4 my-4">
      <div className="flex-1 h-px bg-[#3F4147]" />
      <span className="text-[12px] font-semibold text-[#949BA4] whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-[#3F4147]" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CHANNEL INTRO (shown at top of message list)
══════════════════════════════════════════════════════════════ */
function ChannelIntro({ channel }) {
  return (
    <div className="px-4 pb-4 pt-16">
      <div className="w-16 h-16 rounded-full bg-[#1E1F22] flex items-center justify-center mb-4">
        <Icon.Hash size={36} color="#949BA4" />
      </div>
      <h1 className="text-[32px] font-black text-white mb-2">Welcome to #{channel.name}!</h1>
      <p className="text-[16px] text-[#949BA4]">
        This is the start of the #{channel.name} channel.
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MESSAGE LIST
══════════════════════════════════════════════════════════════ */
function MessageList({ messages, channel }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [messages?.length]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      {channel && <ChannelIntro channel={channel} />}
      <DateDivider label="Today" />
      {messages.map((msg, i) => {
        const prev = messages[i - 1];
        const showHeader =
          !prev ||
          prev.authorId !== msg.authorId ||
          prev.isBot !== msg.isBot;
        return (
          <Message key={msg.id} msg={msg} showHeader={showHeader} prevMsg={prev} />
        );
      })}
      <div ref={bottomRef} className="h-6" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MESSAGE INPUT
══════════════════════════════════════════════════════════════ */
function MessageInput({ placeholder }) {
  const { sendMessage } = useApp();
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef(null);

  const submit = () => {
    if (!value.trim()) return;
    sendMessage(value.trim());
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    textareaRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const onInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  };

  return (
    <div className="shrink-0 px-4 pb-6">
      <div
        className="flex items-end bg-[#383A40] rounded-lg overflow-hidden"
        style={{ boxShadow: '0 1px 0 rgba(4,4,5,0.2)' }}
      >
        {/* Upload button */}
        <button className="shrink-0 p-3 pb-[11px] text-[#949BA4] hover:text-white transition-colors">
          <Icon.Plus />
        </button>

        {/* Textarea */}
        <div className="flex-1 min-w-0 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            onInput={onInput}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            rows={1}
            className="w-full bg-transparent text-[#DBDEE1] text-[15px] placeholder-[#4E5058] resize-none outline-none leading-[1.375rem] py-[11px] max-h-[200px] scrollbar-thin"
          />
        </div>

        {/* Right toolbar */}
        <div className="flex items-center gap-0.5 pr-2 pb-1.5">
          <button className="p-1.5 text-[#949BA4] hover:text-white transition-colors" title="Send a gift">
            <Icon.Gift />
          </button>
          <button className="p-1.5 text-[#949BA4] hover:text-white transition-colors" title="Open GIF picker">
            <Icon.GIF />
          </button>
          <button className="p-1.5 text-[#949BA4] hover:text-white transition-colors" title="Open sticker picker">
            <Icon.Sticker />
          </button>
          <button className="p-1.5 text-[#949BA4] hover:text-white transition-colors" title="Open emoji picker">
            <Icon.Emoji />
          </button>
          {value.trim() && (
            <button
              onClick={submit}
              className="p-1.5 text-white bg-[#5865F2] hover:bg-[#4752C4] rounded-sm transition-colors ml-0.5"
              title="Send message (Enter)"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FRIENDS VIEW — Detailed
══════════════════════════════════════════════════════════════ */
function FriendsView() {
  const [tab, setTab] = useState('online');

  const allFriends = [
    {
      id: 'f1', name: 'ProGamer99', status: 'online', color: '#ED4245',
      activity: { type: 'Playing', name: 'Valorant', detail: 'In a match • 42:30 elapsed' },
    },
    {
      id: 'f2', name: 'CodeWizard', status: 'dnd', color: '#5865F2',
      activity: { type: 'Custom', name: '💻 shipping code at 3am', detail: null },
    },
    {
      id: 'f3', name: 'LoFiQueen', status: 'idle', color: '#EB459E',
      activity: { type: 'Listening', name: 'Spotify', detail: 'lo-fi hip hop radio - beats to study/relax to' },
    },
    {
      id: 'f4', name: 'SilentGhost', status: 'offline', color: '#57F287', activity: null },
    {
      id: 'f5', name: 'PixelKing', status: 'online', color: '#00AFF4',
      activity: { type: 'Playing', name: 'Minecraft', detail: 'Building a base' },
    },
  ];

  const pending = [
    { id: 'p1', name: 'NewUser123', color: '#FEE75C', type: 'incoming' },
    { id: 'p2', name: 'GamerXYZ', color: '#EB459E', type: 'outgoing' },
  ];

  const tabs = [
    { key: 'online', label: 'Online' },
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending', badge: pending.length },
    { key: 'blocked', label: 'Blocked' },
    { key: 'add', label: 'Add Friend', isAction: true },
  ];

  const statusMeta = {
    online: { label: 'Online', color: '#23A55A' },
    idle: { label: 'Idle', color: '#F0B232' },
    dnd: { label: 'Do Not Disturb', color: '#F23F43' },
    offline: { label: 'Offline', color: '#80848E' },
  };

  const filtered = tab === 'online'
    ? allFriends.filter((f) => f.status !== 'offline')
    : tab === 'all'
    ? allFriends
    : tab === 'pending'
    ? pending
    : [];

  const FriendRow = ({ f }) => {
    const [hovered, setHovered] = useState(false);
    const meta = statusMeta[f.status] ?? statusMeta.offline;
    return (
      <div
        className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors border-t border-[#2E3035] group ${hovered ? 'bg-[#35373C]' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Avatar name={f.name} color={f.color} size={40} status={f.status} />
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-semibold text-white truncate">{f.name}</p>
          {f.activity ? (
            <p className="text-[13px] text-[#949BA4] truncate">
              {f.activity.type === 'Playing' ? '🎮' : f.activity.type === 'Listening' ? '🎵' : ''}{' '}
              {f.activity.name}
              {f.activity.detail && ` • ${f.activity.detail}`}
            </p>
          ) : (
            <p className="text-[13px] truncate" style={{ color: meta.color }}>{meta.label}</p>
          )}
        </div>
        <div className={`flex items-center gap-2 ${hovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
          <button className="w-9 h-9 rounded-full bg-[#1E1F22] flex items-center justify-center text-[#949BA4] hover:text-white hover:bg-[#35373C] transition-colors" title="Send Message">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-full bg-[#1E1F22] flex items-center justify-center text-[#949BA4] hover:text-white hover:bg-[#35373C] transition-colors" title="More">
            <Icon.MoreHoriz />
          </button>
        </div>
      </div>
    );
  };

  const PendingRow = ({ p }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <div
        className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors border-t border-[#2E3035] ${hovered ? 'bg-[#35373C]' : ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Avatar name={p.name} color={p.color} size={40} />
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-semibold text-white truncate">{p.name}</p>
          <p className="text-[13px] text-[#949BA4]">
            {p.type === 'incoming' ? '📥 Incoming Friend Request' : '📤 Outgoing Friend Request'}
          </p>
        </div>
        <div className={`flex items-center gap-2 ${hovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
          {p.type === 'incoming' && (
            <button className="w-9 h-9 rounded-full bg-[#1E1F22] flex items-center justify-center text-[#23A55A] hover:text-white hover:bg-[#23A55A] transition-colors" title="Accept">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </button>
          )}
          <button className="w-9 h-9 rounded-full bg-[#1E1F22] flex items-center justify-center text-[#ED4245] hover:text-white hover:bg-[#ED4245] transition-colors" title="Ignore / Cancel">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  if (tab === 'add') {
    return (
      <div className="flex flex-col h-full">
        <div className="shrink-0 h-12 flex items-center px-4 gap-4 shadow-[0_1px_0_rgba(4,4,5,0.2)]">
          <Icon.Friends />
          <span className="font-bold text-white text-[15px]">Friends</span>
          <div className="w-px h-5 bg-[#35373C]" />
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative px-3 py-1 rounded-md text-[14px] font-medium transition-colors ${
                tab === t.key || (t.isAction && tab === 'add')
                  ? 'bg-[#404249] text-white'
                  : 'text-[#949BA4] hover:bg-[#35373C] hover:text-white'
              }`}
            >
              {t.label}
              {t.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ED4245] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="flex-1 p-6">
          <h2 className="text-[20px] font-bold text-white mb-2">ADD FRIEND</h2>
          <p className="text-[14px] text-[#949BA4] mb-4">
            You can add friends with their Discord username.
          </p>
          <div className="flex items-center gap-3 bg-[#1E1F22] rounded-md px-4 py-3 border border-[#35373C] focus-within:border-[#5865F2] transition-colors">
            <input
              autoFocus
              className="flex-1 bg-transparent text-[16px] text-white placeholder-[#4E5058] outline-none"
              placeholder="You can add friends with their Discord username."
            />
            <button className="shrink-0 px-4 py-1.5 bg-[#5865F2] hover:bg-[#4752C4] text-white text-[14px] font-semibold rounded-sm transition-colors">
              Send Friend Request
            </button>
          </div>
          <p className="text-[12px] text-[#949BA4] mt-2">
            Hm, didn't work? Remember usernames are case sensitive!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 h-12 flex items-center px-4 gap-2 shadow-[0_1px_0_rgba(4,4,5,0.2)]">
        <Icon.Friends />
        <span className="font-bold text-white text-[15px]">Friends</span>
        <div className="w-px h-5 bg-[#35373C] mx-2" />
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`relative px-3 py-1 rounded-md text-[14px] font-medium transition-colors ${
              tab === t.key
                ? 'bg-[#404249] text-white'
                : t.isAction
                ? 'text-white bg-[#23A55A] hover:bg-[#1a9850]'
                : 'text-[#949BA4] hover:bg-[#35373C] hover:text-white'
            }`}
          >
            {t.label}
            {t.badge > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ED4245] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                {t.badge}
              </span>
            )}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1">
          <ToolBtn title="Inbox"><Icon.Inbox /></ToolBtn>
          <ToolBtn title="Help"><Icon.Help /></ToolBtn>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#949BA4] mb-2">
            {tab === 'online' ? `Online — ${filtered.length}` :
             tab === 'all' ? `All Friends — ${filtered.length}` :
             tab === 'pending' ? `Pending — ${pending.length}` :
             'Blocked — 0'}
          </p>
          <div className="flex flex-col">
            {tab === 'pending'
              ? pending.map((p) => <PendingRow key={p.id} p={p} />)
              : tab === 'blocked'
              ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="text-6xl mb-4">🚫</div>
                  <p className="text-[16px] font-semibold text-[#949BA4]">No blocked users.</p>
                </div>
              )
              : filtered.length === 0
              ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="text-7xl mb-4">👻</div>
                  <p className="text-[16px] font-semibold text-[#DBDEE1]">Wumpus is waiting on friends.</p>
                  <p className="text-[14px] text-[#949BA4] mt-2">You don't have any friends that are online right now.</p>
                </div>
              )
              : filtered.map((f) => <FriendRow key={f.id} f={f} />)
            }
          </div>
        </div>

        {/* Right Activity Panel */}
        <div className="hidden xl:flex w-[360px] border-l border-[#1E1F22] flex-col p-4 overflow-y-auto scrollbar-thin">
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#949BA4] mb-3">Active Now</p>
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <div className="w-16 h-16 rounded-full bg-[#1E1F22] flex items-center justify-center text-3xl mb-3">👀</div>
            <p className="text-[16px] font-bold text-white mb-1">It's quiet for now…</p>
            <p className="text-[14px] text-[#949BA4]">When a friend starts an activity — like playing a game or hanging out on voice — we'll show it here!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DM CHAT VIEW
══════════════════════════════════════════════════════════════ */
function DmChatView() {
  const { activeDm, currentMessages } = useApp();
  if (!activeDm) return null;

  return (
    <div className="flex flex-col h-full">
      <DmHeader dm={activeDm} />
      <MessageList messages={currentMessages} />
      <MessageInput placeholder={`Message @${activeDm.user.name}`} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   VOICE GRID VIEW
══════════════════════════════════════════════════════════════ */
function VoiceGridView({ channel }) {
  const { 
    currentUser, 
    voiceState, 
    connectVoice, 
    disconnectVoice, 
    toggleVoiceMute, 
    toggleVoiceDeafen, 
    toggleVoiceCamera, 
    toggleVoiceScreenShare,
    activeServer 
  } = useApp();

  const isConnected = voiceState.isConnected && voiceState.channelId === channel.id;

  // Simulate active speakers with periodic randomized talking state
  const [activeSpeaker, setActiveSpeaker] = useState('u1');

  useEffect(() => {
    const interval = setInterval(() => {
      const candidates = ['u1', 'm1', 'm5', 'none'];
      const picked = candidates[Math.floor(Math.random() * candidates.length)];
      setActiveSpeaker(picked);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const participants = [
    {
      id: 'u1',
      name: currentUser.displayName,
      initials: currentUser.avatarInitials,
      color: currentUser.avatarColor || '#5865F2',
      isSelf: true,
      isMuted: voiceState.isMuted,
      isDeafened: voiceState.isDeafened,
      isCameraOn: voiceState.isCameraOn,
      isScreenSharing: voiceState.isScreenSharing,
      isSpeaking: !voiceState.isMuted && activeSpeaker === 'u1',
    },
    {
      id: 'm1',
      name: 'ProGamer99',
      color: '#ED4245',
      isSelf: false,
      isMuted: false,
      isDeafened: false,
      isCameraOn: false,
      isScreenSharing: false,
      isSpeaking: activeSpeaker === 'm1',
    },
    {
      id: 'm5',
      name: 'PixelKing',
      color: '#00AFF4',
      isSelf: false,
      isMuted: false,
      isDeafened: false,
      isCameraOn: false,
      isScreenSharing: false,
      isSpeaking: activeSpeaker === 'm5',
    },
    {
      id: 'm3',
      name: 'CoolDude',
      color: '#EB459E',
      isSelf: false,
      isMuted: true,
      isDeafened: false,
      isCameraOn: false,
      isScreenSharing: false,
      isSpeaking: false,
    },
  ];

  if (!isConnected) {
    return (
      <div className="flex-1 bg-[#1E1F22] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-[#2B2D31] flex items-center justify-center text-4xl mb-4 shadow-xl">
          🔊
        </div>
        <h2 className="text-2xl font-black text-white mb-2">{channel.name}</h2>
        <p className="text-[15px] text-[#949BA4] max-w-[420px] mb-6">
          You are viewing this voice channel. Click Join Voice to connect your audio and talk with members.
        </p>
        <button
          onClick={() => connectVoice(channel, activeServer?.id)}
          className="flex items-center gap-2 bg-[#23A55A] hover:bg-[#1a9850] text-white font-bold px-6 py-2.5 rounded-md transition-all shadow-lg hover:scale-105 cursor-pointer"
        >
          <Icon.Voice size={18} color="white" />
          <span>Join Voice</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#111214] flex flex-col relative overflow-hidden select-none">
      {/* Participant Stage Grid */}
      <div className="flex-1 p-6 overflow-y-auto scrollbar-thin grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 pb-28 place-items-stretch">
        {participants.map((p) => (
          <div
            key={p.id}
            className={`relative rounded-2xl overflow-hidden bg-[#2B2D31] border transition-all duration-200 flex flex-col items-center justify-center min-h-[200px] shadow-lg group ${
              p.isSpeaking
                ? 'border-[#23A55A] ring-4 ring-[#23A55A]/40 shadow-[0_0_24px_rgba(35,165,90,0.4)]'
                : 'border-white/5'
            }`}
          >
            {/* Live Camera Simulation */}
            {p.isCameraOn ? (
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1E1F22] via-[#2B2D31] to-[#383A40] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white animate-pulse">
                    <Icon.Camera size={28} />
                  </div>
                  <span className="text-xs text-[#949BA4] font-semibold">Camera is live</span>
                </div>
              </div>
            ) : p.isScreenSharing ? (
              /* Screen Share Simulation */
              <div className="absolute inset-0 bg-[#1E1F22] border-2 border-[#5865F2]/40 flex flex-col items-center justify-center p-4">
                <div className="w-16 h-16 rounded-xl bg-[#5865F2]/20 text-[#5865F2] flex items-center justify-center mb-2">
                  <Icon.ScreenShare size={32} />
                </div>
                <span className="text-xs text-white font-bold bg-[#5865F2] px-2 py-0.5 rounded-full mb-1">LIVE</span>
                <span className="text-[13px] text-[#DBDEE1] font-semibold">{p.name}'s Screen</span>
              </div>
            ) : (
              /* Regular Avatar Representation */
              <div className="relative">
                <Avatar
                  name={p.name}
                  initials={p.initials}
                  color={p.color}
                  size={96}
                  className={`transition-all duration-200 ${
                    p.isSpeaking ? 'ring-4 ring-[#23A55A] shadow-[0_0_25px_rgba(35,165,90,0.8)] scale-105' : ''
                  }`}
                />
                {p.isSpeaking && (
                  <span className="absolute -inset-2 rounded-full ring-2 ring-[#23A55A] animate-ping opacity-60 pointer-events-none" />
                )}
              </div>
            )}

            {/* Bottom-left Name Tag Badge */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md max-w-[80%] border border-white/5">
              <span className={`w-2 h-2 rounded-full ${p.isSpeaking ? 'bg-[#23A55A] animate-pulse' : 'bg-[#949BA4]'}`} />
              <span className="text-[13px] font-semibold text-white truncate">{p.name}</span>
              {p.isSelf && <span className="text-[11px] text-[#949BA4]">(You)</span>}
            </div>

            {/* Bottom-right Status Badges (Mute / Deafen) */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
              {p.isMuted && (
                <div className="w-7 h-7 rounded-full bg-[#ED4245] flex items-center justify-center text-white shadow-md" title="Muted">
                  <Icon.MicOff size={14} />
                </div>
              )}
              {p.isDeafened && (
                <div className="w-7 h-7 rounded-full bg-[#ED4245] flex items-center justify-center text-white shadow-md" title="Deafened">
                  <Icon.HeadphonesOff size={14} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Stage Controls Dock (Bottom Center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1E1F22] rounded-2xl p-2 px-3 flex items-center gap-2 shadow-2xl border border-white/10 z-30 animate-in slide-in-from-bottom duration-200">
        {/* Camera Toggle */}
        <button
          onClick={toggleVoiceCamera}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            voiceState.isCameraOn
              ? 'bg-[#23A55A] text-white shadow-lg shadow-[#23A55A]/30'
              : 'bg-[#2B2D31] text-white hover:bg-[#383A40]'
          }`}
          title={voiceState.isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
        >
          <Icon.Camera size={20} />
        </button>

        {/* Screen Share Toggle */}
        <button
          onClick={toggleVoiceScreenShare}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            voiceState.isScreenSharing
              ? 'bg-[#5865F2] text-white shadow-lg shadow-[#5865F2]/30'
              : 'bg-[#2B2D31] text-white hover:bg-[#383A40]'
          }`}
          title={voiceState.isScreenSharing ? 'Stop Screen Sharing' : 'Share Your Screen'}
        >
          <Icon.ScreenShare size={20} />
        </button>

        {/* Mute Mic Toggle */}
        <button
          onClick={toggleVoiceMute}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            voiceState.isMuted
              ? 'bg-[#ED4245] text-white shadow-lg shadow-[#ED4245]/30'
              : 'bg-[#2B2D31] text-white hover:bg-[#383A40]'
          }`}
          title={voiceState.isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
        >
          {voiceState.isMuted ? <Icon.MicOff size={20} /> : <Icon.Voice size={20} />}
        </button>

        {/* Deafen Toggle */}
        <button
          onClick={toggleVoiceDeafen}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            voiceState.isDeafened
              ? 'bg-[#ED4245] text-white shadow-lg shadow-[#ED4245]/30'
              : 'bg-[#2B2D31] text-white hover:bg-[#383A40]'
          }`}
          title={voiceState.isDeafened ? 'Undeafen' : 'Deafen'}
        >
          {voiceState.isDeafened ? <Icon.HeadphonesOff size={20} /> : (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1C7.03 1 3 5.03 3 10v7c0 1.1.9 2 2 2h1v-8H4v-1c0-4.42 3.58-8 8-8s8 3.58 8 8v1h-2v8h1c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z" />
            </svg>
          )}
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Disconnect Hang Up Button (Red Pill) */}
        <button
          onClick={disconnectVoice}
          className="flex items-center gap-2 bg-[#ED4245] hover:bg-[#c03437] text-white font-bold px-4 h-11 rounded-xl transition-all shadow-lg shadow-[#ED4245]/30 cursor-pointer"
          title="Disconnect from Voice"
        >
          <Icon.PhoneHangup size={18} />
          <span className="text-[14px]">Disconnect</span>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SERVER / CHANNEL VIEW
══════════════════════════════════════════════════════════════ */
function ChannelView() {
  const { 
    activeChannel, 
    activeServer, 
    currentMessages, 
    memberPanelOpen, 
    setMemberPanelOpen,
    channelViewMode
  } = useApp();

  if (!activeChannel) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
        <span className="text-7xl mb-6">👋</span>
        <h2 className="text-2xl font-black text-white mb-2">Welcome to {activeServer?.name}!</h2>
        <p className="text-[16px] text-[#949BA4]">Select a channel to start chatting.</p>
      </div>
    );
  }

  const isVoiceChannel = activeChannel.type === 'voice';

  return (
    <div className="flex flex-col h-full relative">
      <ChannelHeader
        channel={activeChannel}
        memberPanelOpen={memberPanelOpen}
        toggleMembers={() => setMemberPanelOpen((p) => !p)}
      />

      {/* Render Voice Grid View OR Text Chat View */}
      {isVoiceChannel && channelViewMode === 'voice' ? (
        <VoiceGridView channel={activeChannel} />
      ) : (
        <>
          <MessageList messages={currentMessages} channel={activeChannel} />
          <MessageInput placeholder={isVoiceChannel ? `Message in #${activeChannel.name}` : `Message #${activeChannel.name}`} />
        </>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CHAT AREA (EXPORT)
══════════════════════════════════════════════════════════════ */
export default function ChatArea() {
  const { view } = useApp();
  return (
    <div className="flex-1 h-full bg-[#313338] flex flex-col overflow-hidden min-w-0">
      {view === 'friends' && <FriendsView />}
      {view === 'dm'      && <DmChatView />}
      {view === 'server'  && <ChannelView />}
    </div>
  );
}
