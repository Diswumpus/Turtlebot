const Discord = require('discord.js');

module.exports = {
    name: 'tp-chairs',
    description: 'Gives a hint',
    async execute(client, interaction) {
        const view = await require('../interactions').link('https://discord.gg/hC3ZDVbe7V', 'Go to server!')
        await interaction.reply({ content: 'https://discord.gg/hC3ZDVbe7V', components: [view] });
    }
}