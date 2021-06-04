const Discord = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    name: 'user-info',
    description: 'Gives a hint',
    async execute(client, interaction) {
        let userr = interaction.options[0].member;
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
        //.addField(`Discord Version`, `${userr.presence.clientStatus}`)
        .addField(`Joined Discord at`, `${userr.user.createdAt}`)
        .setDescription(`[Avatar link](${userr.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })})`)
        .setTimestamp()
        await interaction.reply(embeedd); 
    }
}