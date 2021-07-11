/*
    guild: String,
    logsch: String,
    user: Boolean,
    server: Boolean,
    message: Boolean,
    ticket: Boolean,
    mod: Boolean,
    clickrole: Boolean
*/
const Discord = require('discord.js');
const lModel = require("../../models/plugins/logs");
const color = require('../../config2.json').color;
const buttons = require('../../interactions');
const emojis = require('../../emojis.json');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'logs',
    category: 'Config',
    description: 'Changes the bots prefix',
    async execute(message, Member, args) {
        const logs = await lModel.find({ guild: message.guild.id })
        const logarr = new Array()
        const logco = new Discord.Collection()
        let inum = 0
        logs.forEach(e => {
            inum++
            logco.set(inum, e.logsch)
            logarr.push([e.logsch, inum])
        });
        const removeembed = new Discord.MessageEmbed()
        .setTitle(`${emojis.channelredo} Log Settings`)
        .setColor(color)
        .setDescription(`${logarr.map(a => `\`${a[1]}\` ${message.guild.channels.cache.get(a[0]).name}\n`).join(" ")}`)
        const mentionch = new Discord.MessageEmbed()
            .setTitle(`${emojis.channeladd} Add Log Channel`)
            .setDescription('Please mention a channel.')
            .setColor(color)
        const logembed = new Discord.MessageEmbed()
            .setTitle(`${message.guild}'s Logs`)
            .addField(`${emojis.good} Active Logs`, `${logs.map(e => `<#${e.logsch}>`).join(" ") || '`There are no active logs`'}`)
            .setColor(color)
        const endembed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`${emojis.channelredo} Log Settings`)
            .setDescription('You have finished editing your log settings.')
        const row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('channels_add')
                    .setEmoji(`${emojis.channeladdid}`)
                    .setStyle('SECONDARY')
                    .setLabel('Add Channel'),
                    new MessageButton()
                    .setCustomId('channels_remove')
                    .setEmoji(`${emojis.channeldeleteid}`)
                    .setStyle('SECONDARY')
                    .setLabel('Remove Channel'),
                    new MessageButton()
                    .setCustomId('close')
                    .setEmoji(`${emojis.leaveid}`)
                    .setStyle('SECONDARY')
                    .setLabel('Close'),
            )
            const row2dis = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('channels_add')
                    .setEmoji(`${emojis.channeladdid}`)
                    .setStyle('SECONDARY')
                    .setLabel('Add Channel')
                    .setDisabled(true),
                    new MessageButton()
                    .setCustomId('close')
                    .setEmoji(`${emojis.leaveid}`)
                    .setStyle('SECONDARY')
                    .setLabel('Close'),
            )
        const sm = await message.channel.send({ embeds: [logembed], components: [row2] })
        const filter2 = i => i.user.id === message.author.id;
        const mfilter = i => i.author.id === message.author.id;
        const filter = i => i.customId === 'logs_select' && i.user.id === message.author.id;
        const collector2 = sm.awaitMessageComponent({ filter2, time: 15000 })
            .then(async i1 => {
                if (i1.customId === 'close') {
                    return sm.edit({ embeds: [endembed], components: [] })

                } else if (i1.customId === 'channels_remove') {
                    sm.edit({ embeds: [removeembed], components: [row2dis] })
                    const collector4 = sm.awaitMessageComponent({ filter2, time: 15000 }).then(async i4 => {
                        if (i4.customId === 'close') {
                            return sm.edit({ embeds: [endembed], components: [] })
                        }}).catch(( )=>{ })
                    message.channel.awaitMessages({ mfilter, max: 1, time: 900000, errors: ['time'] }).then(async collected3 => {
                        const tchannel = logco.first(2)[Number(collected3.first().content)-1]
                        lModel.findOneAndDelete({
                            guild: message.guild.id,
                            logsch: tchannel
                        }, function (err) {
                            if (err) return handleError(err);
                            // deleted at most one tank document
                          });
                        collected3.first().delete()
                        return sm.edit({ embeds: [endembed], components: [] })
                    }).catch(( )=>{ })
                } else if (i1.customId === 'channels_add') {

                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageSelectMenu()
                                .setCustomId('logs_select')
                                .setPlaceholder('Nothing selected')
                                .setMaxValues(6)
                                .addOptions([
                                    {
                                        label: 'User',
                                        description: 'User leave, join and other',
                                        value: 'enable_user',
                                        emoji: `${emojis.useraddid}`
                                    },
                                    /*
                                        user: Boolean,
                    server: Boolean,
                    message: Boolean,
                    ticket: Boolean,
                    mod: Boolean,
                    clickrole: Boolean
                    */
                                    {
                                        label: 'Server',
                                        description: 'Server avatar and other changes',
                                        value: 'enable_server',
                                        emoji: `${emojis.channeladdid}`
                                    },
                                    {
                                        label: 'Message',
                                        description: 'Message delete and edit',
                                        value: 'enable_message',
                                        emoji: `${emojis.messagesid}`
                                    },
                                    {
                                        label: 'Ticket',
                                        description: 'Tickets close and open',
                                        value: 'enable_ticket',
                                        emoji: `${emojis.channeladdid}`
                                    },
                                    {
                                        label: 'Mod Commands',
                                        description: 'When mod actions are taken',
                                        value: 'enable_mod',
                                        emoji: `${emojis.banid}`
                                    },
                                    {
                                        label: 'Button Roles',
                                        description: 'When a user gets a role from a button!',
                                        value: 'enable_button',
                                        emoji: `${emojis.discordonid}`
                                    }
                                ]),
                        );
                    await sm.edit({ embeds: [mentionch], components: [] });
                    const collector5 = sm.awaitMessageComponent({ filter2, time: 15000 }).then(async i5 => {
                        if (i5.customId === 'close') {
                            return sm.edit({ embeds: [endembed], components: [] })
                        }})
                    message.channel.awaitMessages({ mfilter, max: 1, time: 900000, errors: ['time'] }).then(async collected2 => {
                        const channel = collected2.first().mentions.channels.first();
                        collected2.first().delete()
                        await sm.edit({ embeds: [logembed], components: [row] });

                        const collector6 = sm.awaitMessageComponent({ filter2, time: 15000 }).then(async i6 => {
                            if (i6.customId === 'close') {
                                return sm.edit({ embeds: [endembed], components: [] })
                            }}).catch(( )=>{ })

                        const collector = sm.createMessageComponentCollector({ filter, time: 15000 });

                        collector.on('collect', async i => {
                            const values = i.values
                            async function reply() {

                                await sm.edit({ embeds: [endembed], components: [] })

                                return null
                            }

                            if (i.values?.find(a => a === 'enable_user') === 'enable_user') {
                                let v = await lModel.findOne({
                                    guild: message.guild.id,
                                    logsch: channel.id
                                });
                                if (!v) {
                                    let nv = new lModel({
                                        guild: message.guild.id,
                                        logsch: channel.id,
                                        user: true
                                    })
                                    await nv.save().catch(e => console.log(e));
                                } else {
                                    lModel.findOne({
                                        guild: message.guild.id,
                                        logsch: channel.id
                                    }, async (err, dUser) => {
                                        if (err) console.log(err);
                                        dUser.user = true
                                        await dUser.save().catch(e => console.log(e));
                                    });
                                }
                            }
                            if (i.values?.find(a => a === 'enable_server') === 'enable_server') {
                                let v = await lModel.findOne({
                                    guild: message.guild.id,
                                    logsch: channel.id
                                });
                                if (!v) {
                                    let nv = new lModel({
                                        guild: message.guild.id,
                                        logsch: channel.id,
                                        server: true
                                    })
                                    await nv.save().catch(e => console.log(e));
                                } else {
                                    lModel.findOne({
                                        guild: message.guild.id,
                                        logsch: channel.id
                                    }, async (err, dUser) => {
                                        if (err) console.log(err);
                                        dUser.server = true
                                        await dUser.save().catch(e => console.log(e));
                                    });
                                }
                            }
                            if (i.values?.find(a => a === 'enable_message') === 'enable_message') {
                                let v = await lModel.findOne({
                                    guild: message.guild.id,
                                    logsch: channel.id
                                });
                                if (!v) {
                                    let nv = new lModel({
                                        guild: message.guild.id,
                                        logsch: channel.id,
                                        message: true
                                    })
                                    await nv.save().catch(e => console.log(e));
                                } else {
                                    lModel.findOne({
                                        guild: message.guild.id,
                                        logsch: channel.id
                                    }, async (err, dUser) => {
                                        if (err) console.log(err);
                                        dUser.message = true
                                        await dUser.save().catch(e => console.log(e));
                                    });
                                }
                            }

                            if (i.values?.find(a => a === 'enable_ticket') === 'enable_ticket') {
                                let v = await lModel.findOne({
                                    guild: message.guild.id,
                                    logsch: channel.id
                                });
                                if (!v) {
                                    let nv = new lModel({
                                        guild: message.guild.id,
                                        logsch: channel.id,
                                        ticket: true
                                    })
                                    await nv.save().catch(e => console.log(e));
                                } else {
                                    lModel.findOne({
                                        guild: message.guild.id,
                                        logsch: channel.id
                                    }, async (err, dUser) => {
                                        if (err) console.log(err);
                                        dUser.ticket = true
                                        await dUser.save().catch(e => console.log(e));
                                    });
                                }
                            }

                            if (i.values?.find(a => a === 'enable_mod') === 'enable_mod') {
                                let v = await lModel.findOne({
                                    guild: message.guild.id,
                                    logsch: channel.id
                                });
                                if (!v) {
                                    let nv = new lModel({
                                        guild: message.guild.id,
                                        logsch: channel.id,
                                        mod: true
                                    })
                                    await nv.save().catch(e => console.log(e));
                                } else {
                                    lModel.findOne({
                                        guild: message.guild.id,
                                        logsch: channel.id
                                    }, async (err, dUser) => {
                                        if (err) console.log(err);
                                        dUser.mod = true
                                        await dUser.save().catch(e => console.log(e));
                                    });
                                }
                            }
                            if (i.values?.find(a => a === 'enable_button') === 'enable_button') {
                                let v = await lModel.findOne({
                                    guild: message.guild.id,
                                    logsch: channel.id
                                });
                                if (!v) {
                                    let nv = new lModel({
                                        guild: message.guild.id,
                                        logsch: channel.id,
                                        clickrole: true
                                    })
                                    await nv.save().catch(e => console.log(e));
                                } else {
                                    lModel.findOne({
                                        guild: message.guild.id,
                                        logsch: channel.id
                                    }, async (err, dUser) => {
                                        if (err) console.log(err);
                                        dUser.clickrole = true
                                        await dUser.save().catch(e => console.log(e));
                                    });
                                }
                            }
                            reply()
                        });
                        collector.on('end', collected => sm.edit({ embeds: [endembed], components: [] }));
                    }
                    ).catch(( )=>{ sm.edit({ embeds: [endembed], components: [] })})
                }
            }).catch((e)=>{ sm.edit({ embeds: [endembed], components: [] }) })
    }

}