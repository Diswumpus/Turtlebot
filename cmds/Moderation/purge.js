const Discord = require('discord.js');

module.exports = {
  name: 'clear',
  aliases: ['purge', 'clean'],
  category: 'Moderation',
  description: 'Clears the chat',
  execute(message, Member, args) {
    if (member.hasPermission('MANAGE_MESSAGES')) {
      let deletenum = args[0]
      message.channel.bulkDelete(deletenum)
      message.channel.send(`Deleted ${deletenum} messages! :wastebasket:`)
    }
  },
};