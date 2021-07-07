const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'restart',
    description: 'Gives a hint',
    async execute(client, interaction) {
        if (interaction.user.id !== config.ownerID) return interaction.reply({ content: `You don't have permissions` });
        const b4 = require('../../emojis.json').check;
        await interaction.reply({ content: `Restarting ${b4}` });
        await interaction.editReply({ content: `${require('../../emojis.json').tb} Bye!`})
        setTimeout(() =>
        {  process.exit(); }, 1000); 
    }
}