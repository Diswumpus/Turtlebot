const Discord = require('discord.js');

module.exports = {
    name: 'invite0',
    category: 'Config',
    description: 'Generates an invite for your server',
    async execute(message, Member, args) {
        let invite = await message.channel.createInvite({
            maxAge: 0, // 0 = infinite expiration
            maxUses: 0 // 0 = infinite uses
          }).catch(console.error);
        const createe = message.client.emojis.cache.find(em => em.name === "Plus");
        message.channel.send(`Creating.... ${createe}`).then((msg) => {
        (`${require('../../emojis.json').check} Here's an invite for ${message.guild.name}! ${invite}`);
        msg.edit(_);
    });
},
};