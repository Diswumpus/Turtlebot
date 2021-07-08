const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'guildCreate',
    async execute(guild, client) {
        const ownderr = client.users.cache.get(require('../config.json').ownerID);
        let chan = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))

        // Embed
        let embed = new Discord.MessageEmbed()
            .setColor(client.confiig.color)
            .setAuthor(`\u200b`, client.user.displayAvatarURL())
            .setTitle(`Hey, thanks for adding me!`)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`${require('../emojis.json').tb} Thanks for using ${client.user.username}!\nTo see a full list of commands use \`${require('../config.json').prefix}help\`\nOr to see the guide use the menu below!\n\n**- [Turtlebot](${require('../config2.json').invite})**`)
            .setFooter(`Made By ${ownderr.tag} | ,help`)
            .addField("Make sure to use `,` with every command", `[Support Server](${require('../config2.json').invite}) | [Vote for me!](${require('../config2.json').vote}) | [Invite Me!](${require('../config2.json').boti})`)
            .setTimestamp()
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

        // If no channels, it will dm the owner.
        const editthis = await chan.send({ embeds: [embed], components: [row, roww] });
        //Define embeds
        const sembed = new Discord.MessageEmbed()
            .setTitle(`Settings | Guide`)
            .setImage('https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kqvhbdryc9a.gif')
            .setDescription(`Change your guild settings with \`${require('../config.json').prefix}config\`\n\n__**STEPS:**__\n1) Type \`${require('../config.json').prefix}config\`\n2) Type \`${require('../config.json').prefix}{setting} <args>\`\n3) If it replys everything should work!\n\nIf it does not reply join [here](${require('../config2.json').invite} "Support Server")`)
            .setColor(client.confiig.color)
        const rembed = new Discord.MessageEmbed()
            .setTitle(`Reaction Roles | Guide`)
            .setDescription(`Reaction Roles are currently unstable, try something else`)
            .setColor(client.confiig.color)
        const bembed = new Discord.MessageEmbed()
            .setTitle(`Button Roles | Guide`)
            .setDescription(`**Button Roles**, the new reaction roles!\n\n__This feature is **still** in beta!__`)
            .setColor(client.confiig.color)
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
                editthis.delete().catch(( ) => { });
            } else if(i?.customId === '2delete'){
                await i.deleteReply().catch(( ) => { });
            }
        });
        collector.on('end', collected => {
            editthis.edit({ embeds: [embed], content: 'This message is now inactive' })
        });
        // if(!chan) {
        //         guild.owner.send(embed)
        //     }  else if(chan) {
        //         chan.send(embed)
        //     }

        // Making an invite for server
        let inv = await chan.createInvite({
            maxAge: 0, // 0 = infinite expiration
            maxUses: 0 // 0 = infinite uses
        })

        // Log Channel for new servers
        const channel = client.channels.cache.get('846410648984354886')

        const secEmb = new Discord.MessageEmbed()
            .setColor(`GREEN`)
            .setAuthor(`\u200b`, client.user.displayAvatarURL())
            .setDescription(`**New Server**
                    Guild: ${guild.name}
                    Users: ${guild.memberCount}
                    Owner: idk
                    Owner ID: ${guild.ownerID}
                    Invite: \`${inv.url}\``)
            .setFooter(`Guild ID: ${guild.id}`)
            .setTimestamp()

        channel.send({ embeds: [secEmb], content: inv.url});
    },
};