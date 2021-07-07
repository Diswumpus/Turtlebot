const Discord = require('discord.js');

module.exports = {
    name: 'rstart',
    category: 'Dev',
    description: 'Restarts the bot',
    aliases: ['restart'],
    execute(message, Member, args) {
        if (message.author.id === require('../../config.json').ownerID) {
        const b4 = require('../../emojis.json').check;
        const m = message.channel.send({ content: `Restarting ${b4}` });
        m.edit({ content: `${require('../../emojis.json').tb} Bye!`})
        setTimeout(() =>
             {  process.exit(); }, 1000);    
     }    
    },
};