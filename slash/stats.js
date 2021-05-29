const Discord = require('discord.js');

module.exports = {
    name: 'stats',
    description: 'Gives a hint',
    async execute(client, interaction) {
        let vernum = client.version.versionnum;
        const turtlebot = client.emojis.cache.find(em => em.name === "Turtlebot")
        const embeedd = new Discord.MessageEmbed()
        .setColor('AQUA')
        .setThumbnail(turtlebot.url)
        .addField(`Uptime:`, `${client.uptime/1000 /60 /60 /24}`)
        .addField(`Guilds:`, `${client.guilds.cache.size}`)
        .addField(`Code:`, `[Here](https://github.com/TurtlePaw/Turtlebot)`)
        .addField(`Developer`, `[Turtlepaw#5377](https://discord.com/channels/@me/847987367557333002)`)
        .addField(`Support Server`, `[Click here](https://discord.com/invite/5Wutrs8s4s)`)
        .addField(`Version:`, `${vernum}`)
        .setTimestamp()
        await interaction.reply(embeedd); 
    }
}