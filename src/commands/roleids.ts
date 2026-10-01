import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('roleids')
    .setDescription('Lists all role names and their IDs (Server Owner only).')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Ensures at least admin can see it in UI, but we check owner specifically below
  async execute(interaction: any) {
    if (!interaction.guild) {
      return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
    }

    if (interaction.user.id !== interaction.guild.ownerId) {
      return interaction.reply({ content: '❌ Only the server owner can use this command.', ephemeral: true });
    }

    const roles = interaction.guild.roles.cache.sort((a: any, b: any) => b.position - a.position);
    
    let content = '**Server Roles:**\n\n';
    let chunks: string[] = [];
    
    roles.forEach((role: any) => {
      const line = `${role.name}: \`${role.id}\`\n`;
      if (content.length + line.length > 1900) {
        chunks.push(content);
        content = '';
      }
      content += line;
    });
    
    if (content.length > 0) {
      chunks.push(content);
    }

    await interaction.reply({ content: chunks[0], ephemeral: true });

    // If there are more chunks, send them as follow-ups
    for (let i = 1; i < chunks.length; i++) {
      await interaction.followUp({ content: chunks[i], ephemeral: true });
    }
  },
};
