const Discord = require('discord.js');
const afk = require('../models/plugins/functions');
const { isAFK } = require('../models/plugins/functions');

module.exports = {
	name: 'messageCreate',
    /**
     * 
     * @param {Discord.Message} message 
     * @param {Discord.Client} client 
     */
	async execute(message, client) {
        return
        if(message.author.bot) return 
        const member = message.mentions.members.first()
        const afkk = await afk.getAFK(member)
        if(message.author.id === afkk?.USER){
            const embed = new Discord.MessageEmbed()
            .setColor(message.client.confiig.color)
            afk.rmAFK(message.member)
            embed.setDescription(`${require('../../emojis.json').check1} Welcome back ${message.member}, i removed your AFK`)
            message.channel.send({ embeds: [embed] });
        }       
        if(!member) return
        if(await isAFK(member)){
            message.channel.send({ embeds: [new Discord.MessageEmbed().setColor(client.confiig.color).setDescription(`${member} is AFK: ${afkk?.R||'AFK'}`)]})
        }
	},
};