const Discord = require('discord.js');
const messages = require('../models/plugins/functions');

module.exports = {
	name: 'messageCreate',
    /**
     * 
     * @param {Discord.Message} message 
     * @param {Discord.Client} client 
     */
	async execute(message, client) {
        if(message.author.bot) return 
        if(message.content.startsWith(client.config.prefix)) return
        if(!message.guild?.id) return
        if(message.channel?.type === 'DM') return

        messages.addMessages(message.member)
	},
};