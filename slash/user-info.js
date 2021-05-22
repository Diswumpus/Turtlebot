const Discord = require('discord.js');

module.exports = {
    name: 'user-info',
    description: 'Gives a hint',
    async execute(client, interaction) {
        let userr = interaction.options[0].member;
        const embeedd = new Discord.MessageEmbed()
        .setColor('AQUA')
        .setThumbnail(userr.user.displayAvatarURL())
        .setTitle(`User: ${userr.displayName}`)
        .addField(`User ID:`, `${userr.id}`)
        .addField(`Joined at:`, `${userr.joinedAt}`)
        //.addField(`Discord Version`, `${userr.presence.clientStatus}`)
        .addField(`Joined Discord at`, `${userr.user.createdAt}`)
        //.addField(`[Avatar link](${userr.user.displayAvatarURL()})`)
        .setTimestamp()
        await interaction.reply(embeedd); 
    }
}