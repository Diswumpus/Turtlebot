const Discord = require('discord.js');
const mongoose = require('mongoose');
const emojis = require('../../emojis.json');
const modm = require('../../models/Moderation/mod_manager');
const user = require('../../models/Moderation/user');
const interactionsFile = require('../../interactions');

module.exports = {
    name: 'user-info',
    category: 'Info',
    description: 'Get info about you like your ID',
    async getDate(client, user) {
        let msgCount = 0;
        await client.messagess.findOne({
            id: user.id
        }, async (err, dUser) => {
            if (err) console.log(err);
            else
                msgCount = dUser.messagecount;
        });
        const findi = await modm.findUser(user.id);

        return {
            messages: msgCount,
            infractions: findi.is,
        }
    },
    /**
     * @param {Discord.Message} message 
     * @param {Discord.GuildMember} Member 
     * @param {String[]} args 
     */
    async execute(message, Member, args) {
        const userr = Member
        const data = await this.getDate(message.client, Member)
        const client = message.client
        const joinedAt = Math.round(new Date(userr.joinedTimestamp).getTime() / 1000)
        const createdAt = Math.round(new Date(userr.user.createdTimestamp).getTime() / 1000)
        const embeedd = new Discord.MessageEmbed()
            .setColor(client.confiig.color)
            .setThumbnail(userr.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
            .setTitle(`${emojis.useradd}  User: ${userr.displayName}`)
            .addField(`${emojis.id}  User ID:`, `${userr.id}`)
            .addField(`${emojis.join}  Joined at:`, `<t:${joinedAt}>`)
            .addField(`${emojis.messages}  Messages Sent:`, `${data.messages}`)
            .addField(`${emojis.join}  Joined Discord at:`, `<t:${createdAt}>`)
            .addField(`${emojis.ban} Server Infractions:`, `${data.infractions}`)
            .setTimestamp()
        await message.channel.send({ embeds: [embeedd], components: [await interactionsFile.link(userr.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }), 'Avatar')] });
    },
    /**
     * @param {Discord.Interaction} interaction 
     * @param {Discord.Client} client 
     */
    async interactionExecute(client, interaction) {
        const userr = interaction.options?.find(c => c?.name === 'user')?.member || interaction.member;
        const data = await this.getDate(client, userr)
        const joinedAt = Math.round(new Date(userr.joinedTimestamp).getTime() / 1000)
        const createdAt = Math.round(new Date(userr.user.createdTimestamp).getTime() / 1000)
        const embeedd = new Discord.MessageEmbed()
            .setColor(client.confiig.color)
            .setThumbnail(userr.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
            .setTitle(`${emojis.useradd}  User: ${userr.displayName}`)
            .addField(`${emojis.id}  User ID:`, `${userr.id}`)
            .addField(`${emojis.join}  Joined at:`, `<t:${joinedAt}>`)
            .addField(`${emojis.messages}  Messages Sent:`, `${data.messages}`)
            .addField(`${emojis.join}  Joined Discord at:`, `<t:${createdAt}>`)
            .addField(`${emojis.ban} Server Infractions:`, `${data.infractions}`)
            .setTimestamp()
        await interaction.reply({ embeds: [embeedd], components: [await interactionsFile.link(userr.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }), 'Avatar')] });
    },
};