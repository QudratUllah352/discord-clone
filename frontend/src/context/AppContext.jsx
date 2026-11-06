import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

// ─── Mock Data ───────────────────────────────────────────────────────────────

export const MOCK_USER = {
  id: 'u1',
  username: 'DiscordUser',
  displayName: 'Discord User',
  discriminator: '0001',
  avatar: null,
  avatarColor: '#5865F2',
  avatarInitials: 'D',
  status: 'online', // online | idle | dnd | invisible
  bio: 'Just vibing on Discord 🎮',
  bannerColor: '#5865F2',
  pronouns: 'they/them',
  nitro: true,
};

export const MOCK_SERVERS = [
  {
    id: 's1',
    name: 'Gaming Hub',
    icon: '🎮',
    color: '#5865F2',
    unread: true,
    mention: 3,
    channels: [
      { id: 'c1', type: 'text', name: 'general', unread: true, mention: 2 },
      { id: 'c2', type: 'text', name: 'announcements', unread: false },
      { id: 'c3', type: 'text', name: 'off-topic', unread: true, mention: 1 },
      { id: 'c4', type: 'voice', name: 'Gaming Room', users: 3 },
      { id: 'c5', type: 'voice', name: 'AFK', users: 0 },
    ],
    categories: [
      { id: 'cat1', name: 'TEXT CHANNELS', channels: ['c1', 'c2', 'c3'] },
      { id: 'cat2', name: 'VOICE CHANNELS', channels: ['c4', 'c5'] },
    ],
    members: [
      { id: 'm1', name: 'ProGamer99', status: 'online', role: 'Admin', avatar: null, color: '#ED4245', activity: 'Playing Valorant', bio: 'Pro gamer since 2015 🎮' },
      { id: 'm2', name: 'NightOwl', status: 'idle', role: 'Member', avatar: null, color: '#FEE75C', activity: 'AFK', bio: null },
      { id: 'm3', name: 'CoolDude', status: 'dnd', role: 'Member', avatar: null, color: '#EB459E', activity: 'Do Not Disturb', bio: 'Living life 🌊' },
      { id: 'm4', name: 'SilentGhost', status: 'offline', role: 'Member', avatar: null, color: '#57F287', activity: null, bio: null },
      { id: 'm5', name: 'PixelKing', status: 'online', role: 'Member', avatar: null, color: '#00AFF4', activity: 'Playing Minecraft', bio: 'Building pixel worlds 🏔️' },
    ],
  },
  {
    id: 's2',
    name: 'Dev Talk',
    icon: '💻',
    color: '#57F287',
    unread: false,
    mention: 0,
    channels: [
      { id: 'c6', type: 'text', name: 'general', unread: false },
      { id: 'c7', type: 'text', name: 'help', unread: false },
      { id: 'c8', type: 'text', name: 'projects', unread: false },
      { id: 'c9', type: 'voice', name: 'Code Review', users: 1 },
    ],
    categories: [
      { id: 'cat3', name: 'TEXT CHANNELS', channels: ['c6', 'c7', 'c8'] },
      { id: 'cat4', name: 'VOICE CHANNELS', channels: ['c9'] },
    ],
    members: [
      { id: 'm6', name: 'CodeWizard', status: 'online', role: 'Admin', avatar: null, color: '#5865F2' },
      { id: 'm7', name: 'ByteRunner', status: 'dnd', role: 'Member', avatar: null, color: '#EB459E' },
      { id: 'm8', name: 'ReactFan', status: 'online', role: 'Member', avatar: null, color: '#57F287' },
    ],
  },
  {
    id: 's3',
    name: 'Music Vibes',
    icon: '🎧',
    color: '#EB459E',
    unread: true,
    mention: 0,
    channels: [
      { id: 'c10', type: 'text', name: 'now-playing', unread: true },
      { id: 'c11', type: 'text', name: 'requests', unread: false },
      { id: 'c12', type: 'voice', name: 'Lo-Fi Room', users: 5 },
      { id: 'c13', type: 'voice', name: 'Hype Beats', users: 2 },
    ],
    categories: [
      { id: 'cat5', name: 'TEXT CHANNELS', channels: ['c10', 'c11'] },
      { id: 'cat6', name: 'VOICE CHANNELS', channels: ['c12', 'c13'] },
    ],
    members: [
      { id: 'm9', name: 'LoFiQueen', status: 'online', role: 'Admin', avatar: null, color: '#EB459E' },
      { id: 'm10', name: 'BeatDrop', status: 'idle', role: 'Member', avatar: null, color: '#FEE75C' },
    ],
  },
  {
    id: 's4',
    name: 'Study Group',
    icon: '📚',
    color: '#FEE75C',
    unread: false,
    mention: 0,
    channels: [
      { id: 'c14', type: 'text', name: 'general', unread: false },
      { id: 'c15', type: 'text', name: 'resources', unread: false },
      { id: 'c16', type: 'voice', name: 'Study Room', users: 2 },
    ],
    categories: [
      { id: 'cat7', name: 'TEXT CHANNELS', channels: ['c14', 'c15'] },
      { id: 'cat8', name: 'VOICE CHANNELS', channels: ['c16'] },
    ],
    members: [
      { id: 'm11', name: 'SmartAlec', status: 'dnd', role: 'Admin', avatar: null, color: '#FEE75C' },
      { id: 'm12', name: 'QuietStudier', status: 'online', role: 'Member', avatar: null, color: '#00AFF4' },
    ],
  },
];

