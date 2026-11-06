import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from './AppShared';

/* ══════════════════════════════════════════════════════════════
   MEMBER PROFILE POPOUT
══════════════════════════════════════════════════════════════ */
function MemberPopout({ member, onClose }) {
  const statusColors = {
    online: '#23A55A', idle: '#F0B232',
    dnd: '#F23F43', offline: '#80848E', invisible: '#80848E',
  };
  const statusLabels = {
    online: 'Online', idle: 'Idle',
    dnd: 'Do Not Disturb', offline: 'Offline', invisible: 'Invisible',
  };

  return (
    <div
      className="absolute left-full ml-2 top-0 w-[300px] bg-[#232428] rounded-lg shadow-2xl z-50 overflow-hidden border border-black/20"
      onMouseLeave={onClose}
    >
      {/* Banner */}
      <div
        className="h-[60px] w-full"
        style={{ backgroundColor: member.color || '#5865F2', opacity: 0.7 }}
      />

      {/* Avatar */}
      <div className="relative -mt-9 px-4 pb-3">
        <div className="relative inline-block">
          <Avatar name={member.name} color={member.color} size={72} />
          <span
            className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full border-[3px] border-[#232428] flex items-center justify-center"
            style={{ backgroundColor: statusColors[member.status] ?? '#80848E' }}
          />
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="bg-[#111214] rounded-lg p-3">
          <p className="text-[20px] font-black text-white leading-tight">{member.name}</p>
          <p className="text-[13px] text-[#949BA4] mb-3">{member.name.toLowerCase().replace(/\s/g, '_')}</p>

          {member.bio && (
            <>
              <div className="h-px bg-[#2B2D31] mb-3" />
              <p className="text-[12px] font-bold text-white uppercase tracking-wide mb-1">About me</p>
              <p className="text-[14px] text-[#949BA4]">{member.bio}</p>
            </>
          )}

          <div className="h-px bg-[#2B2D31] my-3" />
          <p className="text-[12px] font-bold text-white uppercase tracking-wide mb-2">Member Since</p>
          <p className="text-[14px] text-[#949BA4]">Jan 1, 2023</p>

          {member.role && (
            <>
              <div className="h-px bg-[#2B2D31] my-3" />
              <p className="text-[12px] font-bold text-white uppercase tracking-wide mb-2">Roles</p>
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[12px] font-medium border"
                style={{ color: member.color, borderColor: member.color + '50', backgroundColor: member.color + '20' }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: member.color }} />
                {member.role}
              </span>
            </>
          )}

          <div className="h-px bg-[#2B2D31] my-3" />
          <button className="w-full text-left text-[14px] font-semibold text-white hover:text-[#5865F2] transition-colors">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MEMBER ROW
══════════════════════════════════════════════════════════════ */
function MemberRow({ member }) {
  const [hovered, setHovered] = useState(false);
  const [showPopout, setShowPopout] = useState(false);
  const isOnline = member.status !== 'offline' && member.status !== 'invisible';

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setShowPopout(false); }}
    >
      <div
        className={`flex items-center gap-2.5 px-2 py-[6px] mx-2 rounded-[4px] cursor-pointer transition-colors ${
          hovered ? 'bg-[#35373C]' : ''
        }`}
        onClick={() => setShowPopout((p) => !p)}
      >
        <Avatar
          name={member.name}
          color={member.color}
          size={32}
          status={member.status}
        />
        <div className="flex-1 min-w-0">
          <p
            className={`text-[15px] font-medium truncate leading-tight ${
              isOnline ? 'text-[#F2F3F5]' : 'text-[#6D6F78]'
            }`}
            style={{ color: hovered && isOnline ? member.color : undefined }}
          >
            {member.name}
          </p>
          {member.activity && isOnline && (
            <p className="text-[11px] text-[#949BA4] truncate leading-tight">
              {member.activity}
            </p>
          )}
        </div>
      </div>

      {/* Popout */}
      {showPopout && hovered && (
        <MemberPopout member={member} onClose={() => setShowPopout(false)} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MEMBER PANEL (EXPORT)
══════════════════════════════════════════════════════════════ */
export default function MemberPanel() {
  const { view, activeServer, memberPanelOpen } = useApp();

  if (!memberPanelOpen || view !== 'server' || !activeServer) return null;

  // Group by role then online/offline
  const roleOrder = ['Admin', 'Moderator', 'Member'];
  const groups = {};

  for (const m of activeServer.members) {
    const isOnline = m.status !== 'offline' && m.status !== 'invisible';
    const groupKey = isOnline ? (m.role || 'Member') : '__offline__';
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(m);
  }

  const onlineGroups = roleOrder
    .filter((r) => groups[r])
    .map((r) => ({ label: r, members: groups[r] }));

  const offlineMembers = groups['__offline__'] || [];

  return (
    <div className="w-[240px] h-full bg-[#2B2D31] flex flex-col shrink-0 overflow-hidden border-l border-[#232428]">
      <div className="flex-1 overflow-y-auto scrollbar-thin py-3">

        {/* Online groups (by role) */}
        {onlineGroups.map((group) => (
          <div key={group.label} className="mb-2">
            <p className="text-[11px] font-bold text-[#949BA4] uppercase tracking-[0.02em] px-4 mb-1">
              {group.label} — {group.members.length}
            </p>
            {group.members.map((m) => (
              <MemberRow key={m.id} member={m} />
            ))}
          </div>
        ))}

        {/* Offline members */}
        {offlineMembers.length > 0 && (
          <div className="mt-4">
            <p className="text-[11px] font-bold text-[#949BA4] uppercase tracking-[0.02em] px-4 mb-1">
              Offline — {offlineMembers.length}
            </p>
            {offlineMembers.map((m) => (
              <MemberRow key={m.id} member={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
