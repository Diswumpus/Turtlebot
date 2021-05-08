const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'find',
    category: 'Info',
    description: '¯\_ (ツ)_/¯',
    execute: async (message, Member, args) => {
        let role1 = parseInt(args[0]);
        const role4 = message.guild.roles.cache.find(role => role.name === role1);
        message.channel.send(`${role4}`)
    },
};