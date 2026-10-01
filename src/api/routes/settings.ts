import { Router } from 'express';
import { requireAuth, requireGuildAccess } from '../middleware/auth';
import { config } from '../../config';

const router = Router();

router.get('/', requireAuth, requireGuildAccess, (req: any, res) => {
  res.json({
    channels: config.channels,
    roles: config.roles
  });
});

export default router;
