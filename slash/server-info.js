const Discord = require('discord.js');
const emojis = require('../emojis.json');

module.exports = {
    name: 'server-info',
    description: 'Gives a hint',
    async execute(client, interaction) {
        const userr = interaction.guild;
        const guild = interaction.guild;
        const guildowner = await guild.fetchOwner()
        const embeedd = new Discord.MessageEmbed()
        .setColor(client.confiig.color)
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
        .setThumbnail(guild.iconURL())
        .setTitle(`${guild.name}`)
        .addField(`${emojis.flag_redo} Verification Level:`, `${guild.verificationLevel}`)
        .addField(`${emojis.pin} Owner:`, `${guildowner}`)
        .addField(`${emojis.useradd} Members:`, `${guild.memberCount}`)
        .addField(`${emojis.channeladd} Channels`, `${guild.channels.cache.size}`)
        .addField(`${emojis.useradd} You joined:`, `<t:${Math.round(new Date(guild.joinedTimestamp).getTime()/1000)}:F>`)
        .addField(`${emojis.flag} Server created at:`, `<t:${Math.round(new Date(guild.createdTimestamp).getTime()/1000)}:F>`)
        .addField(`<:nitroboost:835250125319176192> Boosts:`, `${guild.premiumSubscriptionCount ?? "0"} Boosts`)
        .addField(`${emojis.completed} Vanity URL:`, `${guild.vanityURLCode ?? "None"}`)
        .setTimestamp()
        await interaction.reply({ embeds: [embeedd] }); 
    }
}