import { REST, Routes, Client } from 'discord.js';
import { config } from '../config';
import fs from 'fs';
import path from 'path';

export async function registerCommands(client: Client) {
  const commands = [];
  const commandsPath = path.join(__dirname);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => (file.endsWith('.ts') || file.endsWith('.js')) && !file.includes('loader') && !file.includes('register'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);
    if (command.default && command.default.data) {
      commands.push(command.default.data.toJSON());
    }
  }

  const rest = new REST({ version: '10' }).setToken(config.token!);

  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    let data: any;
    if (config.guildId) {
      data = await rest.put(
        Routes.applicationGuildCommands(client.user!.id, config.guildId),
        { body: commands },
      );
      console.log(`Successfully reloaded ${data.length} guild (/) commands.`);
    } else {
      // Auto-detect guilds and register to them directly to avoid global cache delay
      const guilds = await client.guilds.fetch();
      for (const [id] of guilds) {
        data = await rest.put(
          Routes.applicationGuildCommands(client.user!.id, id),
          { body: commands },
        );
        console.log(`Successfully reloaded ${data.length} guild (/) commands for guild ${id}.`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
