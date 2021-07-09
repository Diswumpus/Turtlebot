const Discord = require('discord.js');

module.exports = {
    name: 'show-roles',
    aliases: ['sr', 'showroles'],
    category: 'Reaction Roles',
    description: 'See how many users have a role!',
    async execute(message, Member, args) {
        //Check perms
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return
        //Get channel
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        //Send button
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setCustomId('showrolesbt')
                .setLabel(`Show roles`)
                .setEmoji('862868020073857065')
                .setStyle('PRIMARY')
        );
        const embed = new Discord.MessageEmbed()
        .setTitle('Show your roles <:magic:862868020073857065>')
        .setColor(message.client.confiig.color)
        const m = await channel.send({ embeds: [embed], components: [row] })
        //Send view
        const view = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel(`Jump to message`)
                .setEmoji('862868020073857065')
                .setStyle('LINK')
                .setURL(m.url)
        );
        message.channel.send({ content: `${require('../../emojis.json').check} Created!`, components: [view]})
    },
};