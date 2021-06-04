// const verifyRole = 'Verified Member';
// const Discord = require('discord.js');

// module.exports = {
// 	name: 'verify',
//     category: 'Moderation',
// 	description: 'Verifies the author of the message',
// 	execute(message, Member, args) {
//         var client = message.client;
//         if (!Member.roles.cache.some(role => role.name === verifyRole)) {
//             const role = message.guild.roles.cache.find(role => role.name === verifyRole);
//             Member.roles.add(role);
//             const partyblob = client.emojis.cache.find(em => em.name === "Party_blob");
//             const turtlebot = client.emojis.cache.find(em => em.name === "Turtlebot");
//             const verify = client.emojis.cache.find(em => em.name === "verify");
//             let whoisEmbed = new Discord.MessageEmbed()
//                 .setTitle(`Hey ${Member.displayName}!`)
//                 .setColor(message.client.confiig.color)
//                 .setDescription(`You are getting the **Verified Member** role! ${verify}`) 
//                 .addField(`${Member.displayName} joined`, `${message.differentDays} days ago`)
//                 //            .addField("Joined at", Member.joinedAt)
//                 //            .addField("Status", status)
//                 .setFooter(`Turtlebot`, turtlebot.url)
//             message.channel.send(whoisEmbed)
//         }
// 	},
// };

