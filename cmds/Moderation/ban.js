const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    category: 'Moderation',
    description: 'Bans a user',
    execute(message, Member, args) {
        message.delete();
        const member = message.mentions.members.first();
        message.channel.send(`Ban ${member}? They cannot come back`).then((edittthis) => {
            edittthis.react('✅')
            edittthis.react('❎')
            message.client.on('messageReactionAdd', async (reaction, user) => {
                if (user.bot) {
                    return
                }
                if (reaction.emoji.name === '✅') {
                    message.guild.members.ban(member);
                }
                if (reaction.emoji.name === '✅') {
                    edittthis.edit(`Successfully banned ${member}`);
                }
                if (reaction.emoji.name === '❎') {
                    edittthis.delete();
                }
            })
        })
    },
};