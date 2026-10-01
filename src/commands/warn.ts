import { SlashCommandBuilder, PermissionFlagsBits, TextChannel } from 'discord.js';
import { config } from '../config';

export default {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warns a user.')
    .addUserOption(option => option.setName('user').setDescription('The user to warn').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for warning').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction: any) {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    if (config.channels.modlog) {
      const channel = interaction.guild.channels.cache.get(config.channels.modlog) as TextChannel;
      if (channel) {
        await channel.send(`⚠️ **Warn:** ${target.tag} (${target.id})\n**Reason:** ${reason}\n**Moderator:** ${interaction.user.tag}`);
      }
    }

    await interaction.reply({ content: `Successfully warned ${target.tag} for: ${reason}`, ephemeral: true });
    
    // Optionally DM the user
    try {
      await target.send(`You have been warned in ${interaction.guild.name} for: ${reason}`);
    } catch (e) {
      // User has DMs disabled
    }
  },
};
