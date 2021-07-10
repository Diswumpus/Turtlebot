const Discord = require('discord.js');
const color = require('../../config2.json').color;
const buttons = require('../../interactions');
const emojis = require('../../emojis.json');

module.exports = {
    name: 'emoji-list',
    category: 'Info',
    description: 'Shows all the guild emojis',
    async execute(message, Member, args) {
        const embeds = new Array()
        const embed = new Discord.MessageEmbed()
            .setTitle(`${emojis.reaction} ${message.guild}'s Emojis:`)
            .setColor(color)
        const charactersPerMessage = 2000;
        // we're going to go with 2000 instead of 2048 for breathing room
        const emojis2 = message.guild.emojis.cache.map(e => { return `${e} = \`:${e.name}:\`\n\n` }).join(''); // does virtually the same thing as forEach()
        const numberOfMessages = Math.ceil(emojis2.length / charactersPerMessage); // calculate how many messages we need
        const { MessageEmbed } = require('discord.js');

        for (i = 0; i < numberOfMessages; i++) {
            embeds.push(embed.setDescription(`${emojis2.slice(i * charactersPerMessage, (i + 1) * charactersPerMessage)}`))
        }

        message.channel.send({ embeds: embeds });
    },
};