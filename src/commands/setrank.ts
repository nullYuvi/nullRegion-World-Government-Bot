import { SlashCommandBuilder, PermissionFlagsBits, GuildMember } from 'discord.js';
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
    .setName('setrank')
    .setDescription('Assigns a rank role to a user.')
    .addUserOption(option => option.setName('user').setDescription('The user').setRequired(true))
    .addStringOption(option => 
      option.setName('rank')
        .setDescription('The rank to assign')
        .setRequired(true)
        .addChoices(
          ...RANK_ROLES.map(r => ({ name: r.name, value: r.name }))
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction: any) {
    const target = interaction.options.getUser('user');
    const rankName = interaction.options.getString('rank');
    
    const targetRank = RANK_ROLES.find(r => r.name === rankName);
    if (!targetRank || !targetRank.id) {
      return interaction.reply({ content: `Role ID for ${rankName} is not configured in environment variables.`, ephemeral: true });
    }

    const member = await interaction.guild.members.fetch(target.id).catch(() => null) as GuildMember;
    if (!member) {
      return interaction.reply({ content: 'User not found in the server.', ephemeral: true });
    }

    try {
      // Remove other rank roles
      const allRankIds = RANK_ROLES.map(r => r.id).filter(id => id !== undefined) as string[];
      await member.roles.remove(allRankIds);
      
      // Add new rank role
      await member.roles.add(targetRank.id);

      await interaction.reply({ content: `Successfully assigned the **${rankName}** rank to ${target.tag}.`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Failed to assign rank. Ensure the bot has Manage Roles permission and is positioned higher in the role hierarchy.', ephemeral: true });
    }
  },
};
