const Discord = require('discord.js');
const lModel = require('../models/plugins/logs');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isButton()) return;
            const ticketid = interaction.customId.slice(0, 12)
            const ticketuser = interaction.customId.slice(15, 33)
            if(interaction.customId === 'deleteme'){
            await interaction.reply({ content: `${require('../emojis.json').trash} Deleted the message!`, ephemeral: true });
            await interaction.message.delete()
            } else if (ticketid === 'ticket_close') {
                  if(interaction.user.id === ticketuser || interaction.member.permissions.has('MANAGE_MESSAGES')){
                  interaction.channel.delete(`User closed ticket`)
                  let v = await lModel.find({
                        guild: interaction.guild.id
                    });
                    if(v){
                    v.forEach(c => {
                          if(c.ticket === true){
                                const ch = client.channels.cache.get(`${c.logsch}`)
                                const nembed = new Discord.MessageEmbed()
                                .setTitle(`${require('../emojis.json').ticket} ${interaction.user.tag} closed there ticket!`)
                                require('../models/plugins/logger').log(ch, 'ticket', nembed)
                          }
                    });
                  }
                  } else {
                        await interaction.reply({ content: `${require('../emojis.json').x} You can't close this ticket!`, ephemeral: true })
                  }
            }
	},
};