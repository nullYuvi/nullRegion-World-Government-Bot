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
  const userId = req.user.id;
  const guildId = config.guildId;

  if (!guildId) {
    return res.status(500).json({ error: 'Guild ID not configured' });
  }

  try {
    const guild = client.guilds.cache.get(guildId) || await client.guilds.fetch(guildId);
    if (!guild) return res.status(500).json({ error: 'Bot not in guild' });

    const member = await guild.members.fetch(userId).catch(() => null);
    if (!member) return res.status(403).json({ error: 'Forbidden: Not in guild' });

    req.member = member;
    req.guild = guild;

    const isOwner = guild.ownerId === userId;
    const isAdmin = member.permissions.has('Administrator') || member.permissions.has('ManageGuild');
    const isMod = member.permissions.has('ModerateMembers') || member.permissions.has('ManageMessages');

    if (!isOwner && !isAdmin && !isMod) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    req.userAccess = { isOwner, isAdmin, isMod };
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to verify guild access' });
  }
}
