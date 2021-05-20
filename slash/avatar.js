const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    async execute(client, interaction) {
        const member = interaction.options[0].member;
        const avatarembed = new Discord.MessageEmbed()
        .setTitle(`Avatar for ${member.user.tag}`)
        .addField(`Link as:`, `[png](${member.user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 })}) | [jpg](${member.user.displayAvatarURL({ dynamic: true, format: 'jpg', size: 1024 })}) | [webp](${member.user.displayAvatarURL({ dynamic: true, format: 'webp', size: 1024 })})`)
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        await interaction.reply(avatarembed);
    }
}