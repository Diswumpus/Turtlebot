const Discord = require('discord.js');

module.exports = {
    name: 'stats',
    description: 'Gives a hint',
    async execute(client, interaction) {
        const turtlebot = client.emojis.cache.find(em => em.name === "Turtlebot")
        const embeedd = new Discord.MessageEmbed()
        .setColor('AQUA')
        .setThumbnail(turtlebot.url)
        .addField(`Uptime`, `${client.uptime/1000 /60 /60 /24}`)
        //.setTitle(``, ``)
        //.setTitle(``, ``)
        //.setTitle(``, ``)
        //.addField(`[Avatar link](${userr.user.displayAvatarURL()})`)
        .setTimestamp()
        await interaction.reply(embeedd); 
    }
}