export const MOCK_DMS = [
  {
    id: 'dm1',
    user: { id: 'u2', name: 'ProGamer99', status: 'online', avatar: null, color: '#ED4245' },
    unread: 2,
    lastMessage: 'gg wp that game was insane! 🔥',
  },
  {
    id: 'dm2',
    user: { id: 'u3', name: 'CodeWizard', status: 'dnd', avatar: null, color: '#5865F2' },
    unread: 0,
    lastMessage: 'Check out this React pattern I found...',
  },
  {
    id: 'dm3',
    user: { id: 'u4', name: 'LoFiQueen', status: 'idle', avatar: null, color: '#EB459E' },
    unread: 0,
    lastMessage: 'Thanks for the playlist! 🎵',
  },
];

// All messages keyed by channel id
export const MOCK_MESSAGES = {
  c1: [
    { id: 'msg1', authorId: 'm1', author: 'ProGamer99', avatar: null, color: '#ED4245', content: 'Hey everyone! Ready for tonight\'s game?', timestamp: '2:30 PM', isBot: false },
    { id: 'msg2', authorId: 'm2', author: 'NightOwl', avatar: null, color: '#FEE75C', content: 'Absolutely! What are we playing?', timestamp: '2:31 PM', isBot: false },
    { id: 'msg3', authorId: 'm5', author: 'PixelKing', avatar: null, color: '#00AFF4', content: 'I\'m down for some Valorant 🎮', timestamp: '2:32 PM', isBot: false },
    { id: 'msg4', authorId: 'm1', author: 'ProGamer99', avatar: null, color: '#ED4245', content: 'Valorant sounds good! I\'ll create a lobby. Everyone join VC when ready.', timestamp: '2:33 PM', isBot: false },
    { id: 'msg5', authorId: 'm3', author: 'CoolDude', avatar: null, color: '#EB459E', content: 'On my way! Just finishing up dinner 🍕', timestamp: '2:35 PM', isBot: false },
    { id: 'msg6', authorId: 'm2', author: 'NightOwl', avatar: null, color: '#FEE75C', content: 'Take your time! We\'ll warm up without you 😄', timestamp: '2:36 PM', isBot: false },
    { id: 'msg7', authorId: 'm1', author: 'ProGamer99', avatar: null, color: '#ED4245', content: 'Lobby is up! Code: DISCORD2024', timestamp: '2:38 PM', isBot: false },
    { id: 'msg8', authorId: 'm5', author: 'PixelKing', avatar: null, color: '#00AFF4', content: 'Joined! Let\'s gooo 🔥', timestamp: '2:39 PM', isBot: false },
  ],
  c2: [
    { id: 'msg9', authorId: 'bot1', author: 'Discord Bot', avatar: null, color: '#5865F2', content: '📢 **New Server Event!** Community game night every Friday at 8PM EST. React with 🎮 to get notified!', timestamp: '10:00 AM', isBot: true },
    { id: 'msg10', authorId: 'bot1', author: 'Discord Bot', avatar: null, color: '#5865F2', content: '🎉 Welcome to our **100th member** milestone! Thanks for being an amazing community.', timestamp: '11:30 AM', isBot: true },
  ],
  c3: [
    { id: 'msg11', authorId: 'm3', author: 'CoolDude', avatar: null, color: '#EB459E', content: 'Anyone watching the World Cup?', timestamp: '1:00 PM', isBot: false },
    { id: 'msg12', authorId: 'm4', author: 'SilentGhost', avatar: null, color: '#57F287', content: 'Yes!! What a game yesterday 😱', timestamp: '1:05 PM', isBot: false },
  ],
  c6: [
    { id: 'msg13', authorId: 'm6', author: 'CodeWizard', avatar: null, color: '#5865F2', content: 'Welcome to Dev Talk! Share your projects and get feedback 🚀', timestamp: '9:00 AM', isBot: false },
    { id: 'msg14', authorId: 'm8', author: 'ReactFan', avatar: null, color: '#57F287', content: 'Just shipped my first full-stack app! React + Node + MongoDB 🎉', timestamp: '10:30 AM', isBot: false },
    { id: 'msg15', authorId: 'm6', author: 'CodeWizard', avatar: null, color: '#5865F2', content: 'That\'s awesome! Share the GitHub link?', timestamp: '10:32 AM', isBot: false },
  ],
  dm1: [
    { id: 'dmsg1', authorId: 'u2', author: 'ProGamer99', avatar: null, color: '#ED4245', content: 'Hey! That last match was crazy!', timestamp: '3:00 PM', isBot: false, isSelf: false },
    { id: 'dmsg2', authorId: 'u1', author: 'Discord User', avatar: null, color: '#5865F2', content: 'I know right! That clutch at the end 😱', timestamp: '3:01 PM', isBot: false, isSelf: true },
    { id: 'dmsg3', authorId: 'u2', author: 'ProGamer99', avatar: null, color: '#ED4245', content: 'gg wp that game was insane! 🔥', timestamp: '3:02 PM', isBot: false, isSelf: false },
  ],
};

