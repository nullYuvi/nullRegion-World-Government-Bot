import { SlashCommandBuilder, PermissionFlagsBits, TextChannel, GuildMember } from 'discord.js';
import { config } from '../config';

export default {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeouts a user.')
    .addUserOption(option => option.setName('user').setDescription('The user to timeout').setRequired(true))
    .addIntegerOption(option => option.setName('minutes').setDescription('Duration in minutes').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for timeout'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction: any) {
    const target = interaction.options.getUser('user');
    const minutes = interaction.options.getInteger('minutes');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    
    const member = await interaction.guild.members.fetch(target.id) as GuildMember;
    if (!member) {
      return interaction.reply({ content: 'User not found in guild.', ephemeral: true });
    }

    try {
      await member.timeout(minutes * 60 * 1000, reason);
    } catch (e) {
      return interaction.reply({ content: 'Failed to timeout user. Ensure my role is higher.', ephemeral: true });
    }

    if (config.channels.modlog) {
      const channel = interaction.guild.channels.cache.get(config.channels.modlog) as TextChannel;
      if (channel) {
        await channel.send(`⏱️ **Timeout:** ${target.tag} (${target.id}) for ${minutes} minutes\n**Reason:** ${reason}\n**Moderator:** ${interaction.user.tag}`);
      }
    }

    await interaction.reply({ content: `Successfully timed out ${target.tag} for ${minutes} minutes.`, ephemeral: true });
  },
};
