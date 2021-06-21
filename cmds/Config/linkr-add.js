const config = require('../../config.json');
const settings = require('../../models/settings');
const Discord = require('discord.js');

module.exports = {
    name: 'linkr-add',
    category: 'Config',
    description: 'null',
    usage: "<roles>",
    async execute(message, Member, args) {
        const yes = message.client.emojis.cache.get('849400604576841738')
        const fail = message.client.emojis.cache.get('849400604597026836')
        const thechannel = message.mentions.roles;
        const tembed = new Discord.MessageEmbed()
            .setTitle(`Added roles! ${yes}`)
            .setColor(message.client.confiig.color)
            thechannel.forEach(r => {
                tembed.addField(`Name: ${r.name}`, `ID: ${r.id}`);
            });
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
                thechannel.forEach(r => {
                    //if(data.roles.indexOf(r.id) !== -1){ return; }
                    dUser.roles.push(r.id);
                });
                await dUser.save().catch(e => console.log(e));
            });
        } else if(!data){
            message.reply({ content: `Try using \`${config.prefix}enable-link\``})
        }
    }
}