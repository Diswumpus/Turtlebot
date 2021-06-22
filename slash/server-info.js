const Discord = require('discord.js');

module.exports = {
    name: 'server-info',
    description: 'Gives a hint',
    async execute(client, interaction) {
        const userr = interaction.guild;
        const embeedd = new Discord.MessageEmbed()
        .setColor(client.confiig.color)
        .setThumbnail(interaction.guild.iconURL())
        .setTitle(`${interaction.guild.name}`)
        .addField(`Verification Level:`, `${interaction.guild.verificationLevel}`)
        .addField(`Owner:`, `<@${interaction.guild.ownerID}>`)
        .addField(`Members:`, `${interaction.guild.memberCount}`)
        .addField(`Region:`, `${interaction.guild.region}`)
        .addField(`Rules:`, `${interaction.guild.rulesChannel?? "None"}`)
        .addField(`You joined:`, `${interaction.guild.joinedAt}`)
        .addField(`Server created at:`, `${interaction.guild.createdAt}`)
        .addField(`Boosts:`, `${interaction.guild.premiumSubscriptionCount ?? "None"}`)
        .addField(`Boost Tier:`, `${interaction.guild.premiumTier ?? "0"}`)
        .addField(`Vanity URL:`, `${interaction.guild.vanityURLCode ?? "None"}`)
        .setTimestamp()
        await interaction.reply({ embeds: [embeedd] }); 
    }
}