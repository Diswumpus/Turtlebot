const Discord = require('discord.js');

module.exports = {
    name: 'version',
    description: 'Gives a hint',
    async execute(client, interaction) {
        let vernum = client.version.versionnum;
        const versionembed = new Discord.MessageEmbed()
        .setColor(client.confiig.color)
        .setTitle(`The version is: ${vernum}`)
        .setTimestamp()
        .setFooter(`Turtlebot • ${vernum}`)
        await interaction.reply(versionembed); 
    }
}