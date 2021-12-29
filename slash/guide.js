const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const { Messages } = require('../util');

module.exports = {
    name: 'guide',
    category: 'Info',
    description: 'Show\'s you the guide!',
        /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.CommandInteraction} interaction 
     */
    async execute(client, interaction) {
        const chan = interaction.channel;
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('options')
                    .setPlaceholder('Select a category!')
                    .addOptions([
                        {
                            label: 'Settings',
                            description: 'Change your guild settings!',
                            value: 's',
                        },
                        {
                            label: 'Reaction Roles',
                            description: 'Learn how to create Reaction Roles!',
                            value: 'rr',
                        },
                        {
                            label: 'Button Roles',
                            description: 'Learn how to create Button Roles!',
                            value: 'br',
                        },
                    ]),
            );
        const roww = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('delete')
                    .setLabel('Delete')
                    .setStyle('DANGER')
            );
                const embed = new Discord.MessageEmbed()
                .setTitle('Guide')
                .setColor(client.color)
                .setDescription('Use the menu below to use the guide!')
        await interaction.reply({ embeds: [embed], components: [row, roww] });
        //Define embeds
        const prefix = require('../config.json').prefix;
        const sembed = new Discord.MessageEmbed()
            .setTitle(`Settings | Guide`)
            .setImage('https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kqvhbdryc9a.gif')
            .setDescription(`Change your guild settings with \`${prefix}config\`\n\n__**STEPS:**__\n1) Type \`${prefix}config\`\n2) Type \`${prefix}{setting} <args>\`\n3) If it replys everything should work!\n\nIf it does not reply join [here](${require('../config2.json').invite} "Support Server")`)
            .setColor(client.confiig.color)
        const rembed = new Discord.MessageEmbed()
            .setTitle(`Reaction Roles | Guide`)
            .setDescription(`Reaction Roles are currently unstable, try button roles`)
            .setColor(client.confiig.color)
        const bembed = new Discord.MessageEmbed()
            .setTitle(`Button Roles | Guide`)
            .setDescription(`**Button Roles**, the new reaction roles!\n\n__**STEPS:**__\n1) Type \`${prefix}br\`\n2) Follow the steps\n3) Your done!\nIf you want more then 1 role mention 2 or 3 roles`)
            .setColor(client.confiig.color)
            .setImage('https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kqvk89bcm9a.gif')
        //Create collector
        /**
         * @param {Discord.SelectMenuInteraction} i 
         */
        const filter = i => { return true }

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 150000 });
        let value;
        collector.on('collect', async i => {
            if (i.values) {
                value = i.values[0];
            } else {
                value = null
            }
            async function reply(t) {
                const tt = { "1": sembed, "2": rembed, "3": bembed }

                await i.reply({ embeds: [tt[t]], ephemeral: true })

                return null
            }
            if (value === 's') {
                reply('1');
            } else if (value === 'rr') {
                reply('2');
            } else if (value === 'br') {
                reply('3');
            } else if (i?.customId === 'delete') {
                i.message.delete()
            }
        });
        collector.on('end', collected => {
            interaction.editReply({ embeds: [embed], content: `${Messages.IDLE}` })
        });
    }
}