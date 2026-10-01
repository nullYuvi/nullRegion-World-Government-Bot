import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { config } from '../config';

export default {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Displays the current bot configuration status.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction: any) {
    const check = (val: string | undefined) => val ? '✅ Configured' : '❌ Missing';

    const embed = new EmbedBuilder()
      .setTitle('Server Configuration Status')
      .setColor('#2b2d31')
      .setDescription('Use environment variables to configure missing features.')
      .addFields(
        { name: 'Welcome Channel', value: check(config.channels.welcome), inline: true },
        { name: 'Rules Channel', value: check(config.channels.rules), inline: true },
        { name: 'Roles Channel', value: check(config.channels.roles), inline: true },
        { name: 'Modlog Channel', value: check(config.channels.modlog), inline: true },
        { name: 'CTF Channel', value: check(config.channels.ctf), inline: true },
        { name: 'Announcements Channel', value: check(config.channels.announcements), inline: true }
      );

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
