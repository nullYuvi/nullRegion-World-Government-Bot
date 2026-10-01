import { Events, GuildMember, EmbedBuilder, TextChannel } from 'discord.js';
import { config } from '../config';

export default {
  name: Events.GuildMemberAdd,
  async execute(member: GuildMember) {
    // Welcome system
    if (config.channels.welcome) {
      const channel = member.guild.channels.cache.get(config.channels.welcome) as TextChannel;
      if (channel) {
        const embed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle('Welcome to nullRegion!')
          .setDescription(`Welcome ${member}! We are glad to have you here.\n\nPlease check out:\n- ${config.channels.rules ? `<#${config.channels.rules}>` : '#rules'} to read our community guidelines\n- ${config.channels.roles ? `<#${config.channels.roles}>` : '#roles'} to grab your self-roles\n- ${config.channels.announcements ? `<#${config.channels.announcements}>` : '#general'} to say hello!`)
          .setThumbnail(member.user.displayAvatarURL())
          .setFooter({ text: 'World Government' })
          .setTimestamp();

        await channel.send({ content: `${member}`, embeds: [embed] });
      }
    }

    // Modlog
    if (config.channels.modlog) {
        const modlogChannel = member.guild.channels.cache.get(config.channels.modlog) as TextChannel;
        if (modlogChannel) {
            await modlogChannel.send(`📥 **Member Joined:** ${member.user.tag} (${member.id})`);
        }
    }
  },
};
