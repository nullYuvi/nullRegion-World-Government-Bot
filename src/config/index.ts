import dotenv from 'dotenv';
dotenv.config();

export const config = {
  token: process.env.DISCORD_TOKEN,
  clientId: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  redirectUri: process.env.DISCORD_REDIRECT_URI,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  guildId: process.env.GUILD_ID,
  channels: {
    welcome: process.env.WELCOME_CHANNEL_ID,
    rules: process.env.RULES_CHANNEL_ID,
    roles: process.env.ROLES_CHANNEL_ID,
    announcements: process.env.ANNOUNCEMENTS_CHANNEL_ID,
    modlog: process.env.MODLOG_CHANNEL_ID,
    ctf: process.env.CTF_CHANNEL_ID,
  },
  roles: {
    self: {
      developer: process.env.ROLE_DEVELOPER_ID,
      security: process.env.ROLE_SECURITY_ID,
      bughunter: process.env.ROLE_BUGHUNTER_ID,
      ctfhunter: process.env.ROLE_CTFHUNTER_ID,
      linux: process.env.ROLE_LINUX_ID,
      web: process.env.ROLE_WEB_ID,
      android: process.env.ROLE_ANDROID_ID,
      osint: process.env.ROLE_OSINT_ID,
      malware: process.env.ROLE_MALWARE_ID,
      crypto: process.env.ROLE_CRYPTO_ID,
    },
    ranks: {
      rookie: process.env.RANK_ROOKIE_ID,
      pirate: process.env.RANK_PIRATE_ID,
      worstGen: process.env.RANK_WORST_GEN_ID,
      supernova: process.env.RANK_SUPERNOVA_ID,
      warlord: process.env.RANK_WARLORD_ID,
      viceAdmiral: process.env.RANK_VICE_ADMIRAL_ID,
      admiral: process.env.RANK_ADMIRAL_ID,
      fleetAdmiral: process.env.RANK_FLEET_ADMIRAL_ID,
      yonko: process.env.RANK_YONKO_ID,
      pirateKing: process.env.RANK_PIRATE_KING_ID,
    }
  }
};
