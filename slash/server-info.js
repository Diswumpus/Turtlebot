const Discord = require('discord.js');

module.exports = {
    name: 'server-info',
    description: 'Gives a hint',
    async execute(client, interaction) {
        const userr = interaction.guild
        const embeedd = new Discord.MessageEmbed()
        .setColor('AQUA')
        .setThumbnail(interaction.guild.iconURL())
        .setTitle(`${interaction.guild.name}`)
        .addField(`Verification Level:`, `${interaction.guild.verificationLevel}`)
        .addField(`Owner:`, `<@${interaction.guild.ownerID}>`)
        .addField(`Members:`, `${interaction.guild.memberCount}`)
        .addField(`Region:`, `${interaction.guild.region}`)
        .addField(`Rules:`, `${interaction.guild.rulesChannel}`)
        .addField(`You joined:`, `${interaction.guild.joinedAt}`)
        .addField(`Server created at:`, `${interaction.guild.createdAt}`)
        //.addField(`[Avatar link](${userr.user.displayAvatarURL()})`)
        .setTimestamp()
        await interaction.reply(embeedd); 
    }
}