const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Invite me for dinner',
    async execute(message, Member, args) {
        let invite = await message.channel.createInvite({
            maxAge: 0, // 0 = infinite expiration
            maxUses: 0 // 0 = infinite uses
          }).catch(console.error);
        message.channel.send(`Here's your invite! ${invite}`);
    },
};