import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Avatar, StatusDot } from './AppShared';

const PRESET_COLORS = [
  '#5865F2', '#57F287', '#FEE75C', '#EB459E', 
  '#ED4245', '#00AFF4', '#F47B67', '#9B59B6', 
  '#34495E', '#1ABC9C'
];

export default function UserSettingsModal() {
  const { settingsOpen, closeSettings, currentUser, updateCurrentUser, userStatus } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('account'); // 'account' | 'profiles' | 'voice'
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Form states
  const [displayName, setDisplayName] = useState(currentUser.displayName || '');
  const [username, setUsername] = useState(currentUser.username || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [pronouns, setPronouns] = useState(currentUser.pronouns || '');
  const [avatarColor, setAvatarColor] = useState(currentUser.avatarColor || '#5865F2');
  const [avatarInitials, setAvatarInitials] = useState(currentUser.avatarInitials || 'D');
  const [bannerColor, setBannerColor] = useState(currentUser.bannerColor || '#5865F2');

  // Voice & Video States
  const [inputDevice, setInputDevice] = useState('Default - Microphone (High Definition Audio)');
  const [outputDevice, setOutputDevice] = useState('Default - Headphones (High Definition Audio)');
  const [inputVolume, setInputVolume] = useState(85);
  const [outputVolume, setOutputVolume] = useState(100);
  const [isMicTesting, setIsMicTesting] = useState(false);
  const [micLevel, setMicLevel] = useState(0);

  // Sync state whenever settings opens
  useEffect(() => {
    if (settingsOpen) {
      setDisplayName(currentUser.displayName || '');
      setUsername(currentUser.username || '');
      setBio(currentUser.bio || '');
      setPronouns(currentUser.pronouns || '');
      setAvatarColor(currentUser.avatarColor || '#5865F2');
      setAvatarInitials(currentUser.avatarInitials || (currentUser.displayName ? currentUser.displayName[0] : 'D'));
      setBannerColor(currentUser.bannerColor || '#5865F2');
    }
  }, [settingsOpen, currentUser]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && settingsOpen) {
        if (showLogoutConfirm) {
          setShowLogoutConfirm(false);
        } else {
          closeSettings();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settingsOpen, showLogoutConfirm, closeSettings]);

  // Simulate mic level testing animation
  useEffect(() => {
    let interval;
    if (isMicTesting) {
      interval = setInterval(() => {
        setMicLevel(Math.floor(Math.random() * 85) + 15);
      }, 120);
    } else {
      setMicLevel(0);
    }
    return () => clearInterval(interval);
  }, [isMicTesting]);

  if (!settingsOpen) return null;

  // Check for unsaved changes
  const hasChanges = 
    displayName !== (currentUser.displayName || '') ||
    username !== (currentUser.username || '') ||
    bio !== (currentUser.bio || '') ||
    pronouns !== (currentUser.pronouns || '') ||
    avatarColor !== (currentUser.avatarColor || '#5865F2') ||
    avatarInitials !== (currentUser.avatarInitials || 'D') ||
    bannerColor !== (currentUser.bannerColor || '#5865F2');

  const handleSave = () => {
    updateCurrentUser({
      displayName: displayName.trim() || 'Discord User',
      username: username.trim().toLowerCase().replace(/\s+/g, '_') || 'discorduser',
      bio: bio.trim(),
      pronouns: pronouns.trim(),
      avatarColor,
      avatarInitials: (avatarInitials.trim() || 'D').slice(0, 2),
      bannerColor,
    });
  };

  const handleReset = () => {
    setDisplayName(currentUser.displayName || '');
    setUsername(currentUser.username || '');
    setBio(currentUser.bio || '');
    setPronouns(currentUser.pronouns || '');
    setAvatarColor(currentUser.avatarColor || '#5865F2');
    setAvatarInitials(currentUser.avatarInitials || 'D');
    setBannerColor(currentUser.bannerColor || '#5865F2');
  };

  const handleLogout = () => {
    closeSettings();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-[600] flex bg-[#313338] text-[#F2F3F5] select-none animate-in fade-in duration-150">
      {/* ── Left Sidebar Navigation (240px) ────────────────────────── */}
      <div className="w-[240px] md:w-[280px] bg-[#2B2D31] flex justify-end shrink-0 py-14 overflow-y-auto scrollbar-thin">
        <div className="w-[192px] mr-5 flex flex-col gap-1.5 text-[14px]">
          {/* User Settings Category */}
          <div className="text-[12px] font-bold text-[#949BA4] uppercase tracking-wider px-2 py-1.5">
            User Settings
          </div>

          <button
            onClick={() => setActiveTab('account')}
            className={`w-full flex items-center px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
              activeTab === 'account'
                ? 'bg-[#404249] text-white font-semibold'
                : 'text-[#B5BAC1] hover:bg-[#35373C] hover:text-[#DBDEE1]'
            }`}
          >
            My Account
          </button>

          <button
            onClick={() => setActiveTab('profiles')}
            className={`w-full flex items-center px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
              activeTab === 'profiles'
                ? 'bg-[#404249] text-white font-semibold'
                : 'text-[#B5BAC1] hover:bg-[#35373C] hover:text-[#DBDEE1]'
            }`}
          >
            Profiles
          </button>

          <div className="h-px bg-[#35373C] my-1 mx-2" />

          {/* App Settings Category */}
          <div className="text-[12px] font-bold text-[#949BA4] uppercase tracking-wider px-2 py-1.5">
            App Settings
          </div>

          <button
            onClick={() => setActiveTab('voice')}
            className={`w-full flex items-center px-2.5 py-1.5 rounded-md font-medium text-left transition-colors ${
              activeTab === 'voice'
                ? 'bg-[#404249] text-white font-semibold'
                : 'text-[#B5BAC1] hover:bg-[#35373C] hover:text-[#DBDEE1]'
            }`}
          >
            Voice & Video
          </button>

          <div className="h-px bg-[#35373C] my-1 mx-2" />

          {/* Log Out */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium text-left text-[#ED4245] hover:bg-[#ED4245]/15 transition-colors group"
          >
            <span>Log Out</span>
            <svg className="w-4 h-4 text-[#ED4245]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
          </button>

          {/* App Version */}
          <div className="mt-8 px-2 text-[11px] text-[#949BA4] leading-relaxed">
            Discord Clone v1.0.0<br />
            Built with React & Tailwind CSS
          </div>
        </div>
      </div>

      {/* ── Right Content Area ───────────────────────────────────────── */}
      <div className="flex-1 flex justify-start py-14 overflow-y-auto scrollbar-thin relative pr-10">
        <div className="w-full max-w-[680px] pl-10 pr-4">
          {/* TAB 1: MY ACCOUNT */}
          {activeTab === 'account' && (
            <div>
              <h2 className="text-[20px] font-bold text-white mb-5">My Account</h2>

              {/* Profile Card Summary Banner */}
              <div className="bg-[#1E1F22] rounded-lg overflow-hidden shadow-lg border border-black/20 mb-6">
                <div
                  className="h-[100px] w-full transition-colors relative"
                  style={{ backgroundColor: bannerColor }}
                />

                <div className="px-5 pb-5 relative">
                  {/* Avatar & Edit avatar button */}
                  <div className="flex items-end justify-between -mt-10 mb-4">
                    <div className="relative">
                      <Avatar 
                        name={displayName} 
                        initials={avatarInitials}
                        color={avatarColor} 
                        size={80} 
                        status={userStatus}
                        className="ring-[6px] ring-[#1E1F22]" 
                      />
                    </div>
                  </div>

                  {/* Summary Details */}
                  <div className="bg-[#2B2D31] rounded-lg p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between pb-3 border-b border-[#35373C]">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#949BA4]">Display Name</div>
                        <div className="text-[15px] font-semibold text-white">{displayName || 'Discord User'}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-[#35373C]">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#949BA4]">Username</div>
                        <div className="text-[15px] text-[#DBDEE1]">@{username || 'discorduser'}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-[#35373C]">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#949BA4]">Email</div>
                        <div className="text-[15px] text-[#DBDEE1]">user*****@discord.gg</div>
                      </div>
                      <span className="text-[12px] text-[#949BA4] font-medium">Revealed on verify</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#949BA4]">Phone Number</div>
                        <div className="text-[15px] text-[#DBDEE1]">********1234</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Account Inputs */}
              <div className="flex flex-col gap-5">
                <h3 className="text-[15px] font-bold text-white uppercase tracking-wider">Account Details</h3>

                {/* Display Name Input */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#B5BAC1] mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    maxLength={32}
                    className="w-full bg-[#1E1F22] text-white text-[15px] px-3 py-2.5 rounded border border-black/40 focus:border-[#5865F2] outline-none transition-colors"
                  />
                </div>

                {/* Username Input */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#B5BAC1] mb-2">
                    Username
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-[#949BA4] font-bold">@</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                      maxLength={32}
                      className="w-full bg-[#1E1F22] text-white text-[15px] pl-8 pr-3 py-2.5 rounded border border-black/40 focus:border-[#5865F2] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Avatar Customization (Color & Initials) */}
                <div className="bg-[#2B2D31] rounded-lg p-4 flex flex-col gap-3 border border-white/5">
                  <label className="block text-[12px] font-bold uppercase tracking-wider text-[#B5BAC1]">
                    Avatar Customization
                  </label>

                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-[11px] text-[#949BA4] mb-1.5">Avatar Initials (1-2 chars)</div>
                      <input
                        type="text"
                        value={avatarInitials}
                        onChange={(e) => setAvatarInitials(e.target.value.toUpperCase().slice(0, 2))}
                        maxLength={2}
                        className="w-20 text-center bg-[#1E1F22] text-white text-[16px] font-bold px-2 py-1.5 rounded border border-black/40 focus:border-[#5865F2] outline-none"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="text-[11px] text-[#949BA4] mb-1.5">Avatar Color</div>
                      <div className="flex flex-wrap items-center gap-2">
                        {PRESET_COLORS.map((c) => (
                          <button
                            key={c}
                            onClick={() => setAvatarColor(c)}
                            className={`w-6 h-6 rounded-full transition-all ${
                              avatarColor === c ? 'ring-2 ring-white scale-110 shadow-md' : 'opacity-80 hover:opacity-100 hover:scale-105'
                            }`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* About Me Bio */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#B5BAC1] mb-2">
                    About Me
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength={190}
                    placeholder="Tell the world a little bit about yourself."
                    className="w-full bg-[#1E1F22] text-white text-[14px] p-3 rounded border border-black/40 focus:border-[#5865F2] outline-none transition-colors resize-none scrollbar-thin"
                  />
                  <div className="text-right text-[11px] text-[#949BA4] mt-1">
                    {190 - bio.length} characters left
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILES */}
          {activeTab === 'profiles' && (
            <div>
              <h2 className="text-[20px] font-bold text-white mb-2">Profiles</h2>
              <p className="text-[14px] text-[#949BA4] mb-6">
                Customize how you look across servers and private messages.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-start">
                {/* Form Controls */}
                <div className="flex flex-col gap-4">
                  {/* Display Name */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#B5BAC1] mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      maxLength={32}
                      className="w-full bg-[#1E1F22] text-white text-[15px] px-3 py-2.5 rounded border border-black/40 focus:border-[#5865F2] outline-none transition-colors"
                    />
                  </div>

                  {/* Pronouns */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#B5BAC1] mb-2">
                      Pronouns
                    </label>
                    <input
                      type="text"
                      placeholder="they/them"
                      value={pronouns}
                      onChange={(e) => setPronouns(e.target.value)}
                      maxLength={40}
                      className="w-full bg-[#1E1F22] text-white text-[15px] px-3 py-2.5 rounded border border-black/40 focus:border-[#5865F2] outline-none transition-colors"
                    />
                  </div>

                  {/* Banner Color Picker */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#B5BAC1] mb-2">
                      Banner Color
                    </label>
                    <div className="flex flex-wrap items-center gap-2 bg-[#1E1F22] p-3 rounded border border-black/40">
                      {PRESET_COLORS.map((c) => (
                        <button
                          key={c}
                          onClick={() => setBannerColor(c)}
                          className={`w-7 h-7 rounded-md transition-all ${
                            bannerColor === c ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* About Me */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#B5BAC1] mb-2">
                      About Me
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      maxLength={190}
                      placeholder="Tell the world a little bit about yourself."
                      className="w-full bg-[#1E1F22] text-white text-[14px] p-3 rounded border border-black/40 focus:border-[#5865F2] outline-none transition-colors resize-none scrollbar-thin"
                    />
                  </div>
                </div>

                {/* Live Card Preview */}
                <div className="flex flex-col gap-2">
                  <div className="text-[12px] font-bold text-[#949BA4] uppercase tracking-wider">
                    Preview
                  </div>

                  <div className="w-full bg-[#232428] rounded-xl overflow-hidden shadow-2xl border border-black/30">
                    <div
                      className="h-[75px] w-full transition-colors"
                      style={{ backgroundColor: bannerColor }}
                    />

                    <div className="px-4 pb-4 relative">
                      <div className="flex items-end justify-between -mt-9 mb-3">
                        <Avatar
                          name={displayName}
                          initials={avatarInitials}
                          color={avatarColor}
                          size={64}
                          status={userStatus}
                          className="ring-4 ring-[#232428]"
                        />
                      </div>

                      <div className="bg-[#111214] rounded-lg p-3">
                        <h4 className="text-[18px] font-black text-white leading-tight">
                          {displayName || 'Discord User'}
                        </h4>
                        <div className="text-[13px] text-[#949BA4] flex items-center gap-1.5">
                          <span>@{username || 'discorduser'}</span>
                          {pronouns && (
                            <>
                              <span>•</span>
                              <span className="text-[#B5BAC1] text-[12px]">{pronouns}</span>
                            </>
                          )}
                        </div>

                        {bio && (
                          <>
                            <div className="h-px bg-[#2B2D31] my-2.5" />
                            <div className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">About Me</div>
                            <p className="text-[13px] text-[#DBDEE1] leading-snug whitespace-pre-wrap">{bio}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VOICE & VIDEO */}
          {activeTab === 'voice' && (
            <div>
              <h2 className="text-[20px] font-bold text-white mb-2">Voice & Video Settings</h2>
              <p className="text-[14px] text-[#949BA4] mb-6">
                Configure your input and output audio hardware and test microphone sensitivity.
              </p>

              <div className="flex flex-col gap-6">
                {/* Device Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Input Device */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#B5BAC1] mb-2">
                      Input Device
                    </label>
                    <select
                      value={inputDevice}
                      onChange={(e) => setInputDevice(e.target.value)}
                      className="w-full bg-[#1E1F22] text-[#DBDEE1] text-[14px] px-3 py-2.5 rounded border border-black/40 focus:border-[#5865F2] outline-none cursor-pointer"
                    >
                      <option>Default - Microphone (High Definition Audio)</option>
                      <option>USB Audio Microphone (Studio Condenser)</option>
                      <option>Headset Microphone (Wireless)</option>
                    </select>

                    {/* Input Volume */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[12px] text-[#949BA4] mb-1">
                        <span>Input Volume</span>
                        <span className="font-semibold text-white">{inputVolume}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={inputVolume}
                        onChange={(e) => setInputVolume(Number(e.target.value))}
                        className="w-full accent-[#5865F2] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Output Device */}
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#B5BAC1] mb-2">
                      Output Device
                    </label>
                    <select
                      value={outputDevice}
                      onChange={(e) => setOutputDevice(e.target.value)}
                      className="w-full bg-[#1E1F22] text-[#DBDEE1] text-[14px] px-3 py-2.5 rounded border border-black/40 focus:border-[#5865F2] outline-none cursor-pointer"
                    >
                      <option>Default - Headphones (High Definition Audio)</option>
                      <option>Speakers / Headphones (Realtek Audio)</option>
                      <option>Digital Output (Audio Interface)</option>
                    </select>

                    {/* Output Volume */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[12px] text-[#949BA4] mb-1">
                        <span>Output Volume</span>
                        <span className="font-semibold text-white">{outputVolume}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={outputVolume}
                        onChange={(e) => setOutputVolume(Number(e.target.value))}
                        className="w-full accent-[#5865F2] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#35373C]" />

                {/* Mic Test Section */}
                <div className="bg-[#2B2D31] p-5 rounded-lg border border-white/5 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[16px] font-bold text-white mb-1">Mic Test</h4>
                      <p className="text-[13px] text-[#949BA4] leading-snug">
                        Having mic issues? Click below to test your mic and listen to your volume level.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsMicTesting((prev) => !prev)}
                      className={`px-4 py-2 rounded text-[14px] font-semibold transition-colors shrink-0 ${
                        isMicTesting
                          ? 'bg-[#ED4245] hover:bg-[#c03437] text-white'
                          : 'bg-[#5865F2] hover:bg-[#4752C4] text-white'
                      }`}
                    >
                      {isMicTesting ? 'Stop Testing' : "Let's Check"}
                    </button>
                  </div>

                  {/* Volume Visualizer Bar */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#949BA4] mb-1.5">
                      <span>Input Sensitivity</span>
                      <span>{isMicTesting ? `${micLevel}%` : 'Inactive'}</span>
                    </div>

                    <div className="w-full h-3 bg-[#1E1F22] rounded-full overflow-hidden flex items-center p-0.5">
                      <div
                        className="h-full rounded-full transition-all duration-100"
                        style={{
                          width: `${micLevel}%`,
                          backgroundColor: micLevel > 75 ? '#ED4245' : micLevel > 45 ? '#23A55A' : '#FEE75C',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Input Mode */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#B5BAC1] mb-2">
                    Input Mode
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white">
                      <input type="radio" name="inputMode" defaultChecked className="accent-[#5865F2] w-4 h-4" />
                      <span>Voice Activity</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-white">
                      <input type="radio" name="inputMode" className="accent-[#5865F2] w-4 h-4" />
                      <span>Push to Talk</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Floating Unsaved Changes Warning Banner */}
          {hasChanges && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[620px] bg-[#111214] text-white p-3.5 px-4 rounded-lg shadow-2xl flex items-center justify-between z-[700] border border-black/40 animate-in slide-in-from-bottom duration-200">
              <span className="text-[14px] font-semibold">
                Careful — you have unsaved changes!
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="text-[13px] font-semibold text-white hover:underline px-3 py-1.5"
                >
                  Reset
                </button>
                <button
                  onClick={handleSave}
                  className="bg-[#23A55A] hover:bg-[#1a9850] text-white font-semibold text-[13px] px-4 py-1.5 rounded transition-colors shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── ESC Close Button ────────────────────────────────────────── */}
        <div className="absolute top-14 right-8 flex flex-col items-center">
          <button
            onClick={closeSettings}
            className="w-9 h-9 rounded-full border-2 border-[#B5BAC1] hover:border-white text-[#B5BAC1] hover:text-white flex items-center justify-center transition-all group"
            title="Close (ESC)"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
          <span className="text-[11px] font-bold text-[#949BA4] mt-1 select-none tracking-wider">
            ESC
          </span>
        </div>
      </div>

      {/* ── Log Out Confirmation Modal ───────────────────────────────── */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[800] bg-black/75 flex items-center justify-center p-4">
          <div className="w-full max-w-[400px] bg-[#313338] rounded-lg shadow-2xl overflow-hidden p-6 border border-white/5 animate-in zoom-in-95 duration-100">
            <h3 className="text-[20px] font-bold text-white mb-2">Log Out</h3>
            <p className="text-[14px] text-[#949BA4] leading-relaxed mb-6">
              Are you sure you want to log out? You will need to sign back in to access your servers and friends.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="text-[14px] font-medium text-white hover:underline px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-[#ED4245] hover:bg-[#c03437] text-white font-semibold text-[14px] px-5 py-2 rounded transition-colors shadow-md"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
