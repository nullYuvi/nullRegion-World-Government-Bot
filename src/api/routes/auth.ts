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
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'DiscordBot (https://nullregion-world-government-bot.onrender.com, 1.0.0)'
      },
      body: new URLSearchParams({
        client_id: config.clientId || '',
        client_secret: config.clientSecret || '',
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.redirectUri || '',
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      const contentType = tokenResponse.headers.get('content-type') || 'unknown';
      console.error(`OAuth Token Error [${tokenResponse.status}]: Content-Type: ${contentType}. Body: ${errorText.substring(0, 100)}...`);
      return res.status(400).json({ error: 'Failed to exchange code due to upstream error' });
    }

    const contentType = tokenResponse.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      console.error(`OAuth Token Error: Expected JSON, got ${contentType}`);
      return res.status(400).json({ error: 'Invalid response format from Discord' });
    }

    const tokenData = await tokenResponse.json();
    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || 'Failed to exchange code' });
    }

    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { 
        authorization: `Bearer ${tokenData.access_token}`,
        'User-Agent': 'DiscordBot (https://nullregion-world-government-bot.onrender.com, 1.0.0)'
      },
    });
    
    if (!userResponse.ok) {
       const userErrorText = await userResponse.text();
       const userContentType = userResponse.headers.get('content-type') || 'unknown';
       console.error(`OAuth User Data Error [${userResponse.status}]: Content-Type: ${userContentType}. Body: ${userErrorText.substring(0, 100)}...`);
       return res.status(400).json({ error: 'Failed to fetch user data due to upstream error' });
    }

    const userContentType = userResponse.headers.get('content-type') || '';
    if (!userContentType.includes('application/json')) {
       console.error(`OAuth User Data Error: Expected JSON, got ${userContentType}`);
       return res.status(400).json({ error: 'Invalid user data format from Discord' });
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
