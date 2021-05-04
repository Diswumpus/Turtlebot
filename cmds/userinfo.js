const Discord = require('discord.js');

module.exports = {
    name: 'myid',
    description: 'Get info about you like your ID',
    execute(message, Member, args) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}\nJoined at, Member.joinedAt`);
    },
};