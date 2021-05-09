const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'cs',
    category: 'Reaction Roles',
    description: '¯\_ (ツ)_/¯',
    execute: async (message, Member, args) => {
        const b1 = message.client.emojis.cache.find(em => em.name === "Spinning_blob");
        const b2 = message.client.emojis.cache.find(em => em.name === "Thinking_Blob");
        const b3 = message.client.emojis.cache.find(em => em.name === "Party_blob");
        message.channel.send(`Want to get giveaway pings but not announcement pings?\n\nReact to this to chose what pings you would like to receive!\n\n${b1} Announcement Ping\n\n${b3} Giveaway Ping\n\n${b2} Everything Ping`).then(sentMessage => {
            sentMessage.react('831584721321328661');
            sentMessage.react('831584581495816242');
            sentMessage.react('831584687498461274');
            sentMessage.react('🎈');
        });
    },
};