import { Router } from 'express';
import { requireAuth, requireGuildAccess } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, requireGuildAccess, async (req: any, res) => {
  const guild = req.guild;
  // Limit to 1000 members for performance in dashboard
  const members = await guild.members.fetch({ limit: 1000 });

  const formattedMembers = members.map((m: any) => ({
    id: m.id,
    username: m.user.username,
    displayName: m.displayName,
    avatar: m.user.displayAvatarURL(),
    joinedAt: m.joinedAt,
    roles: m.roles.cache.map((r: any) => ({ id: r.id, name: r.name, color: r.hexColor })).filter((r: any) => r.name !== '@everyone'),
  }));

  res.json(formattedMembers);
});

router.post('/:id/kick', requireAuth, requireGuildAccess, async (req: any, res) => {
  const guild = req.guild;
  const { reason } = req.body;
  
  if (!req.userAccess.isOwner && !req.userAccess.isAdmin && !req.member.permissions.has('KickMembers')) {
    return res.status(403).json({ error: 'Missing Discord KickMembers permission' });
  }

  try {
    const member = await guild.members.fetch(req.params.id);
    if (!member.kickable) return res.status(400).json({ error: 'Cannot kick this member (hierarchy)' });
    
    await member.kick(reason || `Kicked via dashboard by ${req.user.username}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to kick' });
  }
});

router.post('/:id/ban', requireAuth, requireGuildAccess, async (req: any, res) => {
  const guild = req.guild;
  const { reason } = req.body;

  if (!req.userAccess.isOwner && !req.userAccess.isAdmin && !req.member.permissions.has('BanMembers')) {
    return res.status(403).json({ error: 'Missing Discord BanMembers permission' });
  }

  try {
    const member = await guild.members.fetch(req.params.id);
    if (!member.bannable) return res.status(400).json({ error: 'Cannot ban this member (hierarchy)' });
    
    await member.ban({ reason: reason || `Banned via dashboard by ${req.user.username}` });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to ban' });
  }
});

export default router;
