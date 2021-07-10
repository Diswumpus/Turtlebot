const Discord = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isButton()) return;
            if(interaction.customId === 'deleteme'){
            await interaction.reply({ content: `${require('../emojis.json').trash} Deleted the message!`, ephemeral: true });
            await interaction.message.delete()
            }
	},
};