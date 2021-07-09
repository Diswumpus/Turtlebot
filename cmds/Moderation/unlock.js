const Discord = require('discord.js');

module.exports = {
  name: 'unlock',
  category: 'Moderation',
  description: 'Unlocks the chat',
  execute(message, Member, args) {
    if (!message.guild) return;
    if (message.member.permissions.has('MANAGE_MESSAGES')) {
      message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
               SEND_MESSAGES: true
            })
         const lockembed = new Discord.MessageEmbed()
         .setTitle(`${require('../../emojis.json').check} Unlocked ${message.channel.name}`)
      message.channel.send({ embeds: [lockembed] });
    }
  },
};