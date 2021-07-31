// const Discord = require('discord.js');
// const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
// const { description } = require('../Reaction_Roles/roles');

// module.exports = {
//     name: 'role',
//     /**
//      * 
//      * @param {Discord.Message} message 
//      * @param {Discord.GuildMember} Member 
//      * @param {Array} args
//      */
//     async execute(message, Member, args) {
//         const row = new MessageActionRow()
//         .addComponents(
//             new MessageSelectMenu()
//             .setCustomId('role_menu')
//             .setMaxValues(2)
//             .addOptions([
//                 {
//                     label: `Discord.js`,
//                     description: `The Discord.js role`,
//                     value: 'discord.js'
//                 },
//                 {
//                     label: 'Discord.py',
//                     description: 'The Discord.py role',
//                     value: 'discord.py'
//                 }
//             ])
//         )
//             const embed = new MessageEmbed()
//             .setColor('BLUE')
//             .setDescription('Use the buttons below to get roles!')
//         //Send message
//         const m = await message.channel.send({ embeds: [embed], components: [row] });

//         const collector = m.createMessageComponentCollector({ filter: i=>i.user.id===message.author.id, time: 60000 });

//         collector.on('collect', async i => {
//             const rjs = i.guild.roles.cache.get('868921072924389427');
//             const rpy = i.guild.roles.cache.get('868921179581333535');
//             const roleadded = new Array();
//             const roleremoved = new Array();
//             if(i.values[0] === 'discord.js' || i.values[1] === 'discord.js'){
//                 if(i.member.roles.cache.has(rjs.id)){
//                     roleremoved.push(rjs)
//                     i.member.roles.remove('868921072924389427')
//                 } else {
//                     roleadded.push(rjs)
//                     i.member.roles.add('868921072924389427')
//                 }
//             } 
//             if(i.values[0] === 'discord.py' || i.values[1] === 'discord.py'){
//                 if(i.member.roles.cache.has(rpy.id)){
//                     roleremoved.push(rpy)
//                     i.member.roles.remove('868921179581333535')
//                 } else {
//                     roleadded.push(rpy)
//                     i.member.roles.add('868921179581333535')
//                 }
//                 const rembed = new MessageEmbed()
//                 .setColor('BLUE')
//                 .setDescription(`Added the role(s): ${roleadded.join(", ")}\nRemoved the role(s): ${roleremoved.join(", ")}`)
//                 i.reply({ embeds: [rembed], ephemeral: true });
//             }
//         })
//     }
// }