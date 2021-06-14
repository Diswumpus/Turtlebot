// const Discord = require('discord.js');
// const settings = require('../../models/settings')
// const config = require('../../config.json')
// const mongoose = require('mongoose')

// module.exports = {
//     name: 'enable-welcomemsg',
//     aliases: ['enable welcome msg', 'enable welmsg', 'enable welcomemsg'],
//     category: 'Config',
//     description: `Enables Welcome Messages!`,
//     async execute(message, Member, args) {
//         const yes = message.client.emojis.cache.get('849400604576841738')
//         const fail = message.client.emojis.cache.get('849400604597026836')
//         if(!message.member.permissions.has('ADMINISTRATOR')) {
//         return message.channel.send(`You don't have permissions!`)
//         }
//         if (message.member.permissions.has('ADMINISTRATOR')) {
//             const welcomech = message.mentions.channels.first() || args[0]
//             if(!welcomech) {
//                 return message.channel.send(
//                     new Discord.MessageEmbed()
//                     .setTitle(`Please mention a channel! ${fail}`)
//                     .setDescription(`Example: \`${config.prefix}${this.name} #test\``)
//                     .setColor(`RED`)
//                 )
//             }
//             const tembed = new Discord.MessageEmbed()
//                 .setTitle(`Enabled Welcome Messages! ${yes}`)
//                 .setDescription(`Enabled In: \`${welcomech.name || `<#${args[0]}>`}\``)
//                 .setColor(message.client.confiig.color)
//             const sentmsg = await message.channel.send(tembed)
//             //edit this -
//             const data = await settings.findOne({
//                 GuildID: message.guild.id
//             });
//             if (data) {
//                 await settings.findOneAndRemove({
//                     GuildID: message.guild.id
//                 })
        
//                 let newData = new settings({
//                     GuildID: message.guild.id,
//                     welcome: true,
//                     welcomech: welcomech
//                 })
//                 newData.save();
//             } else if (!data) {
//                 message.reply(changed)
        
//                 let newData = new settings({
//                     GuildID: message.guild.id,
//                     welcome: true,
//                     welcomech: welcomech
//                 })
//                 newData.save();
//             }
//             /*
//                 GuildID: String,
//     welcome: Boolean,
//     welcomech: String,
//     welcomemsg: String,
//     inviteremover: Boolean,
//     welcomedm: Boolean,
//     autosnipe: Boolean,
//     banmsg: Boolean
//     */
//         }
//     }
// }