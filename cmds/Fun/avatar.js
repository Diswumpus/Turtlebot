const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	category: 'Fun',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	aliases: ['icon', 'pfp'],
	async execute(message, Member, args) {
		if (!message.mentions.users.size) {
			return message.channel.send(
				new Discord.MessageEmbed()
				.setImage(message.author.displayAvatarURL({ dynamic: true }))
				.setTitle(`Your avatar:`)
				.setColor(message.client.confiig.color)
				.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			);
		}
		const avatarList = message.mentions.users.map(user => {
			return message.channel.send(
			new Discord.MessageEmbed()
			.setImage(user.displayAvatarURL({ dynamic: true }))
			.setTitle(`${user.username}'s Avatar`)
			.setColor(message.client.confiig.color)
			.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			);
		});
	},
};