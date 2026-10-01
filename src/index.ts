import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { config } from './config';
import { loadEvents } from './events/loader';
import { loadCommands } from './commands/loader';
import { startApi } from './api/server';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
  ],
});

export const commands = new Collection<string, any>();

async function main() {
  console.log('Starting main...');
  if (!config.token) {
    console.error('DISCORD_TOKEN is not set in environment variables.');
    process.exit(1);
  }

  // Load handlers
  console.log('Loading events...');
  await loadEvents(client);
  console.log('Loading commands...');
  await loadCommands(commands);

  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    client.destroy();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('Shutting down gracefully...');
    client.destroy();
    process.exit(0);
  });

  try {
    console.log('Logging in...');
    await client.login(config.token);
    console.log('Login function returned.');
    
    console.log('Starting Web Dashboard API...');
    startApi(client);
  } catch (error) {
    console.error('Failed to login:', error);
    process.exit(1);
  }
}

main();
