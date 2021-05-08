const Discord = require('discord.js');

module.exports = {
    name: 'myid',
    category: 'Info',
    description: 'Get info about you like your ID',
    execute(message, Member, args) {
        message.channel.send(`Your username: ${message.author.tag}\nYour ID: ${message.author.id}\nJoined at ${Member.joinedAt}\nCreated at ${message.author.createdAt}`);
    },
};