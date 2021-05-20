const Discord = require('discord.js');

module.exports = {
    name: 'version',
    description: 'Gives a hint',
    async execute(client, interaction) {
        let vernum = client.version.versionnum;
        const versionembed = new Discord.MessageEmbed()
        .setColor('AQUA')
        .setTitle(`The version is: ${vernum}`)
        .setTimestamp()
        .setFooter(`Turtlebot • ${vernum}`)
        await interaction.reply(versionembed); 
    }
}