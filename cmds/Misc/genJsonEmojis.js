const Discord = require('discord.js');
const fs = require('fs');

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
        message.delete();
        let text = '{\n';
        const allEmojis = await (await message.guild.emojis.fetch()).array()
        for(const emoji of allEmojis){
            text += `"${emoji.name}": "${emoji.toString()}",\n`
            text += `"${emoji.name}id": "${emoji.id}",\n`
        }
        text = text.slice(0, text.lastIndexOf(","));
        text += '\n}\n'
        
        message.channel.send({ content: text }).catch(( )=>{ })
        console.log(text)
    },
};