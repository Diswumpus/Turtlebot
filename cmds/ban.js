const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans a user',
    execute(message, Member, args) {
        const user = message.mentions.users.first();
        message.guild.members.ban(user);
        },
};