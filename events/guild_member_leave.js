const Discord = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member, client) {
        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_KICK',
        });
        
        const kickLog = fetchedLogs.entries.first();

        if (!kickLog || kickLog.target !== member.id || kickLog.createdTimestamp !== Date.now()){
            const lModel = require('../models/plugins/logs');
            let v = await lModel.find({
                guild: member.guild.id
            });
            if(v){
            v.forEach(c => {
                  if(c.user === true || c.server === true){
                        const ch = client.channels.cache.get(`${c.logsch}`)
                        const nembed = new Discord.MessageEmbed()
                        .setAuthor(`${member.user.username}`, member.user.displayAvatarURL())
                        .setThumbnail(member.user.displayAvatarURL())
                        .setTitle(`${require('../emojis.json').leave} ${member.user.tag} Left the server!`)
                        require('../models/plugins/logger').log(ch, 'server', nembed)
                  }
            });
            }
            return
        }

        const { executor, target } = kickLog;
            const lModel = require('../models/plugins/logs');
            let v = await lModel.find({
                guild: member.guild.id
            });
            if(v){
            v.forEach(c => {
                  if(c.mod === true){
                        const ch = client.channels.cache.get(`${c.logsch}`)
                        const nembed = new Discord.MessageEmbed()
                        if (target.id === member.id) {
                        nembed.setTitle(`${require('../emojis.json').ban} ${member.user.tag} was kicked by ${executor.tag}`)
                        } else {
                            nembed.setTitle(`${require('../emojis.json').ban} ${member.user.tag} was kicked`) 
                        }
                        require('../models/plugins/logger').log(ch, 'mod', nembed)
                  }
            });
            }
    }
}