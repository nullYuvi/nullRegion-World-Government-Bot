import { Router } from 'express';
import { requireAuth, requireGuildAccess } from '../middleware/auth';
import { config } from '../../config';

const router = Router();

const RANK_KEYS = [
  'rookie', 'pirate', 'worstGen', 'supernova', 'warlord', 
  'viceAdmiral', 'admiral', 'fleetAdmiral', 'yonko', 'pirateKing'
];

router.get('/', requireAuth, requireGuildAccess, (req: any, res) => {
  const guild = req.guild;
  
  const ranks = RANK_KEYS.map((key) => {
    const roleId = config.roles.ranks[key as keyof typeof config.roles.ranks];
    const role = roleId ? guild.roles.cache.get(roleId) : null;
    return {
      key,
      roleId,
      name: role ? role.name : key,
      memberCount: role ? role.members.size : 0
    };
  });

  res.json(ranks);
});

export default router;
