import { SlashCommandBuilder, PermissionFlagsBits, TextChannel, GuildMember } from 'discord.js';
import { config } from '../config';

export default {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a user.')
    .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for ban'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction: any) {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    
    try {
      await interaction.guild.members.ban(target.id, { reason });
    } catch (e) {
      return interaction.reply({ content: 'Failed to ban user. Ensure my role is higher.', ephemeral: true });
    }

    if (config.channels.modlog) {
      const channel = interaction.guild.channels.cache.get(config.channels.modlog) as TextChannel;
      if (channel) {
        await channel.send(`🔨 **Ban:** ${target.tag} (${target.id})\n**Reason:** ${reason}\n**Moderator:** ${interaction.user.tag}`);
      }
    }

    await interaction.reply({ content: `Successfully banned ${target.tag}.`, ephemeral: true });
  },
};
