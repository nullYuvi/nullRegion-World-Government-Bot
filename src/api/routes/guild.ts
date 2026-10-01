import { Router } from 'express';
import { requireAuth, requireGuildAccess } from '../middleware/auth';

const router = Router();

router.get('/stats', requireAuth, requireGuildAccess, async (req: any, res) => {
  const guild = req.guild;
  const client = req.discordClient;

  res.json({
    id: guild.id,
    name: guild.name,
    icon: guild.iconURL(),
    memberCount: guild.memberCount,
    roleCount: guild.roles.cache.size,
    channelCount: guild.channels.cache.size,
    uptime: client.uptime,
    ping: client.ws.ping,
  });
});

export default router;
