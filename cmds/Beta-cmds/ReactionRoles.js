// const Discord = require('discord.js');

// // Adding reaction-role function
// client.on('messageReactionAdd', async (reaction, user) => {
//   if (reaction.message.partial) await reaction.message.fetch();
//   if (reaction.partial) await reaction.fetch();
//   if (user.bot) return;
//   if (!reaction.message.guild) return;
//   if (reaction.message.channel.id == '802209416685944862') {
//     if (reaction.emoji.name === '🦊') {
//       await reaction.message.guild.members.cache
//         .get(user.id)
//         .roles.add('802208163776167977');
//     }
//     if (reaction.emoji.name === '🐯') {
//       await reaction.message.guild.members.cache
//         .get(user.id)
//         .roles.add('802208242696192040');
//     }
//     if (reaction.emoji.name === '🐍') {
//       await reaction.message.guild.members.cache
//         .get(user.id)
//         .roles.add('802208314766524526');
//     }
//   } else return;
// });

// // Removing reaction roles
// client.on('messageReactionRemove', async (reaction, user) => {
//   if (reaction.message.partial) await reaction.message.fetch();
//   if (reaction.partial) await reaction.fetch();
//   if (user.bot) return;
//   if (!reaction.message.guild) return;
//   if (reaction.message.channel.id == '802209416685944862') {
//     if (reaction.emoji.name === '🦊') {
//       await reaction.message.guild.members.cache
//         .get(user.id)
//         .roles.remove('802208163776167977');
//     }
//     if (reaction.emoji.name === '🐯') {
//       await reaction.message.guild.members.cache
//         .get(user.id)
//         .roles.remove('802208242696192040');
//     }
//     if (reaction.emoji.name === '🐍') {
//       await reaction.message.guild.members.cache
//         .get(user.id)
//         .roles.remove('802208314766524526');
//     }
//   } else return;
// });