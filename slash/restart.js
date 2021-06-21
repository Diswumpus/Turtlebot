const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'restart',
    description: 'Gives a hint',
    async execute(client, interaction) {
        if (interaction.user.id !== config.ownerID) return interaction.reply({ content: `You don't have permissions` });
        await interaction.reply({ content: 'Restarting...' });
        setTimeout(() =>
        {  process.exit(); }, 1000); 
    }
}