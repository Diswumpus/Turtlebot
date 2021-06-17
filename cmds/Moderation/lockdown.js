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
               message.channel.updateOverwrite(message.guild.roles.everyone, {
                  SEND_MESSAGES: false
               })
            const lockembed = new Discord.MessageEmbed()
               .setTitle(`:white_check_mark: Locked down ${message.channel.name}`)
               .setColor(message.client.confiig.color)
            const m = await message.channel.send({ embeds: [lockembed] })
         }
         if (args[0]) {
               message.channel.updateOverwrite(message.guild.roles.everyone, {
                  SEND_MESSAGES: false
            })
            const lockembed = new Discord.MessageEmbed()
               .setTitle(`:white_check_mark: Locked down ${message.channel.name} for ${time}`)
               .setColor(message.client.confiig.color)
            const m = await message.channel.send({ embeds: [lockembed] })
            setTimeout(() => {
               const unlock = new Discord.MessageEmbed()
                  .setTitle(`:white_check_mark: Unlocked ${message.channel.name}`)
                  .setColor(message.client.confiig.color)
               m.edit({ embeds: [unlock] })
                  message.channel.updateOverwrite(message.guild.roles.everyone, {
                     SEND_MESSAGES: true
                  })
            }, ms(args[0]))
         }
      }
   },
};