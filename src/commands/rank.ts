import { SlashCommandBuilder, EmbedBuilder, GuildMember } from 'discord.js';
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
    .setName('rank')
    .setDescription('Displays your current rank based on your roles.')
    .addUserOption(option => option.setName('user').setDescription('The user to check')),
  async execute(interaction: any) {
    const target = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(target.id).catch(() => null) as GuildMember;
    
    if (!member) {
      return interaction.reply({ content: 'User not found in the server.', ephemeral: true });
    }

    let currentRank = 'Unranked';
    // Find the highest rank the user has
    for (const rank of [...RANK_ROLES].reverse()) {
      if (rank.id && member.roles.cache.has(rank.id)) {
        currentRank = rank.name.toUpperCase();
        break;
      }
    }

    const embed = new EmbedBuilder()
      .setTitle(`${target.username}'s Rank`)
      .setColor('#ffaa00')
      .setDescription(`Current Rank: **${currentRank}**\n\n*Note: Automatic XP progression is disabled in the databaseless version. Ranks are assigned via roles.*`);

    await interaction.reply({ embeds: [embed] });
  },
};
