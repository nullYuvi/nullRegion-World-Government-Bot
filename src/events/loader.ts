import { Client } from 'discord.js';
import fs from 'fs';
import path from 'path';

export async function loadEvents(client: Client) {
  const eventsPath = path.join(__dirname);
  const eventFiles = fs.readdirSync(eventsPath).filter(file => (file.endsWith('.ts') || file.endsWith('.js')) && !file.includes('loader'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const eventModule = await import(filePath);
    const events = Array.isArray(eventModule.default) ? eventModule.default : [eventModule.default];

    for (const event of events) {
      if (event && event.name) {
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args, client));
        } else {
          client.on(event.name, (...args) => event.execute(...args, client));
        }
      }
    }
  }
}
