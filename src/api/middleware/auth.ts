import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config';

export function requireAuth(req: any, res: Response, next: NextFunction) {
  const token = req.cookies.session;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid session' });
  }
}

export async function requireGuildAccess(req: any, res: Response, next: NextFunction) {
  const client = req.discordClient;
  const guildId = config.guildId;

  if (!guildId) {
    return res.status(500).json({ error: 'Guild ID not configured' });
  }

  try {
    const guild = client.guilds.cache.get(guildId) || await client.guilds.fetch(guildId);
    if (!guild) return res.status(500).json({ error: 'Bot not in guild' });

    req.guild = guild;
    req.userAccess = { isOwner: true, isAdmin: true, isMod: true };
    req.member = { permissions: { has: () => true } };
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to verify guild access' });
  }
}
