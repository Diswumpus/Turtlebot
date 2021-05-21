const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    category: 'Moderation',
    description: 'Kicks a user',
    execute(message, Member, args) {
        message.delete();
        if (message.member.permissions.has('KICK_MEMBERS')) {
            const member = message.mentions.members.first();
            message.channel.send(`Kick ${member}?`).then((edittthis) => {
                edittthis.react('✅')
                edittthis.react('❎')
                message.client.on('messageReactionAdd', async (reaction, user) => {
                    if (user.bot) {
                        return
                    }
                    if (reaction.emoji.name === '✅') {
                        member.kick();
                    }
                    if (reaction.emoji.name === '✅') {
                        edittthis.edit(`Successfully kicked ${member}`);
                    }
                    if (reaction.emoji.name === '❎') {
                        edittthis.delete();
                    }
                })
            })
        }
    },
};