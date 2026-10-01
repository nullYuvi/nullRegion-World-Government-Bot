import { Router } from 'express';
import { config } from '../../config';
import jwt from 'jsonwebtoken';
import { requireAuth, requireGuildAccess } from '../middleware/auth';

const router = Router();

router.get('/login', (req, res) => {
  const params = new URLSearchParams({
    client_id: config.clientId || '',
    redirect_uri: config.redirectUri || '',
    response_type: 'code',
    scope: 'identify guilds',
  });
  res.redirect(`https://discord.com/api/oauth2/authorize?${params.toString()}`);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code as string;
  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: config.clientId || '',
        client_secret: config.clientSecret || '',
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.redirectUri || '',
      }).toString(),
    });

    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || 'Failed to exchange code' });
    }

    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { authorization: `Bearer ${tokenData.access_token}` },
    });
    
    if (!userResponse.ok) {
       return res.status(400).json({ error: 'Failed to fetch user data' });
    }

    const userData = await userResponse.json();

    const token = jwt.sign({ id: userData.id, username: userData.username, avatar: userData.avatar }, config.jwtSecret, { expiresIn: '7d' });

    res.cookie('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(process.env.FRONTEND_URL || '/');
  } catch (err) {
    console.error('OAuth Callback Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('session');
  res.json({ success: true });
});

router.get('/me', requireAuth, requireGuildAccess, (req: any, res) => {
  res.json({
    user: req.user,
    access: req.userAccess
  });
});

export default router;
