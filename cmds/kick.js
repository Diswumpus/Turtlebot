const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kicks a user',
    execute(message, Member, args) {
        const member = message.mentions.members.first();
        member.kick();
        },
};