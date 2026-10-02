import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Client } from 'discord.js';
import path from 'path';

import authRoutes from './routes/auth';
import guildRoutes from './routes/guild';
import membersRoutes from './routes/members';
import rolesRoutes from './routes/roles';
import ranksRoutes from './routes/ranks';
import ctfRoutes from './routes/ctf';
import channelsRoutes from './routes/channels';
import settingsRoutes from './routes/settings';

export function startApi(client: Client) {
  const app = express();
  app.set('trust proxy', 1);
  
  // Security Headers
  app.use(helmet({
    contentSecurityPolicy: false, // Vite uses inline scripts during dev, adjust for strict prod if needed
    crossOriginEmbedderPolicy: false,
  }));

  // CORS
  const isProd = process.env.NODE_ENV === 'production';
  app.use(cors({
    origin: isProd ? process.env.FRONTEND_URL || 'http://localhost:5173' : 'http://localhost:5173',
    credentials: true,
  }));

  app.use(express.json());
  app.use(cookieParser());

  // Rate Limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 500 requests per window
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/api/', apiLimiter);

  // Attach Discord client
  app.use((req: any, res, next) => {
    req.discordClient = client;
    next();
  });

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/guild', guildRoutes);
  app.use('/api/members', membersRoutes);
  app.use('/api/roles', rolesRoutes);
  app.use('/api/ranks', ranksRoutes);
  app.use('/api/ctf', ctfRoutes);
  app.use('/api/channels', channelsRoutes);
  app.use('/api/settings', settingsRoutes);

  // Error Handler
  app.use((err: any, req: any, res: any, next: any) => {
    console.error('API Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  const port = process.env.PORT || 3000;
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`API Server listening on 0.0.0.0:${port}`);
  });
}
