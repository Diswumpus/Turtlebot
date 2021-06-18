const Discord = require('discord.js');
const settings = require('../../models/settings')
const config = require('../../config.json')
const mongoose = require('mongoose')

module.exports = {
    name: 'enable-welcomemsg',
    aliases: ['enable welcome msg', 'enable welmsg', 'enable welcomemsg'],
    category: 'Config',
    description: `Enables Welcome Messages!`,
    async execute(message, Member, args) {
        const yes = message.client.emojis.cache.get('849400604576841738')
        const fail = message.client.emojis.cache.get('849400604597026836')
        if(!message.member.permissions.has('ADMINISTRATOR')) {
        return message.channel.send(`You don't have permissions!`)
        }
        if (message.member.permissions.has('ADMINISTRATOR')) {
            const welcomech = message.mentions.channels.first()?.id || message.guild.channels.cache.get(args[0])
            const thechannel = message.mentions.channels.first();
            if(!message.mentions.channels.first() || !args[0]) {
                const nochannel = new Discord.MessageEmbed()
                .setTitle(`Please mention a channel! ${fail}`)
                .setDescription(`Example: \`${config.prefix}${this.name} #test\``)
                .setColor(`RED`)
                return message.channel.send({ embeds: [nochannel] })
            }
            const tembed = new Discord.MessageEmbed()
                .setTitle(`Enabled Welcome Messages! ${yes}`)
                .setDescription(`Enabled In: \`${thechannel.name}\``)
                .setColor(message.client.confiig.color)
            const sentmsg = await message.channel.send({ embeds: [tembed] })
            //edit this -
            const data = await settings.findOne({
                GuildID: message.guild.id
            });
            if (data) {
                settings.findOne({
                    GuildID: message.guild.id
                }, async (err, dUser) => {
                    if (err) console.log(err);
                    dUser.welcome = true;
                    dUser.welcomech = welcomech;
                    await dUser.save().catch(e => console.log(e));
                });
            } else if (!data) {
                //message.reply(changed)
        
                let newData = new settings({
                    GuildID: message.guild.id,
                    welcome: true,
                    welcomech: welcomech
                })
                newData.save();
            }
            /*
                GuildID: String,
    welcome: Boolean,
    welcomech: String,
    welcomemsg: String,
    inviteremover: Boolean,
    welcomedm: Boolean,
    autosnipe: Boolean,
    banmsg: Boolean
    */
        }
    }
}