const Discord = require('discord.js');

module.exports = {
    name: 'guildBanAdd',
    async execute(guild, user, client) {
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});

	const banLog = fetchedLogs.entries.first();

	if (!banLog) return

	const { executor, target } = banLog;

    const lModel = require('../models/plugins/logs');
    let v = await lModel.find({
        guild: guild.id
    });
    if(v){
    v.forEach(c => {
          if(c.mod === true){
                const ch = client.channels.cache.get(`${c.logsch}`)
                const nembed = new Discord.MessageEmbed()
                .setAuthor(`${user.username}`, user.displayAvatarURL())
                .setThumbnail(user.displayAvatarURL())
                if (target.id === user.id) {
                nembed.setTitle(`${require('../emojis.json').ban} ${user.tag} was banned by ${executor.tag}`)
                } else {
                    nembed.setTitle(`${require('../emojis.json').ban} ${user.tag} was banned`) 
                }
                require('../models/plugins/logger').log(ch, 'mod', nembed)
          }
    });
    }
}
}