const Discord = require('discord.js');

module.exports = {
    name: 'restart',
    description: 'Gives a hint',
    async execute(client, interaction) {
        await interaction.reply('Restarting...', { ephemeral: true });
        setTimeout(() =>
        {  process.exit(); }, 1000); 
    }
}