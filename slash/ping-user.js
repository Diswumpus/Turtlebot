const Discord = require('discord.js');

module.exports = {
    name: 'ping-user',
    description: 'Gives a hint',
    async execute(client, interaction) {
        let userr = interaction.options[0].user;
        await interaction.reply(`<@${userr.id}>`); 
    }
}