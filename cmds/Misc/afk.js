const Discord = require('discord.js');
const afk = require('../../models/plugins/functions');

module.exports = {
    name: 'afk',
    category: 'Misc',
    description: 'Puts you on AFK',
    usage: '[reason]',
    /**
     * 
     * @param {Discord.Message} message 
     * @param {Discord.GuildMember} Member 
     * @param {Array} args 
     */
    async execute(message, Member, args) {
        return message.client.beta(message)
        const afkis = await afk.isAFK(message.member);
        const embed = new Discord.MessageEmbed()
        .setColor(message.client.confiig.color)
        if(!message.guild.members.cache.get(message.client.user.id).permissions.has('MANAGE_NICKNAMES')) message.channel.send({ embeds: [embed.setDescription(`${require('../../emojis.json').xmark} I don't have the \`MANAGE_NICKNAMES\` permission! :/`)] });
        if(afkis){
            afk.rmAFK(message.member)
            embed.setDescription(`${require('../../emojis.json').check1} Welcome back ${message.member}, i removed your AFK`)
        } else {
            afk.addAFK(message.member, args[0]||null)
            embed.setDescription(`${require('../../emojis.json').check1} ${message.member}, i set your AFK: ${args[0]||'AFK'}`)
        }
        message.channel.send({ embeds: [embed] });
    },
};