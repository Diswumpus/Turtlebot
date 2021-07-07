const Discord = require('discord.js');

module.exports = {
  name: 'unlock',
  category: 'Moderation',
  description: 'Unlocks the chat',
  execute(message, Member, args) {
    if (!message.guild) return;
    if (message.member.permissions.has('MANAGE_MESSAGES')) {
        message.guild.roles.cache.forEach(role => {
            message.channel.updateOverwrite(role, {
               SEND_MESSAGES: true
            })
         })
         const lockembed = new Discord.MessageEmbed()
         .setTitle(`${require('../../emojis.json').check} Unlocked ${message.channel.name}`)
         //.setImage(`https://cdn.tixte.com/uploads/turtlepaw.is-from.space/koxkjxcr49a.png`)
      message.channel.send(lockembed)
    }
  },
};