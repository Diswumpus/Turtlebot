const Discord = require('discord.js');

/**
 * @param {Discord.MessageEmbed} [embed] Embed sent
 * @param {any} [channel] Channel for log
 * @param {String} [type] Type of log
 * @param {Discord.MessageActionRow} [com] Components
 * @returns Discord Message Link
*/
module.exports.log = async (channel, type, embed, com) => {
    const emojis = require('../../emojis.json');
    const interactions = require('../../interactions');
    const types = ['ticket', 'clickbutton', 'user', 'server', 'msg', 'mod', 'uk']
    if (typeof type !== 'string') throw new TypeError('type must be a string')
    //if (types.includes(type.toLowerCase())) throw new TypeError('Invalid type')

    const row2 = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomId('deleteme')
                .setEmoji(`${emojis.trashid}`)
                .setStyle('SECONDARY')
                .setLabel('Delete'),
        )
        let link;
        if(com.components.length !== 0){
            const m = await channel.send({ embeds: [new Discord.MessageEmbed(embed).setColor(require('../../config2.json').color)], components: [com, row2] });
            link = m.url;
        } else {
            const m = await channel.send({ embeds: [new Discord.MessageEmbed(embed).setColor(require('../../config2.json').color)], components: [row2] });
            link = m.url;
        }
    
    return link
}