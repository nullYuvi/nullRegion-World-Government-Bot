import { SlashCommandBuilder, PermissionFlagsBits, TextChannel } from 'discord.js';
import { config } from '../config';

export default {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Deletes a number of messages.')
    .addIntegerOption(option => option.setName('amount').setDescription('Number of messages to delete (1-100)').setRequired(true).setMinValue(1).setMaxValue(100))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction: any) {
    const amount = interaction.options.getInteger('amount');
    
    const channel = interaction.channel as TextChannel;
    const messages = await channel.bulkDelete(amount, true);

    await interaction.reply({ content: `Successfully deleted ${messages.size} messages.`, ephemeral: true });
    
    if (config.channels.modlog) {
      const modlog = interaction.guild.channels.cache.get(config.channels.modlog) as TextChannel;
      if (modlog) {
        await modlog.send(`🧹 **Purge:** ${interaction.user.tag} deleted ${messages.size} messages in <#${channel.id}>`);
      }
    }
  },
};
