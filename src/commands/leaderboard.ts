import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { config } from '../config';

const RANK_ROLES = [
  { name: 'rookie', id: config.roles.ranks.rookie },
  { name: 'pirate', id: config.roles.ranks.pirate },
  { name: 'worstGen', id: config.roles.ranks.worstGen },
  { name: 'supernova', id: config.roles.ranks.supernova },
  { name: 'warlord', id: config.roles.ranks.warlord },
  { name: 'viceAdmiral', id: config.roles.ranks.viceAdmiral },
  { name: 'admiral', id: config.roles.ranks.admiral },
  { name: 'fleetAdmiral', id: config.roles.ranks.fleetAdmiral },
  { name: 'yonko', id: config.roles.ranks.yonko },
  { name: 'pirateKing', id: config.roles.ranks.pirateKing },
];

export default {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Information about the rank leaderboard.'),
  async execute(interaction: any) {
    const embed = new EmbedBuilder()
      .setTitle('🏆 Leaderboard')
      .setColor('#ffaa00')
      .setDescription('*Note: The XP leaderboard requires a persistent database.* \n\nFor this deployment, ranks are managed through Discord roles. Automatic XP tracking and the leaderboard will be available when a database is attached in the future.');

    // We could theoretically fetch all members and count how many are in each rank, but that's not a real leaderboard.
    await interaction.reply({ embeds: [embed] });
  },
};
