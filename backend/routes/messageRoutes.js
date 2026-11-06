import express from 'express';
import { db } from '../database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// ─── GET /api/messages/:channelId ───────────────────────────────────────────
router.get('/:channelId', (req, res) => {
  try {
    const { channelId } = req.params;
    const messages = db.getMessages(channelId);
    res.json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages.' });
  }
});

// ─── POST /api/messages/:channelId ──────────────────────────────────────────
router.post('/:channelId', authenticateToken, (req, res) => {
  try {
    const { channelId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Message content cannot be empty.' });
    }

    const newMessage = db.addMessage(channelId, {
      authorId: req.user.id,
      author: req.user.displayName,
      color: req.user.avatarColor || '#5865F2',
      content: content.trim(),
      isBot: false,
    });

    res.status(201).json({ message: newMessage });
  } catch (error) {
    console.error('Error posting message:', error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

export default router;
