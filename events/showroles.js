const Discord = require('discord.js');
const brs = require('../models/br');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isButton()) return;
            if(interaction.customId === 'showrolesbt'){
                const embed = new Discord.MessageEmbed()
                .setTitle('Your roles')
                .setDescription(`${interaction.member.roles.cache.map(a => a) || 'None'}`)
                .setColor(client.confiig.color)
            await interaction.reply({ embeds: [embed], content: `Your roles`, ephemeral: true });
            } else {
                return
            }
	},
};