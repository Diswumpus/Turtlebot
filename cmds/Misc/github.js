const Discord = require('discord.js');

module.exports = {
    name: 'github',
    category: 'Misc',
    description: 'Shows a link to the bots Git hub',
    execute(message, Member, args) {
        message.channel.send(`${require('../../emojis.json').tb} Here's our github! https://github.com/TurtlePaw/Turtlebot`);
    },
};