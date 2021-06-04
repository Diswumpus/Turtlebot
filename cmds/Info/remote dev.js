// const Discord = require('discord.js');

// module.exports = {
//     name: 'tea',
//     category: 'Info',
//     description: 'Sends a suggestion to my developer',
//     execute(message, Member, args) {
//         let msgg = args[0]
//         const remotemsg = new Discord.MessageEmbed()
//             .setTitle(`New Message in dev-stuff!`)
//             .addField(`They sent`, `${msgg}`)
//             .setColor(message.client.confiig.color)
//             .setTimestamp()
//             .setFooter(`From[Turtlebot](discord.com/invite/5Wutrs8s4s`)
//         const channel = message.client.channels.cache.get("841012841909190686");
//         channel.send(remotemsg)
//     },
// };

// client.on('message', message => {
//     let msgg = args[0]
//     const remotemsg = new Discord.MessageEmbed()
//         .setTitle(`New Message in dev-stuff!`)
//         .addField(`They sent`, `${msgg}`)
//         .setColor(message.client.confiig.colorr)
//         .setTimestamp()
//         .setFooter(`From[Turtlebot](discord.com/invite/5Wutrs8s4s`)
// })