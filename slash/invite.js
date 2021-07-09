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
        view.addComponents(
            new Discord.MessageButton()
            .setLabel('Support Server')
            .setEmoji('862868020073857065')
            .setStyle('LINK')
            .setURL(client.confiig.invite)
        )
        interaction.reply({ embeds: [inviteembed], components: [view] })
    }
}