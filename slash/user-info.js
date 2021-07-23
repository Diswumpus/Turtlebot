const Discord = require('discord.js');
const mongoose = require('mongoose');
const emojis = require('../emojis.json');
const modm = require('../models/Moderation/mod_manager');
const user = require('../models/Moderation/user');

module.exports = {
    name: 'user-info',
    description: 'Gives a hint',
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.CommandInteraction} interaction 
     */
    async execute(client, interaction) {
        //let ytuser = interaction.options.length > 1 ? interaction.options[1].user : interaction.user;
        // const userr = interaction.options[0]?.member ?? interaction?.member;
        const userr = interaction.options?.find(c => c?.name === 'user')?.member || interaction.member;
        //const target = interaction.options.length > 0 ? interaction.options[0].user : interaction.user;
        let msgCount = 0;
        await client.messagess.findOne({
            id: interaction.user.id
        }, async (err, dUser) => {
            if (err) console.log(err);
            else            
            msgCount = dUser.messagecount;
        });
        const joinedAt = Math.round(new Date(userr.joinedTimestamp).getTime()/1000)
        const createdAt = Math.round(new Date(userr.user.createdTimestamp).getTime()/1000)
        const findi = await modm.findUser(userr.id);
        const embeedd = new Discord.MessageEmbed()
        .setColor(client.confiig.color)
        .setThumbnail(userr.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
        .setTitle(`${emojis.useradd}  User: ${userr.displayName}`)
        .addField(`${emojis.id}  User ID:`, `${userr.id}`)
        .addField(`${emojis.join}  Joined at:`, `<t:${joinedAt}>`)
        .addField(`${emojis.messages}  Messages Sent:`, `${msgCount}`)
        .addField(`${emojis.join}  Joined Discord at:`, `<t:${createdAt}>`)
        .addField(`${emojis.ban} Server Infractions:`, `${findi.is}`)
        //.addField(`Platform:`, `Desktop: ${userr.presence.clientStatus.desktop}`)
        .setTimestamp()//[Avatar link](${userr.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })})
        await interaction.reply({ embeds: [embeedd], components: [await require('../interactions').link(userr.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }), 'Avatar')] }); 
    }
}