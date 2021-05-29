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
        .addField(`Invite:`, `[Here](https://discord.com/oauth2/authorize?client_id=831712626626134037&permissions=4228381815&scope=bot%20applications.commands)`)
        .addField(`Code:`, `[Here](https://github.com/TurtlePaw/Turtlebot)`)
        .addField(`Developer`, `Turtlepaw#5377`)
        .addField(`Support Server`, `[Click here](https://discord.com/invite/5Wutrs8s4s)`)
        .addField(`Version:`, `${vernum}`)
        .setTimestamp()
        await interaction.reply(embeedd); 
    }
}