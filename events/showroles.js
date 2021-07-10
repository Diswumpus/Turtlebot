const Discord = require('discord.js');
const brs = require('../models/br');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isButton()) return;
            if(interaction.customId === 'showrolesbt'){
                const roles = new Array();
                const rfind = await brs.find({
                    guild: interaction.guild.id
                });
                rfind.forEach(r => {
                    if(interaction.member.roles.cache.has(r.role1)){
                        roles.push(r.role1)
                    }
                    if(interaction.member.roles.cache.has(r.role2)){
                        roles.push(r.role2)
                    }
                    if(interaction.member.roles.cache.has(r.role3)){
                        roles.push(r.role3)
                    }
                });
                const embed = new Discord.MessageEmbed()
                .setTitle('Your roles')
                .setDescription(`${roles.map(a => `<@&${a}>`) || 'None'}`)
                .setColor(client.confiig.color)
            await interaction.reply({ embeds: [embed], content: `Your roles`, ephemeral: true });
            } else {
                return
            }
	},
};