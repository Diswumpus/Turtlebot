const Discord = require('discord.js');

module.exports = {
  name: 'lockdown',
  category: 'Moderation',
  description: 'Locks the chat',
  execute(message, Member, args) {
    if (!message.guild) return;
    if (message.member.permissions.has('MANAGE_MESSAGES')) {
        message.guild.roles.cache.forEach(role => {
            message.channel.updateOverwrite(role, {
               SEND_MESSAGES: false
            })
         })
         const lockembed = new Discord.MessageEmbed()
         .setTitle(`:white_check_mark: Locked down ${message.channel.name}`)
         .setImage(`https://cdn.tixte.com/uploads/turtlepaw.is-from.space/koxjqi6o99a.png`)
         .setDescription(`[Icon](https://www.iconfinder.com/icons/4698593/lock_padlock_protection_safety_security_icon)`)
        //message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
      message.channel.send(lockembed)
    }
  },
};