const Discord = require('discord.js');
const configg = require('../config2.json')

module.exports = {
    name: 'stats',
    description: 'Gives a hint',
    async execute(client, interaction) {
        let vernum = client.version.versionnum;
        const turtlebot = client.emojis.cache.find(em => em.name === "Turtlebot")
        const embeedd = new Discord.MessageEmbed()
        .setColor(configg.color)
        .setThumbnail(turtlebot.url)
        .setTitle(`${require('../emojis.json').good} Stats`)
        .addField(`Uptime:`, `${client.uptime/1000 /60 /60} hours`)
        .addField(`Guilds:`, `${client.guilds.cache.size}`)
        .addField(`Invite:`, `[Here](${configg.boti})`)
        .addField(`Code:`, `[Here](https://github.com/TurtlePaw/Turtlebot)`)
        .addField(`Developer`, `Turtlepaw#5377`)
        .addField(`Support Server`, `[Click here](${configg.invite})`)
        .addField(`Version:`, `${vernum}`)
        .addField(`You can see all my commands here!`, `[Click Me](${configg.cmd})`)
        .setTimestamp()
        await interaction.reply({ embeds: [embeedd] }); 
    }
}