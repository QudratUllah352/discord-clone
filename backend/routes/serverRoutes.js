import express from 'express';
import { db } from '../database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// ─── GET /api/servers ────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  try {
    const servers = db.getServers();
    res.json({ servers });
  } catch (error) {
    console.error('Error fetching servers:', error);
    res.status(500).json({ message: 'Failed to fetch servers.' });
  }
});

// ─── POST /api/servers ───────────────────────────────────────────────────────
router.post('/', authenticateToken, (req, res) => {
  try {
    const { name, icon, color } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Server name is required.' });
    }

    const textChannelId = `c_${Date.now()}_1`;
    const voiceChannelId = `c_${Date.now()}_2`;

    const newServer = db.createServer({
      name: name.trim(),
      icon: icon || name.trim().slice(0, 2).toUpperCase(),
      color: color || '#5865F2',
      ownerId: req.user.id,
      channels: [
        { id: textChannelId, type: 'text', name: 'general', unread: false },
        { id: voiceChannelId, type: 'voice', name: 'General Voice', users: 0 },
      ],
      categories: [
        { id: `cat_${Date.now()}_1`, name: 'TEXT CHANNELS', channels: [textChannelId] },
        { id: `cat_${Date.now()}_2`, name: 'VOICE CHANNELS', channels: [voiceChannelId] },
      ],
      members: [
        {
          id: req.user.id,
          name: req.user.displayName,
          status: 'online',
          role: 'Admin',
          avatar: null,
          color: req.user.avatarColor || '#5865F2',
          bio: req.user.bio || '',
        },
        { id: 'm_bot', name: 'Clyde', status: 'online', role: 'Bot', avatar: null, color: '#5865F2' },
      ],
    });

    // Seed welcome message in default text channel
    db.addMessage(textChannelId, {
      authorId: 'm_bot',
      author: 'Clyde',
      color: '#5865F2',
      content: `Welcome to **${newServer.name}**! Invite friends or start typing to chat.`,
      isBot: true,
    });

    res.status(201).json({ server: newServer });
  } catch (error) {
    console.error('Error creating server:', error);
    res.status(500).json({ message: 'Failed to create server.' });
  }
});

// ─── POST /api/servers/:serverId/channels ───────────────────────────────────
router.post('/:serverId/channels', authenticateToken, (req, res) => {
  try {
    const { serverId } = req.params;
    const { name, type, categoryId, isPrivate } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Channel name is required.' });
    }

    const formattedName = type === 'text'
      ? name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '')
      : name.trim();

    const newChannel = db.addChannelToServer(
      serverId,
      {
        name: formattedName || 'new-channel',
        type: type || 'text',
        isPrivate: !!isPrivate,
      },
      categoryId
    );

    if (!newChannel) {
      return res.status(404).json({ message: 'Server not found.' });
    }

    const updatedServer = db.getServers().find((s) => s.id === serverId);
    res.status(201).json({ channel: newChannel, server: updatedServer });
  } catch (error) {
    console.error('Error creating channel:', error);
    res.status(500).json({ message: 'Failed to create channel.' });
  }
});

export default router;
