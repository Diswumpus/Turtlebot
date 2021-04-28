const Discord = require('discord.js');

module.exports = {
    name: 'server',
    description: 'Server info',
    execute(message, Member, args) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    },
};