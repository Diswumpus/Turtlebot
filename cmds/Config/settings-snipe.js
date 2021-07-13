const Discord = require('discord.js');
const settings = require('../../models/settings')
const config = require('../../config.json')
const mongoose = require('mongoose')

module.exports = {
    name: 'enable-snipe', // ? Could not figure out how to create space log the msg?
    //aliases: ['enable welcome msg', 'enable welmsg', 'enable welcomemsg'],
    category: 'Config',
    description: `This command is old! Use logs!`,
    permissions: 'ADMINISTRATOR',
    async execute(message, Member, args) {
        const yes = require('../../emojis.json').good;
        const fail = require('../../emojis.json').bad;
        if(!message.member.permissions.has('ADMINISTRATOR')) {
        return message.channel.send(`You don't have permissions!`)
        }
        if (message.member.permissions.has('ADMINISTRATOR')) {
            const welcomech = message.mentions.channels.first()?.id;
            const thechannel = message.mentions.channels.first();
            if(!thechannel) {
                const nochannel = new Discord.MessageEmbed()
                .setTitle(`Please mention a channel! ${fail}`)
                .setDescription(`Example: \`${config.prefix}${this.name} #test\``)
                .setColor(`RED`)
                return message.channel.send({ embeds: [nochannel] })
            }
            const tembed = new Discord.MessageEmbed()
                .setTitle(`Enabled Auto Sniping! ${yes}`)
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
                    dUser.autosnipe = true;
                    dUser.autosnipech = welcomech;
                    await dUser.save().catch(e => console.log(e));
                });
            } else if (!data) {
                //message.reply(changed)
        
                let newData = new settings({
                    GuildID: message.guild.id,
                    autosnipe: true,
                    autosnipech: welcomech
                })
                newData.save();
            }
        }
    }
}