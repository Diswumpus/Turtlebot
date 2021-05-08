const { Command } = require("discord.js-commando");

module.exports = {
  name: 'purge',
  category: 'Moderation',
  description: 'Clears the chat',
  execute: async (message, Member, args) => {
      // Purge Command!
      if (message.author.bot) return;
      if (args.purgecount > 100)
        return message.reply(
          "You can currently only purge up to 100 messages at a time."
        );
        
  
      await message.channel.messages
        .fetch({ limit: args.purgecount })
        .then(async messages => {
          // Fetches the messages
          await message.channel.bulkDelete(messages);
        })
        .then(() => {
          message
            .reply(`🗑️ Sucessfully Deleted ${args.purgecount} messages.`)
            .then(async e => {
              await e.delete(2000);
            });
      });
  },
};

