import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import ctfConfig from '../config/ctf.json';

export default {
  data: new SlashCommandBuilder()
    .setName('ctf')
    .setDescription('CTF System commands')
    .addSubcommand(subcommand =>
      subcommand
        .setName('list')
        .setDescription('List all available authorized CTF challenges')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('help')
        .setDescription('Information about the CTF system')
    ),
  async execute(interaction: any) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'list') {
      const challenges = ctfConfig.challenges;
      if (!challenges || challenges.length === 0) {
        return interaction.reply({ content: 'No challenges configured at this time.', ephemeral: true });
      }

      const embed = new EmbedBuilder()
        .setTitle('🚩 Authorized CTF Challenges')
        .setColor('#00ff00')
        .setDescription('These targets are authorized for learning purposes. Do NOT attack any infrastructure not explicitly listed here.');
      
      challenges.forEach((c: any) => {
        embed.addFields({ name: `${c.name} (${c.points} pts) [${c.category}]`, value: c.description });
      });

      await interaction.reply({ embeds: [embed] });
    } else if (subcommand === 'help') {
      const embed = new EmbedBuilder()
        .setTitle('🚩 CTF System Help')
        .setColor('#00ff00')
        .setDescription('Welcome to the World Government CTF system.\n\n*Note: In this database-free deployment, scoring and automated solves are disabled. Use the challenges for local learning and practice.*')
        .addFields(
          { name: 'Rules', value: '1. Only attack the explicit targets provided.\n2. Do not use automated scanners that disrupt services.\n3. Keep flags and solutions out of public channels.' }
        );

      await interaction.reply({ embeds: [embed] });
    }
  },
};
