const Discord = require('discord.js');

module.exports = {
  name: 'clear',
  aliases: ['purge', 'clean', 'clear'],
  category: 'Moderation',
  description: 'Clears the chat',
  async execute(message, Member, args) {
    if (message.member.permissions.has('MANAGE_MESSAGES')) {
      let deletenum = args[0]
      message.channel.bulkDelete(deletenum + 1)
      const m = await message.channel.send(`${require('../../emojis.json').check} Deleted ${deletenum} messages!`)
      setTimeout(() => {
        m.delete()
      }, 2000);
    }
  },
};