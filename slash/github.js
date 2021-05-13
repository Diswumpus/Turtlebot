const Discord = require('discord.js');

module.exports = {
    name: 'github',
    description: '-',
    async execute(client, interaction) {
        await interaction.reply('https://github.com/TurtlePaw/Turtlebot');
    }
}