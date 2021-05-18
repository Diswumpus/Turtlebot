const Discord = require('discord.js');

module.exports = {
    name: 'unban',
    category: 'Moderation',
    description: 'Unbans a user',
    execute(message, Member, args) {
        message.delete();
        if (member.hasPermission('BAN_MEMBERS')) {
            const id = args[0];
            message.channel.send(`Unban ${id}?`).then((edittthis) => {
                edittthis.react('✅')
                edittthis.react('❎')
                message.client.on('messageReactionAdd', async (reaction, user) => {
                    if (user.bot) {
                        return
                    }
                    if (reaction.emoji.name === '✅') {
                        message.guild.members.unban(id);
                    }
                    if (reaction.emoji.name === '✅') {
                        edittthis.edit(`Successfully unbanned ${id}`);
                    }
                    if (reaction.emoji.name === '❎') {
                        edittthis.delete();
                    }
                })
            })
        }
    },
};