# World Government Discord Bot & Dashboard

## Deployment

The project is designed to be split across two services:

### 1. Render (Backend / Bot)
The backend (Node.js/Express) and Discord bot run on Render.
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Required Environment Variables:**
  - `DISCORD_TOKEN`
  - `DISCORD_CLIENT_ID`
  - `DISCORD_CLIENT_SECRET`
  - `DISCORD_REDIRECT_URI` (e.g. `https://your-backend.onrender.com/api/auth/callback`)
  - `JWT_SECRET`
  - `GUILD_ID`
  - `FRONTEND_URL` (e.g. `https://your-frontend.vercel.app`)

### 2. Vercel (Frontend)
The React/Vite dashboard runs on Vercel.
- **Root Directory:** `web`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Required Environment Variables:**
  - `VITE_API_URL` (e.g. `https://your-backend.onrender.com`)

## Local Development

**Backend:**
\`\`\`bash
npm run dev
\`\`\`

**Frontend:**
\`\`\`bash
cd web
npm run dev
\`\`\`
