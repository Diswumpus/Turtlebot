const Discord = require('discord.js');
const interactions = require('../interactions');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, newMember, client) {
            const lModel = require('../models/plugins/logs');
            let v = await lModel.find({
                guild: oldMember.guild.id
            });
            if (v) {
                v.forEach(async c => {
                    if (c.user === true) {
                        let nembed;
                        let eventrun = false;
                        const row = new Discord.MessageActionRow()
                        // check if username changed
                        if (newMember.user.username != oldMember.user.username) {
                            eventrun = true
                            nembed = new Discord.MessageEmbed()
                            .setAuthor(`${newMember.user.username}`, newMember.user.displayAvatarURL())
                            .setThumbnail(newMember.user.displayAvatarURL())
                            .setTitle(`${require('../emojis.json').bot_redo} ${newMember.user.username} Changed there username!`)
                        }
                        // check if nickname changed
                        if (newMember.nickname != oldMember.nickname) {
                            eventrun = true
                            nembed = new Discord.MessageEmbed()
                            .setAuthor(`${newMember.nickname || newMember.user.username}`, newMember.user.displayAvatarURL())
                            .setThumbnail(newMember.user.displayAvatarURL())
                            .setTitle(`${require('../emojis.json').bot_redo} ${newMember.user.tag} Changed there nickname!`)
                        }
                        // check if avatar changed
                        if (newMember.user.avatarURL != oldMember.user.avatarURL) {
                            eventrun = true
                            nembed = new Discord.MessageEmbed()
                            .setAuthor(`${newMember.user.username}`, newMember.user.displayAvatarURL())
                            .setThumbnail(newMember.user.displayAvatarURL())
                            .setTitle(`${require('../emojis.json').bot_redo} ${newMember.user.tag} Changed there avatar!`)
                            const comp = await interactions.link(newMember.user.displayAvatarURL(), `Avatar`)
                            row.addComponents(comp.components[0]);
                        }

                        if(!eventrun) return
                        
                        const ch = client.channels.cache.get(`${c.logsch}`)
                        const logs = require('../models/plugins/logger').log;
                        new logs({
                            channel: ch,
                            type: 'user',
                            embed: nembed.setFooter('Server | User', 'https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kr44ljw3a9a.png'),
                            components: row || null
                        }).log()
                    }
                })
            }
    }
}