const Discord = require('discord.js');

module.exports = {
    name: 'tpinvite',
    description: 'Generates an invite for your server',
    async execute(message, Member, args) {
        let invite = await message.channel.createInvite({
            maxAge: 0, // 0 = infinite expiration
            maxUses: 0 // 0 = infinite uses
          }).catch(console.error);
          const party = message.client.emojis.cache.find(em => em.name === "ablobcolorshift");
        message.channel.send(`Here's an invite for Turtlepaw's Server ${party}! https://discord.gg/FwSEFbVpn8`);
    },
};