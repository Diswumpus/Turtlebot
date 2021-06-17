const Discord = require('discord.js');

module.exports = {
    name: 'info',
    category: 'Info',
    description: 'Gives info about server,avatar',
    execute(message, Member, args) {
        const info = new Discord.MessageEmbed()
        .setTitle('Info:')
        .addField(`Server name:`, `${message.guild.name}`)
        .addField(`Total members:`, `${message.guild.memberCount}`)
        .addField('Your username:', message.author.username)
        .addField('Your ID:', message.author.id)
        .addField('Your avatar:', `[Click me!](${message.author.displayAvatarURL({ dynamic: true })})`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setColor(message.client.confiig.color)
        message.channel.send({ embeds: [info] });
    },
};