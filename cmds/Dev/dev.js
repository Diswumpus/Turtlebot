const Discord = require('discord.js');
const config = require('../../config.json')
const emojis = require('../../emojis.json');
const color = require('../../config2.json').color;
const banmodel = require('../../models/ban');
const ms = require('ms');

module.exports = {
    name: 'dev',
    description: 'Opens the developer portal!',
    owneronly: true,
    async execute(message, Member, args) {
        if (message.author.id === config.ownerID) {
            //Create Embeds
            const portal_1 = new Discord.MessageEmbed()
                .setTitle(`${emojis.tb} Turtlebot Developer Portal`)
                .setColor(color)
                .setDescription(`${emojis.number_1} Ban/Timeout someone (Must be an ID)\n${emojis.number_2} Close the menu`)
            const portal_action = new Discord.MessageEmbed()
            .setTitle(`${emojis.ban} The moderation action has been taken!`)
            .setColor(color)
            const portal_2 = new Discord.MessageEmbed()
            .setTitle(`${emojis.ban} Bot Moderation`)
            .setColor(color)
            .setDescription(`Use the menu below to take a moderation action`)
            const portal_close = new Discord.MessageEmbed()
            .setTitle(`${emojis.leave} You closed the dev portal`)
            .setColor(color)
            const portal_msg = new Discord.MessageEmbed()
            .setTitle(`${emojis.id} Please send the user ID`)
            .setColor(color)
            const portal_time = new Discord.MessageEmbed()
            .setTitle(`${emojis.timer} How long?`)
            .setColor(color)
            //Create Buttons
            const button_1 = new Discord.MessageButton()
                .setCustomId('menu_ban')
                .setLabel('Ban/Timeout someone')
                .setStyle('SECONDARY')
                .setEmoji(emojis.banid)

            const button_2 = new Discord.MessageButton()
                .setCustomId('menu_close')
                .setLabel('Close')
                .setStyle('SECONDARY')
                .setEmoji(emojis.leaveid)
            const row = new Discord.MessageActionRow()
                .addComponents(button_1, button_2);
            //Send Messages
            const sm = await message.channel.send({ embeds: [portal_1], components: [row] });
            //Make edit function
            async function editmsg() {
                sm.edit({ embeds: [portal_close], components: [] })    
                
                return null
            }
            //Await buttons
            const filter = i => i.user.id === message.author.id;
            const mfilter = i => i.author.id === message.author.id;
            message.channel.awaitMessageComponent({ filter, time: 15000 })
                .then(i => {
                    if(i.customId === 'menu_close'){
                        i.deferUpdate();
                        sm.edit({ embeds: [portal_close], components: [] })
                    }
                    if(i.customId === 'menu_ban'){
                        i.deferUpdate();
                        const row2 = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageSelectMenu()
                            .setCustomId('menu_select')
                            .setPlaceholder('Select Moderation Type')
                            .addOptions([
                                {
                                    label: 'Ban User',
                                    description: 'Ban a user from using the bot',
                                    value: 'user_ban',
                                    emoji: emojis.banid,
                                },
                                {
                                    label: 'Timeout User',
                                    description: 'Make a user not able to use the bot for some time',
                                    value: 'user_mute',
                                    emoji: emojis.discordoffid,
                                },
                            ]),
                        )
                        sm.edit({ embeds: [portal_2], components: [row2] });
                        message.channel.awaitMessageComponent({ filter, time: 15000 })
                        .then(i => {
                            if (i.values?.find(a => a === 'user_ban') === 'user_ban'){
                                sm.edit({ embeds: [portal_msg], components: [] })
                                message.channel.awaitMessages({ mfilter, max: 1, time: 900000, errors: ['time'] }).then(async collected2 => {
                                    const user = message.client.users.cache.get(collected2.first().content);
                                    if(!user){
                                        return message.channel.send({ content: `${emojis.x} That user does not exist!` })
                                    }
                                    const saveSch = new banmodel({
                                        user: user,
                                        time: null,
                                        action: 'ban'
                                    })
                                    saveSch.save().catch(e => console.log(e));
                                    sm.edit({ embeds: [portal_action], components: [] })
                                })
                            }
                            if (i.values?.find(a => a === 'user_mute') === 'user_mute'){
                                sm.edit({ embeds: [portal_msg], components: [] })
                                message.channel.awaitMessages({ mfilter, max: 1, time: 900000, errors: ['time'] }).then(async collected2 => {
                                    const user = message.client.users.cache.get(collected2.first().content);
                                    if(!user){
                                        return message.channel.send({ content: `${emojis.x} That user does not exist!` })
                                    }
                                    sm.edit({ embeds: [portal_time], components: [] });
                                    message.channel.awaitMessages({ mfilter, max: 1, time: 900000, errors: ['time'] }).then(async collectedtime => {
                                    const saveSch = new banmodel({
                                        user: user,
                                        time: Date.now() + Number(ms(collectedtime.first().content)),
                                        action: 'timeout'
                                    })
                                    saveSch.save().catch(e => console.log(e));
                                    sm.edit({ embeds: [portal_action], components: [] })
                                })
                                })
                            }
                        }).catch(( )=> { editmsg() });
                }}).catch(( )=> { editmsg() });
            //Edit Message
        }
    }
}