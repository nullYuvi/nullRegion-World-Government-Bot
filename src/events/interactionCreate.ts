import { Events, Interaction } from 'discord.js';
import { commands } from '../index';

export default {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction) {
    try {
      if (interaction.isChatInputCommand()) {
        const command = commands.get(interaction.commandName);
        if (!command) return;

        await command.execute(interaction);
      } else if (interaction.isButton()) {
        const customId = interaction.customId;
        if (customId.startsWith('role_')) {
          const roleId = customId.split('_')[1];
          const member = interaction.guild?.members.cache.get(interaction.user.id) || await interaction.guild?.members.fetch(interaction.user.id);
          
          if (!member) {
            await interaction.reply({ content: 'Member not found.', ephemeral: true });
            return;
          }

          if (member.roles.cache.has(roleId)) {
            await member.roles.remove(roleId);
            await interaction.reply({ content: `Removed role <@&${roleId}>`, ephemeral: true });
          } else {
            await member.roles.add(roleId);
            await interaction.reply({ content: `Added role <@&${roleId}>`, ephemeral: true });
          }
        }
      }
    } catch (error) {
      console.error('Error handling interaction:', error);
      const reply = { content: 'There was an error while executing this interaction!', ephemeral: true };
      if (interaction.isRepliable()) {
        if (interaction.deferred || interaction.replied) {
          await interaction.followUp(reply).catch(console.error);
        } else {
          await interaction.reply(reply).catch(console.error);
        }
      }
    }
  },
};
