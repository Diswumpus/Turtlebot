const Discord = require('discord.js');
const settings = require('../../models/settings')
const config = require('../../config.json')
const mongoose = require('mongoose')

module.exports = {
    name: 'enable-link', // ? Could not figure out how to create space log the msg?
    //aliases: ['enable welcome msg', 'enable welmsg', 'enable welcomemsg'],
    category: 'Config',
    description: `Enables Welcome Messages!`,
    async execute(message, Member, args) {
        const yes = require('../../emojis.json').good;
        const fail = require('../../emojis.json').bad;
        if(!message.member.permissions.has('ADMINISTRATOR')) {
        return message.channel.send(`You don't have permissions!`)
        }
        if (message.member.permissions.has('ADMINISTRATOR')) {
            const welcomech = message.mentions.roles.first()?.id;
            const thechannel = message.mentions.roles.first();
            if(!thechannel) {
                const tembed = new Discord.MessageEmbed()
                .setTitle(`Enabled Link Deleting! ${yes}`)
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
                    dUser.inviteremover = true;
                    await dUser.save().catch(e => console.log(e));
                });
            } else if (!data) {
                //message.reply(changed)
        
                let newData = new settings({
                    GuildID: message.guild.id,
                    inviteremover: true
                })
                newData.save();
            }
            } else {
            const tembed = new Discord.MessageEmbed()
                .setTitle(`Enabled Link Deleting! ${yes}`)
                .setDescription(`Excluded Roles: ${thechannel} | Add more roles by typing \`${config.prefix}linkr-add\``)
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
                    dUser.inviteremover = true;
                    dUser.roles.push(welcomech);
                    await dUser.save().catch(e => console.log(e));
                });
            } else if (!data) {
                //message.reply(changed)
        
                let newData = new settings({
                    GuildID: message.guild.id,
                    inviteremover: true,
                    roles: [welcomech]
                })
                newData.save();
            }
        }
        }
    }
}