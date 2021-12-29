const Discord = require('discord.js');

module.exports.emojis = require('./emojis.json');

module.exports.interactions = require('./interactions');

module.exports.getClient = () => {
    return require('./index').getLiveClient()
}

module.exports.files = {
    index: require('./index')
};

module.exports.Messages = {
    IDLE: `${this.emojis.idle} This message is now idle.`
}

/**
 * Makes a message idle
 * @param {Discord.Message|Discord.CommandInteraction} message 
 * @param {Discord.MessageEmbed[]} embeds
 * @param {"INTERACTION"|"MESSAGE"} type
 * @returns Promise<Discord.Message>
 */
module.exports.makeIdle = async (message, type='INTERACTION', embeds=null) => {
    let m;
    if(type === 'INTERACTION'){
        if(embed) {
            m = message.editReply({ embeds: embeds, content: this.Messages.IDLE })
        } else {
            m = message.editReply({ content: this.Messages.IDLE })
        }
    } else if(type === 'MESSAGE'){
        if(embed) {
            m = message.edit({ embeds: embeds, content: this.Messages.IDLE })
        } else {
            m = message.edit({ content: this.Messages.IDLE })
        }
    }
    return m
}