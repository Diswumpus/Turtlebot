const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'guide',
    category: 'Info',
    description: 'Show\'s you the guide!',
    async execute(message, Member, args) {
        const chan = message.channel;
        const { client } = message;
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
                .setDescription('Use the menu below to use the guide!')
        // If no channels, it will dm the owner.
        const editthis = await chan.send({ embeds: [embed], components: [row, roww] });
        //Define embeds
        const prefix = require('../../config.json').prefix;
        const sembed = new Discord.MessageEmbed()
            .setTitle(`Settings | Guide`)
            .setImage('https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kqvhbdryc9a.gif')
            .setDescription(`Change your guild settings with \`${require('../../config.json').prefix}config\`\n\n__**STEPS:**__\n1) Type \`${require('../../config.json').prefix}config\`\n2) Type \`${require('../../config.json').prefix}{setting} <args>\`\n3) If it replys everything should work!\n\nIf it does not reply join [here](${require('../../config2.json').invite} "Support Server")`)
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
        const filter = i => i.message.id === editthis.id;

        const collector = chan.createMessageComponentCollector({ filter, time: 150000 });
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
                editthis.delete().catch(() => { });
            }
        });
        collector.on('end', collected => {
            editthis.edit({ embeds: [embed], content: 'This message is now inactive' })
        });
    }
}