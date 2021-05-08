const Discord = require('discord.js');

module.exports = {
    name: 'rstart',
    category: 'Dev',
    description: 'Restarts the bot',
    aliases: ['restart'],
    execute(message, Member, args) {
        if (message.author.id === '820465204411236362') {
        const b4 = message.client.emojis.cache.find(em => em.name === "verify");
        message.channel.send(`Restarting ${b4}`);
        setTimeout(() =>
             {  process.exit(); }, 1000);    
     }    
    },
};