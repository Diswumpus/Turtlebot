const Discord = require('discord.js');
const config = require('../config.json')

module.exports = {
    name: 'guilds',
    description: 'Gives a hint',
    async execute(client, interaction) {
        await interaction.defer();
        if(interaction.user.id === config.ownerID) {
        const guild = client.guilds.cache
        const guildembed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username}'s Guilds!`)
        var invites = []; // starting array
        client.guilds.cache.forEach(async (guild) => { 
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
        guildembed.setColor(client.confiig.color)
        setTimeout(async () => {
            await interaction.editReply({ embeds: [guildembed] });
        }, 10000);
        setTimeout(async () => {
            await interaction.editReply({ embeds: [guildembed] });
        }, 20000);
        setTimeout(async () => {
            await interaction.editReply({ embeds: [guildembed] });
        }, 30000);
    } else if(interaction.user.id !== config.ownerID) {
      const noperms = new Discord.MessageEmbed()
      .setTitle('You don\'t have permission!')
        interaction.editReply({ embeds: [noperms] })
    }
    }
}