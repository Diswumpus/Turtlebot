const Discord = require('discord.js');
const mongoose = require('mongoose')
const plugins = require("../../models/plugins/plugin_manager");
const emojis = require('../../emojis.json');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const levelstn = require('../../brandArt.json').levels;
const { Message } = require('discord.js');

module.exports = {
    name: 'levels',
    category: 'Config',
    description: 'Changes the rank card',
    usage: '--info | --edit',
    permissions: 'ADMINISTRATOR',
    /**
     * 
     * @param {Discord.Message} message 
     * @param {Discord.User} Member 
     * @param {String} args 
     */
    async execute(message, Member, args) {
        const mfilter = i => i.author.id === message.author.id;
        const ifilter = i => i.user.id === message.author.id;
        const enableButton = new MessageButton()
        .setLabel('Enable Plugin')
        .setEmoji(emojis.check1id)
        .setCustomId('enable')
        .setStyle('SECONDARY')
        const disableButton = new MessageButton()
        .setLabel('Disable Plugin')
        .setEmoji(emojis.xmarkid)
        .setCustomId('disable')
        .setStyle('SECONDARY')
        const editMessageButton = new MessageButton()
        .setLabel('Edit Message')
        .setEmoji(emojis.messagesid)
        .setCustomId('edit_message')
        .setStyle('SECONDARY')
        const channelButton = new MessageButton()
        .setLabel('Set Channel')
        .setEmoji(emojis.channeladdid)
        .setCustomId('channel_add')
        .setStyle('SECONDARY')
        const rchannelButton = new MessageButton()
        .setLabel('Remove Channel')
        .setEmoji(emojis.channeldeleteid)
        .setCustomId('channel_delete')
        .setStyle('SECONDARY')
        const cancel = new MessageButton()
        .setLabel('Cancel')
        .setEmoji(emojis.xmarkid)
        .setCustomId('close')
        .setStyle('DANGER')
        const disbuttons = new MessageActionRow()
        .addComponents(
            enableButton.setDisabled(true), disableButton.setDisabled(true), editMessageButton.setDisabled(true), channelButton.setDisabled(true), rchannelButton.setDisabled(true)
        )
        const disbuttons2 = new MessageActionRow().addComponents(cancel)
        enableButton.setDisabled(false), disableButton.setDisabled(false), editMessageButton.setDisabled(false), channelButton.setDisabled(false), rchannelButton.setDisabled(false)
        const plFind = await plugins.findPlugin(message.guild.id, 'LEVELS')
        const embed = new MessageEmbed().setAuthor(`${message.client.user.username} Plugins`, message.client.user.displayAvatarURL(), message.client.site).setColor(message.client.confiig.color)
        .setThumbnail(levelstn)
        .setDescription(`Plugin info for ${this.name}\n\n${emojis.check1} **Enabled:** ${plFind.found.toString()}\n${emojis.messages} **Message:** ${plFind.object?.LEVELMESSAGE || 'None'}\n${emojis.channeladd} **Channel:** ${message.client.channels.cache.get(plFind.object?.CHANNEL) || 'None'}`)
        let pluginEnabledb = new MessageActionRow()
        if(plFind.found){
            pluginEnabledb.addComponents(enableButton.setDisabled(true), disableButton, editMessageButton, channelButton, rchannelButton)
        } else {
            pluginEnabledb.addComponents(enableButton, disableButton.setDisabled(true), editMessageButton.setDisabled(true), channelButton.setDisabled(true), rchannelButton.setDisabled(true))
        }
        async function genRow(){
            const plFind2 = await plugins.findPlugin(message.guild.id, 'LEVELS')
            pluginEnabledb = new MessageActionRow()
            if(plFind2.found){
                pluginEnabledb.addComponents(enableButton.setDisabled(true), disableButton, editMessageButton, channelButton, rchannelButton)
            } else {
                pluginEnabledb.addComponents(enableButton, disableButton.setDisabled(true), editMessageButton.setDisabled(true), channelButton.setDisabled(true), rchannelButton.setDisabled(true))
            }
        }
        const m = await message.channel.send({ embeds: [embed], components: [pluginEnabledb] });

        async function cancelButton() {
            const mc = m.createMessageComponentCollector({ filter: ifilter, time: 60000 })
            mc.on('collect', async i4 => {
                if(i4.customId === 'close'){
                    i4.deferUpdate();
                    stopCollectors();
                    return m.delete();
                }
            })
        }
        const collectors = new Array();
        function stopCollectors() {
            for(const collector of collectors){
                collector.stop();
            }
        }

        const ico = m.createMessageComponentCollector({ ifilter, time: 60000, filter: ifilter });
        collectors.push(ico)
        ico.on('collect', async i => {
            if(i.customId === 'enable'){
                plugins.editPlugin('LEVELS', message.guild.id, true);
                genRow();
                const embed2 = new MessageEmbed().setAuthor(`${message.client.user.username} Plugins`, message.client.user.displayAvatarURL(), message.client.site).setColor(message.client.confiig.color)
                .setThumbnail(levelstn)
                .setDescription(`Plugin info for ${this.name}\n\n${emojis.check1} **Enabled:** true\n**Message:** ${plFind.object?.LEVELMESSAGE || 'None'}\n${emojis.channeladd} **Channel:** ${message.client.channels.cache.get(plFind.object?.CHANNEL) || 'None'}`)
                i.update({ embeds: [embed2] });
            } else if(i.customId === 'disable'){
                plugins.editPlugin('LEVELS', message.guild.id, false);
                genRow();
                const embed2 = new MessageEmbed().setAuthor(`${message.client.user.username} Plugins`, message.client.user.displayAvatarURL(), message.client.site).setColor(message.client.confiig.color)
                .setThumbnail(levels)
                .setDescription(`Plugin info for ${this.name}\n\n${emojis.xmark} **Enabled:** false\n**Message:** ${plFind.object?.LEVELMESSAGE || 'None'}\n${emojis.channeladd} **Channel:** ${message.client.channels.cache.get(plFind.object?.CHANNEL) || 'None'}`)
                i.update({ embeds: [embed2] });
            } else if(i.customId === 'edit_message'){
                i.reply({ embeds: [
                    new MessageEmbed()
                    .setTitle(`${emojis.pin} Type the message you want!`)
                    .setDescription('`{{user}}` The user that has leveled up\n`{{level}}` The level the user is at\n`{{ -d }}` The default level message')
                    .setColor(message.client.confiig.color)
                ], ephemeral: true })
                m.edit({ components: [disbuttons, disbuttons2] });
                cancelButton();
                message.channel.awaitMessages({ filter: mfilter, time: 60000, errors: ['time'], max: 1})
                .then(async m2 => {
                    const embed2 = new MessageEmbed().setAuthor(`${message.client.user.username} Plugins`, message.client.user.displayAvatarURL(), message.client.site).setColor(message.client.confiig.color)
                    .setThumbnail(levelstn)
                    .setDescription(`Plugin info for ${this.name}\n\n${emojis.check1} **Enabled:** true\n**Message:** ${m2.first().content}\n${emojis.channeladd} **Channel:** ${message.client.channels.cache.get(plFind.object?.CHANNEL) || 'None'}`)
                    genRow();
                    m.edit({ embeds: [embed2] });
                    plugins.editMessage(message.guild.id, m2.first().content);
                }).catch(( )=>{ message.channel.send({ content: 'Times up!' })})
            } else if(i.customId === 'channel_add'){
                i.reply({ embeds: [
                    new MessageEmbed()
                    .setTitle(`${emojis.pin} Type the channel`)
                    .setColor(message.client.confiig.color)
                ], ephemeral: true });
                m.edit({ components: [disbuttons, disbuttons2] });
                cancelButton();
                message.channel.awaitMessages({ filter: mfilter, time: 60000, errors: ['time'], max: 1})
                .then(async m3 => {
                    const embed3 = new MessageEmbed().setAuthor(`${message.client.user.username} Plugins`, message.client.user.displayAvatarURL(), message.client.site).setColor(message.client.confiig.color)
                    .setThumbnail(levelstn)
                    .setDescription(`Plugin info for ${this.name}\n\n${emojis.check1} **Enabled:** true\n**Message:** ${plFind.LEVELMESSAGE}\n${emojis.channeladd} **Channel:** ${m3.first().mentions.channels.first()}`)
                    genRow();
                    m.edit({ embeds: [embed3] });
                    plugins.setChannel(message.guild.id, m3.first().mentions.channels.first().id);
                }).catch(( )=>{ message.channel.send({ content: 'Times up!' })})
            } else if(i.customId === 'channel_delete'){
                i.reply({ embeds: [
                    new MessageEmbed()
                    .setTitle(`${emojis.pin} Type the channel`)
                    .setColor(message.client.confiig.color)
                ], ephemeral: true });
                m.edit({ components: [disbuttons, disbuttons2] });
                cancelButton();
                message.channel.awaitMessages({ filter: mfilter, time: 60000, errors: ['time'], max: 1})
                .then(async m4 => {
                    const embed4 = new MessageEmbed().setAuthor(`${message.client.user.username} Plugins`, message.client.user.displayAvatarURL(), message.client.site).setColor(message.client.confiig.color)
                    .setThumbnail(levelstn)
                    .setDescription(`Plugin info for ${this.name}\n\n${emojis.check1} **Enabled:** true\n**Message:** ${plFind.LEVELMESSAGE}\n${emojis.channeladd} **Channel:** None`)
                    genRow();
                    m.edit({ embeds: [embed4] });
                    plugins.removeChannel(message.guild.id, m4.first().mentions.channels.first().id)
                }).catch(( )=>{ message.channel.send({ content: 'Times up!' })})
            }
        });
    }
}