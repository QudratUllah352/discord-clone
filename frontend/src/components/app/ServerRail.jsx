import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

/* ── Discord Clyde Logo ──────────────────────────────────────────────────────── */
function DiscordLogo({ size = 24, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 127.14 96.36" fill="currentColor">
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z" />
    </svg>
  );
}

/* ── Tooltip ─────────────────────────────────────────────────────────────────── */
function Tooltip({ children, label }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && label && (
        <div className="absolute left-full ml-4 z-[300] pointer-events-none">
          <div className="relative bg-[#111214] text-white text-[14px] font-semibold px-3 py-2 rounded-md shadow-2xl whitespace-nowrap">
            <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#111214] rotate-45" />
            {label}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Server Icon ─────────────────────────────────────────────────────────────── */
function ServerIcon({ server, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);
  const active = isActive;

  return (
    <Tooltip label={server.name}>
      <div
        className="relative flex items-center w-full justify-center cursor-pointer"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Active / Hover Pill */}
        <span
          className="absolute left-0 w-1 bg-white rounded-r-full transition-all duration-200"
          style={{
            height: active ? 40 : hovered ? 20 : 0,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />

        {/* Icon */}
        <div
          className="relative w-12 h-12 flex items-center justify-center text-[20px] font-bold text-white overflow-hidden transition-all duration-200 shadow-md"
          style={{
            borderRadius: active || hovered ? '30%' : '50%',
            backgroundColor: active ? (server.color || '#5865F2') : '#36393F',
          }}
        >
          {server.icon}

          {/* Mention badge */}
          {server.mention > 0 && !active && (
            <span className="absolute -bottom-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#ED4245] text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 border-[2.5px] border-[#1E1F22]">
              {server.mention}
            </span>
          )}
          {/* Unread dot */}
          {!active && !server.mention && server.unread && (
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-white rounded-full border-[2.5px] border-[#1E1F22]" />
          )}
        </div>
      </div>
    </Tooltip>
  );
}

/* ── Divider ─────────────────────────────────────────────────────────────────── */
function Divider() {
  return <div className="w-8 h-[2px] bg-[#35373C] rounded-full mx-auto my-0.5 shrink-0" />;
}

/* ── Icon Button (Add / Explore) ─────────────────────────────────────────────── */
function RailIconButton({ label, hoverColor = '#57F287', onClick, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Tooltip label={label}>
      <button
        onClick={onClick}
        className="relative w-12 h-12 flex items-center justify-center transition-all duration-200 shadow-md group cursor-pointer"
        style={{
          borderRadius: hovered ? '30%' : '50%',
          backgroundColor: '#36393F',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span style={{ color: hovered ? '#fff' : hoverColor, transition: 'color 0.15s' }}>
          {children}
        </span>
      </button>
    </Tooltip>
  );
}

/* ── Server Rail ─────────────────────────────────────────────────────────────── */
export default function ServerRail() {
  const { servers, activeServerId, switchServer, goToFriends, view, setCreateServerOpen } = useApp();
  const [dmHovered, setDmHovered] = useState(false);
  const isDmActive = view === 'friends' || view === 'dm';

  return (
    <nav
      className="w-[72px] h-full bg-[#1E1F22] flex flex-col items-center pt-3 pb-3 gap-2 overflow-y-auto shrink-0"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* DM / Home Button */}
      <Tooltip label="Direct Messages">
        <div
          className="relative flex items-center w-full justify-center cursor-pointer"
          onClick={goToFriends}
          onMouseEnter={() => setDmHovered(true)}
          onMouseLeave={() => setDmHovered(false)}
        >
          <span
            className="absolute left-0 w-1 bg-white rounded-r-full transition-all duration-200"
            style={{
              height: isDmActive ? 40 : dmHovered ? 20 : 0,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
          <div
            className="w-12 h-12 flex items-center justify-center transition-all duration-200 shadow-md"
            style={{
              borderRadius: isDmActive || dmHovered ? '30%' : '50%',
              backgroundColor: isDmActive ? '#5865F2' : dmHovered ? '#5865F2' : '#36393F',
            }}
          >
            <DiscordLogo size={22} className="text-white" />
          </div>
        </div>
      </Tooltip>

      <Divider />

      {/* Server List */}
      <div className="flex flex-col gap-2 items-center w-full px-3">
        {servers.map((s) => (
          <ServerIcon
            key={s.id}
            server={s}
            isActive={activeServerId === s.id && view === 'server'}
            onClick={() => switchServer(s.id)}
          />
        ))}
      </div>

      <Divider />

      {/* Add Server */}
      <div className="flex flex-col gap-2 items-center w-full px-3">
        <RailIconButton 
          label="Add a Server" 
          hoverColor="#57F287"
          onClick={() => setCreateServerOpen(true)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </RailIconButton>

        <RailIconButton label="Explore Public Servers" hoverColor="#57F287">
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" />
          </svg>
        </RailIconButton>
      </div>
    </nav>
  );
}
