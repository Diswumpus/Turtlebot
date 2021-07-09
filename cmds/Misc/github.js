const Discord = require('discord.js');

module.exports = {
    name: 'github',
    category: 'Misc',
    description: 'Shows a link to the bots Git hub',
    async execute(message, Member, args) {
        const view = await require('../../interactions').link('https://github.com/TurtlePaw/Turtlebot', 'Go to github');
        await message.channel.send({ content: `${require('../../emojis.json').tb} Here's our github:`, components: [view] });
    },
};