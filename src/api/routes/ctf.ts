import { Router } from 'express';
import { requireAuth, requireGuildAccess } from '../middleware/auth';
import ctfConfig from '../../config/ctf.json';

const router = Router();

router.get('/', requireAuth, requireGuildAccess, (req: any, res) => {
  res.json(ctfConfig.challenges || []);
});

export default router;
