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
        .setTitle(`${newprefix} Will be the new prefix!`)
        .setDescription("You can still use `,`")
        .setColor(message.client.confiig.color) 
        const noarg = new Discord.MessageEmbed()
        .setTitle(`Wait... What is the new prefix?`)
        .setColor('RED')
        if(!newprefix){
            return message.reply(noarg)
        }
        const toomuch = new Discord.MessageEmbed()
        .setTitle(`That's too long!`)
        .setDescription(`Your prefix must me under \`5\` characters!`)
        .setColor('RED')
        if (args[0].length > 5) return message.reply(toomuch)
        const data = await prefixModel.findOne({
            GuildID: message.guild.id
        });
        if (data) {
            await prefixModel.findOneAndRemove({
                GuildID: message.guild.id
            })
            
            message.reply(changed)
    
            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        } else if (!data) {
            message.reply(changed)
    
            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        }
    },
};