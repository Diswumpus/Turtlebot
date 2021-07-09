const Discord = require('discord.js');

module.exports = {
    name: 'github',
    description: '-',
    async execute(client, interaction) {
        const view = await require('../interactions').link('https://github.com/TurtlePaw/Turtlebot', 'Go to github');
        await interaction.reply({ content: `${require('../emojis.json').tb} Here's our github:`, components: [view] });
    }
}