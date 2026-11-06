import React from 'react';

/* ══════════════════════════════════════════════════════════════
   STATUS DOT
══════════════════════════════════════════════════════════════ */
export function StatusDot({ status, size = 10 }) {
  const map = {
    online: <circle cx="5" cy="5" r="5" fill="#23A55A" />,
    idle: (
      <>
        <circle cx="5" cy="5" r="5" fill="#F0B232" />
        <circle cx="6" cy="4" r="3.5" fill="#2B2D31" />
      </>
    ),
    dnd: (
      <>
        <circle cx="5" cy="5" r="5" fill="#F23F43" />
        <rect x="2" y="4" width="6" height="2" rx="1" fill="white" />
      </>
    ),
    invisible: (
      <>
        <circle cx="5" cy="5" r="5" fill="#2B2D31" />
        <circle cx="5" cy="5" r="3" fill="none" stroke="#80848E" strokeWidth="1.5" />
        <circle cx="5" cy="5" r="1.5" fill="#80848E" />
      </>
    ),
    offline: (
      <>
        <circle cx="5" cy="5" r="5" fill="#2B2D31" />
        <circle cx="5" cy="5" r="3" fill="none" stroke="#80848E" strokeWidth="1.5" />
        <circle cx="5" cy="5" r="1.5" fill="#80848E" />
      </>
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 10 10">
      {map[status] ?? map.offline}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   AVATAR
══════════════════════════════════════════════════════════════ */
export function Avatar({ name = '?', initials, color = '#5865F2', size = 32, status, className = '' }) {
  const displayInitials = initials 
    ? initials.slice(0, 2).toUpperCase() 
    : (name ? name.slice(0, 1).toUpperCase() : '?');
  const dotSize = size <= 24 ? 10 : size <= 36 ? 12 : 14;
  const borderColor = '#2B2D31';
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      <div
        className="w-full h-full rounded-full flex items-center justify-center font-bold text-white select-none"
        style={{ backgroundColor: color, fontSize: size * 0.4 }}
      >
        {displayInitials}
      </div>
      {status && (
        <span
          className="absolute -bottom-0.5 -right-0.5 rounded-full flex items-center justify-center"
          style={{
            width: dotSize + 4,
            height: dotSize + 4,
            backgroundColor: borderColor,
          }}
        >
          <StatusDot status={status} size={dotSize} />
        </span>
      )}
    </div>
  );
}
