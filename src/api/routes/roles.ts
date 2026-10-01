import { Router } from 'express';
import { requireAuth, requireGuildAccess } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, requireGuildAccess, async (req: any, res) => {
  const guild = req.guild;
  
  const roles = guild.roles.cache.map((r: any) => ({
    id: r.id,
    name: r.name,
    color: r.hexColor,
    position: r.position,
    managed: r.managed,
    memberCount: r.members.size,
  })).sort((a: any, b: any) => b.position - a.position);

  res.json(roles);
});

export default router;
