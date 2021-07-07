const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    category: 'Config',
    description: 'Generates an invite for your server use 0 for infinite',
    usage: "<age> <uses>",
    async execute(message, Member, args) {
        let ageDays = parseInt(args[1]);
        let uses = parseInt(args[0]);
        console.log(`creating invite for ${ageDays} and ${uses}`)
        let invite = await message.channel.createInvite({
            maxAge: ageDays * 60 * 60 * 24, // 0 = infinite expiration
            maxUses: uses // 0 = infinite uses
          }).catch(console.error);
        message.channel.send(`${require('../../emojis.json').check} Here's an invite for ${message.guild.name}! ${invite}`);
    },
};