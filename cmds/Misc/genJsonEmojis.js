const Discord = require('discord.js');

module.exports = {
    name: 'jsonemojis',
    category: 'Misc',
    description: 'Shows a link to the bots Git hub',
        /**
     * 
     * @param {Discord.Message} message 
     * @param {Discord.User} Member 
     * @param {Array} args 
     */
    async execute(message, Member, args) {
        let text = '```json\n{\n';
        for(const emoji of message.guild.emojis.cache.array()){
            text += `"${emoji.name}": "${emoji}",\n`
            text += `"${emoji.name}id": "${emoji.id}",\n`
        }
        text = text.slice(0, text.lastIndexOf(","));
        text += '\n}\n```'
        message.channel.send({ content: text })
    },
};