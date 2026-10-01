import { Events, GuildMember, Message, PartialMessage, TextChannel } from 'discord.js';
import { config } from '../config';

async function logToModLog(guild: any, message: string) {
  if (config.channels.modlog) {
    const channel = guild.channels.cache.get(config.channels.modlog) as TextChannel;
    if (channel) {
      await channel.send(message);
    }
  }
}

export default [
  {
    name: Events.GuildMemberRemove,
    async execute(member: GuildMember) {
      await logToModLog(member.guild, `📤 **Member Left:** ${member.user.tag} (${member.id})`);
    }
  },
  {
    name: Events.MessageDelete,
    async execute(message: Message | PartialMessage) {
      if (message.author?.bot) return;
      await logToModLog(message.guild, `🗑️ **Message Deleted** by ${message.author?.tag} in <#${message.channelId}>:\n${message.content || '[No Text/Embed]'}`);
    }
  },
  {
    name: Events.MessageUpdate,
    async execute(oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage) {
      if (oldMessage.author?.bot) return;
      if (oldMessage.content === newMessage.content) return;
      await logToModLog(oldMessage.guild, `📝 **Message Edited** by ${oldMessage.author?.tag} in <#${oldMessage.channelId}>:\n**Before:** ${oldMessage.content}\n**After:** ${newMessage.content}`);
    }
  },
  {
    name: Events.GuildMemberUpdate,
    async execute(oldMember: GuildMember, newMember: GuildMember) {
      if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
        const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
        const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

        if (addedRoles.size > 0) {
          await logToModLog(newMember.guild, `🎭 **Role Added** to ${newMember.user.tag}: ${addedRoles.map(r => r.name).join(', ')}`);
        }
        if (removedRoles.size > 0) {
          await logToModLog(newMember.guild, `🎭 **Role Removed** from ${newMember.user.tag}: ${removedRoles.map(r => r.name).join(', ')}`);
        }
      }
    }
  }
];
