const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: '-',
    async execute(client, interaction) {
        const member = interaction.options[0].member;        
        await interaction.reply(member.user.displayAvatarURL());
    }
}