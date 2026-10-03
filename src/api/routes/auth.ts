import { Router } from 'express';
import { config } from '../../config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { requireAuth } from '../middleware/auth';

const router = Router();

const loginRateLimits = new Map<string, { count: number; lastAttempt: number }>();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const ip = req.ip || req.connection.remoteAddress || 'unknown';

  const now = Date.now();
  const rl = loginRateLimits.get(ip) || { count: 0, lastAttempt: now };
  if (now - rl.lastAttempt > 15 * 60 * 1000) {
    rl.count = 0;
  }
  if (rl.count >= 5) {
    return res.status(429).json({ error: 'Too many login attempts, try again later' });
  }

  if (!username || !password) {
    rl.count += 1;
    rl.lastAttempt = now;
    loginRateLimits.set(ip, rl);
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  if (username !== config.dashboardAdminUsername) {
    rl.count += 1;
    rl.lastAttempt = now;
    loginRateLimits.set(ip, rl);
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  if (!config.dashboardAdminPasswordHash) {
    return res.status(500).json({ error: 'Admin password not configured' });
  }

  const isValid = await bcrypt.compare(password, config.dashboardAdminPasswordHash);
  if (!isValid) {
    rl.count += 1;
    rl.lastAttempt = now;
    loginRateLimits.set(ip, rl);
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  rl.count = 0;
  loginRateLimits.set(ip, rl);

  const token = jwt.sign(
    { id: 'admin', username: config.dashboardAdminUsername, avatar: null },
    config.jwtSecret,
    { expiresIn: '24h' }
  );

  res.cookie('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.json({ success: true });
});

router.post('/logout', (req, res) => {
  res.clearCookie('session');
  res.json({ success: true });
});

router.get('/me', requireAuth, (req: any, res) => {
  res.json({
    user: req.user,
    access: { isOwner: true, isAdmin: true, isMod: true }
  });
});

export default router;
