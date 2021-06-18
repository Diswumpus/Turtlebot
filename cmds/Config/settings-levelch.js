const Discord = require('discord.js');
const settings = require('../../models/settings')
const config = require('../../config.json')
const mongoose = require('mongoose')

module.exports = {
    name: 'levelch',
    //aliases: ['enable welcome msg', 'enable welmsg', 'enable welcomemsg'],
    category: 'Config',
    description: `Enables Welcome Messages!`,
    async execute(message, Member, args) {
        const yes = message.client.emojis.cache.get('849400604576841738')
        const fail = message.client.emojis.cache.get('849400604597026836')
        if(!message.member.permissions.has('ADMINISTRATOR')) {
        return message.channel.send(`You don't have permissions!`)
        }
        if (message.member.permissions.has('ADMINISTRATOR')) {
            const welcomech = message.mentions.channels.first()?.id;
            const thechannel = message.mentions.channels.first();
            if(!message.mentions.channels.first()) {
                const nochannel = new Discord.MessageEmbed()
                .setTitle(`Please mention a channel! ${fail}`)
                .setDescription(`Example: \`${config.prefix}${this.name} #test\``)
                .setColor(`RED`)
                return message.channel.send({ embeds: [nochannel] })
            }
            const tembed = new Discord.MessageEmbed()
                .setTitle(`Level messages! ${yes}`)
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
                    dUser.levelch = welcomech;
                    await dUser.save().catch(e => console.log(e));
                });
            } else if (!data) {
                //message.reply(changed)
        
                let newData = new settings({
                    GuildID: message.guild.id,
                    levelch: welcomech
                })
                newData.save();
            }
            //levelch: String,
        }
    }
}