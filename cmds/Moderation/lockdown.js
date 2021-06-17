const Discord = require('discord.js');
const ms = require("ms");

module.exports = {
   name: 'lockdown',
   category: 'Moderation',
   description: 'Locks the chat',
   async execute(message, Member, args) {
      if (!message.guild) return;
      if (message.member.permissions.has('MANAGE_MESSAGES')) {
         let time = args[0]
         if (!args[0]) {
               message.channel.updateOverwrite(guild.roles.everyone, {
                  SEND_MESSAGES: false
               })
            const lockembed = new Discord.MessageEmbed()
               .setTitle(`:white_check_mark: Locked down ${message.channel.name}`)
            const m = await message.channel.send(lockembed)
         }
         if (args[0]) {
               message.channel.updateOverwrite(guild.roles.everyone, {
                  SEND_MESSAGES: false
            })
            const lockembed = new Discord.MessageEmbed()
               .setTitle(`:white_check_mark: Locked down ${message.channel.name} for ${time}`)
            const m = await message.channel.send(lockembed)
            setTimeout(() => {
               const unlock = new Discord.MessageEmbed()
                  .setTitle(`:white_check_mark: Unlocked ${message.channel.name}`)
               m.edit(unlock)
               message.guild.roles.cache.forEach(role => {
                  message.channel.updateOverwrite(role, {
                     SEND_MESSAGES: true
                  })
               })
            }, ms(args[0]))
         }
      }
   },
};