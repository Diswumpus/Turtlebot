const Discord = require('discord.js');
const brs = require('../models/br');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isButton()) return;
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return
            if(interaction.customId === 'unlock'){
                interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                    SEND_MESSAGES: true
                 })
                 const embed = new Discord.MessageEmbed()
                 .setTitle(`${require('../emojis.json').unlock} Unlocked ${interaction.channel.name}`)
                 .setColor(client.confiig.color)
                 await interaction.reply({ embeds: [embed], ephemeral: true });
            }
	},
};