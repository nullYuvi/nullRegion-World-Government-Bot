import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays a list of available commands.'),
  async execute(interaction: any) {
    const embed = new EmbedBuilder()
      .setTitle('Bot Commands')
      .setColor('#0099ff')
      .addFields(
        { name: '👥 Community', value: 'Use the channels like <#rules> and <#roles> to get started.' },
        { name: '🎭 Roles', value: '`/setup-roles` (Admin)' },
        { name: '🌟 Ranks', value: '`/rank`, `/leaderboard`, `/setrank` (Admin)' },
        { name: '🛡️ Moderation', value: '`/warn`, `/timeout`, `/kick`, `/ban`, `/purge`' },
        { name: '🚩 CTF', value: '`/ctf list`, `/ctf help`' },
        { name: '⚙️ Admin', value: '`/setup`, `/setup-roles`, `/setrank`, `/roleids`' }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
