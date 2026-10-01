import { Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';

export async function loadCommands(commands: Collection<string, any>) {
  const commandsPath = path.join(__dirname);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => (file.endsWith('.ts') || file.endsWith('.js')) && !file.includes('loader') && !file.includes('register'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);
    if (command.default && command.default.data && command.default.execute) {
      commands.set(command.default.data.name, command.default);
    }
  }
}
