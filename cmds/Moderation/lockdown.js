const Discord = require('discord.js');
const ms = require("ms");

module.exports = {
   name: 'lockdown',
   category: 'Moderation',
   permissions: 'MANAGE_MESSAGES',
   description: 'Locks the chat',
   async execute(message, Member, args) {
      if (!message.guild) return;
      if (message.member.permissions.has('MANAGE_MESSAGES')) {
         let time = args[0]
         const view = new Discord.MessageActionRow()
         .addComponents(
             new Discord.MessageButton()
                 .setLabel(`Unlock`)
                 .setStyle('SECONDARY')
                 .setEmoji(require('../../emojis.json').unlockid)
                 .setCustomId('unlock')
         );
         if (!args[0]) {
               message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                  SEND_MESSAGES: false
               })
            const lockembed = new Discord.MessageEmbed()
               .setTitle(`${require('../../emojis.json').lock} Locked down ${message.channel.name}`)
               .setColor(message.client.confiig.color)
            const m = await message.channel.send({ embeds: [lockembed], components: [view] })
         }
         if (args[0]) {
               message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                  SEND_MESSAGES: false
            })
            const lockembed = new Discord.MessageEmbed()
               .setTitle(`${require('../../emojis.json').lock} Locked down ${message.channel.name} for ${time}`)
               .setColor(message.client.confiig.color)
            const m = await message.channel.send({ embeds: [lockembed], components: [view] })
            setTimeout(() => {
               const unlock = new Discord.MessageEmbed()
                  .setTitle(`${require('../../emojis.json').unlock} Unlocked ${message.channel.name}`)
                  .setColor(message.client.confiig.color)
               m.edit({ embeds: [unlock] })
                  message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                     SEND_MESSAGES: true
                  })
            }, ms(args[0]))
         }
      }
   },
};