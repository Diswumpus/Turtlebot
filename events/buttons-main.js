const Discord = require('discord.js');

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
                  } else {
                        await interaction.reply({ content: `${require('../emojis.json').x} You can't close this ticket!`, ephemeral: true })
                  }
            }
	},
};