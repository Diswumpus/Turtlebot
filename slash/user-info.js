const Discord = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    name: 'user-info',
    description: 'Gives a hint',
    async execute(client, interaction) {
        //let ytuser = interaction.options.length > 1 ? interaction.options[1].user : interaction.user;
        // const userr = interaction.options[0]?.member ?? interaction?.member;
        const userr = interaction.options.length < 0 ? interaction.options[0].member : interaction.member;
        console.log(userr)
        //const target = interaction.options.length > 0 ? interaction.options[0].user : interaction.user;
        let msgCount = 0;
        await client.messagess.findOne({
            id: interaction.user.id
        }, async (err, dUser) => {
            if (err) console.log(err);
            else            
            msgCount = dUser.messagecount;
        });
        const embeedd = new Discord.MessageEmbed()
        .setColor(client.confiig.color)
        .setThumbnail(userr.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
        .setTitle(`User: ${userr.displayName}`)
        .addField(`User ID:`, `${userr.id}`)
        .addField(`Joined at:`, `${userr.joinedAt}`)
        .addField(`Messages Sent:`, `${msgCount}`)
        .addField(`Joined Discord at`, `${userr.user.createdAt}`)
        .addField(`Platform:`, `Desktop: ${userr.presence.clientStatus.desktop}`)
        .setDescription(`[Avatar link](${userr.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })})`)
        .setTimestamp()
        await interaction.reply(embeedd); 
    }
}