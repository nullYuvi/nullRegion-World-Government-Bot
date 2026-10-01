import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from 'discord.js';
import { config } from '../config';

export default {
  data: new SlashCommandBuilder()
    .setName('setup-roles')
    .setDescription('Creates the self-assignable roles message.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction: any) {
    const r = config.roles.self;
    
    const row1 = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder().setCustomId(`role_${r.developer}`).setLabel('💻 Developer').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId(`role_${r.security}`).setLabel('🔐 Security Researcher').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId(`role_${r.bughunter}`).setLabel('🐛 Bug Hunter').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId(`role_${r.ctfhunter}`).setLabel('⚔️ CTF Hunter').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId(`role_${r.linux}`).setLabel('🐧 Linux').setStyle(ButtonStyle.Primary),
      );

    const row2 = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder().setCustomId(`role_${r.web}`).setLabel('🌐 Web Security').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId(`role_${r.android}`).setLabel('📱 Android Security').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId(`role_${r.osint}`).setLabel('🔎 OSINT').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId(`role_${r.malware}`).setLabel('🧬 Malware Analysis').setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId(`role_${r.crypto}`).setLabel('🔑 Cryptography').setStyle(ButtonStyle.Primary),
      );

    // Note: To make this work correctly, the role IDs need to be fetched from config or the IDs mapped correctly
    // The button customIds here are placeholders. The interactionCreate handler needs to map these to actual role IDs.
    // Or we update the customId to actually embed the Role ID if configured. 
    // To keep it clean, let's just create a message. We'll update the customId logic later.

    await interaction.reply({
      content: 'Select your roles below by clicking the buttons. Click again to remove the role.',
      components: [row1, row2]
    });
  },
};
