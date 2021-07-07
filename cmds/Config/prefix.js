const Discord = require('discord.js');
const mongoose = require('mongoose')
const prefixModel = require("../../models/prefix")

module.exports = {
    name: 'prefix',
    category: 'Misc',
    description: 'Changes the bots prefix',
    async execute(message, Member, args) {
        let newprefix = args[0]
        const changed = new Discord.MessageEmbed()
        .setTitle(`${require('../../emojis.json').check} ${newprefix} Will be the new prefix!`)
        .setDescription("You can still use `,`")
        .setColor(message.client.confiig.color) 
        const noarg = new Discord.MessageEmbed()
        .setTitle(`${require('../../emojis.json').x} Wait... What is the new prefix?`)
        .setColor('RED')
        if(!newprefix){
            return message.reply({ embeds: [noarg] })
        }
        const toomuch = new Discord.MessageEmbed()
        .setTitle(`${require('../../emojis.json').x} That's too long!`)
        .setDescription(`Your prefix must me under \`5\` characters!`)
        .setColor('RED')
        if (args[0].length > 1) return message.reply({ embeds: [toomuch] })
        const data = await prefixModel.findOne({
            GuildID: message.guild.id
        });
        if (data) {
            await prefixModel.findOneAndRemove({
                GuildID: message.guild.id
            })
            
            message.reply({ embeds: [changed] })
    
            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        } else if (!data) {
            message.reply({ embeds: [changed] });
    
            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        }
    },
};