import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../database.js';
import { authenticateToken, JWT_SECRET } from '../middleware/auth.js';

const router = express.Router();

// Helper to strip sensitive fields
function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

// ─── POST /api/auth/register ────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { email, password, username, displayName, birthDate } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Email, password, and username are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim().toLowerCase().replace(/\s+/g, '_');

    // Check if user already exists
    if (db.findUserByEmail(cleanEmail)) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    if (db.findUserByUsername(cleanUsername)) {
      return res.status(400).json({ message: 'This username is already taken.' });
    }

    // Hash password with bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in DB
    const newUser = db.createUser({
      email: cleanEmail,
      username: cleanUsername,
      displayName: displayName ? displayName.trim() : cleanUsername,
      password: hashedPassword,
      birthDate: birthDate || null,
      avatarInitials: (displayName || cleanUsername).slice(0, 1).toUpperCase(),
    });

    // Sign JWT Token (expires in 7 days)
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error during registration.' });
  }
});

// ─── POST /api/auth/login ───────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email/username and password are required.' });
    }

    const input = email.trim().toLowerCase();

    // Allow login by email or by username
    const user = db.findUserByEmail(input) || db.findUserByUsername(input);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials. User does not exist.' });
    }

    // Verify hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Incorrect password.' });
    }

    // Sign JWT Token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Logged in successfully!',
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error during login.' });
  }
});

// ─── GET /api/auth/me ────────────────────────────────────────────────────────
router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
});

// ─── PUT /api/auth/profile ───────────────────────────────────────────────────
router.put('/profile', authenticateToken, (req, res) => {
  try {
    const { displayName, username, bio, pronouns, avatarColor, avatarInitials, bannerColor } = req.body;

    const updates = {};
    if (displayName !== undefined) updates.displayName = displayName.trim();
    if (username !== undefined) {
      const cleanUsername = username.trim().toLowerCase().replace(/\s+/g, '_');
      // check uniqueness if username changed
      const existing = db.findUserByUsername(cleanUsername);
      if (existing && existing.id !== req.user.id) {
        return res.status(400).json({ message: 'Username is already taken.' });
      }
      updates.username = cleanUsername;
    }
    if (bio !== undefined) updates.bio = bio.trim();
    if (pronouns !== undefined) updates.pronouns = pronouns.trim();
    if (avatarColor !== undefined) updates.avatarColor = avatarColor;
    if (avatarInitials !== undefined) updates.avatarInitials = avatarInitials.slice(0, 2).toUpperCase();
    if (bannerColor !== undefined) updates.bannerColor = bannerColor;

    const updated = db.updateUser(req.user.id, updates);
    res.json({ message: 'Profile updated!', user: sanitizeUser(updated) });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Failed to update profile.' });
  }
});

export default router;
