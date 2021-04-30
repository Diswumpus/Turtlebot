const Discord = require('discord.js');

module.exports = {
    name: 'update',
    description: '**DO NOT USE**',
    usage: '[command name]',
    execute(message, Member, args) {
        const blobsc = message.client.emojis.cache.find(em => em.name === "blobscream");
        message.channel.send(`${blobsc}`);
    },
}; 