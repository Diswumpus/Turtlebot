const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    async execute(client, interaction) {
        const member = interaction.options.length > 0 ? interaction.options[0].user : interaction.user;
        const avatarembed = new Discord.MessageEmbed()
        .setTitle(`Avatar for ${member.tag}`)
        .addField(`Link as:`, `[png](${member.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })}) | [jpg](${member.displayAvatarURL({ dynamic: true, format: 'jpg', size: 1024 })}) | [webp](${member.displayAvatarURL({ dynamic: true, format: 'webp', size: 1024 })})`)
        .setImage(member.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setColor(client.confiig.color)
        await interaction.reply(avatarembed);
    }
}