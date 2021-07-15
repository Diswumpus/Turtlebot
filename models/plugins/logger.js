const Discord = require('discord.js');

// /**
//  * @param {Discord.MessageEmbed} [embed] Embed sent
//  * @param {any} [channel] Channel for log
//  * @param {String} [type] Type of log
//  * @param {Discord.MessageActionRow} [com] Components
//  * @returns Discord Message Link
// */
// module.exports.log = async (channel, type, embed, com) => {
//     if(!embed) throw new TypeError(`Missing args embed!`)
//     const emojis = require('../../emojis.json');
//     const interactions = require('../../interactions');
//     const types = ['ticket', 'clickbutton', 'user', 'server', 'msg', 'mod', 'uk']
//     if (typeof type !== 'string') throw new TypeError('type must be a string')
//     //if (types.includes(type.toLowerCase())) throw new TypeError('Invalid type')

//     const row2 = new Discord.MessageActionRow()
//         .addComponents(
//             new Discord.MessageButton()
//                 .setCustomId('deleteme')
//                 .setEmoji(`${emojis.trashid}`)
//                 .setStyle('SECONDARY')
//                 .setLabel('Delete'),
//         )
//         let link;
//         if(com?.components.length !== 0){
//             const m = await channel.send({ embeds: [new Discord.MessageEmbed(embed).setColor(require('../../config2.json').color)], components: [com, row2] });
//             link = m.url;
//         } else {
//             const m = await channel.send({ embeds: [new Discord.MessageEmbed(embed).setColor(require('../../config2.json').color)], components: [row2] });
//             link = m.url;
//         }
    
//     return link
// }
class log {
    /**
     * 
     * @param {Object} options The options
     * @param {Discord.MessageEmbed} [options.embed] The Message Embed
     * @param {Discord.TextChannel} [options.channel] The channel to send to
     * @param {Discord.MessageActionRow} [options.components] The buttons to send
     * @param {String} [options.type] The log type
     */
    constructor(options){
        if(!options) throw new TypeError('Missing args options!')
        this.options = options
    }
    /**
     * @returns Promise<DiscordMessageLink>
     */
    async log() {
        const emojis = require('../../emojis.json');
        const interactions = require('../../interactions');
    
        const row2 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('deleteme')
                    .setEmoji(`${emojis.trashid}`)
                    .setStyle('SECONDARY')
                    .setLabel('Delete'),
            )
            let link;
            if(this.options.components?.components.length !== 0 && this.options.components?.components.length !== undefined){
                const m = await this.options.channel.send({ embeds: [new Discord.MessageEmbed(this.options.embed).setColor(require('../../config2.json').color)], components: [this.options.components, row2] });
                link = m.url;
            } else {
                const m = await this.options.channel.send({ embeds: [new Discord.MessageEmbed(this.options.embed).setColor(require('../../config2.json').color)], components: [row2] });
                link = m.url;
            }
        
        return link
    }
}
module.exports.log = log