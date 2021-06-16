// const Discord = require('discord.js');
// const { MessageEmbed } = require('discord.js')

// module.exports = {
//     name: 'css',
//     category: 'Reaction Roles',
//     description: '¯\_ (ツ)_/¯',
//     execute: async (message, Member, args) => {
//         let emoji = args[0]; //.slice(3).join(" ");
//         let role1 = args[1];
//         let emoji1 = args[2]; //.slice(3).join(" ");
//         let role2 = args[3];
//         let emoji2 = args[4]; //.slice(3).join(" ");
//         let role3 = args[5];
//         let msgg = args[6]; //.slice(3).join(" ");
//         const role4 = message.guild.roles.cache.find(role => role.name === role1);
//         const role5 = message.guild.roles.cache.find(role => role.name === role2);
//         const role6 = message.guild.roles.cache.find(role => role.name === role3);
//         message.channel.send(`${msgg}`).then(sentMessage => {
//             sentMessage.react(`${emoji}`);
//             sentMessage.react(`${emoji1}`);
//             sentMessage.react(`${emoji2}`);
//         });
//     },
// };