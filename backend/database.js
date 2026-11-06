import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Initial default seed data
const INITIAL_DATA = {
  users: [],
  servers: [
    {
      id: 's1',
      name: 'Gaming Hub',
      icon: '🎮',
      color: '#5865F2',
      ownerId: 'system',
      channels: [
        { id: 'c1', type: 'text', name: 'general', unread: false },
        { id: 'c2', type: 'text', name: 'announcements', unread: false },
        { id: 'c3', type: 'text', name: 'off-topic', unread: false },
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
      ownerId: 'system',
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
      ownerId: 'system',
      channels: [
        { id: 'c10', type: 'text', name: 'now-playing', unread: false },
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
      ownerId: 'system',
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
  ],
  messages: {
    c1: [
      { id: 'msg1', authorId: 'm1', author: 'ProGamer99', color: '#ED4245', content: 'Hey everyone! Ready for tonight\'s game?', timestamp: '2:30 PM', isBot: false },
      { id: 'msg2', authorId: 'm2', author: 'NightOwl', color: '#FEE75C', content: 'Absolutely! What are we playing?', timestamp: '2:31 PM', isBot: false },
      { id: 'msg3', authorId: 'm5', author: 'PixelKing', color: '#00AFF4', content: 'I\'m down for some Valorant 🎮', timestamp: '2:32 PM', isBot: false },
      { id: 'msg4', authorId: 'm1', author: 'ProGamer99', color: '#ED4245', content: 'Valorant sounds good! I\'ll create a lobby. Everyone join VC when ready.', timestamp: '2:33 PM', isBot: false },
      { id: 'msg5', authorId: 'm3', author: 'CoolDude', color: '#EB459E', content: 'On my way! Just finishing up dinner 🍕', timestamp: '2:35 PM', isBot: false },
      { id: 'msg6', authorId: 'm2', author: 'NightOwl', color: '#FEE75C', content: 'Take your time! We\'ll warm up without you 😄', timestamp: '2:36 PM', isBot: false },
      { id: 'msg7', authorId: 'm1', author: 'ProGamer99', color: '#ED4245', content: 'Lobby is up! Code: DISCORD2024', timestamp: '2:38 PM', isBot: false },
      { id: 'msg8', authorId: 'm5', author: 'PixelKing', color: '#00AFF4', content: 'Joined! Let\'s gooo 🔥', timestamp: '2:39 PM', isBot: false },
    ],
    c2: [
      { id: 'msg9', authorId: 'bot1', author: 'Discord Bot', color: '#5865F2', content: '📢 **New Server Event!** Community game night every Friday at 8PM EST. React with 🎮 to get notified!', timestamp: '10:00 AM', isBot: true },
      { id: 'msg10', authorId: 'bot1', author: 'Discord Bot', color: '#5865F2', content: '🎉 Welcome to our **100th member** milestone! Thanks for being an amazing community.', timestamp: '11:30 AM', isBot: true },
    ],
    c3: [
      { id: 'msg11', authorId: 'm3', author: 'CoolDude', color: '#EB459E', content: 'Anyone watching the World Cup?', timestamp: '1:00 PM', isBot: false },
      { id: 'msg12', authorId: 'm4', author: 'SilentGhost', color: '#57F287', content: 'Yes!! What a game yesterday 😱', timestamp: '1:05 PM', isBot: false },
    ],
    c6: [
      { id: 'msg13', authorId: 'm6', author: 'CodeWizard', color: '#5865F2', content: 'Welcome to Dev Talk! Share your projects and get feedback 🚀', timestamp: '9:00 AM', isBot: false },
      { id: 'msg14', authorId: 'm8', author: 'ReactFan', color: '#57F287', content: 'Just shipped my first full-stack app! React + Node + MongoDB 🎉', timestamp: '10:30 AM', isBot: false },
      { id: 'msg15', authorId: 'm6', author: 'CodeWizard', color: '#5865F2', content: 'That\'s awesome! Share the GitHub link?', timestamp: '10:32 AM', isBot: false },
    ],
  },
};

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure db file exists with initial structure
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
}

class Database {
  constructor() {
    this.filePath = DB_FILE;
  }

  read() {
    try {
      const content = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Error reading database file:', err);
      return INITIAL_DATA;
    }
  }

  write(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Error writing to database file:', err);
      return false;
    }
  }

  // ── Users ──
  getUsers() {
    return this.read().users || [];
  }

  findUserByEmail(email) {
    const users = this.getUsers();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserByUsername(username) {
    const users = this.getUsers();
    return users.find((u) => u.username.toLowerCase() === username.toLowerCase());
  }

  findUserById(id) {
    const users = this.getUsers();
    return users.find((u) => u.id === id);
  }

  createUser(userData) {
    const data = this.read();
    const newUser = {
      id: `u_${Date.now()}`,
      createdAt: new Date().toISOString(),
      avatarColor: '#5865F2',
      avatarInitials: userData.displayName ? userData.displayName[0].toUpperCase() : 'U',
      bannerColor: '#5865F2',
      bio: 'Just joined Discord!',
      pronouns: '',
      ...userData,
    };
    data.users.push(newUser);
    this.write(data);
    return newUser;
  }

  updateUser(id, updates) {
    const data = this.read();
    const index = data.users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    data.users[index] = { ...data.users[index], ...updates };
    this.write(data);
    return data.users[index];
  }

  // ── Servers ──
  getServers() {
    return this.read().servers || [];
  }

  findServerById(id) {
    const servers = this.getServers();
    return servers.find((s) => s.id === id);
  }

  createServer(serverData) {
    const data = this.read();
    const newServer = {
      id: `s_${Date.now()}`,
      createdAt: new Date().toISOString(),
      channels: [],
      categories: [],
      members: [],
      ...serverData,
    };
    data.servers.push(newServer);
    this.write(data);
    return newServer;
  }

  addChannelToServer(serverId, channelData, categoryId) {
    const data = this.read();
    const server = data.servers.find((s) => s.id === serverId);
    if (!server) return null;

    const newChannel = {
      id: `c_${Date.now()}`,
      users: 0,
      ...channelData,
    };

    server.channels.push(newChannel);

    // Add to category
    let targetCatId = categoryId;
    if (!targetCatId && server.categories.length > 0) {
      const matchCat = server.categories.find((c) =>
        channelData.type === 'voice'
          ? c.name.toLowerCase().includes('voice')
          : c.name.toLowerCase().includes('text')
      );
      targetCatId = matchCat ? matchCat.id : server.categories[0].id;
    }

    if (targetCatId) {
      const cat = server.categories.find((c) => c.id === targetCatId);
      if (cat) cat.channels.push(newChannel.id);
    }

    this.write(data);
    return newChannel;
  }

  // ── Messages ──
  getMessages(channelId) {
    const data = this.read();
    return data.messages[channelId] || [];
  }

  addMessage(channelId, messageData) {
    const data = this.read();
    if (!data.messages[channelId]) {
      data.messages[channelId] = [];
    }

    const newMsg = {
      id: `msg_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date().toISOString(),
      ...messageData,
    };

    data.messages[channelId].push(newMsg);
    this.write(data);
    return newMsg;
  }
}

export const db = new Database();
