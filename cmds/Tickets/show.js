const Discord = require('discord.js');
const color = require('../../config2.json').color;
const buttons = require('../../interactions');
const emojis = require('../../emojis.json');

module.exports = {
    name: 'ticket',
    category: 'Config',
    permissions: 'MANAGE_MESSAGES',
    description: 'Sends a message to open a ticket!',
    async execute(message, Member, args) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return
        // label, type, id, emoji
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
        //Create embed
        const embed = new Discord.MessageEmbed()
        .setTitle(`<:info:860201073305583637> Open a ticket!`)
        .setDescription(`By reacting to this ticket, a ticket will be opened for you.`)
        .setColor(color)
        const ticket = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setEmoji('<:info:860201073305583637>')
            .setLabel('Open a ticket')
            .setCustomId('ticket_open')
            .setStyle("SECONDARY")
        );
        const m = await channel.send({ embeds: [embed], components: [ticket] });
        const sendembed = new Discord.MessageEmbed()
        .setTitle(`${emojis.check} Created!`)
        .setColor(color)
        await message.channel.send({ embeds: [sendembed], components: [await buttons.link(m.url)] });
    },
};