// ─── Context ──────────────────────────────────────────────────────────────────

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [servers, setServers] = useState(MOCK_SERVERS);
  const [currentUser, setCurrentUser] = useState(MOCK_USER);
  const [activeServerId, setActiveServerId] = useState('s1');
  const [activeChannelId, setActiveChannelId] = useState('c1');
  const [activeDmId, setActiveDmId] = useState(null);
  const [view, setView] = useState('server'); // 'server' | 'dm' | 'friends'
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [memberPanelOpen, setMemberPanelOpen] = useState(true);
  const [userStatus, setUserStatus] = useState(MOCK_USER.status);

  // Modal states
  const [createServerOpen, setCreateServerOpen] = useState(false);
  const [createChannelState, setCreateChannelState] = useState({ isOpen: false, serverId: null, categoryId: null });
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Voice State
  const [voiceState, setVoiceState] = useState({
    isConnected: false,
    channelId: null,
    channelName: null,
    serverId: null,
    serverName: null,
    status: 'Voice Connected', // 'RTC Connecting' | 'Voice Connected'
    ping: 21,
    isMuted: false,
    isDeafened: false,
    isScreenSharing: false,
    isCameraOn: false,
  });
  const [channelViewMode, setChannelViewMode] = useState('chat'); // 'chat' | 'voice'

  // Fetch initial data from real backend on mount
  useEffect(() => {
    // 1. Fetch current authenticated user if token exists
    const token = localStorage.getItem('token');
    if (token) {
      api.getMe()
        .then((res) => {
          if (res.user) {
            setCurrentUser(res.user);
          }
        })
        .catch((err) => {
          console.warn('Could not restore auth session:', err.message);
        });
    }

    // 2. Fetch servers from backend database
    api.getServers()
      .then((res) => {
        if (res.servers && res.servers.length > 0) {
          setServers(res.servers);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch servers from backend, using default fallback:', err.message);
      });

    // 3. Fetch initial messages for default channel
    api.getMessages('c1')
      .then((res) => {
        if (res.messages && res.messages.length > 0) {
          setMessages((prev) => ({ ...prev, c1: res.messages }));
        }
      })
      .catch(() => {});
  }, []);

  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  const updateCurrentUser = async (fields) => {
    setCurrentUser((prev) => ({ ...prev, ...fields }));
    try {
      await api.updateProfile(fields);
    } catch (err) {
      console.warn('Profile updated locally, backend sync note:', err.message);
    }
  };

  const connectVoice = (channel, serverId = activeServerId) => {
    const srv = servers.find((s) => s.id === serverId) || activeServer;
    setVoiceState({
      isConnected: true,
      channelId: channel.id,
      channelName: channel.name,
      serverId: srv?.id || null,
      serverName: srv?.name || '',
      status: 'RTC Connecting',
      ping: Math.floor(Math.random() * 8) + 16,
      isMuted: false,
      isDeafened: false,
      isScreenSharing: false,
      isCameraOn: false,
    });
    setActiveChannelId(channel.id);
    setView('server');
    setChannelViewMode('voice');

    // Simulate fast Discord RTC connection
    setTimeout(() => {
      setVoiceState((prev) => ({
        ...prev,
        status: 'Voice Connected',
        ping: Math.floor(Math.random() * 6) + 18,
      }));
    }, 450);
  };

  const disconnectVoice = () => {
    setVoiceState({
      isConnected: false,
      channelId: null,
      channelName: null,
      serverId: null,
      serverName: null,
      status: 'Voice Connected',
      ping: 20,
      isMuted: false,
      isDeafened: false,
      isScreenSharing: false,
      isCameraOn: false,
    });
    setChannelViewMode('chat');
    if (activeChannel?.type === 'voice') {
      const firstText = activeServer?.channels.find((c) => c.type === 'text');
      if (firstText) setActiveChannelId(firstText.id);
    }
  };

  const toggleVoiceMute = () => {
    setVoiceState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const toggleVoiceDeafen = () => {
    setVoiceState((prev) => ({
      ...prev,
      isDeafened: !prev.isDeafened,
      isMuted: !prev.isDeafened ? true : prev.isMuted,
    }));
  };

  const toggleVoiceCamera = () => {
    setVoiceState((prev) => ({ ...prev, isCameraOn: !prev.isCameraOn }));
  };

  const toggleVoiceScreenShare = () => {
    setVoiceState((prev) => ({ ...prev, isScreenSharing: !prev.isScreenSharing }));
  };

  const activeServer = servers.find((s) => s.id === activeServerId);
  const activeChannel = activeServer?.channels.find((c) => c.id === activeChannelId);
  const activeDm = MOCK_DMS.find((d) => d.id === activeDmId);

  const currentMessages = messages[activeChannelId] || messages[activeDmId] || [];

  const sendMessage = async (content) => {
    if (!content.trim()) return;
    const channelKey = view === 'dm' ? activeDmId : activeChannelId;
    const newMsg = {
      id: `msg_${Date.now()}`,
      authorId: currentUser.id,
      author: currentUser.displayName || currentUser.username,
      avatar: currentUser.avatar || null,
      color: currentUser.avatarColor || '#5865F2',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isBot: false,
      isSelf: true,
    };
    setMessages((prev) => ({
      ...prev,
      [channelKey]: [...(prev[channelKey] || []), newMsg],
    }));

    if (view === 'server' && activeChannelId) {
      try {
        const res = await api.sendMessage(activeChannelId, content);
        if (res.message) {
          setMessages((prev) => ({
            ...prev,
            [activeChannelId]: (prev[activeChannelId] || []).map((m) =>
              m.id === newMsg.id ? { ...res.message, isSelf: true } : m
            ),
          }));
        }
      } catch (err) {
        console.warn('Backend message persistence error:', err.message);
      }
    }
  };

  const switchServer = (serverId) => {
    setActiveServerId(serverId);
    setView('server');
    const server = servers.find((s) => s.id === serverId);
    if (server?.channels?.length) {
      const firstText = server.channels.find((c) => c.type === 'text');
      const targetChanId = firstText?.id || server.channels[0].id;
      setActiveChannelId(targetChanId);
      if (targetChanId) {
        api.getMessages(targetChanId)
          .then((res) => {
            if (res.messages) {
              setMessages((prev) => ({ ...prev, [targetChanId]: res.messages }));
            }
          })
          .catch(() => {});
      }
    }
    setActiveDmId(null);
  };

  const switchChannel = (channelId) => {
    setActiveChannelId(channelId);
    setActiveDmId(null);
    setView('server');
    api.getMessages(channelId)
      .then((res) => {
        if (res.messages) {
          setMessages((prev) => ({ ...prev, [channelId]: res.messages }));
        }
      })
      .catch((err) => {
        console.warn('Could not fetch messages for channel', channelId, err.message);
      });
  };

  const switchDm = (dmId) => {
    setActiveDmId(dmId);
    setView('dm');
    setActiveChannelId(null);
  };

  const goToFriends = () => {
    setView('friends');
    setActiveDmId(null);
    setActiveChannelId(null);
  };

  // Add Server
  const addServer = async ({ name, icon, color }) => {
    try {
      const res = await api.createServer({ name, icon, color });
      if (res.server) {
        const srv = res.server;
        setServers((prev) => [...prev, srv]);
        const textChannel = srv.channels?.find((c) => c.type === 'text');
        if (textChannel) {
          api.getMessages(textChannel.id).then((mRes) => {
            if (mRes.messages) {
              setMessages((prev) => ({ ...prev, [textChannel.id]: mRes.messages }));
            }
          }).catch(() => {});
          setActiveServerId(srv.id);
          setActiveChannelId(textChannel.id);
        } else {
          setActiveServerId(srv.id);
        }
        setView('server');
        setCreateServerOpen(false);
        return;
      }
    } catch (err) {
      console.warn('Backend server creation failed, using local fallback:', err.message);
    }

    const newServerId = `s_${Date.now()}`;
    const textChannelId = `c_${Date.now()}_1`;
    const voiceChannelId = `c_${Date.now()}_2`;

    const newServer = {
      id: newServerId,
      name,
      icon: icon || name.slice(0, 2).toUpperCase(),
      color: color || '#5865F2',
      unread: false,
      mention: 0,
      channels: [
        { id: textChannelId, type: 'text', name: 'general', unread: false },
        { id: voiceChannelId, type: 'voice', name: 'General Voice', users: 0 },
      ],
      categories: [
        { id: `cat_${Date.now()}_1`, name: 'TEXT CHANNELS', channels: [textChannelId] },
        { id: `cat_${Date.now()}_2`, name: 'VOICE CHANNELS', channels: [voiceChannelId] },
      ],
      members: [
        { id: currentUser.id, name: currentUser.displayName, status: userStatus, role: 'Admin', avatar: null, color: '#5865F2', bio: currentUser.bio },
        { id: 'm_bot', name: 'Clyde', status: 'online', role: 'Bot', avatar: null, color: '#5865F2' },
      ],
    };

    setServers((prev) => [...prev, newServer]);
    setMessages((prev) => ({
      ...prev,
      [textChannelId]: [
        {
          id: `welcome_${Date.now()}`,
          authorId: 'm_bot',
          author: 'Clyde',
          avatar: null,
          color: '#5865F2',
          content: `Welcome to **${name}**! Invite friends or start typing to chat.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isBot: true,
        },
      ],
    }));

    setActiveServerId(newServerId);
    setActiveChannelId(textChannelId);
    setView('server');
    setCreateServerOpen(false);
  };

  // Add Channel
  const addChannel = async ({ serverId, categoryId, name, type, isPrivate }) => {
    try {
      const res = await api.createChannel(serverId, { name, type, categoryId, isPrivate });
      if (res.channel && res.server) {
        setServers((prev) => prev.map((s) => (s.id === serverId ? res.server : s)));
        if (type === 'text') {
          setMessages((prev) => ({
            ...prev,
            [res.channel.id]: [],
          }));
          setActiveChannelId(res.channel.id);
        }
        setCreateChannelState({ isOpen: false, serverId: null, categoryId: null });
        return;
      }
    } catch (err) {
      console.warn('Backend channel creation error, falling back locally:', err.message);
    }

    const channelId = `c_${Date.now()}`;
    const formattedName = type === 'text' 
      ? name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '')
      : name.trim();

    const newChannel = {
      id: channelId,
      type,
      name: formattedName || (type === 'text' ? 'new-channel' : 'New Voice'),
      unread: false,
      isPrivate: !!isPrivate,
      users: 0,
    };

    setServers((prev) =>
      prev.map((s) => {
        if (s.id !== serverId) return s;

        // find which category to insert into
        let targetCatId = categoryId;
        if (!targetCatId) {
          const matchCat = s.categories.find((c) =>
            type === 'voice' ? c.name.toLowerCase().includes('voice') : c.name.toLowerCase().includes('text')
          );
          targetCatId = matchCat ? matchCat.id : s.categories[0]?.id;
        }

        const updatedCategories = s.categories.map((cat) => {
          if (cat.id === targetCatId) {
            return { ...cat, channels: [...cat.channels, channelId] };
          }
          return cat;
        });

        return {
          ...s,
          channels: [...s.channels, newChannel],
          categories: updatedCategories,
        };
      })
    );

    if (type === 'text') {
      setMessages((prev) => ({
        ...prev,
        [channelId]: [],
      }));
      setActiveChannelId(channelId);
    }

    setCreateChannelState({ isOpen: false, serverId: null, categoryId: null });
  };

  const openCreateChannel = (serverId, categoryId = null) => {
    setCreateChannelState({ isOpen: true, serverId: serverId || activeServerId, categoryId });
  };

  const closeCreateChannel = () => {
    setCreateChannelState({ isOpen: false, serverId: null, categoryId: null });
  };

  return (
    <AppContext.Provider
      value={{
        // State
        activeServerId, activeChannelId, activeDmId, view,
        activeServer, activeChannel, activeDm,
        currentMessages,
        memberPanelOpen, setMemberPanelOpen,
        userStatus, setUserStatus,
        createServerOpen, setCreateServerOpen,
        createChannelState, openCreateChannel, closeCreateChannel,
        settingsOpen, openSettings, closeSettings, updateCurrentUser,
        // Voice State & Actions
        voiceState, connectVoice, disconnectVoice,
        channelViewMode, setChannelViewMode,
        toggleVoiceMute, toggleVoiceDeafen, toggleVoiceCamera, toggleVoiceScreenShare,
        // Actions
        switchServer, switchChannel, switchDm, goToFriends, sendMessage,
        addServer, addChannel,
        // Data
        servers,
        dms: MOCK_DMS,
        currentUser: { ...currentUser, status: userStatus },
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
