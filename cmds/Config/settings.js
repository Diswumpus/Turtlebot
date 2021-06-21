const Discord = require('discord.js');
const settings = require('../../models/settings')
const config = require('../../config.json')
const mongoose = require('mongoose')

module.exports = {
    name: 'settings',
    aliases: ['config', 'setting'],
    category: 'Config',
    description: `Creates the role`,
    async execute(message, Member, args) {
        if (message.member.permissions.has('ADMINISTRATOR')) {
            const tembed = new Discord.MessageEmbed()
                .setTitle(`What would you like to edit?`)
                .setDescription(`Use \`${config.prefix}{setting}\` to enable a setting`)
                .addField(`\`${config.prefix}enable-link\``, `Delete discord invite links?`)
                .addField(`\`${config.prefix}enable-welcomemsg\` Welcome Messages?`, "`True or false`")
                .addField(`\`${config.prefix}prefix\` Prefix?`, `What prefix?`)
                .addField(`\`${config.prefix}levelch\``, `Should i send level messages in a specific channel?`)
                .addField(`\`${config.prefix}enable-snipe\` Auto Snipe?`, `When a message is deleted i will post it in the mentioned channel`)
                .setColor(message.client.confiig.color)
            const sentmsg = await message.channel.send({ embeds: [tembed] });
            /*
                            .addField(`\`${config.prefix}enable-ban\` Ban Messages?`, `Should i send messages when members get banned? ||(With reason)||`)
                .addField(`\`${config.prefix}enable-welcomedm\` Welcome DMs?`, "`True or false`")
                .addField(`\`${config.prefix}welcomedmmsg\` Welcome Messages?`, `What should i send to the user?`)
                */
        }
    }
}