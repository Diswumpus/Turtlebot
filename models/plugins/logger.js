const Discord = require('discord.js');

/**
 * @param {Discord.MessageEmbed} [embed] 
 * @param {any} [channel]
 * @param {String} [type]
*/
module.exports.log = async (channel, type, embed) => {
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

    channel.send({ embeds: [embed.setColor(require('../../config2.json').color)], components: [row2] });
    
    return null
}