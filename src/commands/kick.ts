import { SlashCommandBuilder, PermissionFlagsBits, TextChannel, GuildMember } from 'discord.js';
import { config } from '../config';

export default {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a user.')
    .addUserOption(option => option.setName('user').setDescription('The user to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for kick'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction: any) {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    
    const member = await interaction.guild.members.fetch(target.id).catch(() => null) as GuildMember;
    if (!member) {
      return interaction.reply({ content: 'User not found in guild.', ephemeral: true });
    }

    try {
      await member.kick(reason);
    } catch (e) {
      return interaction.reply({ content: 'Failed to kick user. Ensure my role is higher.', ephemeral: true });
    }

    if (config.channels.modlog) {
      const channel = interaction.guild.channels.cache.get(config.channels.modlog) as TextChannel;
      if (channel) {
        await channel.send(`👢 **Kick:** ${target.tag} (${target.id})\n**Reason:** ${reason}\n**Moderator:** ${interaction.user.tag}`);
      }
    }

    await interaction.reply({ content: `Successfully kicked ${target.tag}.`, ephemeral: true });
  },
};
