import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar, StatusDot } from './AppShared';

/* ══════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════ */
const HashIcon = ({ size = 16, className = '' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.459 2.994l-.459 2.006H6v2h3.541l-.637 2.783H5v2h3.445l-.639 2.794A1 1 0 0 0 8.782 16H9v.011l.004-.011h2.015l.636-2.783H14l-.636 2.783A1 1 0 0 0 14.34 17.2a.985.985 0 0 0 .22.025.998.998 0 0 0 .976-.8l.682-2.983L18 13.472V11.4l-1.323.058.638-2.791L19 8.609V6.537l-1.941.085L17.517 5A1 1 0 0 0 16.541 4a.985.985 0 0 0-.219.025.999.999 0 0 0-.757 1.198L15.918 7h-2.459l.459-2.006A1 1 0 0 0 12.941 3.8a.985.985 0 0 0-.22-.025.998.998 0 0 0-.976.8l-.462 2.019H8.823l.459-2.006A1 1 0 0 0 8.306 2.8h-.001a.985.985 0 0 0-.219.025.999.999 0 0 0-.757 1.198L7.671 6H8zm1.996 4.248h2.459l-.637 2.791-2.46-.108.638-2.683z" />
  </svg>
);

const VoiceIcon = ({ className = '' }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zm7 8c0 3.53-2.61 6.44-6 6.93V21h-2v-3.07C7.61 17.44 5 14.53 5 11H7a5 5 0 0 0 10 0h2z" />
  </svg>
);

const ChevronIcon = ({ open, className = '' }) => (
  <svg
    className={`transition-transform duration-150 ${open ? 'rotate-0' : '-rotate-90'} ${className}`}
    width="12" height="12" viewBox="0 0 24 24" fill="currentColor"
  >
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

const AddIcon = ({ className = '' }) => (
  <svg className={className} width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
  </svg>
);

const GearIcon = ({ className = '' }) => (
  <svg className={className} width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96a7.07 7.07 0 0 0-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const MicOnIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.42 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
  </svg>
);

const MicOffIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z" />
  </svg>
);

const HeadphonesOnIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 1C7.03 1 3 5.03 3 10v7c0 1.1.9 2 2 2h1v-8H4v-1c0-4.42 3.58-8 8-8s8 3.58 8 8v1h-2v8h2c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z" />
  </svg>
);

const HeadphonesOffIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5.21 10.37C5.07 10.9 5 11.44 5 12v4c0 .55.45 1 1 1h1V11H6c0-1.03.26-2 .72-2.84L5.21 10.37zm10.08-5.6C13.86 3.85 12.98 3.5 12 3.5c-1.77 0-3.29.95-4.11 2.36L6.47 4.44C7.59 2.95 9.18 2 10.99 2c1.26 0 2.42.44 3.33 1.17l-.94.93-.09.67zm4.5 2.68L18 6.14C17 4.9 15.56 4 14 3.6V5.1c1.08.37 2.01 1.08 2.69 1.99l1.1-1.64zm-6.79.55V3.5h-2V8h1c.55 0 1 .45 1 1v2h1.17l-1.17-3zM21 11h-1v5h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1zm-5 5H8.83L7 14.17V11H5v5c0 .55.45 1 1 1h9.83L18 14.83v-3.66L16 11v5z" />
  </svg>
);

const FriendsIcon = ({ active = false }) => (
  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"
    style={{ color: active ? 'white' : undefined }}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

const NitroIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14v-4H7l5-8v4h4l-5 8z" />
  </svg>
);

const ShopIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   USER CONTROLS (bottom of sidebar)
══════════════════════════════════════════════════════════════ */
function UserControls() {
  const { currentUser, userStatus, setUserStatus, openSettings } = useApp();
  const [muted, setMuted] = useState(false);
  const [deafened, setDeafened] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const statuses = [
    { key: 'online',    label: 'Online',         color: '#23A55A' },
    { key: 'idle',      label: 'Idle',            color: '#F0B232' },
    { key: 'dnd',       label: 'Do Not Disturb',  color: '#F23F43', desc: 'You will not receive any desktop notifications.' },
    { key: 'invisible', label: 'Invisible',       color: '#80848E', desc: 'You will not appear online, but will have full access to all of Discord.' },
  ];

  const currentStatus = statuses.find((s) => s.key === userStatus) ?? statuses[0];

  const CtrlBtn = ({ onClick, active, activeColor = '#ED4245', title, children }) => (
    <button
      onClick={onClick}
      title={title}
      className={`relative w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
        active
          ? 'text-[#ED4245] hover:bg-[#ED4245]/20'
          : 'text-[#949BA4] hover:bg-[#35373C] hover:text-white'
      }`}
    >
      {children}
      {active && (
        <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-[#ED4245] rounded-sm flex items-center justify-center">
          <svg width="8" height="8" fill="white" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </span>
      )}
    </button>
  );

  return (
    <div className="shrink-0 h-[52px] bg-[#232428] flex items-center px-2 gap-0.5">
      {/* Avatar + name area */}
      <div
        className="flex items-center gap-2 flex-1 min-w-0 px-1 h-full hover:bg-[#35373C] rounded-md cursor-pointer transition-colors relative"
        onClick={() => setShowMenu((p) => !p)}
        ref={menuRef}
      >
        <Avatar 
          name={currentUser.displayName} 
          initials={currentUser.avatarInitials}
          color={currentUser.avatarColor || '#5865F2'} 
          size={32} 
          status={userStatus} 
        />
        <div className="flex flex-col min-w-0">
          <span className="text-[13px] font-semibold text-white leading-tight truncate">
            {currentUser.displayName}
          </span>
          <span className="text-[11px] text-[#949BA4] leading-tight truncate">
            {currentStatus.label}
          </span>
        </div>

        {/* Status Context Menu */}
        {showMenu && (
          <div className="absolute bottom-14 left-0 w-[220px] bg-[#111214] rounded-lg shadow-2xl z-50 py-1.5 border border-black/30">
            <div className="px-3 pt-2 pb-1">
              <p className="text-xs font-bold text-white truncate">{currentUser.displayName}</p>
            </div>
            <div className="h-px bg-[#2B2D31] mx-2 my-1" />
            <p className="text-[11px] font-bold text-[#949BA4] uppercase tracking-wider px-3 py-1">
              Set Status
            </p>
            {statuses.map((s) => (
              <button
                key={s.key}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#404249] transition-colors text-left"
                onClick={(e) => { e.stopPropagation(); setUserStatus(s.key); setShowMenu(false); }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <circle cx="5" cy="5" r="5" fill={s.color} />
                  {userStatus === s.key && <circle cx="5" cy="5" r="2" fill="white" />}
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-[#DBDEE1] font-medium">{s.label}</p>
                  {s.desc && <p className="text-[11px] text-[#949BA4] leading-tight mt-0.5">{s.desc}</p>}
                </div>
                {userStatus === s.key && (
                  <svg width="16" height="16" fill="#5865F2" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
              </button>
            ))}
            <div className="h-px bg-[#2B2D31] mx-2 my-1" />
            <button 
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#404249] transition-colors text-left text-[14px] text-[#DBDEE1]"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
                openSettings();
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96a7.07 7.07 0 0 0-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
              Manage account
            </button>
          </div>
        )}
      </div>

      {/* Mic Button */}
      <CtrlBtn
        onClick={() => setMuted((m) => !m)}
        active={muted}
        title={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? <MicOffIcon /> : <MicOnIcon />}
      </CtrlBtn>

      {/* Headphones Button */}
      <CtrlBtn
        onClick={() => setDeafened((d) => !d)}
        active={deafened}
        title={deafened ? 'Undeafen' : 'Deafen'}
      >
        {deafened ? <HeadphonesOffIcon /> : <HeadphonesOnIcon />}
      </CtrlBtn>

      {/* Settings Button */}
      <button
        onClick={openSettings}
        className="w-8 h-8 flex items-center justify-center rounded-md text-[#949BA4] hover:bg-[#35373C] hover:text-white transition-colors cursor-pointer"
        title="User Settings"
      >
        <GearIcon />
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   VOICE CONNECTED BAR
══════════════════════════════════════════════════════════════ */
function VoiceConnectedBar() {
  const { voiceState, disconnectVoice, setChannelViewMode, setActiveChannelId } = useApp();
  if (!voiceState.isConnected) return null;

  const isConnecting = voiceState.status === 'RTC Connecting';

  return (
    <div className="bg-[#2B2D31] border-b border-[#232428] px-3 py-2 flex flex-col gap-1 shrink-0 animate-in slide-in-from-bottom duration-150">
      <div className="flex items-center justify-between">
        {/* Left: Signal Status */}
        <div 
          className="flex items-center gap-2 cursor-pointer group flex-1 min-w-0"
          onClick={() => {
            if (voiceState.channelId) {
              setActiveChannelId(voiceState.channelId);
              setChannelViewMode('voice');
            }
          }}
        >
          {/* Signal Icon */}
          <div className="relative flex items-center justify-center shrink-0" title={`Ping: ${voiceState.ping}ms`}>
            {isConnecting ? (
              <svg className="w-5 h-5 text-[#FEE75C] animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-[#23A55A]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.28 19.57 10.59 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
              </svg>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <span className={`text-[13px] font-bold leading-tight truncate ${isConnecting ? 'text-[#FEE75C]' : 'text-[#23A55A]'}`}>
              {voiceState.status}
            </span>
            <span className="text-[11px] text-[#949BA4] group-hover:underline truncate leading-tight">
              {voiceState.channelName} / {voiceState.serverName}
            </span>
          </div>
        </div>

        {/* Right: Ping & Disconnect Hang Up button */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[10px] text-[#23A55A] font-semibold bg-[#23A55A]/10 px-1.5 py-0.5 rounded border border-[#23A55A]/20 hidden sm:inline-block">
            {voiceState.ping}ms
          </span>
          <button
            onClick={disconnectVoice}
            className="w-8 h-8 rounded hover:bg-[#ED4245]/20 text-[#949BA4] hover:text-[#ED4245] flex items-center justify-center transition-colors cursor-pointer"
            title="Disconnect"
          >
            {/* Phone Hangup Icon */}
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.996.996 0 0 1 0-1.41C3.36 8.54 7.46 6.75 12 6.75s8.64 1.79 11.71 4.92c.39.39.39 1.02 0 1.41l-2.48 2.48c-.18.18-.43.29-.71.29s-.52-.11-.7-.28c-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CHANNEL ROW
══════════════════════════════════════════════════════════════ */
function ChannelRow({ channel, isActive, onClick }) {
  const { voiceState, currentUser } = useApp();
  const [hovered, setHovered] = useState(false);
  const isVoice = channel.type === 'voice';
  const hasUnread = !isActive && channel.unread;
  const isCurrentVoice = isVoice && voiceState.isConnected && voiceState.channelId === channel.id;

  // Mock participants in this voice channel
  const voiceMembers = isCurrentVoice ? [
    { name: currentUser.displayName, color: currentUser.avatarColor, initials: currentUser.avatarInitials, isSelf: true, speaking: true },
    { name: 'ProGamer99', color: '#ED4245', speaking: false },
    { name: 'PixelKing', color: '#00AFF4', speaking: true },
  ] : [];

  return (
    <div className="flex flex-col">
      <div
        className={`group relative mx-2 flex items-center gap-1.5 px-2 py-[6px] rounded-[4px] cursor-pointer transition-all duration-100 ${
          isCurrentVoice
            ? 'bg-[#404249] text-white font-semibold'
            : isActive
            ? 'bg-[#404249] text-white'
            : hovered
            ? 'bg-[#35373C] text-[#DBDEE1]'
            : hasUnread
            ? 'text-white'
            : 'text-[#949BA4]'
        }`}
        style={{ userSelect: 'none' }}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Unread indicator bar on left */}
        {hasUnread && !isActive && (
          <span className="absolute -left-2 w-1 h-4 bg-white rounded-r-full" />
        )}

        {isVoice ? (
          <VoiceIcon className={`w-4 h-4 shrink-0 ${isCurrentVoice ? 'text-[#23A55A]' : 'opacity-70'}`} />
        ) : (
          <HashIcon className="w-4 h-4 shrink-0 opacity-70" />
        )}

        <span className="flex-1 text-[15px] font-medium truncate leading-5">{channel.name}</span>

        {/* Right-side indicators */}
        {!hovered && !isActive && (
          <>
            {channel.mention > 0 && (
              <span className="shrink-0 min-w-[16px] h-4 px-1 bg-[#ED4245] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {channel.mention}
              </span>
            )}
            {!channel.mention && channel.unread && (
              <span className="shrink-0 w-2 h-2 bg-white rounded-full" />
            )}
            {isVoice && (
              <span className={`text-[11px] ${isCurrentVoice ? 'text-[#23A55A] font-bold' : 'text-[#949BA4]'}`}>
                {isCurrentVoice ? voiceMembers.length : (channel.users || 0)}
              </span>
            )}
          </>
        )}

        {/* Hover quick actions */}
        {(hovered || isActive) && (
          <div className="flex items-center gap-0.5 ml-auto">
            <button
              className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-[#949BA4] hover:text-white transition-colors"
              title="Create Invite"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </button>
            <button
              className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-[#949BA4] hover:text-white transition-colors"
              title="Edit Channel"
              onClick={(e) => e.stopPropagation()}
            >
              <GearIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Connected Channel Participant Sub-List (Discord Style) */}
      {isCurrentVoice && (
        <div className="flex flex-col gap-1 pl-8 pr-3 py-1">
          {voiceMembers.map((m, idx) => (
            <div key={idx} className="flex items-center gap-2 py-0.5 px-2 rounded hover:bg-[#35373C] transition-colors cursor-pointer group/user">
              <div className="relative">
                <Avatar name={m.name} initials={m.initials} color={m.color} size={22} />
                {m.speaking && (
                  <span className="absolute -inset-0.5 rounded-full ring-2 ring-[#23A55A] animate-pulse pointer-events-none" />
                )}
              </div>
              <span className={`text-[13px] truncate ${m.isSelf ? 'text-white font-medium' : 'text-[#DBDEE1]'}`}>
                {m.name}
              </span>
              {m.speaking && (
                <span className="ml-auto w-2 h-2 rounded-full bg-[#23A55A] animate-ping" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CATEGORY ROW
══════════════════════════════════════════════════════════════ */
function CategoryRow({ name, collapsed, onToggle, onAddChannel }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="group flex items-center gap-1 px-1 mt-4 mb-0.5 h-6 cursor-pointer"
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ChevronIcon open={!collapsed} className="w-3 h-3 text-[#949BA4] group-hover:text-[#DBDEE1]" />
      <span className="flex-1 text-[11px] font-bold uppercase tracking-[0.02em] text-[#949BA4] group-hover:text-[#DBDEE1] truncate transition-colors">
        {name}
      </span>
      {hovered && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onAddChannel) onAddChannel(e);
          }}
          className="p-0.5 hover:text-white text-[#949BA4] transition-colors"
          title="Create Channel"
        >
          <AddIcon className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DM ROW
══════════════════════════════════════════════════════════════ */
function DmRow({ dm, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`group relative flex items-center gap-2.5 px-2 py-[6px] rounded-[4px] mx-2 cursor-pointer transition-colors ${
        isActive
          ? 'bg-[#404249]'
          : hovered
          ? 'bg-[#35373C]'
          : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Avatar name={dm.user.name} color={dm.user.color} size={32} status={dm.user.status} />
      <div className="flex-1 min-w-0">
        <p className={`text-[15px] font-semibold truncate ${isActive || hovered ? 'text-white' : 'text-[#949BA4]'}`}>
          {dm.user.name}
        </p>
        <p className={`text-[12px] truncate ${isActive || hovered ? 'text-[#B5BAC1]' : 'text-[#6D6F78]'}`}>
          {dm.lastMessage}
        </p>
      </div>
      {dm.unread > 0 && (
        <span className="shrink-0 min-w-[16px] h-4 px-1 bg-[#ED4245] text-white text-[10px] font-black rounded-full flex items-center justify-center">
          {dm.unread}
        </span>
      )}
      {hovered && (
        <button
          className="shrink-0 w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 text-[#949BA4] hover:text-white"
          onClick={(e) => e.stopPropagation()}
          title="Close DM"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SERVER HEADER
══════════════════════════════════════════════════════════════ */
function ServerHeader({ server }) {
  const { openCreateChannel } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const menuItems = [
    { label: 'Invite People', icon: '👥' },
    { label: 'Server Settings', icon: '⚙️' },
    { 
      label: 'Create Channel', 
      icon: '#️⃣',
      action: () => openCreateChannel(server.id)
    },
    { label: 'Create Category', icon: '📁' },
    { divider: true },
    { label: 'Notification Settings', icon: '🔔' },
    { label: 'Privacy Settings', icon: '🔒' },
    { divider: true },
    { label: 'Edit Server Profile', icon: '✏️' },
    { divider: true },
    { label: 'Leave Server', icon: '🚪', red: true },
  ];

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        className={`w-full h-12 flex items-center justify-between px-4 font-bold text-[15px] text-white transition-colors ${
          open ? 'bg-[#35373C]' : 'hover:bg-[#35373C]'
        } border-b border-black/20`}
        onClick={() => setOpen((p) => !p)}
      >
        <span className="truncate">{server.name}</span>
        {open ? (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
        ) : (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-2 right-2 mt-1 bg-[#111214] rounded-md shadow-2xl z-50 py-1.5 border border-black/20 max-h-[70vh] overflow-y-auto">
          {menuItems.map((item, i) =>
            item.divider ? (
              <div key={i} className="h-px bg-[#2B2D31] mx-2 my-1" />
            ) : (
              <button
                key={i}
                onClick={() => {
                  setOpen(false);
                  if (item.action) item.action();
                }}
                className={`w-full flex items-center justify-between gap-2 px-3 py-[6px] rounded hover:bg-[#5865F2] transition-colors text-left text-[14px] font-medium ${
                  item.red ? 'text-[#F23F43] hover:text-white' : 'text-[#DBDEE1]'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-base">{item.icon}</span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SERVER SIDEBAR
══════════════════════════════════════════════════════════════ */
function ServerSidebar() {
  const { activeServer, activeChannelId, switchChannel, openCreateChannel, connectVoice } = useApp();
  const [collapsed, setCollapsed] = useState({});

  if (!activeServer) return null;
  const channelMap = Object.fromEntries(activeServer.channels.map((c) => [c.id, c]));
  const toggle = (id) => setCollapsed((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="flex flex-col h-full">
      <ServerHeader server={activeServer} />
      <div className="flex-1 overflow-y-auto scrollbar-thin py-2">
        {activeServer.categories.map((cat) => (
          <div key={cat.id}>
            <CategoryRow
              name={cat.name}
              collapsed={!!collapsed[cat.id]}
              onToggle={() => toggle(cat.id)}
              onAddChannel={(e) => {
                e.stopPropagation();
                openCreateChannel(activeServer.id, cat.id);
              }}
            />
            {!collapsed[cat.id] &&
              cat.channels.map((cid) => {
                const ch = channelMap[cid];
                if (!ch) return null;
                return (
                  <ChannelRow
                    key={ch.id}
                    channel={ch}
                    isActive={activeChannelId === ch.id}
                    onClick={() => {
                      if (ch.type === 'voice') {
                        connectVoice(ch, activeServer.id);
                      } else {
                        switchChannel(ch.id);
                      }
                    }}
                  />
                );
              })}
          </div>
        ))}
      </div>
      <VoiceConnectedBar />
      <UserControls />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FRIENDS / DM SIDEBAR
══════════════════════════════════════════════════════════════ */
function FriendsSidebar() {
  const { switchDm, activeDmId, dms, goToFriends, view } = useApp();
  const [search, setSearch] = useState('');
  const friendsActive = view === 'friends';

  const navItems = [
    { label: 'Friends', icon: <FriendsIcon active={friendsActive} />, onClick: goToFriends, active: friendsActive, badge: 3 },
    { label: 'Nitro', icon: <NitroIcon />, onClick: null },
    { label: 'Shop', icon: <ShopIcon />, onClick: null },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="px-2 pt-3 pb-2 shrink-0">
        <button className="w-full bg-[#1E1F22] rounded-[4px] px-2.5 h-[28px] flex items-center gap-2 hover:bg-[#111214] transition-colors">
          <svg className="w-4 h-4 text-[#949BA4] shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <span className="text-[14px] text-[#949BA4] font-medium">Find or start a conversation</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Nav Items */}
        <div className="px-2 pb-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-2 py-[6px] rounded-[4px] transition-colors ${
                item.active ? 'bg-[#404249] text-white' : 'text-[#949BA4] hover:bg-[#35373C] hover:text-[#DBDEE1]'
              }`}
              onClick={item.onClick}
            >
              <span className={item.active ? 'text-white' : ''}>{item.icon}</span>
              <span className="text-[15px] font-semibold">{item.label}</span>
              {item.badge && (
                <span className="ml-auto min-w-[16px] h-4 px-1 bg-[#ED4245] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* DM Section */}
        <div className="px-2">
          <div className="flex items-center justify-between px-2 mt-4 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#949BA4]">
              Direct Messages
            </span>
            <button className="text-[#949BA4] hover:text-white transition-colors" title="New DM">
              <AddIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col gap-0.5">
            {dms.map((dm) => (
              <DmRow
                key={dm.id}
                dm={dm}
                isActive={activeDmId === dm.id}
                onClick={() => switchDm(dm.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <VoiceConnectedBar />
      <UserControls />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CHANNEL SIDEBAR (EXPORT)
══════════════════════════════════════════════════════════════ */
export default function ChannelSidebar() {
  const { view } = useApp();
  return (
    <div className="w-[240px] h-full bg-[#2B2D31] flex flex-col shrink-0 overflow-hidden">
      {view === 'server' ? <ServerSidebar /> : <FriendsSidebar />}
    </div>
  );
}
