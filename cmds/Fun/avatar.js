const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	category: 'Fun',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	aliases: ['icon', 'pfp'],
	        /**
     * 
     * @param {Discord.Message} message 
     * @param {Discord.GuildMember} Member 
     * @param {Array} args 
     */
	async execute(message, Member, args) {
		const user = message.mentions.users.first() ? message.mentions.users.first() : message.author
		const avatarembed = new Discord.MessageEmbed()
        .setTitle(`Avatar for ${user.tag}`)
        .addField(`Link as:`, `[png](${user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })}) | [jpg](${user.displayAvatarURL({ dynamic: true, format: 'jpg', size: 1024 })}) | [webp](${user.displayAvatarURL({ dynamic: true, format: 'webp', size: 1024 })})`)
        .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setColor(message.client.confiig.color)
        .setAuthor(user.tag, user.displayAvatarURL())
        const view = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel(`PNG`)
                .setEmoji('863207249508696064')
                .setStyle('LINK')
                .setURL(user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })),
                new Discord.MessageButton()
                .setLabel(`JPG`)
                .setEmoji('863207249508696064')
                .setStyle('LINK')
                .setURL(user.displayAvatarURL({ dynamic: true, format: 'jpg', size: 1024 })),
                new Discord.MessageButton()
                .setLabel(`WEBP`)
                .setEmoji('863207249508696064')
                .setStyle('LINK')
                .setURL(user.displayAvatarURL({ dynamic: true, format: 'webp', size: 1024 }))
        );
        await message.channel.send({ embeds: [avatarembed], components: [view] });
	},
};