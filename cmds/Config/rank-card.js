const Discord = require('discord.js');
const mongoose = require('mongoose')
const rankcards = require("../../models/plugins/rank-card");
const cardfn = require("../../models/plugins/functions");
const emojis = require('../../emojis.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'rank-edit',
    aliases: ['edit-rank'],
    category: 'Misc',
    description: 'Changes the rank card',
    usage: '--info | --add | --rm',
    permissions: 'ADMINISTRATOR',
    async execute(message, Member, args) {
        const mfilter = i => i.author.id === message.author.id;
        const ADD_EMBED = new Discord.MessageEmbed()
        .setTitle(`${emojis.check} Added!`)
        .setColor(message.client.confiig.color)
        const WAIT_MESSAGES = new Discord.MessageEmbed()
        .setTitle(`${emojis.pic} Upload what you want!`)
        .setDescription(`For more info on uploading images use \`${message.client.config.prefix}rank-edit --info\``)
        .setColor(message.client.confiig.color)
        function createCollector() {
            message.channel.awaitMessages({ mfilter, max: 1, time: 900000, errors: ['time'] }).then(async collected3 => {
            if(collected3.first().author.id !== message.author.id) createCollector();
            cardfn.RANK_EDIT(collected3.first().content, message.guild.id)
            message.channel.send({ embeds: [ADD_EMBED] });
            }).catch(( )=>{ })
        }
        //Do stuff here
        if(!args[0] || args[0] === '--add'){
            message.channel.send({ embeds: [WAIT_MESSAGES] }).then( async => {
                message.channel.awaitMessages({ mfilter, max: 1, time: 900000, errors: ['time'] }).then(async collected2 => {
                    cardfn.RANK_EDIT(collected2.first().content, message.guild.id)
                    message.channel.send({ embeds: [ADD_EMBED] });
                    }).catch(( )=>{ })
            })
        } else if(args[0] === '--rm'){
            cardfn.RANK_REMOVE(message.guild.id)
        } else if(args[0].toLowerCase() === '--info'){
            const INFO_EMBED = new MessageEmbed()
            .addField(`${emojis.pic} Suggested width`, `Width: **934**\nHeight: **282**`)
            .setColor(message.client.confiig.color)
            message.channel.send({ embeds: [INFO_EMBED] });
        }
    }
}