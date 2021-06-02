// const Discord = require('discord.js');
// const settings = require('../../models/settings')
// const config = require('../../config.json')
// const mongoose = require('mongoose')

// module.exports = {
//     name: 'enable-welcomedm',
//     category: 'Config',
//     description: `Enables Welcome DMs!`,
//     async execute(message, Member, args) {
//         const yes = message.client.emojis.cache.get('849400604576841738')
//         const fail = message.client.emojis.cache.get('849400604597026836')
//         if(!message.member.permissions.has('ADMINISTRATOR')) {
//         return message.channel.send(`You don't have permissions!`)
//         }
//         if (message.member.permissions.has('ADMINISTRATOR')) {
//             const dmmsg = args[0]
//             if(!dmmsg) {
//                 return message.channel.send(
//                     new Discord.MessageEmbed()
//                     .setTitle(`What should i send them!? ${fail}`)
//                     .setDescription(`Example: \`${config.prefix}${this.name} Welcome to My Server!\``)
//                     .setColor(`RED`)
//                 )
//             }
//             const tembed = new Discord.MessageEmbed()
//                 .setTitle(`Enabled Welcome DMs! ${yes}`)
//                 .setDescription(`Enabled | Message: \`${dmmsg}\``)
//                 .setColor(message.client.confiig.color)
//             const sentmsg = await message.channel.send(tembed)
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
//         }
//     }
// }