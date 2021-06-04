// const Discord = require('discord.js');

// module.exports = {
//     name: 'embed',
//     description: '-',
//     async execute(client, interaction) {
//         let channel = interaction.options[0].channel; //? interaction.options.length > 0 ? interaction.options[0].user : interaction.user;
//         let title = interaction.options[1].value;
//         let description = interaction.options[2].value;
//         //Fix here >>
//         let color = interaction.options[3]?.value || client.confiig.color; //interaction.options.length > 3 ? 
//         let thumbnail = interaction.options.length > 4 ? interaction.options[4]?.value : interaction.options[3]?.value;
//         let author = interaction.options.length > 3 ? interaction.options[5]?.value : interaction.options[4]?.value; //?? interaction.options[3].value
//         //<<
//         const theembed = new Discord.MessageEmbed()
//         .setTitle(title)
//         .setColor(color)
//         .setThumbnail(thumbnail)
//         .setDescription(description)
//         if(author){
//             theembed.setAuthor(author)
//         }
//         const m = await channel.send(theembed);
//         const sendembed = new Discord.MessageEmbed()
//         .setTitle(`Sent in ${channel.name}`)
//         .setDescription(`[View](${m.url})`)
//         .setColor(`GREEN`)
//         await interaction.reply(sendembed)
//     }
// }