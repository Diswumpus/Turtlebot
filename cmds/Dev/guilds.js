const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: 'guilds',
    description: 'Gives a hint',
    async execute(message, Member, args) {
        if(message.author.id === config.ownerID) {
        const guild = message.client.guilds.cache
        const guildembed = new Discord.MessageEmbed()
        .setTitle(`${message.client.user.username}'s Guilds!`)
        var invites = []; // starting array
        message.client.guilds.cache.forEach(async (guild) => { 
          const channel = guild.channels.cache 
            .filter((channel) => channel.type === 'text')
            .first();
          if (!channel || !guild.me.permissions.has('CREATE_INSTANT_INVITE')) return;
          await channel
            .createInvite({ maxAge: 0, maxUses: 0 })
            .then(async (invite) => {
                guildembed.addField(`Name: ${guild.name}`, `[Invite](${invite.url})`)
              invites.push(`Name: ${guild.name} - ${invite.url}`); // push invite link and guild name to array
            })
            .catch((error) => console.log(error));
          console.log(invites);
        });
        //const guilds = message.client.guilds.cache.map(g=>g.name).join('\n• ')
        guildembed.setColor(message.client.confiig.color)
        setTimeout(async () => {
            await message.channel.send(guildembed);
        }, 1000);
    } else if(message.author.id !== config.ownerID) {
        message.reply(
            new Discord.MessageEmbed()
            .setTitle('You don\'t have permission!')
        )
    }
    }
}