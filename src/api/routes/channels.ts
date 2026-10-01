import { Router } from 'express';
import { requireAuth, requireGuildAccess } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, requireGuildAccess, async (req: any, res) => {
  const guild = req.guild;
  
  const channels = guild.channels.cache.map((c: any) => ({
    id: c.id,
    name: c.name,
    type: c.type,
    position: c.position,
    parentId: c.parentId
  })).sort((a: any, b: any) => a.position - b.position);

  res.json(channels);
});

export default router;
