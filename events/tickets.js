const Discord = require('discord.js');
const color = require('../config2.json').color;
const buttons = require('../interactions');
const emojis = require('../emojis.json');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isButton()) return;
        if (interaction.customId === 'ticket_open') {
            const ch = await interaction.guild.channels.create(`ticket-${interaction.user.tag}`, {
                 reason: 'Ticket Channel',
                 permissionOverwrites: [
                    {
                      id: interaction.guild.roles.everyone,
                      deny: [Discord.Permissions.FLAGS.VIEW_CHANNEL],
                   },
                   {
                    id: interaction.user.id,
                    allow: [Discord.Permissions.FLAGS.VIEW_CHANNEL],
                 },
                 ],
                })
            await interaction.reply({ content: `${require('../emojis.json').check} Created a ticket in ${ch}`, ephemeral: true });
            const embed = new Discord.MessageEmbed()
            .setTitle(`${emojis.ticket} Open a ticket!`)
            .setColor(color)
            .setDescription(`${interaction.user} opened a ticket!`)
            const ticketb = new Discord.MessageActionRow()
            .addComponents(
                await buttons.button('Close Ticket', 3, `ticket_close | ${interaction.user.id}`, emojis.ticketid)
            );
            ch.send({ embeds: [embed], components: [ticketb] })
        }
    },
};