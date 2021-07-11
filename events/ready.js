const wait = require('util').promisify(setTimeout);
const Discord = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		wait(5000)
		// client.guilds.cache.forEach(async g => {
		// 	if(!g.me.permissions.has(Discord.Permissions.FLAGS.ATTACH_FILES) || !g.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES) || !g.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS) || !g.me.permissions.has(Discord.Permissions.FLAGS.VIEW_CHANNEL)){
		// 		const owner = client.users.cache.get(g.ownerId);
		// 		const invite = await require('../interactions').invite(g)
		// 		const noperms = new Discord.MessageEmbed()
		// 		.setTitle(`${require('../emojis.json').bad} Hey ${owner.username}`)
		// 		.setColor(require('../config2.json').color)
		// 		.setDescription(`We've looked around and found that we don't quite have all the permissions we need to function properly though.\nTo fix this so you can properly use the bot, a link's been generated which will give all the relevent permissions to the bot:\n\n[Fix Permissions](${invite})`)
		// 		owner.send({ embeds: [noperms], components: [await require('../interactions').link(invite, 'Fix Permissions')] })
		// 	};
		// });
	},
};