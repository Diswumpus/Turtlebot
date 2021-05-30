const Discord = require('discord.js');

module.exports = {
    name: 'guilds',
    description: 'Gives a hint',
    async execute(client, interaction) {
        const guilds = client.guilds.cache.map(g=>g.name).join('\n• ')
        await interaction.reply(`• ${guilds}`); 
    }
}