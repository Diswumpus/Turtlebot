const Discord = require('discord.js');

module.exports = {
    name: 'tp-chairs',
    description: 'Gives a hint',
    async execute(client, interaction) {
        await interaction.reply('https://discord.gg/hC3ZDVbe7V');
    }
}