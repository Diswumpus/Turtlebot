const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    category: 'Moderation',
    description: 'Kicks a user',
    permissions: 'KICK_MEMBERS',
    async execute(message, Member, args) {
        message.delete();
        if (message.member.permissions.has('KICK_MEMBERS')) {
            const member = message.mentions.members.first()  || message.client.users.cache.get(args[0]);
            const ban = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel(`Kick`)
                    .setStyle('DANGER')
                    .setEmoji(require('../../emojis.json').xid)
                    .setCustomId('kick'),
                    new Discord.MessageButton()
                    .setLabel(`Cancel`)
                    .setStyle('SUCCESS')
                    .setEmoji(require('../../emojis.json').checkid)
                    .setCustomId('cancel')
            );
            const embed = new Discord.MessageEmbed()
            .setTitle(`Kick ${member.username}?`)
            message.channel.send({ embeds: [embed], components: [ban]}).then(editthis => {
                const filter = i => i.message.id === editthis.id && i.user.id === message.author.id;

                const collector = message.channel.createMessageComponentCollector({ filter, time: 150000 });
                collector.on('collect', async i => {
                    if (i?.customId === 'kick') {
                        message.guild.members.kick(member.id, `${args[1] || 'None'}`)
                        i.reply({ content: `Kicked ${member.username}`, ephemeral: true})
                     } else if (i?.customId === 'cancel') {
                        editthis.delete().catch(() => { });
                    }
                });
                collector.on('end', collected => {
                    editthis.edit({ embeds: [embed], content: 'This message is now inactive' })
                });
            })
        }
    },
};