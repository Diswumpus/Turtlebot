const Discord = require('discord.js');

module.exports = {
    name: 'restart',
    description: 'Gives a hint',
    async execute(client, interaction) {
        if (interaction.user.id !== config.ownerID) return interaction.reply(`You don't have permissions`);
        await interaction.reply('Restarting...');
        setTimeout(() =>
        {  process.exit(); }, 1000); 
    }
}