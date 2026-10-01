import { Events, Client } from 'discord.js';
import { registerCommands } from '../commands/register';

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client) {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    await registerCommands(client);
  },
};
