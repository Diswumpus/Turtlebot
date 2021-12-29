const Discord = require('discord.js');
const emojis = require('../../emojis.json');

module.exports = {
    name: 'server-info',
    category: 'Info',
    description: 'Get info about the server!',
    async execute(message, Member, args) {
        const { client } = message;
        const userr = message.guild;
        const guild = message.guild;
        const guildowner = await guild.fetchOwner()
        const embeedd = new Discord.MessageEmbed()
        .setColor(client.confiig.color)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
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
        message.channel.send({ embeds: [embeedd] });
    },
        /**
     * @param {Discord.Interaction} interaction 
     * @param {Discord.Client} client 
     */
         async interactionExecute(client, interaction) {
            const userr = interaction.guild;
            const guild = interaction.guild;
            const guildowner = await guild.fetchOwner()
            const embeedd = new Discord.MessageEmbed()
            .setColor(client.confiig.color)
            .setAuthor(interaction.author.tag, interaction.author.displayAvatarURL())
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
        },
};