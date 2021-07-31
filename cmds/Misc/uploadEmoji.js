const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const dt = require('../../../discord-turtle/index');

module.exports = {
    name: 'uploademoji',
    aliases: ['upemojis', 'upemoji'],
    category: 'Misc',
    description: 'Shows a link to the bots Git hub',
    /**
     * 
     * @param {Discord.Message} message 
     * @param {Discord.User} Member 
     * @param {Array} args 
     */
    async execute(message, Member, args) {
        let emoji;
        const guildUti = new dt.guildUtil(message.guild);
        if(message.attachments.first()){
            emoji = await guildUti.createEmoji('IMAGE', message.attachments.first(), { reason: `${message.client.user.username}'s Upload Emoji Command`})
        } else if(message.content.includes('<:') && message.content.includes('>') || message.content.includes('<a:') && message.content.includes('>')){
            const emojiii = args[0].slice(args[0].lastIndexOf(':')+1, args[0].lastIndexOf('>'))
            let emojitoUpload;
            if(message.content.includes('<a:')){
                emojitoUpload = `https://cdn.discordapp.com/emojis/${emojiii}.gif?v=1`
            } else {
                emojitoUpload = `https://cdn.discordapp.com/emojis/${emojiii}.png?v=1`
            }
            emoji = await guildUti.createEmoji('URL', emojitoUpload, { reason: `${message.client.user.username}'s Upload Emoji Command` })
        } else {
            emoji = await guildUti.createEmoji('URL', args[0], { reason: `${message.client.user.username}'s Upload Emoji Command`})
        }
        const upembed = new MessageEmbed()
        .setColor(message.client.color)
        .setTitle(`${require('../../emojis.json').check1} Uploaded!`)
        .setDescription(`**Emoji:**\n${emoji} - \`:${emoji.name}:\``)
        .setThumbnail(emoji.url)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        const dbutton = new dt.linkbutton()
        dbutton.setEmoji(emoji.id)
        dbutton.setLink(emoji.url)
        dbutton.setLabel('View Emoji')
        const button = dbutton.create('ACTION_ROW');
        button.addComponents(
            new Discord.MessageButton()
            .setStyle('SECONDARY')
            .setCustomId('d_emoji')
            .setEmoji(require('../../emojis.json').trash4id)
        )
        const m = await message.channel.send({ embeds: [upembed], components: [button] })
        m.awaitMessageComponent({ filter: i=>i.user.id===message.author.id, time: 600000 })
        .then(async b => {
            if(b.customId === 'd_emoji'){
                emoji.delete()
                const dembed = new MessageEmbed()
                .setColor(message.client.color)
                .setTitle(`${require('../../emojis.json').trash4} Deleted!`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                b.update({ embeds: [dembed], components: [] });
            }
        })
    },
};