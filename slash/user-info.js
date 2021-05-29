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
        .setColor('AQUA')
        .setThumbnail(userr.user.displayAvatarURL())
        .setTitle(`User: ${userr.displayName}`)
        .addField(`User ID:`, `${userr.id}`)
        .addField(`Joined at:`, `${userr.joinedAt}`)
        .addField(`Messages Sent:`, `${msgCount}`)
        //.addField(`Discord Version`, `${userr.presence.clientStatus}`)
        .addField(`Joined Discord at`, `${userr.user.createdAt}`)
        //.addField(`[Avatar link](${userr.user.displayAvatarURL()})`)
        .setTimestamp()
        await interaction.reply(embeedd); 
    }
}