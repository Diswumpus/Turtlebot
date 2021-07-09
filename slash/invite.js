const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    async execute(client, interaction) {
        const invitee = client.confiig.boti;
        const colorr = client.confiig.color;
        const inviteembed = new Discord.MessageEmbed()
        .setTitle('`🔗` Invite')
        .setURL(`${invitee}`)
        .setColor(colorr)
        const view = await require('../interactions').link(invitee, 'Invite Me!')
        interaction.reply({ embeds: [inviteembed], components: [view] })
    }
}